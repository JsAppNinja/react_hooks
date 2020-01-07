import qs from 'qs';

export function updateSearchQuery(pathname, query) {
  const search = qs.stringify(query, {
    encodeValuesOnly: true,
    skipNulls: true
  });
  const newUrl = `${pathname}?${search}`;

  // silently replace search string
  if (window.history) {
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
}

export function getSearchQuery(history) {
  const { location } = history;
  return qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
}
