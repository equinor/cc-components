import { execSync } from 'child_process';
// This script can be deleted as soon as https://github.com/vercel/turbo/issues/986 is merged
execSync(`turbo run ${process.argv[2]} --filter ${process.argv[3]}...`, { stdio: "inherit" })
