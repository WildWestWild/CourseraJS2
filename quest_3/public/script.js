"use strict";

function checkForRegExp(str, regExp) {
  if (str.search(regExp) != -1) {
    return true;
  } else {
    return false;
  }
}
function getForm(object){
  let form = document.getElementById(object.formId);
    form.formValidClass = object.formValidClass;
    form.formInvalidClass = object.formInvalidClass;
    form.inputErrorClass = object.inputErrorClass;
  return form;
}
function validateForm(object) {
  var checkInput = function checkInputFunction(element) {
    // Проверка input
    console.log(element);
    if (element.tagName !== "INPUT") {
      element = element.target;
    }
    switch (element.name) {
      case "name":
        if (checkForRegExp(element.value, /[a-zа-я]/g)) {
          console.log("profile-name is true");
          return true;
        }
        break;
      case "age":
        if (
          checkForRegExp(element.value, /\d+/) &&
          Number(element.value) >= Number(element.dataset.validatorMin) &&
          Number(element.value) <= Number(element.dataset.validatorMax)
        ) {
          console.log("profile-age is true");
          return true;
        }
        break;
      case "phone":
        if (checkForRegExp(element.value, element.dataset.validatorPattern)) {
          console.log("profile-phone is true");
          return true;
        }
        break;
      case "number":
        if (checkForRegExp(element.value, /\d+/)) {
          console.log("profile-name is true");
          return true;
        }
        break;
      default:
        return false;
    }
    if (element.value == "" && element.name != "name") {
      console.log(element.value, "is true");
      return true;
    }
    element.classList.add(this.inputErrorClass);
    return false; // Есть ошибки
  };
  var deleteClass = function(event, errorClass) {
    // Если навели фокус на элемент удалим класс с ошибкой
    let element = event.target;
    if (errorClass == undefined) {
      errorClass = this.inputErrorClass;
    }
    if (element.classList.contains(errorClass)) {
      element.classList.remove(errorClass);
      console.log(this);
      console.log(" is deleted");
    }
  };
  var checkSubmit = function(event) {
    //Не оправляем форму, проверяем))
    event.preventDefault();
    //Проверить все элементы
    if (goToAllElements(this)) {
      /*
  Если все хорошо - 
  1. Удалить (если есть) formInvalidClass
  2. Добавить formValidClass
  */
      deleteClass(event, this.formInvalidClass);
      this.classList.add(this.formValidClass);
    } else {
      //Если есть повесить класс о неправильной работе формы form__error-msg
      deleteClass(event, this.formValidClass);
      this.classList.add(this.formInvalidClass);
    }
  };
  var goToAllElements = function(form) {
    let elements = form.getElementsByTagName("input");
    for (let i = 0, len = elements.length; i < len; i++) {
      if (elements[i].hasAttribute("name")) {
        if (!checkInput.call(form, elements[i])) {
          return false;
        }
      }
    }
    return true;
  };

  function createEventsForm(form) {
    form.addEventListener("focus",deleteClass, true);
    form.addEventListener("blur", checkInput, true);
    form.addEventListener("submit", checkSubmit);
  };
  // Получим данные с формы
  let form = getForm(object);
  createEventsForm(form);
}
