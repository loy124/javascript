const body = document.body;
const words = document.createElement('div');
words.textContent = '제로초';
body.append(words);

const form = document.createElement('form');
body.append(form);

const inputSpace = document.createElement('input');
form.append(inputSpace);

const buttonSpace = document.createElement('button');
form.append(buttonSpace);
buttonSpace.textContent = '입력';

const result = document.createElement('div');
body.append(result);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if(words.textContent[words.textContent.length -1] === inputSpace.value[0]){
    //
    result.textContent ='딩동댕';
    words.textContent = inputSpace.value;
    inputSpace.value ='';
    inputSpace.focus();
  }
  else{
    result.textContent = '땡!';
    inputSpace.value ='';
    inputSpace.focus();
  }
}); // 콜백함수




// let word = "이온유";

// while(true){
//   let answer = prompt(word);
//   if(word[word.length -1] === answer[0]){
//     alert("딩동댕");
//     word = answer;
//   }
//   else{
//     alert("떙");
//   }
// }