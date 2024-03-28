import './pages/index.css';
import { initialCards }  from './scripts/cards.js';
import { createCardwTitleNLink, deleteCard, clickLikeCard, openImgPopUp } from './components/card.js';
import { openPopup, closePopUp } from './components/modal.js';

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
        const cardElement = createCardwTitleNLink(cardsName, cardsLink, deleteCard, clickLikeCard, openImgPopUp);
        placesListContainer.append(cardElement);
    }
    //console.log('Загрузка карточек завершена!');
    //Вешаем открытие попапов
    profileEditButton.addEventListener('click', openEditPopUp);
    newCardButton.addEventListener('click', openNewCardPopUp);
    //Вешаем закрытие попапов на кнопку крестик
    document.querySelectorAll('.popup__close').forEach((ppupX) => ppupX.addEventListener('click', closePopUp));
    document.querySelectorAll('.popup').forEach((ppup) => ppup.addEventListener('mousedown', handleOverlay));
    //Вешаем закрытие попапов на форму
    newCardForm.addEventListener('submit', addNewCard);
    profileEditForm.addEventListener('submit', editProfile);
}

function handleOverlay (evt) {
  //Функция закрытия при нажатии на "Оверлэй"
  if ((document.querySelector('.popup_is-opened')) && !(evt.target.closest('.popup__content'))) {
    closePopUp(evt);
  };
}

//Хардкод под модальные окна

function openNewCardPopUp (evt) {
  console.log('Открываю попап для добавления карточки.');
  openPopup(newCardPopUp);
}

function addNewCard (evt) {
    evt.preventDefault();  
    const newPlaceName = newCardForm.elements['place-name'];
    const newPlaceLink = newCardForm.elements['link'];
    const cardElement = createCardwTitleNLink(newPlaceName.value, newPlaceLink.value ,deleteCard, clickLikeCard, openImgPopUp);
    placesListContainer.prepend(cardElement); //Добавляем карточку в начало
    newPlaceName.value = ''; //Очищаем инпуты
    newPlaceLink.value = '';
    closePopUp(evt);
  }

function openEditPopUp (evt) {
  //console.log('Открываю попап для редактирования профиля.');
  nameOfProfile.value = originalNameOfProfile.textContent
  descriptionOfProfile.value = originalDescriptionOfProfile.textContent
  openPopup(profileEditPopUp)
}

function editProfile (evt) {
  evt.preventDefault();
  originalNameOfProfile.textContent = nameOfProfile.value;
  originalDescriptionOfProfile.textContent = descriptionOfProfile.value;
  closePopUp(evt);
}

initialSetUp()