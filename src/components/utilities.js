//Вспомагательный код

//Загрузка: 
function renderLoadingBtnText(isLoading, btn, loadingText) {
    if (isLoading) {
        btn.textContent = loadingText;
    } else {
        btn.textContent = 'Сохранить';
    }
}


export { renderLoadingBtnText } 
// index.js строчка для импорта: import { renderLoadingBtnText } from  './components/utilities.js';