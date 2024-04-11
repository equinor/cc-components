import { execSync } from 'child_process';
execSync(`turbo run ${process.argv[2]} --filter ${process.argv[3]}...`, { stdio: "inherit" })
