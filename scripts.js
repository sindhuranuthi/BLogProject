document.addEventListener('DOMContentLoaded', () => {
    const postsDiv = document.getElementById('posts');
    const noPostsDiv = document.getElementById('no-posts');
    const postForm = document.getElementById('postForm');

    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        if (posts.length === 0) {
            postsDiv.style.display = 'none';
            noPostsDiv.style.display = 'block';
        } else {
            postsDiv.style.display = 'block';
            noPostsDiv.style.display = 'none';
            postsDiv.innerHTML = '';
            
            posts.forEach((post, index) => {
                // Create elements for each post
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                
                // Create title element
                const titleElement = document.createElement('h3');
                titleElement.textContent = post.title;
                titleElement.style.cursor = 'pointer';
                
                // Create content element (initially hidden)
                const contentElement = document.createElement('p');
                contentElement.innerHTML = post.content.replace(/<br>/g, '\n'); // Convert <br> tags back to new lines
                contentElement.style.display = 'none';
                
                // Toggle content visibility on title click
                titleElement.addEventListener('click', () => {
                    if (contentElement.style.display === 'none') {
                        contentElement.style.display = 'block';
                    } else {
                        contentElement.style.display = 'none';
                    }
                });

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-button';
                deleteButton.addEventListener('click', () => {
                    deletePost(index);
                });

                // Append title, content, and delete button to postDiv
                postDiv.appendChild(titleElement);
                postDiv.appendChild(contentElement);
                postDiv.appendChild(deleteButton);
                
                // Append postDiv to postsDiv
                postsDiv.appendChild(postDiv);
            });
        }
        
        // Display the empty image if no posts
        if (posts.length === 0) {
            postsDiv.style.display = 'none';
            noPostsDiv.style.display = 'block';
        }
    };

    const savePost = (title, content) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const escapedContent = content.replace(/\n/g, '<br>'); // Convert new lines to <br> tags
        posts.push({ title, content: escapedContent });
        localStorage.setItem('posts', JSON.stringify(posts));
        window.location.href = './index.html'; // Redirect to index.html after saving post
    };

    const deletePost = (index) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); // Reload posts after deleting post
    };

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            savePost(title, content); // Call savePost with form values
            postForm.reset(); // Optionally reset the form after submission
        });
    }

    // Ensure navigating back to home page from any page
    window.addEventListener('popstate', () => {
        window.location.href = 'index.html';
    });

    // Load posts initially
    loadPosts();
});