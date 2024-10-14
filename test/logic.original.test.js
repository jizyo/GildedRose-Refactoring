const { Item, Shop } = require('../src/original_gilded_rose');  // Import your original code

describe('Gilded Rose Original Requirements Tests', () => {

  test('Normal items degrade in quality by 1 before sell date', () => {
    const shop = new Shop([new Item('Normal Item', 10, 20)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(19);
  });

  test('Normal items degrade in quality by 2 after sell date', () => {
    const shop = new Shop([new Item('Normal Item', 0, 20)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(18);  // Quality degrades twice as fast
  });

  test('Normal items cannot have negative quality', () => {
    const shop = new Shop([new Item('Normal Item', 10, 0)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);  // Quality is never negative
  });

  test('Aged Brie increases in quality as it ages', () => {
    const shop = new Shop([new Item('Aged Brie', 10, 40)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(41);  // Aged Brie increases in quality
  });

  test('Aged Brie increases in quality by 2 after sell date', () => {
    const shop = new Shop([new Item('Aged Brie', 0, 40)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(42);  // Aged Brie increases by 2 after sell date
  });

  test('Aged Brie cannot exceed quality of 50', () => {
    const shop = new Shop([new Item('Aged Brie', 10, 50)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);  // Quality is capped at 50
  });

  test('Sulfuras never decreases in quality or sellIn', () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(10);  // Sulfuras sellIn stays the same
    expect(shop.items[0].quality).toBe(80);  // Sulfuras quality stays the same
  });

  test('Sulfuras quality is always 80', () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(80);  // Sulfuras quality is always 80
  });

  test('Backstage passes increase in quality by 2 when there are 10 days or less', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(42);  // Increases by 2 when sellIn <= 10
  });

  test('Backstage passes increase in quality by 3 when there are 5 days or less', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(4);
    expect(shop.items[0].quality).toBe(43);  // Increases by 3 when sellIn <= 5
  });

  test('Backstage passes drop to 0 quality after the concert', () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(0);  // Quality drops to 0 after the concert
  });
});
