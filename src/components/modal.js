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
  if (evt.key === 'Escape') {
    //console.log('Нажата кнопка Escape');
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopUp(openedPopup);
  }
}

function handleOverlay (evt) {
  //Функция закрытия при нажатии на "Оверлэй"
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("popup_is-opened")) {
    closePopUp(eventTarget);
  };
}

export { openPopup, closePopUp, closePopUpEsc, handleOverlay }