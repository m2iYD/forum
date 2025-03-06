document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/api/questions", { 
        method: "GET",
        headers: { "Content-Type": "application/json",
        "Authorization": "Bearer " + token }
      })
      .then(response => response.json())
      .then(data => displayPosts(data))
      .catch(error => {
        console.error("Erreur lors du chargement des posts:", error);
        document.getElementById("posts").innerHTML = "<p>Erreur de chargement des posts.</p>";
      });
  });
  
  // function displayPosts(posts) {
  //   const postsContainer = document.getElementById("posts");
  //   let html = "";
  //   posts.forEach(post => {
  //     html += `
  //       <div class="post-card">
  //         <h2>${post.title}</h2>
  //         <p><em>Par ${post.author ? post.author.username : "Inconnu"} le ${new Date(post.created_at).toLocaleDateString()}</em></p>
  //         <p>${post.content.substring(0, 150)}...</p>
  //         <a href="post.html?id=${post.id}">Lire la suite</a>
  //       </div>
  //     `;
  //   });
  //   postsContainer.innerHTML = html;
  // }
  