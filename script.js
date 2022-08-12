const containerItems = document.querySelector('.items');
const cartContainer = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  // edit to commit
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
  const getClass = event.target.className;
  if (getClass === 'cart__item') {
    const getElement = event.target;
    getElement.remove();
  }
};
cartContainer.addEventListener('click', cartItemClickListener);

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addEventOnButtons = async () => {
  const allButtons = await document.querySelectorAll('.item__add');
  allButtons.forEach((button) => {
    const parent = button.parentElement;
    const id = getSkuFromProductItem(parent);
    button.addEventListener('click', async () => {
      const data = await fetchItem(id);
      const obj = {
        sku: data.id,
        name: data.title,
        salePrice: data.price,
      };
      const createdElement = createCartItemElement(obj);
      cartContainer.appendChild(createdElement);
    });
  });
};

const startItems = async (queryName) => {
  const response = await fetchProducts(queryName);
  const { results } = response;
  results.forEach((item) => {
    const { id, title, thumbnail } = item;
    const obj = { sku: id, name: title, image: thumbnail };
    containerItems.appendChild(createProductItemElement(obj));
  });
};

const addEventClearButton = () => {
  const clearCartButton = document.querySelector('.empty-cart');
  clearCartButton.style = 'cursor: pointer;';
  clearCartButton.addEventListener('click', () => {
    cartContainer.innerHTML = '';
  });
};

window.onload = async () => {
  await startItems('computador');
  await addEventOnButtons();
  await addEventClearButton();
};