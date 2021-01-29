'use strict';

const cardContainer = document.getElementById('root'); // ul

const cards = data.map((place) => createPlaceCardElement(place)); // создаем li

cardContainer.append(...cards); // добавляем li в ul

/**
 *
 * @param {object} place
 * @returns {HTMLLIElement}
 */
function createPlaceCardElement(place) {
  const { description, name } = place;

  const p = createElement('p', { classNames: ['cardDescription'] }, [
    document.createTextNode(description || ''),
  ]);

  const h2 = createElement('h2', { classNames: ['cardName'] }, [
    document.createTextNode(name),
  ]);

  const img = createCardImage(place);

  const article = createElement('article', { classNames: ['cardContainer'] }, [
    img,
    h2,
    p,
  ]);

  const wrapper = createElement('li', { classNames: ['cardWrapper'] }, [
    article,
  ]);

  return wrapper; //htmllielement
}

function createCardImage(place) {
  const { name, id } = place;

  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`); // устанавливаем  id для контейнер картинки
  imageWrapper.classList.add('imageWrapper');
  imageWrapper.style.backgroundColor = stringToColour(name);

  const initials = document.createElement('div');
  initials.classList.add('imagePlaceholder', 'imagePlacement');
  initials.append(document.createTextNode(name[0] || ''));

  createImage(place);

  imageWrapper.append(initials);
  return imageWrapper;
}

function createImage({ profilePicture, name, id }) {
  const img = document.createElement('img'); // = new Image();
  img.setAttribute('src', profilePicture);
  img.setAttribute('alt', name);
  img.dataset.id = id; // даём картинки её id
  img.classList.add('cardImage', 'imagePlacement');
  img.addEventListener('error', imageErrorHandler);
  img.addEventListener('load', imageLoadHandler);
}

/* 
  EVENT LISTENERS
*/
function imageErrorHandler({ target }) {
  target.remove();
}

function imageLoadHandler({
  target: {
    dataset: { id },
  },
  target,
}) {
  document.getElementById(`wrapper${id}`).append(target);
}

/* 
  UTILS
*/

// DONT TRUST THIS CODE. TAKEN FROM STACKOVERFLOW
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}


/* 
  LIB
*/
/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, { classNames, onClick }, children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.onclick = onClick;
  elem.append(...children);
  return elem;
}