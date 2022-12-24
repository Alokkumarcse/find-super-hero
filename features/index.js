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
// show all cards when search somethings in  the app
let getSuperheroData = (searchData) => {

   fetch(url)
   .then(response => response.json())
   .then(allData => {
      let resultData = allData.filter((ele) => {
         return ele.name.toLocaleLowerCase().includes(searchData.toLocaleLowerCase());
      });
      superheroCardContainer.innerHTML="";
      // if search result not found
      if(!resultData.length){
         superheroCardContainer.innerHTML =`
            <div class='search-not-found'>
              <img src="./images/no-result.jpg" alt="">
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
               <span class="favourite-btn" id="make-favourite" onclick="addToFavouriteList(this, ${ele.id})">Favourite</span> 
            </div>
         </div>`
         }
      )    
   })
   .catch(error => console.log(error));
}

// handle favourite button click, add character into favourite list
let favList = [];
let addToFavouriteList = (ele, id) => {
   favList = JSON.parse(localStorage.getItem('data'))||[];
   // if characters already favourited then don't add into favList
   if(favList.some(ele => ele.id === id)){
      window.alert("Already present into favouriteList!");
      return;
   }
   ele.style.backgroundColor= "tomato";
   fetch(url)
   .then(response => response.json())
   .then(responseData => {
      responseData.filter((ele) => {
         if(ele.id === id){
            favList.push(ele);
         }
      })
      localStorage.setItem('data', JSON.stringify(favList));
   })
   .catch(error => console.log(error));
}


// superhero info page to show the detailed info about them
let superheroInfo = (id) => {
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
                  <span class="make-favourite" id="make-favourite" onclick="addToFavouriteList(this, ${ele.id})">Favourite</span>
               </div>
               <div class="power-stats details">
                  <span class="title">Power Stats</span>
                  <span> 
                     <span class='about'>intelligence: </span>
                     <span class='value'> ${intelligence}</span>
                  </span>
                  <span> 
                     <span class='about'>strength: </span>
                     <span class='value'>${strength}</span>
                  </span>
                  <span>
                     <span class='about'> speed: </span>
                     <span class='value'> ${speed}</span>
                  </span>
                  <span>
                     <span class='about'> Durability: </span>
                     <span class='value'>${durability}</span>
                  </span>
                  <span>
                     <span class='about'>power: </span>
                     <span class='value'>${power}</span>
                  </span>
                  <span>
                     <span class='about'>combat: </span>
                     <span class='value'>${combat}</span>
                  </span>
               </div>

               <div class="biography details">
                  <span class="title">Biography</span>
                  <span>
                     <span class='about'>Alignment: </span>
                     <span class='value'>${alignment}</span>
                  </span>
                  <span>
                     <span class='about'>Alter Egos:</span>
                     <span class='value'> ${alterEgos}</span>
                  </span>
                  <span>
                     <span class='about'>Full Name: </span>
                     <span class='value'>${fullName}</span>
                  </span>
                  <span>
                     <span class='about'>Place Of Birth: </span>
                     <span class='value'>${placeOfBirth}</span>
                  </span>
                  <span>
                     <span class='about'>Publisher: </span>
                     <span class='value'>${publisher}</span>
                  </span>
                  <span>
                     <span class='about'>First Appearence: </span>
                     <span class='value'>${firstAppearance}</span>
                  </span>
                  <span>
                     <span class='about'>Aliases: </span>
                     <span class='value'>${aliases}</span>
                  </span>                 
               </div>

               <div class="apperarance details">
                  <span class="title">apperarance</span>
                  <span>
                     <span class='about'>Geneder: </span>
                     <span class='value'>${gender}</span>
                  </span>           
                  <span>
                     <span class='about'>Race: </span>
                     <span class='value'>${race}</span>
                  </span>           
                  <span>
                     <span class='about'>Height: </span>
                     <span class='value'>${heigth}</span>
                  </span>           
                  <span>
                     <span class='about'>Weight: </span>
                     <span class='value'>${weight}</span>
                  </span>  
                  <span>
                     <span class='about'>Eye Color: </span>
                     <span class='value'>${eyeColor}</span>
                  </span>           
                  <span>
                     <span class='about'>Hair Color: </span>
                     <span class='value'>${hairColor}</span>
                  </span>                    
               </div>

               <div class="connections details">
                  <span class="title">connections</span>
                  <span>
                     <span class='about'>Group Affiliation: </span>
                     <span class='value'>${groupAffiliation} </span>
                  </span>  
                  <span>
                     <span class='about'>Relatives: </span>
                     <span class='value'>${relatives}</span>
                  </span>           
               </div>

               <div class="works details">
                  <span class="title">works</span>
                  <span>
                     <span class='about'>Occupation: </span>
                     <span class='value'>${occupation} </span>
                  </span>  
                  <span>
                     <span class='about'>Base:</span>
                     <span class='value'>${base}</span>
                  </span>     
               </div>
               
            </div>
         </div>` 
      })
   })
   .catch(error => console.error(error));
}

