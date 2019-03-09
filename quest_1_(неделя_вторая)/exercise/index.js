module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 * 
 * Коллекцию можно создать двумя способами: через конструктор Collection или через метод Collection.from().

    Через конструктор создается пустая коллекция.
 */
function Collection() {
    this.arrayOfCollection = [];
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.arrayOfCollection;
};
Collection.prototype.append = function(value, isFrom) { // Добавить значение
    if (value instanceof Collection) {
        for (let i = 0, len = value.count(); i < len; i++) {
            this.arrayOfCollection.push(value.arrayOfCollection[i]);
       }
    } else {
        if(value instanceof Array){
            for (let i = 0, len = value.length; i < len; i++) {
                this.arrayOfCollection.push(value[i]);
            }
            return this;
        }
        else {
            this.arrayOfCollection.push(value); 
        }
    
    } 
};
Collection.prototype.count = function(){
    return this.arrayOfCollection.length;
};
Collection.prototype.at = function(index){
   if ( this.compareValue(index) == true) {
       index--;
       return this.arrayOfCollection[index];
   } else {
       return null;
   }
};
Collection.prototype.removeAt = function(index){
    if (this.compareValue(index) == true) {
     index--;
     this.arrayOfCollection.splice(index,1);
     return true;
    } else {
      return false;
    } 
}
Collection.prototype.compareValue = function(index){
    if (index > 0 && index <= this.arrayOfCollection.length) {
        return true;
    } else {
        return false;  
    }
}
// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (array) {
    arrayOfCollection = new Collection();
    arrayOfCollection = arrayOfCollection.append(array);
    return arrayOfCollection;
}

