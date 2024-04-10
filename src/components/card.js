import { closePopUpEsc} from './modal.js';
import { openImgPopUp, deleteMyCard } from '../index.js';

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
  //console.log(`Delete: ${cardID}`)
  deleteMyCard(cardID);
  evt.target.closest('.card').remove();
}

function clickLikeCard (evt, cardObject, cardLikeCounter, cardLikeBtn, userInfo) {
  //console.log('Starting to like a card...')
  const cardID = cardObject._id;
  const currentUserID = userInfo._id;

  let cardLikeArray = cardObject.likes;  //Список лайкнувших карточку  
  let cardLikeMethod = isCardLikeMethodDeleteOrPut(cardLikeArray, userInfo, cardLikeBtn);
  
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardID}`, {
        method: `${cardLikeMethod}`,
        headers: {
          authorization: '54884444-3c55-4956-a503-098c8057432d',
          'Content-Type': 'application/json'
        }
      })
        .then( (res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(res => {
          //console.log(`Liked or unliked ${res.name}`);
          refreshLikes(res, cardLikeCounter, cardLikeBtn, userInfo);
        })
        .catch((err) => {
          console.log('При загрузке карточки произошла ошибка. \nОшибка: ', err);
        })
}

function isCardLikeMethodDeleteOrPut (cardLikeArray, userInfo, cardLikeBtn) {
  if (cardLikeBtn.classList.contains('card__like-button_is-active')) {
    //console.log('DELETE')
    return 'DELETE'
  } else {
    console.log(`PUT`)
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