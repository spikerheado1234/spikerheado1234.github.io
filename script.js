document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const aboutMeSection = document.getElementById('about-me');
    const publicationsSection = document.getElementById('publications-section');
    const blogListSection = document.getElementById('blog-list-section');
    const blogPostSection = document.getElementById('blog-post-section');
    const blogPostContentDiv = document.getElementById('blog-post-content');
    const blogPostsUl = document.getElementById('blog-posts-ul');

    // Navigation Links
    const navAbout = document.getElementById('nav-about');
    const navPublications = document.getElementById('nav-publications');
    const navBlog = document.getElementById('nav-blog');
    const backToBlogListButton = document.getElementById('back-to-blog-list');

    // Blog post data (populated by _registerBlogPost calls from individual post .js files)
    const blogPosts = window.ALL_BLOG_POSTS_DATA;

    // --- Core Functions ---

    function showSection(sectionToShow) {
        [aboutMeSection, publicationsSection, blogListSection, blogPostSection].forEach(section => {
            if (section) section.classList.remove('active-section');
        });
        if (sectionToShow) {
            sectionToShow.classList.add('active-section');
            window.scrollTo(0, 0); // Scroll to top when section changes
        }
    }

    function displayBlogList() {
        blogPostsUl.innerHTML = ''; // Clear existing list
        // Sort by date, newest first
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        blogPosts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#blog/${post.id}`;
            a.textContent = post.title;
            a.dataset.postId = post.id; // Store post ID for click handling

            const dateSpan = document.createElement('span');
            dateSpan.className = 'post-date';
            dateSpan.textContent = `(${post.date})`;

            a.appendChild(dateSpan);
            li.appendChild(a);
            blogPostsUl.appendChild(li);

            a.addEventListener('click', (e) => {
                e.preventDefault();
                loadBlogPost(post.id);
                window.location.hash = `#blog/${post.id}`;
            });
        });
        showSection(blogListSection);
    }

    function loadBlogPost(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (post && post.markdownContent) {
            const htmlContent = marked.parse(post.markdownContent);
            blogPostContentDiv.innerHTML = htmlContent;

            // Render LaTeX math expressions in the just-added content using KaTeX
            if (window.renderMathInElement) { // Check if KaTeX auto-render is loaded
                renderMathInElement(blogPostContentDiv, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false},
                        {left: "\\(", right: "\\)", display: false},
                        {left: "\\[", right: "\\]", display: true}
                    ],
                    throwOnError: false // Set to true to see errors in console for debugging LaTeX
                });
            } else {
                console.warn("KaTeX auto-render (renderMathInElement) not loaded.");
            }

            showSection(blogPostSection);
        } else {
            console.error('Blog post not found or has no content:', postId);
            blogPostContentDiv.innerHTML = `<p>Sorry, the post '${postId}' could not be found or has no content.</p>`;
            showSection(blogPostSection);
        }
    }

    // --- Navigation Event Listeners ---

    navAbout.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(aboutMeSection);
        window.location.hash = 'about';
    });

    navPublications.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(publicationsSection);
        window.location.hash = 'publications';
    });

    navBlog.addEventListener('click', (e) => {
        e.preventDefault();
        displayBlogList();
        window.location.hash = 'blog';
    });

    backToBlogListButton.addEventListener('click', () => {
        displayBlogList();
        window.location.hash = 'blog'; // Go back to the blog list hash
    });

    // --- Hash-based Routing ---

    function handleHashChange() {
        const hash = window.location.hash;

        if (hash.startsWith('#blog/')) {
            const postIdFromHash = hash.substring('#blog/'.length);
            const postExists = blogPosts.some(p => p.id === postIdFromHash);
            if (postExists) {
                loadBlogPost(postIdFromHash);
            } else {
                // If specific post not found, show blog list
                console.warn(`Blog post with ID '${postIdFromHash}' not found from hash.`);
                displayBlogList();
            }
        } else if (hash === '#blog') {
            displayBlogList();
        } else if (hash === '#publications') {
            showSection(publicationsSection);
        } else if (hash === '#about' || hash === '') { // Default to 'about'
            showSection(aboutMeSection);
        } else {
            // Fallback for unknown hashes: show 'about' section
            console.warn(`Unknown hash '${hash}', defaulting to 'about' section.`);
            showSection(aboutMeSection);
            window.location.hash = 'about'; // Optionally reset hash to a known state
        }
    }

    // --- Initial Page Load ---
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Call on initial load to process current hash or default
});
