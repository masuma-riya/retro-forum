// load data from API
const loadPosts = async (inputValue) => {
  let url;
   if(inputValue){
  url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`
 }
 else{
  url = "https://openapi.programming-hero.com/api/retro-forum/posts"
 }
  const res = await fetch(url);
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
}

// display all posts in UI
  const displayPosts = (posts) => {
  const postsContainer = document.getElementById("discuss-section-container");
  postsContainer.innerHTML = ""
    posts.forEach(post => {
    // create a div
    const div = document.createElement('div');
    // set innerHtml
    div.innerHTML = `<div class="bg-[#797DFC1A] p-10 rounded-2xl gap-5 w-full">
     <div class="flex flex-col lg:flex-row gap-7">
     <div>
     <div class="h-20 w-20  lg:text-left lg:m-0 text-center m-auto bg-[#f9f9fafd] rounded-lg">
      <img src="${post.image}" alt="">
  </div>
      <div class="h-5 w-5 lg:m-0 text-center m-auto ${post?.isActive?"bg-[#10B981]":"bg-red-600"} relative rounded-full left-9 lg:left-16 bottom-20 border-gray-200 border-2"></div>
  </div>
     <div>
     <div class="flex gap-10 justify-center lg:justify-start text-[#12132D99] font-bold">
     <div><span id="#">#</span> ${post.category}</div>
     <div><span id="Author">Author : </span>${post.author.name}</div>
  </div>
    
     <div class="text-center lg:text-left">
     <h1 class="font-bold text-xl my-2">${post.title}</h1>
     <p class="max-w-xl text-base font-medium text-[#12132D99] border-b-2 border-dashed pb-4 pt-2">${post.description}</p>
  </div>


     <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-center items-center lg:justify-between my-4 text-base font-medium text-[#12132D99]">
     <div class="flex gap-10">
     <div class="flex gap-2 text-lg">
    <img src="./images/mail (1).png"> <span>${post.comment_count}</span></div>
     <div class="flex gap-2 text-lg">
     <img src="./images/eye.png"> <span>${post.view_count}</span></div>
     <div class="flex gap-2 text-lg"> 
     <img src="./images/time.png"> <span>${post.posted_time}</span></div>
 </div>
 <div>
      <button onclick = 'handleAddToMark("${post.title.replace("'","")}--${post.view_count}")' class= "px-2 rounded-full bg-[#10B981] font-bold text-center text-xl text-white"><i class="fa fa-envelope" style="font-size:15px"></i></button>
      </div>
     </div>
    </div>
   </div>
  </div>`

  //   appendChild
    postsContainer.appendChild(div);
  });
  
  // hide loading spinner
  setTimeout(() => {
    spinner(false);
  }, 2000);
}


// load latestPosts from API
const loadLatestPosts = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
  const data = await res.json();
  const latestPosts = data;
  displayLatestPosts(latestPosts);
}

// display all latestPosts in UI
  const displayLatestPosts = (latestPosts) => {
  const latestPostsContainer = document.getElementById("latest-posts");

   latestPosts.forEach(latestPost => {
    // create a div
    const div = document.createElement('div');
    // set innerHtml
    div.innerHTML =`<div class="flex my-5 gap-3 w-4/5 m-auto">
      <div class="p-4 border rounded-xl">
      <div class="lg:w-72 h-44 w-full ml-3 2xl:gap-28 bg-[#12132D0D] rounded-2xl"><img class ="rounded-2xl" src="${latestPost.cover_image}" alt=""></div>
      <div class="flex gap-2 my-6 text-[#12132D99] font-semibold justify-center lg:justify-start"><img src="./images/calender.png" alt=""> <span id="date" class="text-base font-bold text-[#12132D99]">Time:</span>${latestPost?.author?.posted_date || 'No Publish Date'}</div>
      <div class="lg:w-80 space-y-3 text-center lg:text-left">
      <h1 class="text-[#12132D] text-lg font-bold">${latestPost.title}</h1>
      <p class="text-base text-[#12132D99]">${latestPost.description}</p>
 </div>
      <div class="flex justify-center lg:justify-start gap-5 my-4">
      <div class="w-11 h-11 rounded-lg">
      <img class="rounded-full" src="${latestPost.profile_image}" alt="">
 </div>
        <div>
        <div class="flex lg:text-left text-center flex-col text-base font-bold">${latestPost.author.name}<span class="text-sm text-[#12132D80]">${latestPost?.author?.designation || 'Unknown'}</span></div> 
    </div>
  </div>
 </div>`

  // appendChild
    latestPostsContainer.appendChild(div);
  })
}
// call the 2nd function for latest posts
loadLatestPosts();


// title and count view onclick
   const markDivContainer = document.getElementById('mark-div-container');
   const count = document.getElementById('count');


   const handleAddToMark = (value) =>{
   const convertToArray = value.split("--")
   const [title, view_count] = convertToArray
   const convertedCount = Number(count.innerText)+1
   count.innerText = convertedCount;

     const div = document.createElement('div')
     div.classList = "flex  bg-white px-10 py-4 rounded-lg mt-7 flex-col lg:flex-row lg:justify-center items-center";
     div.innerHTML = `<div>
             <h1 class="w-52 mt-auto my-3 lg:my-0 lg:text-left text-center text-base font-semibold text-black">${title}</h1>
     </div>
            <div>
            <div class="flex text-[#12132D99] font-medium space-x-2"> 
            <img src="./images/eye.png" alt="">
            <span>${view_count}</span>
     </div>
   </div>`

  //  appendChild
   markDivContainer.appendChild(div);
}

const inputContainer = document.getElementById('input-container');
const btnContainer = document.getElementById('button-container');

btnContainer.addEventListener('click', () =>{
     spinner(true);
     const inputValue = inputContainer.value;
     loadPosts(inputValue);
})

//  Loader
  const spinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spin');
   
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }

  else{
    loadingSpinner.classList.add('hidden');
  }
}

loadPosts();