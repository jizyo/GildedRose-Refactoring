from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

from huggingface_hub import login
login(token="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")

model_name = "bigcode/starcoder"  # Replace with the chosen model's name
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def refactor_code(code):
    inputs = tokenizer.encode(code, return_tensors="pt")
    attention_mask = torch.ones(inputs.shape, dtype=torch.long)  # Create attention mask
    outputs = model.generate(inputs, max_new_tokens=100, num_return_sequences=1, attention_mask=attention_mask)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

if __name__ == "__main__":
    # Example of how to use the refactor_code function
    original_code = """
    def add_numbers(a, b):
        return a + b
    """
    prompt = f"""
    Extend the function with similar functions that perform subtraction, multiplication, and division.
    {original_code}
    """
    refactored_code = refactor_code(prompt)
    print("Refactored Code:\n", refactored_code)
