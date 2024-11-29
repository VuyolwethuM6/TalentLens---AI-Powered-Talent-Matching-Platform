export const questions = {
  frontend: [
    {
      id: 1,
      question: "What's the output of this code?",
      code: `const arr = [1, 2, 3];
arr.map(x => x * 2);
console.log(arr);`,
      options: ["[1, 2, 3]", "[2, 4, 6]", "undefined", "Error"],
      correct: 0,
      explanation: "map() creates a new array and doesn't modify the original array"
    },
    {
      id: 2,
      question: "What's the difference between == and === in JavaScript?",
      options: [
        "== checks value only, === checks value and type",
        "They are exactly the same",
        "=== checks value only, == checks value and type",
        "== is deprecated, === is the new standard"
      ],
      correct: 0
    },
    {
      id: 3,
      question: "How does this CSS Grid code behave?",
      code: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`,
      options: [
        "Creates responsive columns that automatically fit the container",
        "Creates exactly 3 columns of 200px each",
        "Creates a single column layout",
        "This is invalid CSS syntax"
      ],
      correct: 0
    }
  ],
  backend: [
    {
      id: 1,
      question: "What's the output of this Node.js code?",
      code: `const promise = Promise.resolve(1);
promise.then(val => val + 1)
       .then(val => console.log(val));`,
      options: ["1", "2", "undefined", "Error"],
      correct: 1
    },
    {
      id: 2,
      question: "Which HTTP status code is most appropriate for a successful POST request creating a new resource?",
      options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
      correct: 1
    }
  ],
  algorithms: [
    {
      id: 1,
      question: "What's the time complexity of this function?",
      code: `function search(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === target) return i;
  }
  return -1;
}`,
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2
    },
    {
      id: 2,
      question: "Which data structure would be most efficient for implementing a cache with a fixed size and LRU eviction policy?",
      options: [
        "Array",
        "Hash Map with Doubly Linked List",
        "Binary Search Tree",
        "Stack"
      ],
      correct: 1
    }
  ]
};