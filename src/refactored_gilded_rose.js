class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;

    if (this.quality < 50) {
      this.quality++; // Increases by 1 normally
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality++; // Increases by 2 after sell by date
    }
  }
}

class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }

  updateQuality() {
    if (this.quality < 50) {
      this.quality++;
      
      if (this.sellIn <= 10 && this.quality < 50) {
        this.quality++; // Additional increase when <= 10 days
      }
      
      if (this.sellIn <= 5 && this.quality < 50) {
        this.quality++; // Additional increase when <= 5 days
      }
    }

    this.sellIn--;

    if (this.sellIn < 0) {
      this.quality = 0; // Drops to 0 after the concert
    }
  }
}

class Sulfuras extends Item {
  constructor(sellIn) {
    super('Sulfuras, Hand of Ragnaros', sellIn, 80);  // Sulfuras has sellIn, but it never changes
  }

  updateQuality() {
    // Sulfuras does not change in quality or sellIn
  }
}

class ConjuredItem extends Item {
  constructor(sellIn, quality) {
    super('Conjured Item', sellIn, quality);
  }

  updateQuality() {
    this.sellIn--;

    if (this.quality > 0) {
      this.quality -= 2; // Degrade twice as fast as normal items
    }

    if (this.sellIn < 0 && this.quality > 0) {
      this.quality -= 2; // Degrade twice as fast after sell by date
    }

    if (this.quality < 0) {
      this.quality = 0; // Quality should never be negative
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item instanceof AgedBrie || item instanceof BackstagePass || item instanceof ConjuredItem) {
        item.updateQuality();
      } else if (item instanceof Sulfuras) {
        // Sulfuras does not change
      } else {
        item.sellIn--;

        if (item.quality > 0) {
          item.quality--;
        }

        if (item.sellIn < 0 && item.quality > 0) {
          item.quality--;
        }
      }

      // Ensure quality never exceeds 50, except for Sulfuras
      if (item.quality > 50 && !(item instanceof Sulfuras)) {
        item.quality = 50;
      }

      // Ensure quality does not fall below 0
      if (item.quality < 0) {
        item.quality = 0;
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  AgedBrie,
  BackstagePass,
  Sulfuras,
  ConjuredItem,
  Shop,
};