class Item {
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }
  
  class Shop {
    constructor(items = []) {
      this.items = items;
    }
  
    updateQuality() {
      this.items.forEach(item => this.updateItemQuality(item));
      return this.items;
    }
  
    updateItemQuality(item) {
      if (this.isLegendary(item)) return; // Early return for Sulfuras, it never changes
  
      this.updateSellIn(item);
      this.updateQualityValue(item);
      
      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    }
  
    isLegendary(item) {
      return item.name === 'Sulfuras, Hand of Ragnaros';
    }
  
    isAgedBrie(item) {
      return item.name === 'Aged Brie';
    }
  
    isBackstagePass(item) {
      return item.name === 'Backstage passes to a TAFKAL80ETC concert';
    }
  
    isConjured(item) {
      return item.name.startsWith('Conjured');
    }
  
    updateSellIn(item) {
      item.sellIn -= 1;
    }
  
    updateQualityValue(item) {
      if (this.isAgedBrie(item)) {
        this.increaseQuality(item);
      } else if (this.isBackstagePass(item)) {
        this.updateBackstagePassQuality(item);
      } else if (this.isConjured(item)) {
        this.decreaseQuality(item, 2); // Conjured items degrade twice as fast
      } else {
        this.decreaseQuality(item);
      }
    }
  
    handleExpiredItem(item) {
      if (this.isAgedBrie(item)) {
        this.increaseQuality(item);
      } else if (this.isBackstagePass(item)) {
        item.quality = 0; // Quality drops to 0 after the concert
      } else if (this.isConjured(item)) {
        this.decreaseQuality(item, 4); // Conjured items degrade by 4 after expiration
      } else {
        this.decreaseQuality(item);
      }
    }
  
    increaseQuality(item) {
      if (item.quality < 50) {
        item.quality += 1;
      }
    }
  
    decreaseQuality(item, amount = 1) {
      if (item.quality > 0) {
        item.quality = Math.max(0, item.quality - amount); // Ensure quality does not drop below 0
      }
    }
  
    updateBackstagePassQuality(item) {
      this.increaseQuality(item);
      if (item.sellIn < 10) {
        this.increaseQuality(item);
      }
      if (item.sellIn < 5) {
        this.increaseQuality(item);
      }
    }
  }
  
  module.exports = {
    Item,
    Shop
  };