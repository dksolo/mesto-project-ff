import { createNewCard, deleteCard, clickLikeCard, createCardObject } from './card.js';
import { openImgPopUp, placesListContainer, renderGetCards } from '../index.js';
// в этом файле лежат функции API

const originalNameOfProfile = document.querySelector('.profile__title')
const originalDescriptionOfProfile = document.querySelector('.profile__description')

const originalAvatarOfProfile = document.querySelector('.profile__image')

async function getUserInfo() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
      headers: {
        authorization: '54884444-3c55-4956-a503-098c8057432d'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      originalNameOfProfile.textContent = result.name;
      originalDescriptionOfProfile.textContent = result.about;
      originalAvatarOfProfile.style = `background-image: url(${result.avatar});`;
      const userInfo = result;
      return userInfo;
    })
    .catch((err) => {   
      console.log('При загрузке профиля произошла ошибка. \nОшибка: ', err);
    })
  }


  
async function getCards(userInfo, defaultErrCards) {
//Функция делает запрос на сервер и создает карточки. 
//В случае успеха карточки создаются с сервера
//в случае ошибки загружаются из файла cards.js
fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
    authorization: '54884444-3c55-4956-a503-098c8057432d'
    }
})
.then(res => {
    if (res.ok) {
    return res.json();
    }
})
.then(res => {
    //console.log(res);
    renderGetCards(res, userInfo)
})
.catch((err) => {
    console.log('При загрузке карточек произошла ошибка. \nОшибка: ', err);
    renderGetCards(defaultErrCards, userInfo)
})
}
/* Moved to index
function renderGetCards(cardsJSON, userInfo) {
for (let i = 0; i < cardsJSON.length; i++) {
    const cardElement = createNewCard(cardsJSON[i], userInfo, deleteCard, clickLikeCard, openImgPopUp);
    placesListContainer.append(cardElement);}
}*/
  
  
//Профиль пользователя
function patchEditedProfile(newName, newDescription, btn) {
//Функция отправляет PATCH-запрос на сервер и 
//Меняет имя и описание пользователя
renderLoadingProfile(true, btn)
//console.log('Starting to edit profile...')
fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    method: 'PATCH',
    headers: {
    authorization: '54884444-3c55-4956-a503-098c8057432d',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: newName,
    about: newDescription
    })
})
.then(res => {
    if (res.ok) {
    return res.json();
    }
})
.finally( () => renderLoadingProfile(false, btn)); 
}
  
function patchProfileAvatar(link, btn) {
//Функция отправляет PATCH-запрос на сервер и 
//Меняет аватар пользователя.
renderLoadingProfile(true, btn)
fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar', {
    method: 'PATCH',
    headers: {
    authorization: '54884444-3c55-4956-a503-098c8057432d',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    avatar: link
    })
})
.then(res => {
    if (res.ok) {
    return res.json();
    }
})
.finally( () => renderLoadingProfile(false, btn)); 
}

//Загрузка: 
function renderLoadingProfile(isLoading, btn) {
if (isLoading) {
    btn.textContent = 'Сохранение...';
} else {
    btn.textContent = 'Сохранить';
}
}

function renderLoadingCard(isLoading, btn) {
if (isLoading) {
    btn.textContent = 'Создание...';
} else {
    btn.textContent = 'Сохранить';
}
}

//Создание новой карточки
function postNewCard (newCardName, newCardLink, btn) {
renderLoadingCard(true, btn)
//console.log(`Posting: \nNew Card Name: ${newCardName} \nnewCardLink: ${newCardLink}`)
fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
method: 'POST',
headers: {
    authorization: '54884444-3c55-4956-a503-098c8057432d',
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    "name": newCardName,
    "link": newCardLink
})
})
.then(res => {
if (res.ok) {
    return res.json();
}
})
.finally( () => renderLoadingCard(false, btn));
}
  
//Удаление карточки
function deleteMyCard (cardID) {
//console.log(`Deleting: \nMy card ID: ${cardID}`);
return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${cardID}`, {
method: 'DELETE',
headers: {
    authorization: '54884444-3c55-4956-a503-098c8057432d',
    'Content-Type': 'application/json'
}
}); 
}

export { getUserInfo, getCards, patchEditedProfile, patchProfileAvatar, renderLoadingProfile, renderLoadingCard, postNewCard, deleteMyCard }