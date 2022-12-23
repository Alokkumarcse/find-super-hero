let openMenu = document.getElementById('open-menu');
let closeMenu = document.getElementById('close-menu');
let navList = document.getElementById('nav-list');
let searchBtn = document.getElementById('search-span');
let superheroCardContainer = document.getElementById('superhero-card-container');
let superheroInfoContainer = document.getElementById('superhero-info-container');

// funtion for drop down menu
openMenu.addEventListener('click', () => {
   openMenu.classList.toggle('hide');
   closeMenu.classList.toggle('hide');
   navList.classList.toggle('hide')
});

closeMenu.addEventListener('click', () => {
   openMenu.classList.toggle('hide');
   closeMenu.classList.toggle('hide');
   navList.classList.toggle('hide');
});


// add listener in search button handle click and press enter
input = document.getElementById('input');
input.addEventListener('keypress', (e) => {
   if(e.key === "Enter"){
      handleSearchEvent();
   }
   return;
})

// function for search button 
let handleSearchEvent = () => {
      let inputBox = document.getElementById('input');
      let autoSuggest = document.getElementById('auto-suggest'); 
      let searchData = inputBox.value;
      //remove the input data from search box
      inputBox.value = '';
      autoSuggest.innerHTML = "";
      console.log(searchData);
      //now fecth data from api 
      if(!searchData) return;
      getSuperheroData(searchData);
}
searchBtn.addEventListener('click',handleSearchEvent);


// Set your API key and base ur
const url="https://akabab.github.io/superhero-api/api/all.json";

// show all cards when start the app
let getSuperheroData = (searchData) => {

   fetch(url)
   .then(response => response.json())
   .then(allData => {
      let resultData = allData.filter((ele) => {
         return ele.name.toLocaleLowerCase().includes(searchData.toLocaleLowerCase());
      });
      console.log(resultData);
      superheroCardContainer.innerHTML="";
      // if search result not found
      if(!resultData.length){
         superheroCardContainer.innerHTML =`
            <div class='search-not-found'>
              <img src="./logo/no-result.jpg" alt="">
              <a href="../index.html" class="back-to-home">Back to Home</a>
            </div> `
         return;
      }
      // if search result found
      resultData.map((ele) => {
         superheroCardContainer.innerHTML+=`
         <div class="superhero-card">
            <div class="card-left-block cur-poi"  onclick="superheroInfo(${ele.id})">
               <img src=${ele.images.sm} alt="">
            </div>
            <div class="card-right-block">
               <span class="title">${ele.name}</span>
               <span class="full-name">${ele.biography.fullName}</span>
               <span class="publisher">${ele.biography.publisher}</span>
               <span class="favourite-btn" id="make-favourite" onclick="addToFavouriteList(${ele.id})">Favourite</span> 
            </div>
         </div>`
         }
      )    
   })
   .catch(error => console.log(error));
}

//make favourite list container
let favList = [];

// handle favourite button click, add character into favourite list
let addToFavouriteList = (id) => {
   favList = JSON.parse(localStorage.getItem('data')) || [];
   fetch(url)
   .then(response => response.json())
   .then(allData => {
      favList.push(allData.filter((ele) => ele.id === id ));
      localStorage.setItem('data',JSON.stringify(favList));
   })
   .catch(error => console.error(error));
}


// superhero info page to show the detailed info about them
let superheroInfo = (id) => {
   console.log("hello");
   superheroCardContainer.innerHTML = "";
   fetch(url)
   .then(response => response.json())
   .then(allData => allData.filter((ele) => ele.id === id))
   .then(result => { result.map((ele) => {
        const {appearance, biography, connections, images, name, powerstats, work } = ele;
        const {combat, durability, intelligence, power, speed, strength} = powerstats;
        const { eyeColor, gender, hairColor, heigth, race, weight} = appearance;
        const {aliases, alignment, alterEgos, firstAppearance, fullName, placeOfBirth, publisher}= biography;
        const {groupAffiliation, relatives} = connections;
        const {base, occupation}= work;
         superheroCardContainer.innerHTML +=`
         <div class="superhero-info-card" id="superhero-info-card">
            <div class="left-block-info">
               <img src="${images.lg}" alt="">
            </div>
            <div class="right-block-info">
               <div class="name-favourite">
                  <span class="hero-name">${name}</span>
                  <span class="make-favourite" id="make-favourite" onclick="addToFavouriteList(${ele.id})">favourite</span>
               </div>
               <div class="power-stats details">
                  <span class="title">Power Stats</span>
                  <span>intelligence:${intelligence}</span>
                  <span>strength: ${strength}</span>
                  <span>speed: ${speed}</span>
                  <span>Durability:${durability}</span>
                  <span>power: ${power}</span>
                  <span>combat:${combat}</span>
               </div>
               <div class="biography details">
                  <span class="title">Biography</span>
                  <span>Alignment: ${alignment}</span>
                  <span>Alter Egos: ${alterEgos}</span>
                  <span>Full Name: ${fullName}</span>
                  <span>Place Of Birth: ${placeOfBirth}</span>
                  <span>Publisher:${publisher} </span>
                  <span>First Appearence:${firstAppearance} </span>
                  <span>Aliases:${aliases} </span>
               </div>
               <div class="apperarance details">
                  <span class="title">apperarance</span>
                  <span>Geneder:${gender} </span>
                  <span>Race:${race} </span>
                  <span>Height:${heigth} </span>
                  <span>Weight:${weight} </span>
                  <span>Eye Color:${eyeColor} </span>
                  <span>Hair Color:${hairColor}</span>
               </div>
               <div class="connections details">
                  <span class="title">connections</span>
                  <span>Group Affiliation:${groupAffiliation} </span>
                  <span>Relatives:${relatives} </span>
               </div>
               <div class="works details">
                  <span class="title">works</span>
                  <span>Occupation:${occupation} </span>
                  <span>Base:${base} </span>
               </div>
            </div>
         </div>` 
      })
   })
   .catch(error => console.error(error));
}

