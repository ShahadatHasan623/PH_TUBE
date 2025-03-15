function removeActiveClass(){
      const activeButtons =document.getElementsByClassName("active")
      for(let btn of activeButtons){
            btn.classList.remove("active")
      }

}



function loadcategory() {
      //1, fetch the       data 
      fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

            // 2, - convert promise to json 
            .then(res => res.json())
            // 3, send data to display 
            .then(data => displayCategories(data.categories))
}
// load videos 
function loadVideos() {
      fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
            .then(res => res.json())
            .then(data =>{
                  document.getElementById("btn-all").classList.add("active")
                  displayVideos(data.videos)
            })
}
const loadcategoryVideos =(id)=>{
    
      const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
      console.log(url)
      fetch(url)
      .then(res=>res.json())
      .then(data => {
            removeActiveClass()
            const clickbutton =document.getElementById(`btn-${id}`)
            clickbutton.classList.add("active")
            displayVideos(data.category)
      })
}
const loadVideoDetails=(videoId)=>{
      console.log(videoId);
      const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
      fetch(url)
      .then(res => res.json())
      .then(data => displayVideoDetails(data.video))
}
const displayVideoDetails =(video)=>{
       console.log(video)
}

function displayCategories(categories) {
      // get the container 
      const categoryContainer = document.getElementById("category-container")
      // loop operation on array of object 
      for (let cat of categories) {
            // creat element 
            const categoryDiv = document.createElement("div")
            categoryDiv.innerHTML = `
           <button id="btn-${cat.category_id}" onclick="loadcategoryVideos(${cat.category_id})" class="btn btn-sm  hover:bg-red-600 hover:text-white">${cat.category}</button>
           `
            // append the element 
            categoryContainer.appendChild(categoryDiv)
      }


}
const displayVideos = (videos) => {
      const videoContainer = document.getElementById("video-container")
      videoContainer.innerHTML ="";
      if(videos.length == 0){
            videoContainer.innerHTML = ` <div class="col-span-full flex justify-center items-center py-5 flex-col">
                  <img class="w-[120px]" src="./assests/Icon.png" alt="">
                  <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>`;
      }
      videos.forEach(video => {
            //     createElement
            const displayVideos = document.createElement("div")
            displayVideos.innerHTML = `
            <div class="card bg-base-100 w-96 ">
                  <figure class="relative">
                        <img class="w-full h-[190px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                        <span class="absolute bottom-2 right-2 text-white bg-black px-2 rounded-lg">3hrs 56 min
                              ago</span>
                  </figure>
                  <div class="flex gap-4 px-0 py-5">
                        <div class="profile">
                              <div class="avatar">
                                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                          <img
                                                src="${video.authors[0].profile_picture}" />
                                    </div>
                              </div>
                        </div>
                        <div class="intro">
                              <h1 class="text-sm font-semibold">${video.title}</h1>
                              <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="w-5 h-5"src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                              <p class="text-sm text-gray-400">${video.others.views} views</p>
                        </div>
                 
                   </div>
                   <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Video Details</button>
            </div>
      `
            videoContainer.appendChild(displayVideos)

      });
}
loadcategory()
