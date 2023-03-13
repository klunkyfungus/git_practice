// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]
const test = [4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const luhnAlgorithm = arr => {
    let sum = 0;
    if (arr.length % 2 === 1) {
        for (let i = arr.length-1; i >= 0 ; i--) {
            if ((i + 2) % 2 === 1) {
                sum += (arr[i] * 2 > 9 ? (arr[i] * 2) - 9:(arr[i] * 2));
            } else {
                sum += arr[i];
            }
            //console.log(`This is i: ${i}`);
            //console.log(sum);
        }
    } else {
        for (let i = arr.length-1; i >= 0 ; i--) {
            if ((i + 2) % 2 === 0) {
                sum += (arr[i] * 2 > 9 ? (arr[i] * 2) - 9:(arr[i] * 2));
            } else {
                sum += arr[i];
            }
            //console.log(`This is i: ${i}`);
            //console.log(sum);
        }
    }

    return sum;
}

const validateCred = arr => {
    let sum = luhnAlgorithm(arr);
    if (sum % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

console.log("Test of validateCred function should return 'true'.")
console.log(`Test returns: ${validateCred(test)}`);

const findInvalidCards = arr => arr.filter(elem => !validateCred(elem));

//console.log(findInvalidCards(batch));

const idInvalidCardCompanies = arr => {
    let companies = [];
    const companyLookup = arr => {
        for (const elem of arr) {
            switch (arr[0]) {
                case 3:
                   return 'Amex (American Express)';
                case 4:
                    return 'Visa';
                case 5:
                    return 'Mastercard';
                case 6:
                    return 'Discover';
            }
        }
    }
    let invalidCardCompanies = findInvalidCards(arr).map(companyLookup);
    invalidCardCompanies = invalidCardCompanies.filter((elem, index) => index === invalidCardCompanies.indexOf(elem) ? true:false);
    return invalidCardCompanies;
}

console.log("Test of idInvalidCardCompanies should return 4 companies only once.")
console.log(`Test returns: ${idInvalidCardCompanies(batch)}`);

const creditCardNumberGenerator = string => {
    let newCCNumber = [];
    for (const char of string) {
        newCCNumber.push(parseInt(char));
    }
    return newCCNumber;
}

console.log('New user entered card number will appear below.');
let newCard = creditCardNumberGenerator('4363542234259932');
console.log(newCard);

console.log(`New user entered card number is valid? ${validateCred(newCard)}`);

const makeCCValid = arr => {
    let sum = luhnAlgorithm(arr);
    let difference = sum % 10;
    if (difference <= arr[arr.length-1]) {
        arr[arr.length-1] -= difference;
    } else {
        arr[arr.length-1] += 10 - difference;
    }
    
    if (validateCred(arr)) {
        return arr;
    }
}

console.log('If the newCard is not valid the following should return a card number that has been made valid.');
let newValidCard =  makeCCValid(newCard)
console.log(newValidCard);