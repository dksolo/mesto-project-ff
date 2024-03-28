//Общие функции для модальных окон

function openPopup(popup) {
    //console.log('Открываю попап.');
    //console.log(popup);
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', closePopUpEsc); 
}

function closePopUp(evt) {
    const openedPopup = document.querySelector('.popup_is-opened')
    //console.log('Закрываю попап.');
    openedPopup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closePopUpEsc);
} 

function closePopUpEsc (evt) {
  if (evt.key === 'Escape') {
    //console.log('Нажата кнопка Escape');
    closePopUp(evt);
  }
}

export { openPopup, closePopUp, closePopUpEsc }