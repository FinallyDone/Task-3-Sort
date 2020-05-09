//////////////////////////////////// Global elem //////////////////////////////////////

/*                  //// Classes ////                  */

// Класс для отображения эллемента массива
class star {
    constructor(value, id) {
        this.value = value != null ? value : 0;
        this.id = id != null ? id : 0;
    }

    getValue() {
        return this.value;
    }

    getX() {
        return this.id;
    }

    setValue(value) {
        this.value = value;
    }

    setId(id) {
        this.id = id;
    }
}

/*                  //// Elements ////                  */

/* Timer для анимации */
var Timer;
// Какая частота обновлений кадров для рендера поля
var howMuchMilSecondForRendering = 50;
/*
    Проверка на изменения в страницы
    для меньшей загрузки на страницу
*/
var ChangesOnPage = false;

/* Массив звезд (элементов массива) */
var stars = [];

// Мин. размер значения массива
var minValueSize = 1;
// Макс. размер значения массива
var maxValueSize = 400;
// Мин. размер массива
var minArraySize = 6;
// Макс. размер массива
var maxArraySize = 120;

/* "canvas" */
var ctx;
/* Путь к картинкам */
var srcImgs = "material/png/";

/* Все картинки */
// Картинка звездочки
var imgStar = new Image();
// Картинка фона для отображения сортировки
var imgBackgroundSorting = new Image();

/* Размер всех Картинок */
// Размерз вездочки
var imgStarWidthMin = 32;
var imgStarWidthMax = 60;
var imgStarHeightMin = 32;
var imgStarHeightMax = 60;
// Размер фона для отображения сортировки
var imgBackgroundSortingWidth = 700;
var imgBackgroundSortingHeight = 550;

/* Положение всех Картинок */
// Позиция фона дисплея сортировок
var imgBackgroundSortingPositionX = 0;
var imgBackgroundSortingPositionY = 0;

//////////////////////////////////// Functions ////////////////////////////////////////

/* Рендер поля с массивом для отображения сортировки */
function renderSortingField() {
    if (ChangesOnPage) {
        let positionX;
        let positionY;
        let canvas = document.querySelector(".display-sort");
        // Рисуем фон
        ctx.drawImage(imgBackgroundSorting, imgBackgroundSortingPositionX, imgBackgroundSortingPositionY, imgBackgroundSortingWidth, imgBackgroundSortingHeight);

        // Находим угол 
        let alp = 2 / stars.length * 3.14;
        // Определяем размер звезд
        let starWidth, starHeight;
        if (stars.length >= 16) {
            starWidth = imgStarWidthMin;
            starHeight = imgStarHeightMin;
        } else {
            starWidth = imgStarWidthMax;
            starHeight = imgStarHeightMax;
        }
        // Рисуем все звезды для наглядной сортировки по окружности
        for (let i = 0; i < stars.length; i++) {
            positionX = canvas.width / 2 + 60 * Math.cos(i * alp) * (stars[i].id / stars.length * 4) - 25;
            positionY = canvas.height / 2 + 60 * Math.sin(i * alp) * (stars[i].id / stars.length * 4) - 25;
            console.log(positionY)
            ctx.drawImage(imgStar, positionX, positionY, starWidth, starHeight);
        }
        ChangesOnPage = false;
    }
}

/* Создание массива с рандомными числами */
function setUpAllElemets() {
    // Переменные для записи коор-т точек
    let x, y;
    // Рандом длины массива
    //let howLongArray = GetRandomInt(minArraySize, maxArraySize);
    let howLongArray = GetRandomInt(6, 40);
    // Рандомное значение для элемента массива
    let randValue = 0;
    // Создаем массив рандомной длины с рандомными элементами
    for (let i = 0; i < howLongArray; i++) {
        // задаем рандомное значение
        randValue = GetRandomInt(minValueSize, maxValueSize);
        stars[i] = new star(randValue);
        stars[i].setId(i+1);
    }
}

/* Подготовка и подгрузка всех картинок */
function setUpAllImgs() {
    // Запись всех картинок для рендера
    // Путь к картинкам
    let srcImgs = "materials/png/";
    imgStar.src = srcImgs + "star.png";
    imgBackgroundSorting.src = srcImgs + "background-display-sort.png";
}

//////////////////////////////////// Events ///////////////////////////////////////////

/* Загрузка страницы */
document.addEventListener('DOMContentLoaded', function () {
    ctx = document.querySelector(".display-sort").getContext('2d');
    ChangesOnPage = true;
    // Подготовка и рандом массива элементов 
    setUpAllElemets();
    // Подготовка всех картинок
    setUpAllImgs();
    // Анимация сортировки массива
    Timer = setInterval(renderSortingField, howMuchMilSecondForRendering);
})

//////////////////////////////////// Patterns /////////////////////////////////////////

// Рандом целого числа
function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}
