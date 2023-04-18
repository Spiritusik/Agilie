/*
Завдання 1.  Два друга грають у гру, вони обидва загадують число. 
Перший повинен перетворити одне число на інше за допомогою множення цього числа на 2 (10 * 2 = 20) або додаванням одиниці праворуч (10 + 1 = 101). 

Потрібно написати програму, яка буде знаходити, чи можливо одне число перетворити на інше, використовуючи лише перераховані вище операції.
*/

// Функція запису у JSON файл:
const writeJson = (data, path) => {
    const fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(data))
};

// Отримуємо числа двох гравців
const {firstFriendNum, secondFriendNum} = require('./json/input.json');

// Створюємо значення виводу, у разі, якщо рішення не можливе
const output = {
    answer: "Неможливо одне число перетворити на інше, використовуючи лише перераховані операції"
};

// Доступні опперації
const multiplyByTwo = num => num*2;
const addRightOne = num => num*10+1;

// Шукаємо шлях за допомогою рекурсії:
const decisionTree = (firstNum, secondNum, way = []) => {
    // Якщо поточне значення більше за число загадане другим гравцем, то зупиняємо пошук рішнь
    if(firstNum > secondNum){
        return;
    }

    // Якщо ми знайшли шукане значення, то змінюємо значення відповіді.
    if(firstNum === secondNum){
        output.answer = "Можливо одне число перетворити на інше, використовуючи лише перераховані операції:";
        output.way = way.join(" -> ");
        return;
    }

    // Виконуємо існуючі операції для поточного числа:
    decisionTree(multiplyByTwo(firstNum), secondNum, [...way, "Множимо число на 2"]);
    decisionTree(addRightOne(firstNum), secondNum, [...way, "Додаємо праворуч одиницю"]);
};

// Шукаємо відповідь:
decisionTree(firstFriendNum, secondFriendNum);

// Записуємо відповідь у файл
writeJson(output, './json/output.json');