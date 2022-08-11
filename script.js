const itensContainer = document.querySelector('.items');
const cartContainer = document.querySelector('.cart__items');

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

const cartItemClickListener = (event) => {
  const paraDeReclamarLint = event;
  return paraDeReclamarLint;
};
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
createCartItemElement({ sku: 'a', name: 'b', salePrice: 'c' });
const pushList = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  Object.keys(results).forEach((i) => {
    const product = { sku: results[i].id, name: results[i].title, image: results[i].thumbnail };
    const newItem = createProductItemElement(product);
    itensContainer.appendChild(newItem);
  });
};

const addToCart = async (id) => {
  const data = await fetchItem(id);
  const cartProduct = { sku: data.id, name: data.title, salePrice: data.price };
  cartContainer.appendChild(createCartItemElement(cartProduct));
};
window.onload = () => {
  pushList();

  itensContainer.addEventListener('click', (event) => {
    const buttonType = event.target;
    if (buttonType.className === 'item__add') {
      const getid = getSkuFromProductItem(event.target.parentNode);
      addToCart(getid);
    }
  });
};