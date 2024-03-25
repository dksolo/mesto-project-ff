import './pages/index.css';
import { initialCards }  from './scripts/cards.js';


//Этот файл был перенесен из папки scripts

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const contentContainer = document.querySelector('.content');
const placesListContainer = contentContainer.querySelector('.places__list');
//Кнопки
const profileEditButton = contentContainer.querySelector('.profile__edit-button');
const newCardButton = contentContainer.querySelector('.profile__add-button');
//Попапы
const profileEditPopUp = document.querySelector('.popup_type_edit');
const newCardPopUp = document.querySelector('.popup_type_new-card');
const imagePopUp = document.querySelector('.popup_type_image');
//Формы
const profileEditForm = document.forms["edit-profile"];
const nameOfProfile = profileEditForm.elements['name'];
const descriptionOfProfile = profileEditForm.elements['description'];
const originalNameOfProfile = document.querySelector('.profile__title')
const originalDescriptionOfProfile = document.querySelector('.profile__description')

const newCardForm = document.forms["new-place"];

//* Здесь я создаю функцию, которая считывает массив и затем элемент за элементом массива 
//* Отображает карточки.


function initialSetUp() {
    //Функция начала загрузки карточек
    //console.log('Начинаю первоначальную загрузку карточек...')
    for (let i = 0; i < initialCards.length; i++) {
        const cardsName = initialCards[i].name;
        const cardsLink = initialCards[i].link;
        const cardElement = createCardwTitleNLink(cardsName, cardsLink, deleteCard);
        placesListContainer.append(cardElement);
    }
    //console.log('Загрузка карточек завершена!');
}

function createCardwTitleNLink(cardTitle, cardLink, deleteCard) {
    //Фнукция добавления карточки по имени и ссылке
    //console.log('Добавляю: '+ cardTitle);
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', cardLink);
    cardElement.querySelector('.card__image').setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + cardTitle);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', clickLikeCard);
    cardElement.querySelector('.card__image').addEventListener('click', openImagePopUp)
    return cardElement;
}

function deleteCard (evt) {
    //функция удаления карточки
    //console.log('Удаляю карточку.');
    evt.target.closest('.card').remove();
}

function clickLikeCard (evt) {
  //console.log('Середечко кликнуто.')
  if (evt.target.classList.contains('card__like-button_is-active')) {
    //console.log('Снимаю лайк');
    evt.target.classList.remove('card__like-button_is-active');
  } else {
    //console.log('Ставлю лайк');
    evt.target.classList.add('card__like-button_is-active');
  }
}

// Модальные окна

profileEditButton.addEventListener('click', openEditPopUp);
newCardButton.addEventListener('click', openNewCardPopUp);


function openEditPopUp (evt) {
  //console.log('Открываю попап для редактирования профиля.');
  profileEditPopUp.classList.add('popup_is-opened');
  nameOfProfile.value = originalNameOfProfile.textContent
  descriptionOfProfile.value = originalDescriptionOfProfile.textContent
  profileEditPopUp.querySelector('.popup__close').addEventListener('click', closePopUp);
  profileEditForm.addEventListener('submit', editProfile);
  document.addEventListener('mousedown', closePopUpOverlay);
  window.addEventListener('keydown', closePopUpEsc);  
}

function editProfile (evt) {
  evt.preventDefault();
  originalNameOfProfile.textContent = nameOfProfile.value;
  originalDescriptionOfProfile.textContent = descriptionOfProfile.value;
  closePopUp(evt);
}

function openNewCardPopUp (evt) {
  //console.log('Открываю попап для добавления карточки.');
  newCardPopUp.classList.add('popup_is-opened');
  newCardPopUp.querySelector('.popup__close').addEventListener('click', closePopUp);
  newCardForm.addEventListener('submit', addNewCard);
  document.addEventListener('mousedown', closePopUpOverlay);
  window.addEventListener('keydown', closePopUpEsc);
}

function addNewCard (evt) {
  evt.preventDefault();  
  const newPlaceName = newCardForm.elements['place-name'];
  const newPlaceLink = newCardForm.elements['link'];
  const cardElement = createCardwTitleNLink(newPlaceName.value, newPlaceLink.value ,deleteCard);
  placesListContainer.append(cardElement);
  closePopUp(evt);
}

function openImagePopUp (evt) {
  //console.log('Открываю попап с картинкой.');
  imagePopUp.classList.add('popup_is-opened');
  imagePopUp.querySelector('.popup__close').addEventListener('click', closePopUp);
  const imgLink = evt.target.getAttribute('src');
  const imgTitle = evt.target.closest('.places__item').querySelector('.card__title').textContent;
  imagePopUp.querySelector('.popup__image').setAttribute('src', imgLink);
  imagePopUp.querySelector('.popup__image').setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + imgTitle);
  imagePopUp.querySelector('.popup__caption').textContent = imgTitle;
  document.addEventListener('mousedown', closePopUpOverlay);
  window.addEventListener('keydown', closePopUpEsc);
}

function closePopUpEsc (evt) {
  if (evt.key === 'Escape') {
    //console.log('Нажата кнопка Escape');
    closePopUp(evt);
    window.removeEventListener('keydown', closePopUpEsc);
  }
}

function closePopUpOverlay (evt) {
  if ((document.querySelector('.popup_is-opened')) && !(evt.target.closest('.popup__content'))) {
    //console.log('Нажат оверлей');
    closePopUp(evt);
    document.removeEventListener('mousedown', closePopUpOverlay);
  };
}

function closePopUp (evt) {
  //console.log('Запускаю функцию закрытия попапа.')
  if (document.querySelector('.popup_is-opened')) {
    //console.log('Закрываю попап.')
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  } else {
    //console.log('Холостое закрытие.')
  }
  //evt.target.closest('.popup').classList.add('popup_is-animated');
}





//* Исполенение функций
initialSetUp()


