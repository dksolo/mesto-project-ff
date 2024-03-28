import { closePopUpEsc} from './modal.js';

//Здесь лежит универсальный код для карточек 
//(без задействования попапов, функций открытия/закрытия). 
//Только колбэки универсальные, приходящие в вызов функции создания карточки

function createCardwTitleNLink(cardTitle, cardLink, deleteCard, clickLikeCard, openImgPopUp) {
    //Фнукция добавления карточки по имени и ссылке
    //console.log('Добавляю: '+ cardTitle);
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardImage.setAttribute('src', cardLink);
    cardImage.setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + cardTitle);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', clickLikeCard);
    cardElement.querySelector('.card__image').addEventListener('click', openImgPopUp);
    return cardElement;
}

function deleteCard (evt) {
  //функция удаления карточки
  //console.log('Удаляю карточку.');
  evt.target.closest('.card').remove();
}

function clickLikeCard (evt) {
  //console.log('Середечко кликнуто.')
  evt.target.classList.toggle('card__like-button_is-active')
}

function openImgPopUp (evt) {
  //console.log('Открываю попап для картинки.');
  const imagePopUp = document.querySelector('.popup_type_image');
  const imagePopUpImage = imagePopUp.querySelector('.popup__image')
  const imgLink = evt.target.getAttribute('src');
  const imgTitle = evt.target.closest('.places__item').querySelector('.card__title').textContent;
  imagePopUpImage.setAttribute('src', imgLink);
  imagePopUpImage.setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + imgTitle);
  imagePopUp.querySelector('.popup__caption').textContent = imgTitle;
  //console.log('Открываю попап.');
  imagePopUp.classList.add('popup_is-opened');
  window.addEventListener('keydown', closePopUpEsc);
  //console.log('Происходит открытие картинки.')
}

export { createCardwTitleNLink, deleteCard, clickLikeCard, openImgPopUp  }