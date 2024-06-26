 //Функции валидации инпута

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_error_active'
}


function enableValidation (validationConfig) {
  const formElements = document.querySelectorAll(validationConfig.formSelector);
  formElements.forEach((formElement) => {
    const formInputs = formElement.querySelectorAll(validationConfig.inputSelector); 
    const inputList = Array.from(formInputs)
    
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      console.log('Event triggered! ')
    });
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement, validationConfig);
    
    //formInput.addEventListener('input', function (evt) {
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', function (evt) {
        console.log(evt.target.validity.valid)
        const formError = formElement.querySelector(`.${formInput.id}-error`);
        if (evt.target.validity.patternMismatch) {
            evt.target.setCustomValidity(evt.target.dataset.latinCyrillError); 
          } else {
            evt.target.setCustomValidity("");
          }

        if (!evt.target.validity.valid) {
          // Если поле не проходит валидацию, покажем ошибку
          showInputError(formInput, formError, formInput.validationMessage, validationConfig);
          toggleButtonState(inputList, buttonElement, validationConfig);
        } else {
          // Если проходит, скроем
          hideInputError(formInput, formError, validationConfig);
        }
        toggleButtonState(inputList, buttonElement, validationConfig);
      })
    });
  })

  const showInputError = (element, formError, errorMessage, validationConfig) => {
    element.classList.add(validationConfig.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(validationConfig.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (element, formError, validationConfig) => {
    element.classList.remove(validationConfig.inputErrorClass);
    console.log('Убрал класс popup__input_type_error');
    formError.classList.remove(validationConfig.errorClass);
    formError.textContent = '';
    console.log('Должно пропасть сообщение об ошибке');
  };

  //Функция переключения кнопки Submit

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  function toggleButtonState(inputList, buttonElement, validationConfig) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  }
}

function disableButton(formElement, validationConfig) {
  //Эта функция должна быть использована при открытии попапа
  //Она отключает кнопку до проверки валидацией.
  //const formElement = document.querySelectorAll(validationConfig.formSelector);
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}


function  clearValidation (form, validationConfig) {
  const formInputs = form.querySelectorAll(validationConfig.inputSelector);
  formInputs.forEach((formInput) => {
    const formError = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(validationConfig.inputErrorClass);
    formError.classList.remove(validationConfig.errorClass);
    formError.textContent = '';
    });
}


export { enableValidation, clearValidation, validationConfig, disableButton }