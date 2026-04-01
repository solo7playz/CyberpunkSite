// class Furniture{
//     constructor(name, color){
//         this.name = name;
//         this.color = color;
//     }
//     get get_name(){
//         return this.name
//     }
//     get get_color(){
//         return this.color
//     }
//     set set_name(name){
//         this.name = name
//     }
//     Destiny(){}
// }

// class Chair extends Furniture{
//     Destiny(){
//         alert(`${this.name} for sitting`)
//     }
// }

// class Table extends Furniture{
//     Destiny(){
//         alert(`${this.name} for eating`)
//     }
// }

// class Fridge extends Furniture{
//     Destiny(){
//         alert(`${this.name} for cooling`)
//     }
// }

// class Cupboard extends Furniture{
//     Destiny(){
//         alert(`${this.name} for smth`)
//     }
// }

// function main(){
//     let h = prompt("f")
//     let chair = new Chair("oak chair", "brown");
//     let table = new Table("oak table", "black")
//     let fridge = new Fridge("fridge", "white")
//     var cupboard = new Cupboard("cupboard", "green")
//     chair.Destiny()
//     table.Destiny()
//     fridge.Destiny()
//     cupboard.Destiny()
//     let furniture = [chair, table, fridge, cupboard]
//     alert("count of classes: " + furniture.length);
// }

// main()

class Furniture {
    static totalSum = 0;

    publicName;

    #price;

    constructor(name, price) {
        this.publicName = name;
        this.#price = price;
        Furniture.totalSum += price;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (value > 0) {
            Furniture.totalSum -= this.#price; 
            this.#price = value;
            Furniture.totalSum += value;      
        }
    }

    static getTotalSum() {
        return `Общая стоимость всей мебели в магазине: ${Furniture.totalSum} руб.`;
    }
    calculateMaterialCost() {
        return 0;
    }
}
class Chair extends Furniture {
    constructor(name, price, woodAmount) {
        super(name, price);
        this._woodAmount = woodAmount; 
    }

    get woodAmount() { return this._woodAmount; }
    set woodAmount(val) { this._woodAmount = val; }

    calculateMaterialCost() {
        const woodPrice = 5000; 
        return this._woodAmount * woodPrice;
    }
}
class Table extends Furniture {
    constructor(name, price, surfaceArea) {
        super(name, price);
        this._surfaceArea = surfaceArea;
    }

    get surfaceArea() { return this._surfaceArea; }
    set surfaceArea(val) { this._surfaceArea = val; }

    calculateMaterialCost() {
        const materialRate = 3000;
        return this._surfaceArea * materialRate;
    }
}
class Sofa extends Furniture {
    constructor(name, price, fabricLength) {
        super(name, price);
        this._fabricLength = fabricLength;
    }

    get fabricLength() { return this._fabricLength; }
    set fabricLength(val) { this._fabricLength = val; }

    calculateMaterialCost() {
        const fabricPrice = 1200;
        return this._fabricLength * fabricPrice;
    }
}
class Wardrobe extends Furniture {
    constructor(name, price, weight) {
        super(name, price);
        this._weight = weight;
    }

    get weight() { return this._weight; }
    set weight(val) { this._weight = val; }

    calculateMaterialCost() {
        const heavyDutyRate = 150;
        return this._weight * heavyDutyRate;
    }
}
const items = [
    new Chair("Стул офисный", 5000, 0.2),
    new Chair("Стул кухонный", 3000, 0.15),
    new Chair("Табурет", 1500, 0.1),
    new Table("Обеденный стол", 15000, 2),
    new Table("Журнальный столик", 7000, 0.8),
    new Sofa("Диван угловой", 45000, 10),
    new Sofa("Кресло-кровать", 20000, 5),
    new Wardrobe("Шкаф-купе", 35000, 120),
    new Wardrobe("Комод", 12000, 45),
    new Wardrobe("Полка книжная", 4000, 15)
];
console.log("--- Список мебели и затраты на материалы ---");
items.forEach(item => {
    console.log(`${item.publicName}: Цена = ${item.price}, Себестоимость материалов = ${item.calculateMaterialCost()}`);
});

console.log("\n" + Furniture.getTotalSum());

items[0].price = 6000;
console.log("Цена первого стула изменена на 6000.");
console.log(Furniture.getTotalSum());
