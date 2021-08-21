const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
// console.log(uppercaseEl.checked);

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password=resultEl.innerText;
    if(!password)
    {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to the clipboard!");


});
generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword(upper, lower, number, symbol, length) {
    var generatedPassword = "";
    const typesCount = (upper + lower + number + symbol);
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    // console.log(typesArr);
    // const arr = [true, false, "", 45, null, "hello"];
    // console.log(arr.filter(item => item));
    if (typesCount === 0) {
        return "";
    }
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(
            type => {
                const funcName = Object.keys(type)[0];
                // console.log(funcName);
                generatedPassword += randomFunc[funcName]();
            });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}







const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomSymbols());