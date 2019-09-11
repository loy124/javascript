let number1 = Math.ceil(Math.random() * 9);
let number2 = Math.ceil(Math.random() * 9); 
let multiple = number1 * number2;

const body = document.body;
const words = document.createElement('div');
words.textContent = String(number1) + ' 곱하기 ' + String(number2) + ' 는? ';
body.append(words);

const form = document.createElement('form');
body.append(form);

const inputSpace = document.createElement('input');
form.append(inputSpace);
// inputSpace.type = 'number';
const buttonSpace = document.createElement('button');
form.append(buttonSpace);
buttonSpace.textContent = '입력';

const result = document.createElement('div');
body.append(result);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(inputSpace, result)
  if (multiple === Number(inputSpace.value)){
    result.textContent = '딩동댕';
    number1 = Math.ceil(Math.random() * 9);
    number2 = Math.ceil(Math.random() * 9); 
    multiple = number1 * number2;
    words.textContent = String(number1) + ' 곱하기 ' + String(number2) + ' 는? ';
    inputSpace.value='';
    inputSpace.focus();
  }

  else{
    result.textContent = '땡!';
    inputSpace.value='';
    inputSpace.focus();
  }
}); // 콜백함수
