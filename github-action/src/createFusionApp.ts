#!/usr/bin/env node

import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { OutgoingHttpHeaders } from 'http';
import { HttpClient } from '@actions/http-client';

import { logInfo } from './utils/logInfo.js';
import { categories } from './appCategories.js';

type FusionApp = {
  key: string;
  name: string;
  shortName: string;
  description: string;
  owners: string[];
  admins: string[];
  accentColor: string;
  categoryId: string;
  icon: string;
  tags: string[];
  aks: null;
  healthCheck: null;
  requiredRoles: [];
  type: 'standalone';
  version: string;
  publishedDate: null;
  order: number;
  //NB: important
  hide: boolean;
};

const prodUrl = 'https://fusion-s-portal-fprd.azurewebsites.net';
const ciUrl = 'https://fusion-s-portal-ci.azurewebsites.net';

const program = new Command();

program.name('Create');

program
  .command('create')
  .option('-T, --token <token>', 'change the working directory')
  .option('-A, --appkey <appkey>')
  .option('-D, --displayname <displayname>')
  .option('-C, --category <category>')
  .option('-O, --owners <owners>')
  .option('-E, env <env>')
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
    if (args.displayname.trim().length === 0) {
      throw new Error(`Invalid displayname ${args.displayname}`);
    }
    if (args.category.trim().length === 0) {
      throw new Error(`Invalid category ${args.category}`);
    }

    const admins = args.owners.split(',');
    if (admins.length <= 0) {
      throw new Error('Application needs atleast one admin');
    }

    setSecret(args.token);
    createFusionApp(
      args.token,
      args.appkey,
      args.displayname,
      args.category,
      admins,
      fusionEnv as 'CI' | 'FPRD'
    );
  });

await program.parseAsync();

export async function createFusionApp(
  token: string,
  appKey: string,
  displayName: string,
  categoryName: string,
  admins: string[],
  env: 'CI' | 'FPRD'
) {
  //TODO: fetch dynamically
  const category = categories.find((s) => s.name === categoryName);

  if (!category) {
    throw new Error(`Unknown category ${categoryName}`);
  }

  const payload: FusionApp = {
    key: appKey,
    name: displayName,
    shortName: appKey,
    description: '.',
    owners: [],
    admins: admins,
    accentColor: category.name,
    categoryId: category.id,
    icon: '',
    tags: [],
    aks: null,
    healthCheck: null,
    requiredRoles: [],
    type: 'standalone',
    version: '',
    publishedDate: null,
    order: 0,
    //NB: important
    hide: true,
  };

  await createApplicationAsync(env, payload, token);
}

async function createApplicationAsync(
  env: 'CI' | 'FPRD',
  payload: FusionApp,
  token: string
) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };

  const res = await client.postJson(
    `${env === 'CI' ? ciUrl : prodUrl}/api/apps`,
    payload,
    headers
  );

  if (![200, 204].includes(res.statusCode)) {
    logInfo(`Failed to create ${payload.key} in Fusion ${env}`, 'Red');
    throw new Error(JSON.stringify(res.result));
  }
  logInfo(`Succesfully created the application ${payload.key} in Fusion ${env}`, 'Green');
}
