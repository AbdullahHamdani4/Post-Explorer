import './style.css'
const header=document.querySelector("header")
const searchBarParent=document.querySelector(".searchBar")
const searchBar = document.getElementById("searchInput")
const sideBar = document.querySelector("aside");
const postDetail = document.querySelector("section");
function mobileLayout (whichToShow){
  const isSmall = window.matchMedia("(max-width: 1024px)");
  if (isSmall.matches) {
    if (whichToShow) {
       sideBar.classList.add("hidden");
      searchBarParent.classList.add("hidden");
      // header.classList.remove("h-25");
      // header.classList.add("h-18");
      postDetail.classList.remove("hidden");
    } else {
      sideBar.classList.remove("hidden");
      searchBarParent.classList.remove("hidden");
      // header.classList.add("h-25");
      // header.classList.remove("h-18");
      postDetail.classList.add("hidden");
    }
  }


}
window.mobileLayout=mobileLayout;
const apiDataAll = async () => {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  const posts = data.posts;
  const mappedPost = posts.map((each) => {
    return `
         <div class="sideBarCard bg-sidebar-card hover:bg-sidebar-card-hover border border-sidebar-border shadow-card hover:shadow-card-hover pl-3.5 py-2 transition duration-500 rounded-2xl animate__animated animate__animated animate__fadeInUp">
            <span class="text-small font-semibold bg-blue p-1 px-2.5 rounded">${each.id}</span>
            <p class="text-card-title font-heading text-text font-semibold mt-2 w-[82%] truncate">${each.title}</p>
            <p class="text-small text-text-light w-[90%]  line-clamp-3">${each.body}</p>
            <div class=" mt-3 flex justify-between pr-2">
              <span class="text-blue font-semibold"><i class="fa-solid fa-heart text-[14px] mr-0.5"></i>${each.reactions.likes} likes</span>
              <button class="h-8 w-8 rounded border-card border hover:bg-blue transition duration-400 text-text-light hover:text-[#36454F] hover:cursor-pointer" onclick="showDetail(${each.id});      mobileLayout(true)"><i class="fa-solid fa-arrow-right   text-xl "></i></button>
            </div>
          </div>
        `

  });
  sideBar.innerHTML = mappedPost.join("");
};
apiDataAll()


const apiDataSearch = async (query) => {
  const response = await fetch(`https://dummyjson.com/posts/search?q=${query}`);
  const data = await response.json();
  const posts = data.posts;
  const mappedPost = posts.map((each) => {
    return `
         <div class="sideBarCard bg-sidebar-card hover:bg-sidebar-card-hover border border-sidebar-border shadow-card hover:shadow-card-hover pl-3.5 py-2 transition duration-500 rounded-2xl animate__animated animate__fadeInUp">
            <span class="text-small font-semibold bg-blue p-1 px-2.5 rounded">${each.id}</span>
            <p class="text-card-title font-heading text-text font-semibold mt-2 w-[82%] truncate">${each.title}</p>
            <p class="text-small text-text-light w-[90%]  line-clamp-3">${each.body}</p>
            <div class=" mt-3 flex justify-between pr-2">
              <span class="text-blue font-semibold"><i class="fa-solid fa-heart text-[14px] mr-0.5"></i>${each.reactions.likes} likes</span>
              <button class="h-8 w-8 rounded border-card border hover:bg-blue transition duration-400 text-text-light hover:text-[#36454F] hover:cursor-pointer" onclick=showDetail(${each.id}); mobileLayout(true)><i class="fa-solid fa-arrow-right   text-xl "></i></button>
            </div>
          </div>
        `


  });
  sideBar.innerHTML = mappedPost.join("");

};

const showDetail = async (id) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await response.json();

  postDetail.innerHTML = `
   <button class="group flex items-center gap-2 w-fit bg-sidebar-card border border-sidebar-border  rounded-2xl px-4 py-2 shadow-card transition-all duration-400 cursor-pointer hover:shadow-card-hover lg:hidden" onclick=mobileLayout(false)>
    <i class="fa-solid fa-arrow-left text-meta-text text-small transition-colors duration-300 group-hover:text-blue"></i>

    <span class="text-small font-medium text-meta-text tracking-wide transition-colors duration-300 group-hover:text-blue">
        Back to Posts
    </span>

      </button>

      <div class="postDetails  border border-post-border rounded-xl bg-card shadow-card  relative animate__animated animate__fadeIn flex flex-col">
          <div class="postHeader p-8">
            <span
              class="text-small font-bold text-blue uppercase tracking-widest bg-sidebar-card-hover p-1 rounded px-2 ">POST
              #${data.id}</span>
            <p class="text-logo sm:text-[2.5rem]  font-heading md:text-title text-title-text leading-tight mt-2 sm:mt-0">${data.title}</p>
            <div class="flex items-center gap-4 text-moreSmall md:text-small text-meta-text font-medium mt-2 sm:mt-0">
              <span class="font-semibold"><i class="fa-solid fa-heart text-[14px] mr-0.5 text-blue"></i>${data.reactions.likes} likes</span>
              <span class=" font-semibold"><i class="fa-solid fa-thumbs-down text-[14px] mr-0.5 text-blue"></i>${data.reactions.dislikes}
                Dislikes</span>
              <span><i class="fa-regular fa-eye text-blue"></i>${data.views} views</span>
              <span><i class="fa-solid fa-tag text-blue"></i> ${data.tags.join(", ")}</span>
            </div>
          </div>
          <hr class="h-0.5 bg-post-divider">
          <div class="postBody text-body-text text-small md:text-body leading-6 p-8">
           ${data.body}
          </div>
          <div
            class=" w-full postFooter text-moreSmall md:text-small text-meta-text self-end bottom-2 flex justify-around border-t border-post-divider py-2">
            <div class="flex items-center gap-3 font-semibold">
              <span><i class="fa-regular fa-calendar-days text-[18px]"></i></span>
              <div class="flex flex-col">
                <span>Published on</span>
                <span>May 30,2026</span>
              </div>
            </div>
            <div class="flex items-center gap-3 font-semibold">
              <span><i class="fa-regular fa-clock text-[18px]"></i></span>
              <div class="flex flex-col">
                <span>Reading time</span>
                <span>2 min read</span>
              </div>
            </div>
          </div>
        </div>
    
    `
};
window.showDetail = showDetail
searchBar.addEventListener("input", () => {
  if (searchBar.value.toLowerCase().trim()) {
    apiDataSearch(searchBar.value.toLowerCase().trim());
  } else apiDataAll()
})