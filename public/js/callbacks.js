// Broken code. Want createPost to execute first THEN getPosts. Want 3 posts to appear on screen, but only 2 do.
/*
$(document).ready(function() {
  createPost({title: 'Post Three', body: 'This is post three'});
  getPosts();
});

const posts = [
  {title: 'Post One', body: 'This is post one'},
  {title: 'Post Two', body: 'This is post two'}
];

// Returns result after 2 seconds
getPosts = function() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li> ${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};

// Returns result after 1 second
createPost = function(post) {
  setTimeout(() => {
    posts.push(post);
  }, 2000);
};
*/




// Using Callbacks
/*
$(document).ready(function() {
  createPost({title: 'Post Three', body: 'This is post three'}, getPosts);
});

const posts = [
  {title: 'Post One', body: 'This is post one'},
  {title: 'Post Two', body: 'This is post two'}
];

// Returns result after 1 seconds
getPosts = function() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li> ${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};

// Returns result after 2 second
createPost = function(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
};

*/
