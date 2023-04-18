/*
3.2
Для цих змагань менеджер замовив певну кількість футболок різних розмірів. 
Усього надруковано футболки шести розмірів: S, M, L, XL, XXL, XXXL. 
Для кожного розміру відома кількість футболок.

Під час реєстрації організатори попросили кожного із n учасників вказати розмір футболки. 
Учасник міг обрати 2 розміри, наприклад, M і L - це означає, що йому може підійти будь-яка з цих футболок. 
Якщо учасник обирає 2 розміри, вони обов'язково повинні бути сусідніми. Це не може бути S та XXL.

Напишіть програму, яка визначить, чи можливо з футболок, які ми маємо, зробити подарунок усім спортсменам. 
Кожному учаснику має дістатись футболка його розміру:
необхідного розміру, якщо вказано один розмір;
будь-якого з двох розмірів, якщо вказано два сусідні розміри.
Якщо це можливо, програма повинна вивести будь-яке з можливих рішень.
*/

// Функція запису у JSON файл:
const writeJson = (data, path) => {
    const fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(data))
};

// Отримуємо кількість футболок, та замовлення гравців:
const {tShirtsCount, orders} = require('./json/input.json');

const isPosibleToGiftTShirtAllTheMembers = (tShirtsCount, orders, tShirtesSizes = ["S", "M", "L", "XL", "XXL", "XXXL"]) => {
    // Сортуємо масив розмірів одежі учасників за кількістю підходящих розмірів. Це необхідно, аби ми у першу чергу "віддавали" футболки учасникам, з єдиним підходячим розміром.
    orders.sort((a, b) => a.tShirtSizes.length - b.tShirtSizes.length);
    
    // Функція в одночас перевіряє, чи можимо ми віддати футболку учаснику (повертає boolean значення), та віднімає, якщо ми маємо таку можливість
    const tShirtSizeDecrement = (size) => {
        if(tShirtsCount[size] - 1 < 0){
            return false;
        }
        tShirtsCount[size]--;
        return true;
    }
    
    // Для кожного розміру одежі будемо змінювати кількість існуючих розмірів, в залежності від підходящих розмірів учасників
    for(let i = 0; i < tShirtesSizes.length; i++) {
        let currentSize = tShirtesSizes[i];
        // Зробимо копію існуючого списку, аби не змінювалась довжина списку у циклі, при видаленні елемента
        let subOrders = [...orders]

        for(let j = 0; j < subOrders.length; j++) {
            let currentOrderSize = subOrders[j].tShirtSizes;

            // У випадку, коли поточний розмір не підходить поточному учаснику, переходимо до наступного:
            if(!currentOrderSize.includes(currentSize)){
                continue;
            }

            // Ми перевіряємо чи можливо віддати йому поточний, або наступний розмір. Якщо можемо, то віддаємо. 
            // Спочатку спрацює 1 декримент, якщо це можливо, якщо ні, то спрацює 2 умова, у якій 2 декримент спрацює лише у випадку, коли кількість підходящих розмірів не дорівнює 1, і коли він може спрацювати 
            if(!tShirtSizeDecrement(currentSize) && (currentOrderSize.length === 1 || !tShirtSizeDecrement(tShirtesSizes[i + 1]))) {
                // Якщо ж в нас не має більше футболок обох (або якщо вказан один) розмірів, то повертаємо повідомлення про невдачу 
                return {answer: "Не можливо підібрати подарунки усім учасникам"};
            }

            // Якщо все гаразд, то видаляємо поточного учасника зі списку
            orders.splice(j, 1);
        }
    }

    return {answer: "Можливо підібрати подарунки усім учасникам"};
}

// Записуємо відповідь у файл
writeJson(isPosibleToGiftTShirtAllTheMembers(tShirtsCount, orders), './json/output.json');