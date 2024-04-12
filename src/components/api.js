// в этом файле лежат функции API для запросов на сервер с проверкой ответа

const apiConfig = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-10',
    headers: {
        authorization: '54884444-3c55-4956-a503-098c8057432d',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        console.log('Response is OK.')
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const makeRequest = (url, options) => {
    //Функция для запросов
    console.log(`Sending a request to ${url}. Options are: ${JSON.stringify(options)}`);
    return fetch(url, options).then((res) => {return checkResponse(res)})
}

const getUserInfo = (apiConfig) => {
    const userInfoURL = `${apiConfig.baseURL}/users/me`;
    const getCardsOptions = {'headers': apiConfig.headers}

    return makeRequest(userInfoURL, getCardsOptions)
}
  
//async function getCards(userInfo, defaultErrCards) {
const getCards = (apiConfig) => {
//Функция делает запрос на сервер и создает карточки. 
//В случае успеха карточки создаются с сервера
    const getCardsURL = `${apiConfig.baseURL}/cards`;
    const getCardsOptions = {'headers': apiConfig.headers}

    return makeRequest(getCardsURL, getCardsOptions)
}
  
//Профиль пользователя

const patchEditedProfile = (newName, newDescription, apiConfig) => {
    //Функция отправляет PATCH-запрос на сервер и 
    //Меняет имя и описание пользователя
    //console.log('Starting to edit profile...')
    const editProfileURL = `${apiConfig.baseURL}/users/me`;
    const editProfileOptions = {
        'method': 'PATCH',
        'headers': apiConfig.headers,
        'body': JSON.stringify({
        'name': newName,
        'about': newDescription
        })
    }

    return makeRequest(editProfileURL, editProfileOptions)
}
  
const patchProfileAvatar = (link, apiConfig) => {
//Функция отправляет PATCH-запрос на сервер и 
//Меняет аватар пользователя.

const editProfileAvatarURL = `${apiConfig.baseURL}/users/me/avatar`;
const editProfileAvatarOptions = {
    'method': 'PATCH',
    'headers': apiConfig.headers,
    'body': JSON.stringify({
    'avatar': link
    })
}

return makeRequest(editProfileAvatarURL, editProfileAvatarOptions)
}

//Создание новой карточки
const postNewCard = (newCardName, newCardLink, apiConfig) => {
    const postNewCardURL = `${apiConfig.baseURL}/cards`;
    const postNewCardOptions = {
        'method': 'POST',
        'headers': apiConfig.headers,
        'body': JSON.stringify({
            "name": newCardName,
            "link": newCardLink
        })
    }
    return makeRequest(postNewCardURL, postNewCardOptions)
}

//Like карточки 
const sendLikeCard = (apiConfig, cardID, cardLikeMethod) => {
    const postNewCardURL = `${apiConfig.baseURL}/cards/likes/${cardID}`;
    const postNewCardOptions = {
        'method': `${cardLikeMethod}`,
        'headers': apiConfig.headers
    }
    return makeRequest(postNewCardURL, postNewCardOptions)


    /*fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardID}`, {
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
          })*/

}
  
//Удаление карточки
const deleteMyCard = (cardID, apiConfig) => {
    const deleteMyCardURL = `${apiConfig.baseURL}/cards/${cardID}`;
    const deleteMyCardOptions = {
        'method': 'DELETE',
        'headers': apiConfig.headers
    }
    return makeRequest(deleteMyCardURL, deleteMyCardOptions)
}

export { getUserInfo, getCards, patchEditedProfile, patchProfileAvatar, postNewCard, deleteMyCard, apiConfig, sendLikeCard }