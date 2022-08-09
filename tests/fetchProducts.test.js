require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  test('Verifica se o fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  })
  
  test('Testa se o fetch foi chamado, ao executar a função com o parametro "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  
  test('Testa se passar computador como parametro da função, a função fetch ultiliza o enpoint(url) certo', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('Testa se o retorno da função com o parametro "computador" é igual ao objeto "computadorSearch"', () => {
    fetchProducts('computador');
    expect(fetchProducts('computador')).toMatch(computadorSearch);
  });

  test('Testa se ao chamar a função fetchProducts sem parametros, retorna um erro com a mensagem: "You must provide an url"', () => {
    expect(fetchProducts()).toThrow(new Error('You must provide an url'));
  })
});
