const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  test('Testa se, ao executar a função com o parametro "<ol><li>Item</li></ol>", o método "localStorage.setItem" é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('Testa se, ao executar a função com o parametro "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com os parametros corretos', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })

});
