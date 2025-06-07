// This function should be defined in your main script.js before this file is loaded,
// or these calls will queue up and be processed when main script.js defines it and processes the queue.
// For simplicity, we'll define it globally and assume main script.js will use the collected data.

_registerBlogPost({
  id: "my-first-post", // A unique ID, can be derived from filename
  title: "My First Blog Post",
  date: "2024-07-28",
  markdownContent: `
# My First Blog Post

Welcome to my new blog! This post is written entirely in **Markdown**.

## Why Markdown?

Markdown is great because:

1.  It's easy to write.
2.  It's easy to read in its raw format.
3.  It converts cleanly to HTML.

You can include various elements like:

-   Lists (like this one)
-   [Links](https://www.markdownguide.org)
-   \`inline code\`

\`\`\`javascript
// And code blocks
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}
greet("World");
\`\`\`

## Images

You can also include images. Make sure the path is relative to \`index.html\`.

![A placeholder kitten](../images/example-image.jpg)
*(Assuming you have \`example-image.jpg\` in an \`images\` folder at the root)*

> This is a blockquote. It's useful for quoting text.

Stay tuned for more posts!
` // End of markdownContent template literal
});
