#!/usr/bin/env node

import { setSecret } from '@actions/core';
import { Command } from 'commander';
import { execSync } from 'child_process';

export interface App {
  key: string
  owners: string[]
  admins: Admin[]
}

export interface Admin {
  azureUniqueId: string
  fusionRole: any
}

const program = new Command();

program.name('Release');

type FusionEnv = "ci" | "fprd"

type SyncArgs = {
  token: string;
  group: string;
  spid: string;
  env: FusionEnv;
  baseurl: string;
};

program
  .command('sync')
  .option('-T, --token <token>', 'azure token for fusion resource')
  .option("-E, --env <env>", "Fusion env")
  .option("-G, --group <group>", "Ad group to assign")
  .option("-S, --spid <spid>", "Service principal oid")
  .action(async (args) => {
    const ciUrl = 'https://fusion-s-portal-ci.azurewebsites.net';
    const fprdUrl = 'https://fusion-s-portal-fprd.azurewebsites.net';

    if (!args.token) {
      throw new Error('Missing az token');
    }
    if (!args.group) {
      throw new Error("Missing ad group")
    }
    if (!args.spid) {
      throw new Error("Service principal OID required")
    }
    if (!args.env) {
      throw new Error("No fusion env specified")
    }
    args.env = args.env.toLowerCase()
    if (!["ci", "fprd"].includes((args.env as string))) {
      throw new Error(`${args.env} not recognized as a Fusion env`)
    }
    args.baseurl = (args.env as FusionEnv) == "ci" ? ciUrl : fprdUrl;

    const syncArgs: SyncArgs = args;
    setSecret(args.token);
    syncAdmins(syncArgs);
  });

await program.parseAsync();

export function getAdmins(adGroupName: string, spId: string): string[] {
  console.log("Looking up AD group...")
  const peopleStringOutput = execSync(`az ad group member list --group "${adGroupName}"`).toString("utf8")
  const people = JSON.parse(peopleStringOutput) as { id: string }[]
  return people.map(s => s.id).concat([spId])
}

export async function getApps(token: string, baseurl: string): Promise<{ name: string, admins: string[] }[]> {
  console.log("Fetching fusion apps")
  const res = await fetch(`${baseurl}/api/admin/apps`, {
    headers: { authorization: `Bearer ${token}` }
  })
  if (!res.ok) {
    console.log(`Failed with: ${res.status}`)
    const body = await res.json();
    console.log(body)
    throw new Error("Failed to get apps")
  }
  const apps: App[] = await res.json()
  return apps.map(s => ({ name: s.key, admins: s.admins.map(s => s.azureUniqueId) }));
}

export async function removeAdmin({ baseUrl, name, oid, token }: { name: string, oid: string, token: string, baseUrl: string }) {
  const res = await fetch(`${baseUrl}/api/admin/apps/${name}/admins/${oid}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` }
  })
  if (!res.ok) {
    throw new Error(`Failed to remove ${oid} as admin from ${name}`)
  }
  console.log(`Removed ${oid} as admin from ${name}`)
}

export async function addAdmin({ baseUrl, name, oid, token }: { name: string, oid: string, token: string, baseUrl: string }) {
  const res = await fetch(`${baseUrl}/api/admin/apps/${name}/admins/${oid}`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` }
  })
  if (!res.ok) {
    throw new Error(`Failed to add ${oid} as admin on ${name}`)
  }
  console.log(`Added ${oid} as admin on ${name}`)
}


export async function syncAdmins(context: SyncArgs) {
  const oids = getAdmins(context.group, context.spid);
  const apps = await getApps(context.token, context.baseurl);

  const diffInfo = apps.map(({ name, admins }) => {
    const newAdmins = oids.filter(s => !admins.includes(s))
    const toBeRemovedAdmins = admins.filter(s => !oids.includes(s))
    const diff = { name: name, newAdmins, toBeRemovedAdmins }
    return diff;
  })

  for (let i = 0; i < diffInfo.length; i++) {
    const app = diffInfo[i]
    console.log("###########################################")
    console.log(`app: ${app.name}, remove: ${app.toBeRemovedAdmins.length}, add: ${app.newAdmins.length}, count: ${i + 1}/${diffInfo.length}`)
    for (let j = 0; j < app.toBeRemovedAdmins.length; j++) {
      const tbrOid = app.toBeRemovedAdmins[j]
      await removeAdmin({ name: app.name, oid: tbrOid, token: context.token, baseUrl: context.baseurl })
      //DO NOT SPAM API, IT WILL GO DOWN
      await delay(5000)
    }

    for (let j = 0; j < app.newAdmins.length; j++) {
      const tbaOid = app.newAdmins[j]
      await addAdmin({ name: app.name, oid: tbaOid, token: context.token, baseUrl: context.baseurl })
      //DO NOT SPAM API, IT WILL GO DOWN
      await delay(5000)
    }

    if (app.newAdmins.length || app.toBeRemovedAdmins.length) {
      //DO NOT SPAM API, IT WILL GO DOWN
      await delay(10_000)
    }
  }

  const summary = {
    uniqueRemoved: diffInfo.flatMap(s => s.toBeRemovedAdmins).filter((v, i, a) => a.indexOf(v) === i),
    uniqueAdded: diffInfo.flatMap(s => s.newAdmins).filter((v, i, a) => a.indexOf(v) === i)
  }

  console.log(summary)
}

async function delay(delay: number) {
  return new Promise((res) => setTimeout(() => res(undefined), delay))
}

