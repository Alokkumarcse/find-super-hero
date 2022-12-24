
let openMenu = document.getElementById('open-menu');
let closeMenu = document.getElementById('close-menu');
let navList = document.getElementById('nav-list');
let superheroCardContainer = document.getElementById('superhero-card-container');



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

let favouriteList = JSON.parse(localStorage.getItem('data'))||[];
// shwo favouriteList method
let showFavouriteList = () => {
   favouriteList = JSON.parse(localStorage.getItem('data'));
   superheroCardContainer.innerHTML="";
   // if favList is empty
   if(!favouriteList.length){
      superheroCardContainer.innerHTML =`
         <div class='search-not-found'>
         <img src="./images/empty-list.jpg" alt="">
         <a href="../index.html" class="back-to-home">Back to Home</a>
         </div> `
         return;
   }
   // if favList not empty
   favouriteList.map((ele) => {
      superheroCardContainer.innerHTML+=`
      <div class="superhero-card">
         <div class="card-left-block cur-poi">
            <img src=${ele.images.sm} alt="">
         </div>
         <div class="card-right-block">
            <span class="title">${ele.name}</span>
            <span class="full-name">${ele.biography.fullName}</span>
            <span class="publisher">${ele.biography.publisher}</span>
            <span class="favourite-btn" onclick="remove(${ele.id})" style="color: red">Remove</span> 
         </div>
      </div>`
      }
   )    
}
showFavouriteList();

// remove superhero from favourite list
let remove = (id) => {
   let favList = JSON.parse(localStorage.getItem('data'))||[];
   if(!favList.length)return;
   favList = favList.filter((ele) => ele.id !== id)
   localStorage.setItem('data', JSON.stringify(favList));
   // reload the favourite list
   showFavouriteList();
}
