
const tableId = document.getElementById("table-id");
const tablebody1 = document.getElementById("table-body-1");
const showMoreData = document.getElementById("show-more");
const postsTable = document.getElementById("posts-table");
const tablebody2 = document.getElementById("table-body-2");
const commentsTable = document.getElementById("comments-table");
const tablebody3 = document.getElementById("table-body-3");
const loadingModal = document.getElementById("loading-modal");
const userBtn = document.getElementById("userBtn");

async function fetchUsers() {
  showLoadingModal();
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(url);
  const users = await response.json();
  setTimeout(()=>{
  hideLoadingModal();
  console.log(users);
  userBtn.style.visibility= "hidden";
  showTable(users);

  },2000);
}

async function fetchPosts(userId) {
  showLoadingModal();
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await fetch(url);
  const posts = await response.json();
  setTimeout(()=>{
  hideLoadingModal();
  console.log(posts);
  updateTable(posts);
  },2000)
}

async function fetchComments(postId) {
  showLoadingModal();
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
  const response = await fetch(url);
  const comments = await response.json();
  setTimeout(()=>{
  hideLoadingModal();
  console.log(comments);
  updateComntTable(comments);
  },2000)
}

function showLoadingModal() {
  // loadingModal.style.display = "block";
  loadingModal.style.visibility = "visible";
}

function hideLoadingModal() {
  // loadingModal.style.display = "none";
  loadingModal.style.visibility = "hidden";

}



function showTable(users) {
  if (users) {
    tableId.style.display = "block"; // Use double quotes around "block" to make it a string

    users.map(user => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = user.id; // Use "user.id" instead of "users.id"
      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      const userName = document.createElement("td");
      userName.textContent = user.username;
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      const showMore = document.createElement("td");
    //   showMore.innerHTML = `<a href="#" onclick="showPosts()">Show Posts</a>`
    //   showMore.setAttribute("id", "show-more");

      const showMoreLink = document.createElement("a");
      showMoreLink.href = '#';
      showMoreLink.textContent = 'Show More';
      showMoreLink.addEventListener('click', () => showUserDetails(user));
      showMore.appendChild(showMoreLink);

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(userName);
      row.appendChild(emailCell);
      row.appendChild(showMore);

      tablebody1.appendChild(row);
    });
  } else {
    // Handle the case when users is falsy (e.g., if there are no users)
  }

}
function showUserDetails(user) {

    tableId.style.display = "none";
    // const userDetailsTable = document.createElement("table")
    fetchPosts(user.id)

}

const updateTable = (posts) => {
    postsTable.style.display = "block";

    posts.map(post => {
    const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = post.id; 
      const titleCell = document.createElement("td");
      titleCell.textContent = post.title;
      const bodyCell = document.createElement("td");
      bodyCell.textContent = post.body;
      const commentsMore = document.createElement("td");

      const showComments = document.createElement("a");
      showComments.href = '#';
      showComments.textContent = 'Show Comments';
      showComments.addEventListener('click', () => showCommentsFn(post));
      commentsMore.appendChild(showComments);

      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(bodyCell);
      row.appendChild(commentsMore);

      tablebody2.appendChild(row);

    })


}

const showCommentsFn = (post)=> {
  postsTable.style.display = "none";
  fetchComments(post.userId); 
}

const updateComntTable = (comments) => {
  commentsTable.style.display = "block";

  comments.map(comment=> {
  const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = comment.id; 
    const nameCell = document.createElement("td");
    nameCell.textContent = comment.name;
    const emailCell = document.createElement("td");
    emailCell.textContent = comment.email;
    const bodyCell = document.createElement("td");
    bodyCell.textContent = comment.body;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(bodyCell);

    tablebody3.appendChild(row);

  })


}




