import { apiConfig, deleteMyCard, sendLikeCard } from './api.js';

//Здесь лежит универсальный код для карточек 
//(без задействования попапов, функций открытия/закрытия). 
//Только колбэки универсальные, приходящие в вызов функции создания карточки

function createCardObject (cardTitle, cardLink, userInfo) {
  //Функция создает объект для карточки
  const cardObject = {
    name: `${cardTitle}`,
    link: `${cardLink}`,
    likes: [],
    owner: userInfo
  }
  //console.log('Created cardObject:')
  //console.log(cardObject)
  return cardObject
}

function createNewCard(cardObject, userInfo, deleteCard, clickLikeCard, openImgPopUp) {
  console.log(cardObject)

  //Функция добавления карточки при помощи объекта

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  //Разбиваем объект на константы

  const cardLink = cardObject.link; //Ссылка на картинку карточки
  const cardTitle = cardObject.name; //Название карточки
  const cardID = cardObject._id; //ID карточки. НЕ ПУТАТЬ С ID ВЛАДЕЛЬЦА КАРТОЧКИ
  const cardLikeArray = cardObject.likes;  //Список лайкнувших карточку
  const cardLikesCount = cardLikeArray.length; // Количество лайкнувших карточку
  const cardOwnerID = cardObject.owner._id; // ID владельца карточки

  //Вытаскиваем информацию о нынешнем пользователе

  const currentUserID = userInfo._id

  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + cardTitle);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  console.log(`Card owner ID is : ${cardOwnerID} \nCurrent user ID is: ${currentUserID}`)
  if (cardOwnerID == currentUserID) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
      deleteCard(evt, cardID);
    });
  } else {
    cardDeleteBtn.remove(); 
  };
  refreshLikes(cardObject, cardLikeCounter, cardLikeBtn, userInfo)
  cardLikeBtn.addEventListener('click', (evt) => {
    clickLikeCard(evt, cardObject, cardLikeCounter, cardLikeBtn, userInfo)
  }); 
  cardImage.addEventListener('click', () => openImgPopUp(cardTitle, cardLink));
  return cardElement;
}

function deleteCard (evt, cardID) {
  //функция удаления карточки
  deleteMyCard(cardID, apiConfig).then(() => 
  {evt.target.closest('.card').remove()})
  .catch((err) => {
    console.log('При удалении карточки произошла ошибка. \nОшибка: ', err);
  }) 
}

function clickLikeCard (evt, cardObject, cardLikeCounter, cardLikeBtn, userInfo) {
  const cardID = cardObject._id;

  const cardLikeArray = cardObject.likes;  //Список лайкнувших карточку  
  const cardLikeMethod = isCardLikeMethodDeleteOrPut(cardLikeArray, userInfo, cardLikeBtn);

  sendLikeCard(apiConfig, cardID, cardLikeMethod)
  .then(res => {
    refreshLikes(res, cardLikeCounter, cardLikeBtn, userInfo);
  })
  .catch((err) => {
    console.log('При лайке карточки произошла ошибка. \nОшибка: ', err);
  })
}

function isCardLikeMethodDeleteOrPut (cardLikeArray, userInfo, cardLikeBtn) {
  if (cardLikeBtn.classList.contains('card__like-button_is-active')) {
    //console.log('DELETE')
    return 'DELETE'
  } else {
    //console.log(`PUT`)
    return 'PUT'
  }
}

function refreshLikes(cardObject, cardLikeCounter, cardLikeBtn, userInfo)  {
  const currentUserID = userInfo._id;
  cardLikeBtn.classList.remove('card__like-button_is-active');

  const cardLikeArray = cardObject.likes;  //Список лайкнувших карточку
  const cardLikesCount = cardLikeArray.length; // Количество лайкнувших карточку
  cardLikeCounter.textContent = cardLikesCount; //Выставляем лайки
  cardLikeArray.forEach( (liker) => {
    //Функция выставления лайка
    if (liker._id == currentUserID) {
      cardLikeBtn.classList.add('card__like-button_is-active');
    }
  }) 
}

export { createNewCard, deleteCard, clickLikeCard, createCardObject }