//НОВЫЕ

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_error_active'
}


function enableValidation (validationConfig) {
  //const formElements = document.querySelectorAll('.popup__form'); // таких 2
  const formElements = document.querySelectorAll(validationConfig.formSelector); // таких 2
  formElements.forEach((formElement) => {
    //const formInputs = formElement.querySelectorAll('.popup__input'); // В каждом элементе 2 инпута!!! 
    const formInputs = formElement.querySelectorAll(validationConfig.inputSelector); // В каждом элементе 2 инпута!!! 
    const inputList = Array.from(formInputs)
    
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      console.log('Event triggered! ')
    });
    //const buttonElement = formElement.querySelector('.form__submit');
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    
    //formInput.addEventListener('input', function (evt) {
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', function (evt) {
        // выведите validity в консоль   
        console.log(evt.target.validity.valid)
        //console.log(formInput.validity.valid) }) 
        //This is isValid function from the lessons 
        const formError = formElement.querySelector(`.${formInput.id}-error`);

        if (evt.target.validity.patternMismatch) {
            evt.target.setCustomValidity(evt.target.dataset.latinCyrillError); //For some reason this references the data-* attribute in html
          } else {
            evt.target.setCustomValidity("");
          }

        if (!evt.target.validity.valid) {
          // Если поле не проходит валидацию, покажем ошибку
          showInputError(formInput, formError, formInput.validationMessage);
        } else {
          // Если проходит, скроем
          hideInputError(formInput, formError);
        }
        toggleButtonState(inputList, buttonElement);
      })
    });

  })


  // Функция, которая добавляет класс с ошибкой
  const showInputError = (element, formError, errorMessage) => {
    element.classList.add('popup__input_type_error');
    console.log('Добавил класс popup__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
    console.log('Должно появиться сообщение об ошибке');
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (element, formError) => {
    element.classList.remove('popup__input_type_error');
    console.log('Убрал класс popup__input_type_error');
    formError.classList.remove('popup__input_type_error_active');
    formError.textContent = '';
    console.log('Должно пропасть сообщение об ошибке');
  };

  //Функция переключения кнопки Submit

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  function toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add('popup__submit_inactive');
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove('popup__submit_inactive');
    }

  }

}

export { enableValidation, validationConfig }