const cart = document.getElementsByClassName('cart__items')[0];
const itemsFromCart = document.getElementsByClassName('cart__item');
const priceTag = document.getElementsByClassName('total-price')[0];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalCart = () => {
  if (itemsFromCart.length === 0) {
    priceTag.innerText = '0.00';
  } else {
    let sum = 0;
    for (let i = 0; i < itemsFromCart.length; i += 1) {
      const price = itemsFromCart[i].innerText.split('$')[1];
      sum += Number(price);
    }
    priceTag.innerText = sum.toString();
  }
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  totalCart();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const start = () => {
  const sectionItems = document.getElementsByClassName('items')[0];
  const load = createCustomElement('p', 'loading', 'carregando...');
  sectionItems.appendChild(load);
};

const finish = () => {
  const load = document.querySelectorAll('.loading');
  load.forEach((element) => element.remove());
};

const fillWithResults = async () => {
  const sectionItems = document.getElementsByClassName('items')[0];
  start();
  const objSearch = await fetchProducts('computador');
  const arrayProducts = objSearch.results;
  arrayProducts.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const prod = createProductItemElement({ sku, name, image });
    sectionItems.appendChild(prod);
  });
  finish();
};

const eventForAddToCartButtons = async () => {
  const btns = document.querySelectorAll('.item__add');
  btns.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const pElement = event.target.parentElement;
      const skuID = getSkuFromProductItem(pElement);
      const itemInfo = await fetchItem(skuID);
      const { id: sku, title: name, price: salePrice } = itemInfo;
      const productToCart = createCartItemElement({ sku, name, salePrice });
      cart.appendChild(productToCart);
      saveCartItems(cart.innerHTML);
      totalCart();
    });
  });
};

const reAddEventToCartItens = () => {
  for (let i = 0; i < itemsFromCart.length; i += 1) {
    itemsFromCart[i].addEventListener('click', cartItemClickListener);
  }
};

const recoverCartLocalStorage = async () => {
  const cartList = await getSavedCartItems();
  cart.innerHTML = cartList;
};
const eventClearCartButton = () => {
  const clearBtn = document.getElementsByClassName('empty-cart')[0];
  clearBtn.addEventListener('click', () => {
    while (itemsFromCart.length !== 0) {
      itemsFromCart[0].remove();
    }
    totalCart();
  });
};

window.onload = async () => { 
  await fillWithResults();
  await eventForAddToCartButtons();
  await recoverCartLocalStorage();
  totalCart(); 
  eventClearCartButton();
  reAddEventToCartItens();
};