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
    cardImage.addEventListener('click', () => openImgPopUp(cardTitle, cardLink));
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

export { createCardwTitleNLink, deleteCard, clickLikeCard }