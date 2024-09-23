# GildedRose-Refactoring
applying Clean Code principles

1. **Single Responsibility Principle (SRP)**
”Each class or function should have one and only responsibility”

Each class (`AgedBrie`, `BackstagePass`, `Sulfuras`, `ConjuredItem`) is responsible for managing the updateQuality logic for a specific type of item. This avoids the problem of a single class trying to handle multiple responsibilities (such as different item types).

The `Shop` class is responsible for managing the collection of items and updating their quality, not for knowing the individual update rules for each item.

2. **Open/Closed Principle (OCP**
”Classes should be open for extension but closed for modification”

We’ve extended the base `Item` class with specialized item types (`AgedBrie`, `BackstagePass`, `Sulfuras`, `ConjuredItem`). Each specialized class can define its own `updateQuality` method without modifying the original `Item` class or changing the behavior of the `Shop` class.

This allows to add new item types by extending the `Item` class rather than modifying existing code in multiple places.

3. **Polymorphism (Liskov Substitution Principle - LSP)**
”Object of a superclass should be replaceable with objects of a subclass without altering the correct of the program”

The `Shop` class operates on items in a generic way. It does not need to know the specific types of items; instead, it calls `updateQuality` on each item. This enables polymorphism, where any subclass of `Item` (like `AgedBrie` or `BackstagePass`) can be used, and their specialized behavior is executed without modifying the `Shop` class.

4. **Avoid Duplication (DRY - Dont Repeat Yourself)**
”Avoid code duplication by abstracting repeated logic”

    
    We’ve avoided repeating `updateQuality` logic for different types of items by using inheritance and polymorphism. Each subclass only implements the unique behavior it needs, while shared behavior is kept in the base class (`Item`).
    
    The `Shop` class doesn't repeat the update logic for each item type. Instead, it calls `updateQuality` on the individual items, allowing each subclass to handle its specifics.
    
5. **Descriptive Naming**
”Use names that clearly describe what variables, functions and classes do”

Class names like `AgedBrie`, `BackstagePass`, `ConjuredItem`, and `Sulfuras` are highly descriptive and reflect exactly what the class represents.
Method names like `updateQuality()` are also clear and convey the purpose of the method.

6. **Minimize Conditionals and Complexity**
”Avoid deep nesting of conditionals and complex logic.”

The `Shop` class minimizes deep nested conditionals by using `instanceof` to determine the specific item type and then delegates the behavior to that item’s own `updateQuality()` method. This reduces complexity inside the `Shop` class and keeps it simple.

7. **Code Readability**
”The code should be easy to read and understand”

The overall structure of the code is clean and easy to follow due to the use of inheritance and polymorphism.
The logic in `updateQuality` methods is simple and easy to understand, avoiding complex operations.
