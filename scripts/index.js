// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const contentContainer = document.querySelector('.content');
const placesListContainer = contentContainer.querySelector('.places__list');
const addButton = contentContainer.querySelector('.profile__add-button');
const resetButton = contentContainer.querySelector('.input__btn_action_reset');
const noSongsElement = contentContainer.querySelector('.no-songs');



//* Здесь я создаю функцию, которая считывает массив и затем элемент за элементом массива 
//* Отображает карточки.

function initialSetUp() {
    console.log('Начинаю первоначальную загрузку карточек...')
    for (let i = 0; i < initialCards.length; i++) {
        let cardsName = initialCards[i].name;
        let cardsLink = initialCards[i].link;
        addCardwTitleNLink(cardsName, cardsLink);
    }
    console.log('Загрузка карточек завершена!')


}

function addCardwTitleNLink(cardTitle, cardLink) {
    console.log('Добавляю: '+ cardTitle);
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
     

    cardElement.querySelector('.card__image').setAttribute('src', cardLink);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        //console.log(evt.target);
        console.log('Кнопка удаления нажата на ' + cardTitle);
        deleteCardwTitleNLink (cardTitle, cardLink)
    });
    //const deleteCardBtn = cardElement.querySelector('.card__delete-button');
    //deleteCardBtn.addEventListener('click',  deleteCardwTitleNLink(cardTitle, cardLink));
    placesListContainer.append(cardElement);

    return cardElement;
}

function deleteCardwTitleNLink (cardTitle, cardLink) {
    console.log('Ищу: ' + cardTitle);
    let errFlag = 0
    
    listOfExistingCards = placesListContainer.querySelectorAll('.card');

    for (let ii = 0; ii < listOfExistingCards.length; ii++) {
        const cardElementToDelete = listOfExistingCards[ii];
        if (cardTitle === listOfExistingCards[ii].querySelector('.card__title').textContent) {
            console.log('Удаляю: ' + cardTitle);
            listOfExistingCards[ii].remove();
            errFlag += 1;
            break;
        }
        else if ((errFlag === 0) && (ii === (listOfExistingCards.length-1))) {
            console.log('ОШИБКА! Кнопка нажата, ничего не удалено!');
        }
        else if ((errFlag === 1) && (ii === (listOfExistingCards.length-1))) {
            console.log('ОШИБКА! Карточка успешно удалена! Однако цикл продолжается. errFlag = ' + errFlag);
        }
        else {
            console.log('Кнопка нажата. Ищу...');
        }
        
    }
}

//* Исполенение функций

initialSetUp()

//* Поиск кнопок удаления 


