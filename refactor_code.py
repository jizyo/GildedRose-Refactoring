from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the CodeGen model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen-350M-mono")
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen-350M-mono")

# Example code to refactor
input_code = """
  class Item {
    constructor(name, sellIn, quality){
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }
  
  class Shop {
    constructor(items=[]){
      this.items = items;
    }
    updateQuality() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        } else {
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
    }
  }
  
  module.exports = {
    Item,
    Shop
  }
"""

# Prepare the prompt for refactoring
prompt = f"""
### JavaScript Code Refactoring
# Refactor the following JavaScript code to adhere to modern JavaScript best practices and Clean Code principles:
# - Keep the code in JavaScript.
# - Use meaningful variable and function names.
# - Remove redundant code and simplify complex logic.
# - Reduce nesting by using early returns and simplifying conditions.
# - Use modern JavaScript syntax like 'const', 'let', and arrow functions.
# - Keep the original logic intact.
# - Do not change the structure of the original logic, only simplify and improve readability.

Original Code:
{input_code}
Refactored Code:"""

# Tokenize input and generate the output
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=1000, do_sample=True)

# Decode the generated output
refactored_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(refactored_code)

