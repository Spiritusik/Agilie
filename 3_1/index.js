/*
3.1  
На змаганнях з паверліфтингу використовуються дискові навантажувачі вагою 0.5, 1, 2.5, 5, 10, 15, 20 та 25 кг. 
Також ми маємо американські дискові навантажувачі вагу яких визначено у lbs. Такі  дискові навантажувачі є тільки в 10, 25, 35, 45 фунтів. 
Гриф на штанзі завжди один і дорівнює 20кг. 

Потрібно знайти таку комбінацію дисковихі навантажувачів, щоб вага на штанзі була мінімальною, але перевищувала максимальний рекорд. Наприклад, 
Спортсмен номер 1 підняв 101 кг використовуючи гриф 20кг, 4 дискових навантажувачі по 20 кг та два по 0.5. 
Для того щоб перевершити вагу попереднього спортсмена, Спортсмену номер 2 буде оптимально підняти 101.44 які можна отримати з грифу 20 кг і 
двох дискових навантажувачів наступних найменувань  1, 2.5, 10, кг та 25, 35 lbs.

Треба написати програму, яка за заданою вагою буде знаходити мінімальний наступний.

! Важливо, що  дискові навантажувачі будь-якої ваги вішаються на штангу попарно. Так само на штанзі може бути не більше 24 дискових  навантажувачі, 
! тобто максимум 12 з кожного боку.
*/

// Функція запису у JSON файл:
const writeJson = (data, path) => {
    const fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(data))
};

const weightTranasform = (weight, unit = 'kg') => {
    return (unit === 'kg')
        ? weight * 0.453592 
        : weight / 0.453592;
}

// Введемо відомі константні значення
const disksWeight = [0.5, 1, 2.5, 5, 10, 15, 20, 25]; // Вага дискових навантажувачів
const lbsDisksWeight = [10, 25, 35, 45] // Вага американських дискових навантажувачів
const neckWeight = 20; // Вага грифу
const maxDisks = 12; // Максимальна кількість дискових навантажувачів з одного боку
let result = 25*2*maxDisks + neckWeight; // Максимально можлива вага
let disksList;

// Отримуємо поточну рекордну вагу
let {recordWeight, unit} = require('./json/input.json');
recordWeight = (unit === 'lbs')? weightTranasform(recordWeight) : recordWeight;

// Функція для знаходження рішення (дуже жахливе рішення [може працювати кілька годин, для великих ваг])
const optiWeight = (weight = neckWeight, way = '', disksCount = 0) => {
    // Якщо поточний рекорд дорівнює максимально можливій вазі, за умовою
    if(recordWeight >= 25*2*maxDisks + neckWeight){
        return;
    }

    // Якщо ми використали забагато дисків, то завершуємо рекурсію
    if(disksCount > maxDisks){
        return;
    }

    // Якщо ми знайшли вагу, що більша за рекордну, то завершиуємо рекурсію, змінюючи значення result в залежності від поточної ваги
    if(weight > recordWeight){
        if(result > weight){
            result = weight;
            disksList = way;
        }
        return;
    }

    // Перебираємо усі звичайні диски, та подаємо суммарну вагу у нашу рекурсію(якщо поточна вага більша за рекордну, то ми виходимо з циклу)
    for(disk of disksWeight){
        let sumWeight = weight + disk * 2;
        optiWeight(sumWeight, way + `${disk} kg. `, disksCount + 1);
        if(sumWeight > recordWeight){
            break;
        }
    }

    // Перебираємо усі американські диски, та подаємо суммарну вагу у нашу рекурсію(якщо поточна вага більша за рекордну, то ми виходимо з циклу)
    for(disk of lbsDisksWeight){
        let transformDisk = weightTranasform(disk)
        let sumWeight = weight + transformDisk * 2;
        optiWeight(sumWeight, way + `${disk} lbs. `, disksCount + 1);
        if(sumWeight > recordWeight){
            break;
        }
    }
}

optiWeight();

// Записуємо відповідь у файл
writeJson(
    {
        answer: 
            (recordWeight >= 25*2*maxDisks + neckWeight)
                ? "Неможливо підібрати більшу вагу."
                : (unit === 'lbs')
                    ? `${weightTranasform(result, 'lbs')} ${unit}.`
                    : `${result} ${unit}.`,
        disksList
    }, 
    './json/output.json');