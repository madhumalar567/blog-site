// Load posts from localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Create a new blog post
function createPost() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please enter both title and content!");
    return;
  }

  const newPost = {
    id: Date.now(),
    title,
    category,
    content,
    comments: []
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  clearForm();
  renderPosts();
}

// Display all posts
function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>No posts yet. Create your first post above!</p>";
    return;
  }

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p><b>Category:</b> ${post.category || "Uncategorized"}</p>
      <p>${post.content}</p>

      <div class="post-actions">
        <button class="delete-btn" onclick="deletePost(${post.id})">🗑 Delete Post</button>
      </div>

      <h4>Comments</h4>
      <div id="comments-${post.id}">
        ${post.comments.map(c => `<div class="comment"><b>${c.name}</b>: ${c.text}</div>`).join("")}
      </div>
      <div class="comment-box">
        <input type="text" id="name-${post.id}" placeholder="Your name">
        <input type="text" id="comment-${post.id}" placeholder="Add a comment">
        <button onclick="addComment(${post.id})">Post Comment</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// Add comment to a post
function addComment(postId) {
  const nameField = document.getElementById(`name-${postId}`);
  const commentField = document.getElementById(`comment-${postId}`);

  const name = nameField.value.trim() || "Anonymous";
  const text = commentField.value.trim();

  if (!text) {
    alert("Comment cannot be empty!");
    return;
  }

  const post = posts.find(p => p.id === postId);
  post.comments.push({ name, text });

  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

// Delete a post
function deletePost(postId) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  posts = posts.filter(post => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

// Clear post form
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("content").value = "";
}

// Initial render
renderPosts();
