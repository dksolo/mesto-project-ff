//Общие функции для модальных окон

function openPopup(popup) {
    //console.log('Открываю попап.');
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', closePopUpEsc); 
}

function closePopUp(popup) {
    //console.log('Закрываю попап.');
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closePopUpEsc);
} 

function closePopUpEsc (evt) {
  const openedPopup = document.querySelector('.popup_is-opened')
  if (evt.key === 'Escape') {
    //console.log('Нажата кнопка Escape');
    closePopUp(openedPopup);
  }
}

function handleOverlay (evt) {
  //Функция закрытия при нажатии на "Оверлэй"
  //Поскольку в index.js event вешается на весь документ, то 
  //В этой функции идет проверка на наличие класса popup_is-opened и 
  //что это не сам контент попапа
  const eventTarget = evt.target;
  if ((eventTarget.classList.contains("popup_is-opened")) && !(evt.target.closest('.popup__content'))) {
    closePopUp(eventTarget);
  };
}

export { openPopup, closePopUp, closePopUpEsc, handleOverlay }