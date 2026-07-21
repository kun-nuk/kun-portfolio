import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');

await rm(clientDir, { recursive: true, force: true });
await rm(serverDir, { recursive: true, force: true });
await mkdir(clientDir, { recursive: true });
await mkdir(serverDir, { recursive: true });

await cp(path.join(distDir, 'index.html'), path.join(clientDir, 'index.html'));
await cp(path.join(distDir, 'assets'), path.join(clientDir, 'assets'), {
  recursive: true,
});
await cp(path.join(rootDir, 'worker', 'index.js'), path.join(serverDir, 'index.js'));

await mkdir(path.join(distDir, '.openai'), { recursive: true });
await cp(
  path.join(rootDir, '.openai', 'hosting.json'),
  path.join(distDir, '.openai', 'hosting.json'),
);
