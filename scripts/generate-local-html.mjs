import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const outputPath = path.join(distDir, 'kun-portfolio-local.html');

let html = await readFile(indexPath, 'utf8');

html = await inlineStyles(html);
html = await inlineScripts(html);

await writeFile(outputPath, html, 'utf8');

async function inlineStyles(markup) {
  return replaceAsync(
    markup,
    /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
    async (_match, href) => {
      const cssPath = path.join(distDir, href.replace(/^\.\//, ''));
      const css = await readFile(cssPath, 'utf8');

      return `<style>${css}</style>`;
    },
  );
}

async function inlineScripts(markup) {
  return replaceAsync(
    markup,
    /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
    async (_match, src) => {
      const scriptPath = path.join(distDir, src.replace(/^\.\//, ''));
      const script = await readFile(scriptPath, 'utf8');

      return `<script type="module">${script}</script>`;
    },
  );
}

async function replaceAsync(value, regex, replacer) {
  const matches = [...value.matchAll(regex)];
  const replacements = await Promise.all(matches.map((match) => replacer(...match)));
  let index = 0;

  return value.replace(regex, () => replacements[index++]);
}
