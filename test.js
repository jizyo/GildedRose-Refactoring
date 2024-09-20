const { Item, AgedBrie, BackstagePass, Sulfuras, Shop, ConjuredItem } = require('./gilded_rose');

// Create items
const items = [
  new AgedBrie(10, 20),
  new Sulfuras(5, 80),
  new BackstagePass(15, 20),
  new Item('Regular Item', 10, 7),
  new ConjuredItem( 10, 7)
];

// Create a shop with the items
const shop = new Shop(items);

// Update the quality and log the result
console.log("Before Update: ");
console.log(items);

shop.updateQuality();

console.log("After Update: ");
console.log(shop.items);
