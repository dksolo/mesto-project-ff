import './pages/index.css';
import { createNewCard, deleteCard, clickLikeCard, createCardObject } from './components/card.js';
import { openPopup, closePopUp, closePopUpEsc, handleOverlay } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig, disableButton } from './components/validation.js';
import { getUserInfo, getCards, patchEditedProfile, patchProfileAvatar, postNewCard, apiConfig, sendLikeCard } from './components/api.js';
import { renderLoadingBtnText } from  './components/utilities.js';

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
  renderUserInfo(apiConfig)
  .then((userInfo) => {renderGetCards(userInfo, apiConfig);return userInfo})
  .then((userInfo) => {
    console.log('User Info')
    console.log(userInfo)
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
    .catch((err) => {
      console.log('При начальной настройке произошла ошибка. \nОшибка: ', err);
    }) 
  
}


//Код под прогрузку элементов

//Код под загрузку информации пользователя

async function renderUserInfo(apiConfig) {
  //Общая функция для загрузки и помещения элементов профиля на страницу
  //Принимает объект настройки API
  //Отдает объект с информацией пользователя 
  const userInfoLoading = {
    name: 'Загружаем...',
    about: 'Загружаем...',
    avatar: 'https://m.media-amazon.com/images/M/MV5BZDYwYzQxZWUtMDRmYS00ZDc0LTlhYWUtMGIzYjFkNDQ1ZmNlXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg'
  }
  console.log(apiConfig)
  placeUserInfo(userInfoLoading)
  return getUserInfo(apiConfig).then((userInfo) => {
    placeUserInfo(userInfo);
    return userInfo
    })
}

function placeUserInfo(userInfo) {
  //Функция использует userInfo для помещения элементов на страницу
  originalNameOfProfile.textContent = userInfo.name;
  originalDescriptionOfProfile.textContent = userInfo.about;
  originalAvatarOfProfile.style = `background-image: url(${userInfo.avatar});`;
}

//Код под загрузку карточек

const renderGetCards = (userInfo, apiConfig) => {
  console.log(userInfo)
  getCards(apiConfig)
  .then((cardsArray) => {
    for (let i = 0; i < cardsArray.length; i++) {
      const cardElement = createNewCard(cardsArray[i], userInfo, deleteCard, clickLikeCard, openImgPopUp);
      placesListContainer.append(cardElement);}
    return cardsArray
  })
  .catch((err) => {
      console.log('При загрузке карточек произошла ошибка. \nОшибка: ', err);
  })
}

//Хардкод под модальные окна

function openNewCardPopUp (evt) {
  clearValidation(newCardForm, validationConfig);
  disableButton(newCardForm, validationConfig)
  //console.log('Открываю попап для добавления карточки.');
  openPopup(newCardPopUp);
}

function addNewCard (evt, userInfo) {
    evt.preventDefault();  
    const newPlaceName = newCardForm.elements['place-name'];
    const newPlaceLink = newCardForm.elements['link'];
    const newCardBtn = evt.target.querySelector('.button');

    renderLoadingBtnText(true, newCardBtn, 'Создание...');

    postNewCard(newPlaceName.value, newPlaceLink.value, apiConfig).then((cardObject) => {
      const cardElement = createNewCard(cardObject, userInfo, deleteCard, clickLikeCard, openImgPopUp);
      return cardElement;
    })
    .then((cardElement)=>{
      placesListContainer.prepend(cardElement); //Добавляем карточку в начало
    }).then(() =>{ 
      newCardForm.reset()
      clearValidation(newCardForm, validationConfig); //Очищаем ошибки
    }).then(() => {
      closePopUp(newCardPopUp);
    })
    .finally(() => {
      renderLoadingBtnText(false, newCardBtn, 'Создание...');})
    .catch((err) => {
      console.log('При отправке карточки произошла ошибка. \nОшибка: ', err);
    })
  }

function openEditAvatarPopup (evt) {
  clearValidation(editAvatarForm, validationConfig);
  disableButton(editAvatarForm, validationConfig)
  //console.log('Открываю попап для редактирования автара.');
  newAvatar.value = originalAvatarOfProfile.style['background-image'].slice(4, -1).replace(/"/g, "");
  openPopup(editAvatarPopup);
}

function openEditPopUp (evt) {
  clearValidation(profileEditForm, validationConfig);
  disableButton(profileEditForm, validationConfig)
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

const editProfile = (evt) => {
  evt.preventDefault();
  const profileBtn = evt.target.querySelector('.button')
  //renderPatchEditedProfile(nameOfProfile.value, descriptionOfProfile.value, profileBtn)

  //Функция отправляет PATCH-запрос на сервер и 
  //Меняет имя и описание пользователя
  renderLoadingBtnText(true, profileBtn, 'Сохранение...')
  //console.log('Starting to edit profile...')
  patchEditedProfile(nameOfProfile.value, descriptionOfProfile.value, apiConfig).then(() => {
    originalNameOfProfile.textContent = nameOfProfile.value;
    originalDescriptionOfProfile.textContent = descriptionOfProfile.value;}
  )
  .then(
    closePopUp(profileEditPopUp)
  )
  .finally(
    () => renderLoadingBtnText(false, profileBtn, 'Сохранение...'))
  .catch((err) => {
    console.log('При изменении профиля произошла ошибка. \nОшибка: ', err);
  })
}

const editAvatar = (evt) => {
  evt.preventDefault();
  const newAvatarURL = newAvatar.value
  const avatarBtn = evt.target.querySelector('.button')
  renderLoadingBtnText(true, avatarBtn, 'Сохранение...')

  patchProfileAvatar(newAvatarURL, apiConfig).then(() => {
    originalAvatarOfProfile.style = `background-image: url(${newAvatarURL});`;
  }).then(() =>   {closePopUp(editAvatarPopup);})
    .finally(
      () => renderLoadingBtnText(false, avatarBtn, 'Сохранение...')) 
    .catch((err) => {
      console.log('При изменении аватара произошла ошибка. \nОшибка: ', err);
    }) 
}


enableValidation(validationConfig) 

initialSetUp()