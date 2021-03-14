async function fetchAPI(url) {
  const result = await fetch(url);
  const json = result.json();
  return json;
}
