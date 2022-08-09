require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se o fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  })
  
  it('Testa se o fetch foi chamado, ao executar a função com o parametro "computador"', async () => {
     await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
});
