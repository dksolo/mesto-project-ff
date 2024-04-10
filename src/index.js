import './pages/index.css';
import { defaultErrCards }  from './scripts/cards.js';
import { createNewCard, deleteCard, clickLikeCard, createCardObject } from './components/card.js';
import { openPopup, closePopUp, closePopUpEsc, handleOverlay } from './components/modal.js';
import { enableValidation, validationConfig } from './components/validation.js';
import { getUserInfo, getCards,  patchEditedProfile, patchProfileAvatar, renderLoadingProfile, renderLoadingCard, postNewCard, deleteMyCard  } from './components/api.js';

//Этот файл был перенесен из папки scripts

const contentContainer = document.querySelector('.content');
const placesListContainer = contentContainer.querySelector('.places__list');
//Кнопки
const profileEditButton = contentContainer.querySelector('.profile__edit-button');
const newCardButton = contentContainer.querySelector('.profile__add-button');
const xCloseButtons = document.querySelectorAll('.popup__close');
const editAvatarButton = document.querySelector('.profile__image-edit-btn');
//Попапы
const profileEditPopUp = document.querySelector('.popup_type_edit');
const newCardPopUp = document.querySelector('.popup_type_new-card');

const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpImage = imagePopUp.querySelector('.popup__image');
const imagePopUpCaption = imagePopUp.querySelector('.popup__caption');

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');

//Формы
const profileEditForm = document.forms["edit-profile"];
const nameOfProfile = profileEditForm.elements['name'];
const descriptionOfProfile = profileEditForm.elements['description'];
const originalNameOfProfile = document.querySelector('.profile__title')
const originalDescriptionOfProfile = document.querySelector('.profile__description')

const originalAvatarOfProfile = document.querySelector('.profile__image')
const editAvatarForm = document.forms['edit-avatar'];
const newAvatar = editAvatarForm.elements['avatar-link'];

const newCardForm = document.forms["new-place"];



//* Здесь я создаю функцию, которая считывает массив и затем элемент за элементом массива 
//* Отображает карточки.
async function initialSetUp() {
  //Делаю запрос о профиле пользователя
  const userInfo = await getUserInfo();

  //Делаю запрос о карточках на сервере
  const getCardsPromise = await getCards(userInfo, defaultErrCards)

  Promise.all([userInfo, getCardsPromise]).then(() => {  
    profileEditButton.addEventListener('click', openEditPopUp);       
    editAvatarButton.addEventListener('click', openEditAvatarPopup)
    newCardButton.addEventListener('click', openNewCardPopUp);
    //Вешаем закрытие попапов на кнопку крестик
    xCloseButtons.forEach((ppupX) => {
      const popup2close = ppupX.closest('.popup')
      ppupX.addEventListener('click', () => closePopUp(popup2close));
    });
    document.querySelectorAll('.popup').forEach((ppup) => ppup.addEventListener('mousedown', handleOverlay));
    //Вешаем закрытие попапов на форму
    newCardForm.addEventListener('submit', (evt) => addNewCard(evt, userInfo));
    profileEditForm.addEventListener('submit', editProfile); 
    editAvatarForm.addEventListener('submit', editAvatar);
  })
}

//Хардкод под модальные окна

function openNewCardPopUp (evt) {
  //console.log('Открываю попап для добавления карточки.');
  openPopup(newCardPopUp);
}

function addNewCard (evt, userInfo) {
    evt.preventDefault();  
    const newPlaceName = newCardForm.elements['place-name'];
    const newPlaceLink = newCardForm.elements['link'];
    //console.log(newCardForm.elements['place-name'])
    //Add a function to assemble JS Object
    const cardObject = createCardObject(newPlaceName.value, newPlaceLink.value, userInfo);
    // createNewCard(cardObject, userInfo, deleteCard, clickLikeCard, openImgPopUp)
    const cardElement = createNewCard(cardObject, userInfo, deleteCard, clickLikeCard, openImgPopUp);
    placesListContainer.prepend(cardElement); //Добавляем карточку в начало
    const newCardBtn = evt.target.querySelector('.button')
    postNewCard (newPlaceName.value, newPlaceLink.value, newCardBtn);
    newPlaceName.value = ''; //Очищаем инпуты
    newPlaceLink.value = '';
    clearValidation(newCardForm, validationConfig); //Очищаем ошибки
    closePopUp(newCardPopUp);
  }

function openEditAvatarPopup (evt) {
  clearValidation(editAvatarForm, validationConfig);
  //console.log('Открываю попап для редактирования профиля.');
  newAvatar.value = originalAvatarOfProfile.style['background-image'].slice(4, -1).replace(/"/g, "");
  openPopup(editAvatarPopup);
}

function openEditPopUp (evt) {
  clearValidation(profileEditForm, validationConfig);
  //console.log('Открываю попап для редактирования профиля.');
  nameOfProfile.value = originalNameOfProfile.textContent;
  descriptionOfProfile.value = originalDescriptionOfProfile.textContent;
  openPopup(profileEditPopUp);
}

function openImgPopUp (imgTitle, imgLink) {
  //console.log('Открываю попап для картинки.');
  imagePopUpImage.setAttribute('src', imgLink);
  imagePopUpImage.setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + imgTitle);
  imagePopUpCaption.textContent = imgTitle;
  //console.log('Открываю попап.');
  openPopup(imagePopUp)
  //console.log('Происходит открытие картинки.')
}

function editProfile (evt) {
  evt.preventDefault();
  originalNameOfProfile.textContent = nameOfProfile.value;
  originalDescriptionOfProfile.textContent = descriptionOfProfile.value;
  const profileBtn = evt.target.querySelector('.button')
  patchEditedProfile(nameOfProfile.value, descriptionOfProfile.value, profileBtn)
  closePopUp(profileEditPopUp);
}

function editAvatar (evt) {
  evt.preventDefault();
  const newAvatarURL = newAvatar.value
  originalAvatarOfProfile.style = `background-image: url(${newAvatarURL});`;
  const avatarBtn = evt.target.querySelector('.button')
  patchProfileAvatar(newAvatarURL, avatarBtn)
  closePopUp(editAvatarPopup);
}

//ФУНКЦИИ ВАЛИДАЦИИ

function  clearValidation (form, validationConfig) {
  //console.log('Запускаю очистку валидации для поля profileEditForm')
  const formInputs = form.querySelectorAll(validationConfig.inputSelector); // В каждом элементе 2 инпута!!! 
  formInputs.forEach((formInput) => {
    const formError = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(validationConfig.inputErrorClass);
    //console.log('Убрал класс popup__input_type_error');
    formError.classList.remove(validationConfig.errorClass);
    formError.textContent = '';
    //console.log('Должно пропасть сообщение об ошибке');
    });
}

enableValidation(validationConfig) 


function renderGetCards(cardsJSON, userInfo) {
  for (let i = 0; i < cardsJSON.length; i++) {
      const cardElement = createNewCard(cardsJSON[i], userInfo, deleteCard, clickLikeCard, openImgPopUp);
      placesListContainer.append(cardElement);}
  }

initialSetUp()

export { openImgPopUp, deleteMyCard, placesListContainer, renderGetCards };