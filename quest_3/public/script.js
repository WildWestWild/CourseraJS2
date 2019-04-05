"use strict";

function checkForRegExp(str, regExp) {
  if (str.search(regExp) != -1) {
    return true;
  } else {
    return false;
  }
}

function validateForm(object) {
  object.checkInput = function(element) {
    // Проверка input
    console.log(element);
    if (element.tagName !== "INPUT") {
      element = element.target;
    }
    switch (element.name) {
      case "name":
        if (checkForRegExp(element.value, /[a-zа-я]/g)) {
          console.log("profile-name is true");
          return this;
        }
        break;
      case "age":
        if (
          checkForRegExp(element.value, /\d+/) &&
          Number(element.value) >= Number(element.dataset.validatorMin) &&
          Number(element.value) <= Number(element.dataset.validatorMax)
        ) {
          console.log("profile-age is true");
          return this;
        }
        break;
      case "phone":
        if (checkForRegExp(element.value, element.dataset.validatorPattern)) {
          console.log("profile-phone is true");
          return this;
        }
        break;
      case "number":
        if (checkForRegExp(element.value, /\d+/)) {
          console.log("profile-name is true");
          return this;
        }
        break;
      default:
        return false;
    }
    if (element.value == "" && element.name != "name") {
      console.log(element.value, "is true");
      return this;
    }
    element.classList.add(this.inputErrorClass);
    return this; // Есть ошибки
  };
  object.deleteClass = function(event) {
    // Если навели фокус на элемент удалим класс с ошибкой
    let element = event.target;
    if (element.classList.contains(this.inputErrorClass)) {
      element.classList.remove(this.inputErrorClass);
      console.log(this.inputErrorClass);
      console.log(" is deleted");
      return true;
    }
    return true;
  };
  object.checkSubmit = function(event) {
    //Не оправляем форму, проверяем))
    event.preventDefault();
    //Проверить все элементы
    if (this.goToAllElements(event)) {
      /*
  Если все хорошо - 
  1. Удалить (если есть) formInvalidClass
  2. Добавить formValidClass
  */

      event.classList.add(this.formValidClass);
    } else {
      //Если есть повесить класс о неправильной работе формы form__error-msg
      deleteClass(event, this.formValidClass);
      event.classList.add(this.formInvalidClass);
    }
  };
  object.goToAllElements = function(form) {
    let elements = form.target.getElementsByTagName("input");
    for (let i = 0, len = elements.length; i < len; i++) {
      if (elements[i].hasAttribute("name")) {
        if (!this.checkInput(elements[i])) {
          return false;
        }
      }
    }
    return true;
  };
  function createEventsForm(form, object) {
    form.addEventListener("focus", deleteClass, true);
    form.addEventListener("blur", checkInput, true);
    form.addEventListener("submit", checkSubmit);
  };
  // Получим данные с формы
  var form = document.getElementById(object.formId);
  console.log(form);
  createEventsForm(form, object);
}
