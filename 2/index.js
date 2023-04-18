/*
Завдання 2. Масив "arr" довжиною n+1 містить натуральні числа від 1 до n. 
Знайдіть будь-який елемент, що повторюється в масиві за оптимальний час (O(n)) не змінюючи вихідний масив і не використовуючи додаткову пам'ять.
*/

// Функція запису у JSON файл:
const writeJson = (data, path) => {
    const fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(data))
};

// Отримуємо масив arr
const {arr} = require('./json/input.json');

// Функція для знаходження повторень:
function findDuplicate(arr) {
    for (let i = 0; i < arr.length; i++) {
      // Знаходимо індекс поточного елемента
        let index = Math.abs(arr[i]) - 1;

      // Якщо елемент з вказаним індексом вже від'ємний, то ми його зустріли раніше
        if (arr[index] < 0) {
            return Math.abs(arr[i]);
        }
    
        // Робимо елемент з вказаним індексом від'ємним, щоб позначити його зустріч в майбутньому
        arr[index] = -arr[index];
        }
    }

// Записуємо відповідь у файл
writeJson({answer: findDuplicate(arr)}, './json/output.json');