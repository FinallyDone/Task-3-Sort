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

/* Таймер основной */
var timer;
/* таймер для анимации */
var timerForAnimation;
// Какая частота обновления для анимирования сортировки #Default
var timerMillSecondsForAnimation = 70;

/* Проверки */
// Проверка, навелся ли пользователь на кнопку "Быстрая сортировка"
var checkButtonQuickSort = false;

/* Проверка, на какую кнопку кликнул пользователь */
var whichButtonWasClicked = 0;

/* Массив звезд (элементов массива) */
var stars = [];

/* Массив истории всех перемен в массиве элементов для плавной отрисовки */
var historyOfChanges = [];

// Мин. размер значения массива
var minValueSize = 1;
// Макс. размер значения массива
var maxValueSize = 600;
// Мин. размер массива
var minArraySize = 6;
// Макс. размер массива
var maxArraySize = 250;

/* "canvas" of sorting*/
var ctx;
/* "canvas" of all buttons */
var ctxButtons;

/* Путь к картинкам */
var srcImgs = "material/png/";

/* Все картинки */
// Картинка звездочки
var imgStar = new Image();
// Картинка фона для отображения сортировки
var imgBackgroundSorting = new Image();
// Картинка кнопки "Быстрая Сортировка"
var imgButtonSortQuick = new Image();
// Картинка кнопки "Пузырьковая Сортировка"
var imgButtonSortBubble = new Image();
// Картинка кнопки "Шейкерная Сортировка"
var imgButtonSortShaker = new Image();
// Картинка кнопки "Четно-нечетная Сортировка"
var imgButtonSortEvenOdd = new Image();
// Картинка для отображения, какая кнопка выбрана
var imgButtonChosen = new Image();

/* Размер всех Картинок */
// Размерз вездочки
var imgStarWidthMin = 32;
var imgStarWidthMax = 60;
var imgStarHeightMin = 32;
var imgStarHeightMax = 60;
// Размер фона для отображения сортировки
var imgBackgroundSortingWidth = 700;
var imgBackgroundSortingHeight = 550;
// Размер кнопки "Быстрая Сортировка"
var imgButtonSortQuickWidth = 325;
var imgButtonSortQuickHeight = 75;
// Размер кнопки "Пузырьковая Сортировка"
var imgButtonSortBubbleWidth = 325;
var imgButtonSortBubbleHeight = 75;
// Размер кнопки "Шейкерная Сортировка"
var imgButtonSortShakerWidth = 325;
var imgButtonSortShakerHeight = 75;
// Размер кнопки "Четно-нечетная Сортировка"
var imgButtonSortEvenOddWidth = 325;
var imgButtonSortEvenOddHeight = 75;
// Размер картинки отображения, какая кнопка выбрана
var imgButtonChosenWidth = 350;
var imgButtonChosenHeight = 100;

/* Положение всех Картинок */
// Позиция фона дисплея сортировок
var imgBackgroundSortingPositionX = 0;
var imgBackgroundSortingPositionY = 0;
// Позиция кнопки "Быстрая Сортировка"
var imgButtonSortQuickPosX = 20;
var imgButtonSortQuickPosY = 25;
// Позиция кнопки "Пузырьковая Сортировка"
var imgButtonSortBubblePosX = 360;
var imgButtonSortBubblePosY = 25;
// Позиция кнопки "Шейкерная Сортировка"
var imgButtonSortShakerPosX = 20;
var imgButtonSortShakerPosY = 120;
// Позиция кнопки "Четно-нечетная Сортировка"
var imgButtonSortEvenOddPosX = 360;
var imgButtonSortEvenOddPosY = 120;

//////////////////////////////////// Functions ////////////////////////////////////////

/* Рендер поля с массивом для отображения сортировки */
function renderSortingField(array) {
    if (array == null) {
        // Очищаем таймер, чтобы остановить анимацию
        if (timer != null)
            clearTimeout(timer);
    } else {
        let positionX;
        let positionY;
        let canvas = document.querySelector(".display-sort__canvas");
        // Рисуем фон
        ctx.drawImage(imgBackgroundSorting, imgBackgroundSortingPositionX, imgBackgroundSortingPositionY, imgBackgroundSortingWidth, imgBackgroundSortingHeight);

        // Находим угол 
        let alp = 2 / stars.length * 3.14;
        // Определяем размер звезд
        let starWidth, starHeight;
        if (array.length >= 16) {
            starWidth = imgStarWidthMin;
            starHeight = imgStarHeightMin;
        } else {
            starWidth = imgStarWidthMax;
            starHeight = imgStarHeightMax;
        }
        // Рисуем все звезды для наглядной сортировки 
        for (let i = 0; i < array.length; i++) {
            positionX = canvas.width / 2 + 60 * Math.cos(i * alp) * (array[i].id / stars.length * 4) - 25;
            positionY = canvas.height / 2 + 60 * Math.sin(i * alp) * (array[i].id / stars.length * 4) - 25;
            ctx.drawImage(imgStar, positionX, positionY, starWidth, starHeight);
        }
    }
}

/* Рендер поля с кнопками */
function renderButtonsField() {
    let canvas = document.querySelector(".display-buttons__canvas");
    // Очищаем поле
    ctxButtons.clearRect(0, 0, canvas.width, canvas.height);
    if (checkButtonQuickSort) {
        switch (whichButtonWasClicked) {
            case 1:
                // Пользователь навел курсор на кнопку "Быстрая Сортировка"
                ctxButtons.drawImage(imgButtonChosen, imgButtonSortQuickPosX - 12.5, imgButtonSortQuickPosY - 12.5, imgButtonChosenWidth, imgButtonChosenHeight);
                break;
            case 2:
                // Пользователь навел курсор на кнопку "Пузырьковая Сортировка"
                ctxButtons.drawImage(imgButtonChosen, imgButtonSortBubblePosX - 12.5, imgButtonSortBubblePosY - 12.5, imgButtonChosenWidth, imgButtonChosenHeight);
                break;
            case 3:
                // Пользователь навел курсор на кнопку "Шейкерная Сортировка"
                ctxButtons.drawImage(imgButtonChosen, imgButtonSortShakerPosX - 12.5, imgButtonSortShakerPosY - 12.5, imgButtonChosenWidth, imgButtonChosenHeight);
                break;
            case 4:
                // Пользователь навел курсор на кнопку "Четно-нечетная Сортировка"
                ctxButtons.drawImage(imgButtonChosen, imgButtonSortEvenOddPosX - 12.5, imgButtonSortEvenOddPosY - 12.5, imgButtonChosenWidth, imgButtonChosenHeight);
                break;
        }
    }
    // Рисуем кнопку "Быстрая Сортировка"
    ctxButtons.drawImage(imgButtonSortQuick, imgButtonSortQuickPosX, imgButtonSortQuickPosY, imgButtonSortQuickWidth, imgButtonSortQuickHeight);
    // Рисуем кнопку "Пузырьковая Сортировка"
    ctxButtons.drawImage(imgButtonSortBubble, imgButtonSortBubblePosX, imgButtonSortBubblePosY, imgButtonSortBubbleWidth, imgButtonSortBubbleHeight);
    // Рисуем кнопку "Шейкерная Сортировка"
    ctxButtons.drawImage(imgButtonSortShaker, imgButtonSortShakerPosX, imgButtonSortShakerPosY, imgButtonSortShakerWidth, imgButtonSortShakerHeight);
    // Рисуем кнопку "Четно-нечетная Сортировка"
    ctxButtons.drawImage(imgButtonSortEvenOdd, imgButtonSortEvenOddPosX, imgButtonSortEvenOddPosY, imgButtonSortEvenOddWidth, imgButtonSortEvenOddHeight);
}

/* Создание массива с рандомными числами */
function setUpAllElemets() {
    stars = [];
    historyOfChanges = [];
    // Переменные для записи коор-т точек
    let x, y;
    // Рандом длины массива
    //let howLongArray = GetRandomInt(minArraySize, maxArraySize);
    let howLongArray = GetRandomInt(minArraySize, maxArraySize);
    // Рандомное значение для элемента массива
    let randValue = 0;
    // Массив, чтобы в будущем определить позиции каждого элемента
    let tempStars = [];
    // Создаем массив рандомной длины с рандомными элементами
    for (let i = 0; i < howLongArray; i++) {
        // задаем рандомное значение
        randValue = GetRandomInt(minValueSize, maxValueSize);
        stars[i] = new star(randValue);
        tempStars[i] = randValue;
    }
    // Сортируем обычный массив
    sortQuick(tempStars, false);
    // Определяем позицию для каждого элемента
    for (let i = 0; i < howLongArray; i++) {
        for (let j = 0; j < tempStars.length; j++) {
            if (tempStars[j] == stars[i].value) {
                stars[i].setId(j);
                tempStars[j] = 0;
                break;
            }
        }
    }
}

/* Подготовка и подгрузка всех картинок */
function setUpAllImgs() {
    // Запись всех картинок для рендера
    // Путь к картинкам
    let srcImgs = "materials/png/";
    imgStar.src = srcImgs + "star.png";
    imgBackgroundSorting.src = srcImgs + "background-display-sort.png";
    imgButtonSortQuick.src = srcImgs + "button-sort-fast.png";
    imgButtonSortBubble.src = srcImgs + "button-sort-bubble.png";
    imgButtonSortShaker.src = srcImgs + "button-sort-shaker.png";
    imgButtonSortEvenOdd.src = srcImgs + "button-sort-even-odd.png";
    imgButtonChosen.src = srcImgs + "button-glowing.png";
}

/*          !!!  !!!  !!! 
    Каждая сортировка имеет 2 тип:
    isClass:
        -false Сортировка для массива с числами
        -true Сортировка для массива с классами ч/з value
*/

/* Четно-нечетная Сортировка */
function sortEvenOdd(array, isClass) {
    let n = array.length;
    let isSorted = 0;
    let temp;
    while (isSorted == 0) {
        isSorted = 1;
        temp = 0;
        if (isClass) {
            for (let i = 1; i < n - 1; i += 2) {
                if (array[i].value > array[i + 1].value) {
                    Swap(array, i, i + 1, true);
                    isSorted = 0;
                }
            }
            for (let i = 0; i < n - 1; i += 2) {
                if (array[i].value > array[i + 1].value) {
                    Swap(array, i, i + 1, true);
                    isSorted = 0;
                }
            }
        } else {
            for (let i = 1; i < n - 1; i += 2) {
                if (array[i] > array[i + 1]) {
                    Swap(array, i, i + 1, false);
                    isSorted = 0;
                }
            }
            for (let i = 0; i < n - 1; i += 2) {
                if (array[i] > array[i + 1]) {
                    Swap(array, i, i + 1, false);
                    isSorted = 0;
                }
            }
        }
    }
}

/* Шейкерная Сортировка */
function sortShaker(array, isClass) {
    let beg, end;
    let count = 0;

    for (let i = 0; i < (array.length / 2); i++) {
        beg = 0;
        end = array.length - 1;

        do {
            count += 2;
            // Идем спереди 
            if (isClass) {
                if (array[beg].value > array[beg + 1].value)
                    Swap(array, beg, beg + 1, true);
                //сдвигаем позицию вперед
                beg++;

            } else {
                if (array[beg] > array[beg + 1])
                    Swap(array, beg, beg + 1, false);
                // Сдвигаем позицию вперед
                beg++;
            }

            // Идем сзади
            if (isClass) {
                if (array[end - 1].value > array[end].value)
                    Swap(array, end - 1, end, true);
            } else {
                if (array[end - 1] > array[end])
                    Swap(array, end - 1, end, false);
            }
            // Сдвигаем позицию назад
            end--;

        }
        while (beg <= end);
    }
}

/* Пузырьковая Сортировка */
function sortBubble(array, isClass) {
    for (let j = array.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (!isClass) {
                // Проверяем обычный массив
                if (array[i] > array[i + 1]) {
                    Swap(array, i, i + 1, false);
                }
            } else {
                // Проверяем значение класса
                if (array[i].value > array[i + 1].value) {
                    Swap(array, i, i + 1, true);
                }
            }
        }
    }
}


/* Быстрая сортировка */
function sortQuick(array, left, right, isClass) {
    var index;
    if (array.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? array.length - 1 : right;
        index = partition(array, left, right, isClass);
        if (left < index - 1) {
            sortQuick(array, left, index - 1, isClass);
        }
        if (index < right) {
            sortQuick(array, index, right, isClass);
        }
    }
}

/* Вспомогательная функция для быстрой сортировки */
function partition(array, left, right, isClass) {
    let pivot, i, j;
    if (isClass)
        pivot = array[Math.floor((right + left) / 2)].value;
    else
        pivot = array[Math.floor((right + left) / 2)];
    i = left;
    j = right;
    if (!isClass) {
        // Сортируем обычный массив
        while (i <= j) {
            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                Swap(array, i, j, false);
                i++;
                j--;
            }
        }
    } else {
        // Сортируем класс по его значениям
        while (i <= j) {
            while (array[i].value < pivot) {
                i++;
            }
            while (array[j].value > pivot) {
                j--;
            }
            if (i <= j) {
                Swap(array, i, j, true);
                i++;
                j--;
            }
        }
    }
    return i;
}

/* Из-за некоторыъ алгоритмов повторяющийся элементы имеют не верные индексы, эта функция исправляет данную оплошность */
function repairArrayAfterSort(array) {
    // работает по примеру пузырьковой сортировки 
    for (let j = array.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            // Проверяем значение класса
            if (array[i].id > array[i + 1].id) {
                Swap(array, i, i + 1, true);
            }
        }
    }
    historyOfChanges.push(array);
}

//////////////////////////////////// Events ///////////////////////////////////////////

/* Загрузка страницы */
document.addEventListener('DOMContentLoaded', function () {
    ctx = document.querySelector(".display-sort__canvas").getContext('2d');
    ctxButtons = document.querySelector(".display-buttons__canvas").getContext('2d');
    // Подготовка всех картинок
    setUpAllImgs();
    // Загрузка сортировки массива, поля с кнопками таймер используется, чтобы дать время подгрузиться картинкам
    timer = setTimeout(function () {
        renderSortingField(stars);
        renderButtonsField();
    }, 100);
})

/* Проверка, куда навелся пользователь при передвежении мыши */
document.querySelector(".display-buttons__canvas").addEventListener('mousemove', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (x > imgButtonSortQuickPosX && x < (imgButtonSortQuickPosX + imgButtonSortQuickWidth) &&
        y > imgButtonSortQuickPosY && y < (imgButtonSortQuickPosY + imgButtonSortQuickHeight)) {
        // Пользователь навел курсор на "Быстрая Сортировка"
        whichButtonWasClicked = 1;
        checkButtonQuickSort = true;
        renderButtonsField();
    } else if (x > imgButtonSortBubblePosX && x < (imgButtonSortBubblePosX + imgButtonSortBubbleWidth) && y > imgButtonSortBubblePosY && y < (imgButtonSortBubblePosY + imgButtonSortBubbleHeight)) {
        // Пользователь навел курсор на "Пузырьковая Сортировка"
        whichButtonWasClicked = 2;
        checkButtonQuickSort = true;
        renderButtonsField();
    } else if (x > imgButtonSortShakerPosX && x < (imgButtonSortShakerPosX + imgButtonSortShakerWidth) && y > imgButtonSortShakerPosY && y < (imgButtonSortShakerPosY + imgButtonSortShakerHeight)) {
        // Пользователь навел курсор на "Шейкерная Сортировка"
        whichButtonWasClicked = 3;
        checkButtonQuickSort = true;
        renderButtonsField();
    } else if (x > imgButtonSortEvenOddPosX && x < (imgButtonSortEvenOddPosX + imgButtonSortEvenOddWidth) && y > imgButtonSortEvenOddPosY && y < (imgButtonSortEvenOddPosY + imgButtonSortEvenOddHeight)) {
        // Пользователь навел курсор на "Четно-нечетнеая Сортировка"
        whichButtonWasClicked = 4;
        checkButtonQuickSort = true;
        renderButtonsField();
    } else {
        whichButtonWasClicked = 0;
        checkButtonQuickSort = false;
        renderButtonsField();
    }
});

/* Клик по кнопкам */
document.querySelector(".display-buttons__canvas").addEventListener("click", function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    // Пользователь кликнул на "Быстрая сортировка"
    if (x > imgButtonSortQuickPosX && x < (imgButtonSortQuickPosX + imgButtonSortQuickWidth) &&
        y > imgButtonSortQuickPosY && y < (imgButtonSortQuickPosY + imgButtonSortQuickHeight)) {
        clearTimeout(timer);
        clearTimeout(timerForAnimation);
        // Подготовка и рандом массива элементов 
        setUpAllElemets();
        // Рендерим не отсортированный массив
        renderSortingField(stars);
        // Меняем частоту обновления кадров для быстрой анимации
        if (stars.length > 150) {
            timerMillSecondsForAnimation = 15;
        } else if (stars.length > 80) {
            timerMillSecondsForAnimation = 40;
        } else {
            timerMillSecondsForAnimation = 60;
        }
        timer = setTimeout(function () {
            // Копируем массив, чтобы отсортировать его и запомнить каждый шаг сортировки, но не менять оригинальный
            let tempStars = stars.slice(0);
            // Сортируем массив классов
            sortQuick(tempStars, 0, stars.length - 1, true);
            // Исправляем оплошность алгоритма с индексацией
            repairArrayAfterSort(tempStars);
            var countForTimer = 0;
            timerForAnimation = setInterval(function () {
                renderSortingField(historyOfChanges[countForTimer]);
                countForTimer++;
            }, timerMillSecondsForAnimation);
        }, 2000);
    }
    // Пользователь кликнул на "Пузырьковая Сортировка"
    if (x > imgButtonSortBubblePosX && x < (imgButtonSortBubblePosX + imgButtonSortBubbleWidth) &&
        y > imgButtonSortBubblePosY && y < (imgButtonSortBubblePosY + imgButtonSortBubbleHeight)) {
        clearTimeout(timer);
        clearTimeout(timerForAnimation);
        // Подготовка и рандом массива элементов 
        setUpAllElemets();
        // Рендерим не отсортированный массив
        renderSortingField(stars);
        // Меняем частоту обновления кадров для быстрой анимации
        if (stars.length > 100) {
            timerMillSecondsForAnimation = 1;
        } else if (stars.length > 60) {
            timerMillSecondsForAnimation = 5;
        } else if (stars.length > 30) {
            timerMillSecondsForAnimation = 10;
        } else {
            timerMillSecondsForAnimation = 70;
        }
        timer = setTimeout(function () {
            // Копируем массив, чтобы отсортировать его и запомнить каждый шаг сортировки, но не менять оригинальный
            let tempStars = stars.slice(0);
            // Сортируем массив классов
            sortBubble(tempStars, true);
            var countForTimer = 0;
            timerForAnimation = setInterval(function () {
                renderSortingField(historyOfChanges[countForTimer]);
                countForTimer++;
            }, timerMillSecondsForAnimation);
        }, 2000);
    }
    // Пользователь кликнул на "Шейкерная Сортировка"
    if (x > imgButtonSortShakerPosX && x < (imgButtonSortShakerPosX + imgButtonSortShakerWidth) &&
        y > imgButtonSortShakerPosY && y < (imgButtonSortShakerPosY + imgButtonSortShakerHeight)) {
        clearTimeout(timer);
        clearTimeout(timerForAnimation);
        // Подготовка и рандом массива элементов 
        setUpAllElemets();
        // Рендерим не отсортированный массив
        renderSortingField(stars);
        // Меняем частоту обновления кадров для быстрой анимации
        if (stars.length > 100) {
            timerMillSecondsForAnimation = 1;
        } else if (stars.length > 60) {
            timerMillSecondsForAnimation = 5;
        } else if (stars.length > 30) {
            timerMillSecondsForAnimation = 10;
        } else {
            timerMillSecondsForAnimation = 70;
        }
        timer = setTimeout(function () {
            // Копируем массив, чтобы отсортировать его и запомнить каждый шаг сортировки, но не менять оригинальный
            let tempStars = stars.slice(0);
            // Сортируем массив классов
            sortShaker(tempStars, true);
            var countForTimer = 0;
            timerForAnimation = setInterval(function () {
                renderSortingField(historyOfChanges[countForTimer]);
                countForTimer++;
            }, timerMillSecondsForAnimation);
        }, 2000);
    }
    // Пользователь кликнул на "Четно-нечетную Сортировку"
    if (x > imgButtonSortEvenOddPosX && x < (imgButtonSortEvenOddPosX + imgButtonSortEvenOddWidth) &&
        y > imgButtonSortEvenOddPosY && y < (imgButtonSortEvenOddPosY + imgButtonSortEvenOddHeight)) {
        clearTimeout(timer);
        clearTimeout(timerForAnimation);
        // Подготовка и рандом массива элементов 
        setUpAllElemets();
        // Рендерим не отсортированный массив
        renderSortingField(stars);
        // Меняем частоту обновления кадров для быстрой анимации
        if (stars.length > 100) {
            timerMillSecondsForAnimation = 1;
        } else if (stars.length > 60) {
            timerMillSecondsForAnimation = 3;
        } else if (stars.length > 30) {
            timerMillSecondsForAnimation = 10;
        } else {
            timerMillSecondsForAnimation = 70;
        }
        timer = setTimeout(function () {
            // Копируем массив, чтобы отсортировать его и запомнить каждый шаг сортировки, но не менять оригинальный
            let tempStars = stars.slice(0);
            // Сортируем массив классов
            sortEvenOdd(tempStars, true);
            var countForTimer = 0;
            timerForAnimation = setInterval(function () {
                renderSortingField(historyOfChanges[countForTimer]);
                countForTimer++;
            }, timerMillSecondsForAnimation);
        }, 2000);
    }
});

//////////////////////////////////// Patterns /////////////////////////////////////////

// Рандом целого числа
function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

// Меняет местами два элемента массива
function Swap(array, firstIndex, secondIndex, isClass) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    // Сохраняем историю изменений для плавной отрисовки
    if (isClass) {
        historyOfChanges.push(array.slice(0));
    }
}
