#!/usr/bin/env node
import { Command } from 'commander';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

const program = new Command();

program.name('Create');

program
  .command('link')
  .action(async () => {
    if (!existsSync("./workspace")) {
      execSync('git clone https://github.com/equinor/fusion-workspace.git ./workspace', { stdio: 'inherit' });
    }
    execSync("cd ./workspace && pnpm first-time-setup && pnpm build --no-cache", { stdio: "inherit" })
    execSync("pnpm install ./workspace/packages/workspace-fusion -w", { stdio: "inherit" })
  })

program.command("unlink").action(async () => {
  execSync("pnpm add @equinor/workspace-fusion@latest -w", {stdio: "inherit"})
});

await program.parseAsync();

