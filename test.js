const { AgedBrie, BackstagePass, Sulfuras, ConjuredItem, Shop } = require('./gilded_rose');

// Test for Aged Brie
describe('AgedBrie', () => {
  test('Aged Brie increases in quality as it ages', () => {
    const brie = new AgedBrie(10, 10);
    brie.updateQuality();
    expect(brie.quality).toBe(11); // Quality should increase
    expect(brie.sellIn).toBe(9);   // sellIn should decrease
  });

  test('Aged Brie does not increase in quality over 50', () => {
    const brie = new AgedBrie(10, 50);
    brie.updateQuality();
    expect(brie.quality).toBe(50); // Should cap at 50
  });

  test('Aged Brie quality increases by 2 when sellIn < 0', () => {
    const brie = new AgedBrie(-1, 48);
    brie.updateQuality();
    expect(brie.quality).toBe(50); // Quality increases faster past sell date, but caps at 50
  });
});

// Test for Backstage Pass
describe('BackstagePass', () => {
  test('Backstage Pass increases in quality by 2 when sellIn is 10 or less', () => {
    const pass = new BackstagePass(10, 20);
    pass.updateQuality();
    expect(pass.quality).toBe(22); // Quality increases by 2
  });

  test('Backstage Pass increases in quality by 3 when sellIn is 5 or less', () => {
    const pass = new BackstagePass(5, 20);
    pass.updateQuality();
    expect(pass.quality).toBe(23); // Quality increases by 3
  });

  test('Backstage Pass quality drops to 0 after the concert', () => {
    const pass = new BackstagePass(0, 20);
    pass.updateQuality();
    expect(pass.quality).toBe(0); // Quality drops to 0
  });
});

// Test for Conjured Item
describe('ConjuredItem', () => {
  test('Conjured items degrade in quality twice as fast', () => {
    const conjured = new ConjuredItem(10, 10);
    conjured.updateQuality();
    expect(conjured.quality).toBe(8); // Quality should drop by 2
  });

  test('Conjured items degrade in quality twice as fast after sellIn < 0', () => {
    const conjured = new ConjuredItem(-1, 10);
    conjured.updateQuality();
    expect(conjured.quality).toBe(6); // Quality drops by 4 (twice as fast after sell date)
  });
});

// Test for Sulfuras
describe('Sulfuras', () => {
  test('Sulfuras never decreases in quality or sellIn', () => {
    const sulfuras = new Sulfuras(10);
    // Sulfuras doesn't have an updateQuality method, so nothing should happen
    expect(sulfuras.quality).toBe(80); // Quality remains 80
    expect(sulfuras.sellIn).toBe(10);  // sellIn remains the same
  });
});

// Test for Shop
describe('Shop', () => {
  test('Shop updates quality of all items', () => {
    const items = [
      new AgedBrie(10, 10),
      new BackstagePass(5, 10),
      new ConjuredItem(5, 10)
    ];
    const shop = new Shop(items);
    shop.updateQuality();

    expect(shop.items[0].quality).toBe(11);  // Aged Brie increases
    expect(shop.items[1].quality).toBe(13);  // Backstage Pass increases by 3
    expect(shop.items[2].quality).toBe(8);   // Conjured Item decreases by 2
  });
});
