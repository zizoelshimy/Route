//MCQ
//1st Question
function convertStringToNumber(str) {
  //return Number(str); the two ways worked
  return parseInt(str);
}
console.log(convertStringToNumber("123"));
//2nd Question
function checkTheFalsyValue(value) {
  if (!value) {
    return "Invalid";
  }
  return value;
}
console.log(checkTheFalsyValue(0));
//3rd Question 
function printOddNumbers() {
  let result = [];
  for (let i = 1; i <= 10; i++) {
    // Skip even numbers 
    if (i % 2 === 0) {
      continue;
    }
    result.push(i);
  }
  console.log(result);
}
printOddNumbers();
//4th Question
function filterOddNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}
console.log(filterOddNumbers([1, 2, 3, 4, 5, 6,7,8,9]));
//5th Question
function mergeTwoArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}
console.log(mergeTwoArrays([1, 2, 3], [4, 5, 6]));
//6th Question
function giveThedayofWeek(num) {
    switch(num) {
        case 1:
            return "sunday";
        case 2:
            return "monday";   
        case 3:
            return "tusday"; 
        case 4:
            return "wednesday";
        case 5:
            return "thrusday";    
        case 6:                    
            return "friday";
        case 7:
            return "saturday";  
        default:
            return "Invalid number";        
    }
}
console.log(giveThedayofWeek(2));
//7th Question
function returnThelengthofArray(arr) {
  return arr.map (item => item.length);
}
console.log(returnThelengthofArray(["a", "ab", "abc"]));
//8th Question
function checkDivision  (num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return "Divisible by both";
    } else if (num % 3 === 0) {
        return "Divisible by 3";
    } else if (num % 5 === 0) {
        return "Divisible by 5";
    } else {
        return "Not divisible by 3 or 5";
    }
}
console.log(checkDivision(15));
//9th Question
const squareTheNumbers = num => num * num;
console.log(squareTheNumbers(5));
//10th Question
function describePerson({ name, age }) {
  return `${name} is ${age} years old`;
}
console.log(describePerson({ name: "Alice", age: 30 }));
//11th Question
function acceprmulipleparameters(...x) {
  return x.reduce((sum, current) => sum + current, 0);
}
console.log(acceprmulipleparameters(1, 2, 3, 4, 5));

//12th Question
function returnPromiseResolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved after 2 seconds");
    }, 3000);
  });
}
returnPromiseResolveAfter3Seconds().then(message => console.log(message));
//13th Question
function getLargestNumber(arr) {
  return Math.max(...arr);
}
console.log(getLargestNumber([1, 5, 3, 9, 2]));
//14th Question
function takeObejctAndReturnKeys(obj) {
  return Object.keys(obj);
}
console.log(takeObejctAndReturnKeys({ a: 1, b: 2, c: 3 }));
//15th Question
function splitStringIntoArray(str) {
  return str.split(" ");
}
console.log(splitStringIntoArray("Hello moataz from ali"));
