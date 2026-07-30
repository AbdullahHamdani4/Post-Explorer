const searchBar=document.getElementById("searchInput")
const postList=document.getElementById("postList");
const postDetail=document.getElementById("postDetail");

const apiDataAll=async()=>{
    const response=await fetch("https://dummyjson.com/posts");
    const data=await response.json();
    const posts=data.posts;
    const mappedPost=posts.map((each)=>{
        return `
        <div class="post-item active" id="post-1">
        <span class="post-index">${each.id}</span>
        <h3 class="post-title">${each.title}</h3>
        <p class="post-body truncate-2">${each.body}</p>
        <div class="post-meta">
          <span class="post-reactions">${each.reactions.likes} likes</span>
         </div>
      </div>
        `
    });
    postList.innerHTML=mappedPost.join("");
  };
// console.log();
apiDataAll()


const apiDataSearch=async(query)=>{
    const response=await fetch(`https://dummyjson.com/posts/search?q=${query}`);
    const data=await response.json();
    const posts=data.posts;
    const mappedPost=posts.map((each)=>{
        return `
        <div class="post-item active" id="post-1" onclick="showDetail(${each})"
        >
        <span class="post-index">${each.id}</span>
        <h3 class="post-title">${each.title}</h3>
        <p class="post-body truncate-2">${each.body}</p>
        <div class="post-meta">
          <span class="post-reactions">${each.reactions.likes} likes</span>
         </div>
      </div>
        `
    });
    postList.innerHTML=mappedPost.join("");
     
};

const showDetail=(post)=>{
 showDetail.innerHTML=`
  <span class="detail-index">${each.id}</span>
      <h2 class="detail-title">${each.title}</h2>
      <div class="detail-meta">
        <span class="detail-reactions">${each.reactions.likes}</span>
        <span class="detail-views">${each.views} views</span>
       </div>
      <p class="detail-body">${each.body}</p>

 `
}
searchBar.addEventListener("input",()=>{
    if(searchBar.value.toLowerCase().trim()){
        apiDataSearch(searchBar.value.toLowerCase().trim());
    }else apiDataAll()
})