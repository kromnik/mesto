const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__userinfo",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__userinfo_type_error",
  errorClass: 'popup__form-input-error_visible',
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  // Находим спан с ошибкой по id инпута
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // у инпута удаляем ненужный класс( убираем красное подчеркивание)
  inputElement.classList.remove(inputErrorClass);
  // у спана удаляем ненужный класс (делаем его снова невидимым)
  errorElement.classList.remove(errorClass);
  // у спана обнуляем значение самого текстового поля 
  errorElement.textContent = '';
};
const resetFormValidation = (formElement, {inputSelector, ...rest}) => {
  // Находим все поля внутри формы, сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Обойдём все элементы полученного массива
  inputList.forEach((inputElement) => {
    // для каждого элемента вызываем функцию hideInputError
    hideInputError(formElement, inputElement, rest);
  });
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    // Показ ошибки если поле не проходит валидацию
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    // Скрыть ошибку если поле проходит валидацию
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector}) => {
  // Находим все поля внутри формы, сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, validationConfig);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
  // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Активирование кнопок Submit в попапах

const enableButtonSubmit = (buttonElement) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.disabled = false;
}

// Дезактивирование кнопок Submit в попапах

const disableButtonSubmit = (buttonElement) => {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}




// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    disableButtonSubmit(buttonElement, inactiveButtonClass);
  } else {
    // иначе сделать кнопку активной
    enableButtonSubmit(buttonElement, inactiveButtonClass);
  }
}; 

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation(validationConfig);