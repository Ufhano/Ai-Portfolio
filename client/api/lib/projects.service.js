const CACHE_MS = 10 * 60 * 1000;
let cache = {at: 0, text: ''};

export async function listPublicProjects() {
  if (cache.text && Date.now() - cache.at < CACHE_MS) return cache.text;

  const response = await fetch(
    'https://api.github.com/users/Ufhano/repos?per_page=100&sort=updated',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'ufhano-portfolio',
      },
      signal: AbortSignal.timeout(4000),
    },
  );

  if (!response.ok) return cache.text;

  const repos = await response.json();
  const text = repos
    .filter((repo) => !repo.fork && (repo.description || repo.homepage))
    .slice(0, 15)
    .map((repo) => {
      const lines = [
        `- ${repo.name}: ${repo.description || 'Public repository'}`,
        `  GitHub: ${repo.html_url}`,
      ];
      if (repo.homepage) lines.push(`  Live: ${repo.homepage}`);
      return lines.join('\n');
    })
    .join('\n');

  cache = {at: Date.now(), text};
  return text;
}
