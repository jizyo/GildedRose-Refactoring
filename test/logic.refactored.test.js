const { AgedBrie, BackstagePass, Sulfuras, ConjuredItem, Item, Shop } = require('../src/refactored_gilded_rose');  // Import your refactored code

describe('Gilded Rose Requirements Tests', () => {
  
  test('Normal items decrease in quality by 1 each day before sell date', () => {
    const shop = new Shop([new Item('Normal Item', 10, 20)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(19);
  });

  test('Normal items decrease in quality by 2 after sell date', () => {
    const shop = new Shop([new Item('Normal Item', 0, 20)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(18);
  });

  test('Normal items cannot have a negative quality', () => {
    const shop = new Shop([new Item('Normal Item', 10, 0)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test('Aged Brie increases in quality the older it gets', () => {
    const shop = new Shop([new AgedBrie(10, 30)]);  // Use AgedBrie subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(31);
  });

  test('Aged Brie quality increases by 2 when sellIn is less than 0', () => {
    const shop = new Shop([new AgedBrie(0, 30)]);  // Use AgedBrie subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(32);
  });

  test('Aged Brie cannot have quality greater than 50', () => {
    const shop = new Shop([new AgedBrie(10, 50)]);  // Use AgedBrie subclass
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);
  });

  test('Sulfuras never decreases in sellIn or quality', () => {
    const shop = new Shop([new Sulfuras(10)]);  // Use Sulfuras subclass with sellIn = 10
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(10);  // Sulfuras sellIn never changes
    expect(shop.items[0].quality).toBe(80);  // Sulfuras quality is fixed at 80
  });

  test('Backstage passes increase in quality by 2 when there are 10 days or less', () => {
    const shop = new Shop([new BackstagePass(10, 30)]);  // Use BackstagePass subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(32);
  });

  test('Backstage passes increase in quality by 3 when there are 5 days or less', () => {
    const shop = new Shop([new BackstagePass(5, 30)]);  // Use BackstagePass subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(4);
    expect(shop.items[0].quality).toBe(33);
  });

  test('Backstage passes drop to 0 quality after the concert', () => {
    const shop = new Shop([new BackstagePass(0, 30)]);  // Use BackstagePass subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(0);  // Quality drops to 0 after concert
  });

  test('Conjured items degrade in quality twice as fast as normal items', () => {
    const shop = new Shop([new ConjuredItem(10, 20)]);  // Use ConjuredItem subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(18);  // Degrades by 2 per day
  });

  test('Conjured items degrade in quality twice as fast after sell date', () => {
    const shop = new Shop([new ConjuredItem(0, 20)]);  // Use ConjuredItem subclass
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(16);  // Degrades by 4 after sell date
  });

});
