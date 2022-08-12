const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  
  test('Testa se ao executar a funão, o metodo local storage é chamado!;', () => {
    const parametro = 'cartItems';
    const função = getSavedCartItems(parametro);
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  test('Testa se ao executar a gunção, o método local storage é chamado com o parametro "cartItem"', () => {
    const parametro = 'cartItems';
    const função = getSavedCartItems(parametro);
    expect(localStorage.getItem).toHaveBeenCalledWith(parametro);
  })

});
