// All the 97 65 48 numbers are from the char code chart

const lowerEl=document.getElementById('lowercase');
const upperEl=document.getElementById('uppercase');
const numbersEl=document.getElementById('numbers');
const symbolsEl=document.getElementById('symbols');
const resultEl=document.getElementById('result');
const generateEl=document.getElementById('generate');
const lengthEl=document.getElementById('length');
const clipboardEl=document.getElementById('clipboard');


const randomFunc={
    lower:getLowerCase,
    upper:getUpperCase,
    number:getRandomNumber,
    symbol:getRandomSymbol

};
generateEl.addEventListener('click',()=>{
    const length=+lengthEl.value;
   
    const hasLower=lowerEl.checked;
    const hasUpper=upperEl.checked;
    const hasNumber=numbersEl.checked;
    const hasSymbol=symbolsEl.checked;
    resultEl.innerText=generatePassword(length,hasLower,hasUpper,hasSymbol,hasNumber);

});
clipboardEl.addEventListener('click',()=>{
    const textarea=document.createElement('textarea');
    const password=resultEl.innerText;
    if(!password){
        return;
    }
    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});
function generatePassword(length, lower, upper, symbol, number) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
    .filter(item => Object.values(item)[0]);
	

	if(typesCount === 0) {
		return '';
	}
	

	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getLowerCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getUpperCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
function getRandomSymbol(){
    const symbols='!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
}
