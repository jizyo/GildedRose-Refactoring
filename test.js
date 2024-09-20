const { Item, Shop } = require('./gilded_rose');

// Create items
const items = [
  new Item('Aged Brie', 10, 20),
  new Item('Sulfuras, Hand of Ragnaros', 5, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Regular Item', 10, 7)
];

// Create a shop with the items
const shop = new Shop(items);

// Update the quality and log the result
console.log("Before Update: ");
console.log(items);

shop.updateQuality();

console.log("After Update: ");
console.log(shop.items);
