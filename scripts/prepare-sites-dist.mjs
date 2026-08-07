import { cp, mkdir, readdir, rm, unlink } from 'node:fs/promises';
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
await copyIfExists(
  path.join(distDir, 'originkit-hero-02.html'),
  path.join(clientDir, 'originkit-hero-02.html'),
);
await cp(path.join(distDir, 'assets'), path.join(clientDir, 'assets'), {
  recursive: true,
});
await copyIfExists(path.join(distDir, 'originkit'), path.join(clientDir, 'originkit'));
await cp(path.join(rootDir, 'worker', 'index.js'), path.join(serverDir, 'index.js'));

await mkdir(path.join(distDir, '.openai'), { recursive: true });
await cp(
  path.join(rootDir, '.openai', 'hosting.json'),
  path.join(distDir, '.openai', 'hosting.json'),
);

await removeSystemFiles(distDir);

async function copyIfExists(source, destination) {
  try {
    await cp(source, destination, { recursive: true });
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function removeSystemFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.name === '.DS_Store') {
        await unlink(entryPath);
        return;
      }

      if (entry.isDirectory()) {
        await removeSystemFiles(entryPath);
      }
    }),
  );
}
