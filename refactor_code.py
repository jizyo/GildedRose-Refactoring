from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the CodeGen model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen-350M-mono")
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen-350M-mono")

# Example code to refactor
input_code = """
  updateQuality() {
    this.items.forEach(item => {
      if (item instanceof AgedBrie || item instanceof BackstagePass || item instanceof ConjuredItem) {
        item.updateQuality();
        return;
      }

      if (!(item instanceof Sulfuras)){
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
"""

# Prepare the prompt for refactoring
prompt = f"""
### JavaScript Code Refactoring
# Refactor the following code to adhere to JavaScript best practices and Clean Code principles:
# - Use meaningful variable and function names
# - Remove unnecessary comments
# - Ensure that the code is simple and self-explanatory
# - Avoid nested conditions where possible
# - Use modern JavaScript syntax (e.g., const/let, arrow functions, etc.)
Original Code:
{input_code}
Refactored Code:"""

# Tokenize input and generate the output
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=512, do_sample=True)

# Decode the generated output
refactored_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(refactored_code)

