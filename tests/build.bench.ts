import { bench, describe } from 'vitest';
import { execSync } from 'node:child_process';

function measureCommand(cmd: string) {
  const start = performance.now();
  try {
    console.log(`Running command: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Command failed: ${cmd}`, error);
    return;
  }
  const end = performance.now();
  console.log(`"${cmd}" took ${(end - start).toFixed(2)}ms`);
}

describe('sort', () => {
  bench(
    'rslib build',
    () => {
      measureCommand('pnpm run rslib');
    },
    { iterations: 1 },
  );

  bench(
    'tsdown build',
    () => {
      measureCommand('pnpm run tsdown');
    },
    { iterations: 1 },
  );
});
