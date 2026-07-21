const assetRewrites = [
  [/^\/projects\/assets\//, '/assets/'],
  [/^\/projects\/[^/]+\/assets\//, '/assets/'],
];

function hasFileExtension(pathname) {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

async function fetchAsset(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname ?? url.pathname;
  return env.ASSETS.fetch(new Request(url.toString(), request));
}

async function fetchRewrittenAsset(request, env, pathname) {
  for (const [pattern, replacement] of assetRewrites) {
    if (pattern.test(pathname)) {
      const rewritten = pathname.replace(pattern, replacement);
      const response = await fetchAsset(request, env, rewritten);

      if (response.status !== 404) {
        return response;
      }
    }
  }

  return null;
}

const worker = {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const directAsset = await fetchAsset(request, env);

    if (directAsset.status !== 404) {
      return directAsset;
    }

    const rewrittenAsset = await fetchRewrittenAsset(request, env, url.pathname);

    if (rewrittenAsset) {
      return rewrittenAsset;
    }

    if (hasFileExtension(url.pathname)) {
      return directAsset;
    }

    return fetchAsset(request, env, '/index.html');
  },
};

export default worker;
