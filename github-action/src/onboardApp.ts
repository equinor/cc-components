#!/usr/bin/env node

import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { OutgoingHttpHeaders } from 'http';
import { HttpClient } from '@actions/http-client';
import { logInfo } from './utils/logInfo.js';

const testEnv = {
  url: "https://backend-fusion-project-portal-test.radix.equinor.com",
  portalGuid: "0177ef5f-c49e-4d2a-7907-08db31e4e851",
  // Construction and commissioning group. This field is already deprecated in backend but still required
  categoryId: "bd29be8f-f47b-42c1-b223-08db31e4e90f"
}

const productionEnv = {
  url: "https://backend-fusion-project-portal-prod.radix.equinor.com",
  portalGuid: "24843980-c0bb-42ce-f082-08db31e659d1",
  // Construction and commissioning group. This field is already deprecated in backend but still required
  categoryId: "94cbf7e0-cc23-4ec6-a0df-08db47d0e6a0"
}

const program = new Command();

program.name('Onboard');

program
  .command('onboard')
  .option('-T, --token <token>', 'change the working directory')
  .option('-A, --appkey <appkey>')
  .option('-C, --context <context>')
  .option('-E, --env <env>')
  .action(async (args) => {
    const fusionEnv: string = args.env;
    if (!['CI', 'FPRD'].includes(fusionEnv)) {
      logInfo(`Unknown env ${fusionEnv}`, 'Red');
      throw new Error(`Unknown env ${fusionEnv}`);
    }
    if (!args.token) {
      throw new Error('Missing az token');
    }
    if (args.appkey.trim().length === 0) {
      throw new Error(`Invalid appkey ${args.appkey}`);
    }

    if (args.context.trim().length === 0) {
      throw new Error(`Invalid contextId ${args.contextId}`);
    }

    setSecret(args.token);
    createFusionApp(
      args.token,
      args.appkey,
      fusionEnv as 'CI' | 'FPRD',
      args.context
    );
  });

await program.parseAsync();

export async function createFusionApp(
  token: string,
  appKey: string,
  env: FusionEnv,
  contextId: string
) {
  await onboardAppForProjectMaster(appKey, token, env)
  await onboardAppWithCategory(appKey, token, env)
  await onboardAppToPortal(appKey, token, env, contextId)
}

type FusionEnv = "CI" | "FPRD";


async function onboardAppForProjectMaster(appkey: string, token: string, env: FusionEnv) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };
  const payload = {
    type: "Facility"
  }
  const url = `${env === 'CI' ? testEnv.url : productionEnv.url}/api/onboarded-apps/${appkey}/context-type`
  console.log(`Sending ${payload} to ${url}`)
  try {

    const res = await client.postJson(
      url,
      payload,
      headers
    );

    // api throws 400 if app is already onboarded for projectmaster
    if (res.statusCode == 400) {
      return
    }

    if (![200, 204].includes(res.statusCode)) {
      logInfo(`Failed to create ${appkey} in Fusion ${env}`, 'Red');
      throw new Error(JSON.stringify(res.result));
    }
  } catch (e) {
    console.log(e)
  }
  logInfo(`Succesfully created the application ${appkey} in Fusion ${env}`, 'Green');
}

async function onboardAppToPortal(appkey: string, token: string, env: FusionEnv, contextId: string) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };
  const url = `${env === 'CI' ? testEnv.url : productionEnv.url}/api/portals/${env === "CI" ? testEnv.portalGuid : productionEnv.portalGuid}/contexts/${contextId}/apps`
  console.log(url)
  const res = await client.postJson(
    url,
    { appKey: appkey },
    headers
  );

  if (![200, 204].includes(res.statusCode)) {
    logInfo(`Failed to onboard ${appkey} to context ${contextId} in Fusion ${env}`, 'Red');
    console.log(res)
    throw new Error(JSON.stringify(res.result));
  }
  logInfo(`Succesfully onboarded the application ${appkey} to context ${contextId} in Fusion ${env}`, 'Green');
}

async function onboardAppWithCategory(appkey: string, token: string, env: FusionEnv) {
  try {

    const client = new HttpClient();

    const headers: OutgoingHttpHeaders = {
      ['Authorization']: `Bearer ${token}`,
      ['Content-Type']: 'application/json',
    };
    const payload = { appKey: appkey, isLegacy: false, appGroupId: env == "CI" ? testEnv.categoryId : productionEnv.categoryId, contextTypes: ["Facility"] }
    const res = await client.postJson(
      `${env === 'CI' ? testEnv.url : productionEnv.url}/api/onboarded-apps`,
      payload,
      headers
    );

    if (![200, 204].includes(res.statusCode)) {
      logInfo(`Failed to onboard app with category ${appkey} in Fusion ${env}`, 'Red');
      throw new Error(JSON.stringify(res.result));
    }
  } catch (e) {
    console.log(e)
  }
  logInfo(`Succesfully onboarded the application with category ${appkey} in Fusion ${env}`, 'Green');
}

