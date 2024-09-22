class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; 
    this.quality = quality;
  }
}

class AgedBrie extends Item{
  constructor(sellIn, quality){
    super('Aged Brie', sellIn, quality)
  }
  
  updateQuality() {
    this.sellIn--; 

    if (this.quality < 50) {
      this.quality++; 
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality++;
    }
  }
}

class BackstagePass extends Item{
  constructor(sellIn, quality){
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
  }
  updateQuality() {
    this.sellIn--;

    if (this.quality < 50) {
      this.quality++; 
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality++;
    }

    if (this.sellIn <= 10){
      if(this.sellIn <= 5){
        this.quality + 2;
        return;
      }
      this.quality++;
    }
  }
}

class Sulfuras extends Item{
  constructor(sellIn, quality){
    super('Sulfuras, Hand of Ragnaros', sellIn, quality)
  }
}

class ConjuredItem extends Item{
  constructor(sellIn, quality){
    super('Conjured Item', sellIn, quality)
  }
  
  updateQuality() {
    this.sellIn--; 

    if (this.quality < 50) {
      this.quality - 2; 
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality - 2;
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item instanceof AgedBrie) {
        item.updateQuality();
        return
      } 
      
      if (item instanceof BackstagePass) {
        item.updateQuality(); 
        return
      } 

      if (item instanceof ConjuredItem) {
        item.updateQuality(); 
        return
      } 

      if (!item instanceof Sulfuras){
        item.sellIn--;
        if (item.quality > 0) {
          item.quality--;
        }
        if (item.sellIn < 0 && item.quality > 0) {
          item.quality--;
        }
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
  Shop
}


/*
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {//Qualität dieser artikel sinkt nicht, qualität nimmt zu
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }*/