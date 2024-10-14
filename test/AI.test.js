const fs = require('fs');  
const path = require('path');  
const parser = require('@babel/parser');  

// Measure cyclomatic complexity for the entire file
function measureCyclomaticComplexity(sourceCode) {
  const syntaxTree = parser.parse(sourceCode, { sourceType: 'module' });
  let complexity = 1;  // Base complexity is 1

  const complexityIncreasingNodes = ['IfStatement', 'ForStatement', 'WhileStatement', 'SwitchCase', 'ConditionalExpression'];

  // Recursive function to traverse the AST
  function traverse(node) {
    if (complexityIncreasingNodes.includes(node.type)) {
      complexity += 1;
    }

    // Traverse the child nodes
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }

  // Start the traversal from the top-level AST nodes
  syntaxTree.program.body.forEach(traverse);

  return complexity;
}

// Measure lines of code (LOC) for the entire file
function measureLinesOfCode(sourceCode) {
  return sourceCode.split('\n').length;
}

// Read the source code from a file
function readSourceCode(filePath) {
  return fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
}

describe('Clean Code Metrics for AI_gilded_rose.js', () => {

  // Adjust the path to your actual file location
  const sourceCode = readSourceCode('../src/AI_gilded_rose.js');

  test('Cyclomatic complexity of AI_gilded_rose.js should not exceed 30', () => {
    const complexity = measureCyclomaticComplexity(sourceCode);
    console.log(`Cyclomatic Complexity of AI_gilded_rose.js: ${complexity}`);
    expect(complexity).toBeLessThanOrEqual(30);  // You can adjust this threshold
  });

  test('Lines of code in AI_gilded_rose.js should not exceed 200', () => {
    const loc = measureLinesOfCode(sourceCode);
    console.log(`Lines of Code in AI_gilded_rose.js: ${loc}`);
    expect(loc).toBeLessThanOrEqual(200);  // Adjust the threshold as necessary
  });
});
