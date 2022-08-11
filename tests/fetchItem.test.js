require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

    test('Verifica se fetchItem é uma função', () => {
      expect(typeof fetchItem).toEqual('function')
    })

    test('Testa se o fetch foi chamado, ao executar a função com o parametro "MLB1615760527"', async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    })

    test('Testa se passar MLB1615760527 como parametro da função, a função ultiliza o enpoint(url) certo', () => {
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    });

    test('Testa se o retorno da função com o parametro "MLB1615760527" é igual ao objeto "computadorSearch"', () => {
      fetchItem('MLB1615760527');
      expect(fetchItem('MLB1615760527')).toMatch(item);
    })

    test('Testa se ao chamar a função fetchItem sem parametros, retorna um erro com a mensagem: "You must provide an url"', () => {
      expect(fetchItem()).toThrow(new Error('You must provide an url'));
    })
  
});
