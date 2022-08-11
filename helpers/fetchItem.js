const fetchItem = async (query) => {
  if (!query) throw new Error('You must provide an url');
  const ENDPOINT = `https://api.mercadolibre.com/items/${query}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
