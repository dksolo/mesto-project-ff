// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const contentContainer = document.querySelector('.content');
const placesListContainer = contentContainer.querySelector('.places__list');

//* Здесь я создаю функцию, которая считывает массив и затем элемент за элементом массива 
//* Отображает карточки.

function initialSetUp() {
    //Функция начала загрузки карточик
    console.log('Начинаю первоначальную загрузку карточек...')
    for (let i = 0; i < initialCards.length; i++) {
        const cardsName = initialCards[i].name;
        const cardsLink = initialCards[i].link;
        const cardElement = createCardwTitleNLink(cardsName, cardsLink);
        placesListContainer.append(cardElement);
    }
    console.log('Загрузка карточек завершена!')


}

function createCardwTitleNLink(cardTitle, cardLink) {
    //Фнукция добавления карточки по имени и ссылке
    console.log('Добавляю: '+ cardTitle);
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);     

    cardElement.querySelector('.card__image').setAttribute('src', cardLink);
    cardElement.querySelector('.card__image').setAttribute('alt', 'Красивая картинка карточки. На картинке - ' + cardTitle);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        console.log('Кнопка удаления нажата на ' + cardTitle);
        deleteCard(evt);
    });
    return cardElement;
}

function deleteCard (evt) {
    //функция удаления карточки
    evt.target.closest('.card').remove()
}

//* Исполенение функций

initialSetUp()


