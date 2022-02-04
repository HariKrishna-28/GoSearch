async function generateUrl(searchQuery, path) {
  const url = "https://www.google.com/search?q=";
  const query = searchQuery.split(1);
  const refinedQuery =
    path === "search"
      ? `${url}${query}`
      : path === "videos"
      ? `${url}${query} youtube ${path}`
      : `${url}${query} ${path}`;
  return refinedQuery;
}

module.exports = generateUrl();
