let inputBox = document.getElementById('input');
let autoSuggest = document.getElementById('auto-suggest'); 
let input = document.getElementById('input');


// Handle all keypress for giving input in serach box
inputBox.onkeyup =  (e) => {
   let userInput = e.target.value;
   
   // filter userInput match from character data list
   let suggestedList = [];
   if(userInput){
      suggestedList = characters.filter((word) =>{
         return word.toLocaleLowerCase().startsWith(userInput.toLocaleLowerCase());
      });
      // make <li></li> of suggestedList data
      let listData  = suggestedList.map((data) => {
         return '<li>'+data+'</li>';
      }).join('');
      console.log(listData);
      // add suggested match into auto suggestion box
      autoSuggest.innerHTML="";
      autoSuggest.innerHTML += listData;
      // on any change on input box show updated suggestion 
      updatedSuggestion(suggestedList);
      // add event listener to suggestion so that able to select when click on that suggestion
      let matchedSuggestion = document.querySelectorAll('.auto-suggest li');
      for(let i = 0; i<matchedSuggestion.length; i++){
         matchedSuggestion[i].setAttribute('onclick', 'suggestionSelected(this)');
      }
   }else{
      autoSuggest.innerHTML = "";
   }
}

let suggestionSelected = (ele) => {
   console.log(ele);
   input.value = ele.innerHTML;
   autoSuggest.classList.toggle('hide');
} 

let updatedSuggestion = (suggestedList) => {
   if(!suggestedList.length){
      return;
   }else{
      autoSuggest.classList.remove('hide');
   }
}
