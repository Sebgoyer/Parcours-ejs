
var max = 500; 
var searchedNumber = Math.round(Math.random() * max);
var enteredNumber = parseInt(prompt('Quel est le nombre à trouver ?'));
var attempt = 1;

while (enteredNumber !== searchedNumber) {
    if ( isNaN(enteredNumber) ) {
        break;
    }

    if (enteredNumber < searchedNumber) {
        enteredNumber = parseInt(prompt('C\'est plus'));
    }
    else {
        enteredNumber = parseInt(prompt('C\'est moins'));
    }
    attempt += 1;
}

if (enteredNumber == searchedNumber) {
    alert('Bravo ! C\'était bien ' + searchedNumber + ' - Nombre d\'essais : ' + attempt);
} else {
    alert('Abandon après ' + attempt + ' essais. Dommage !');
}