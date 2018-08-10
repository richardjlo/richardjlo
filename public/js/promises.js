// Using Promises
/*
$(document).ready(function() {
  createPost({title: 'Post Three', body: 'This is post three'})
  .then(getPosts)
  .catch( (error) => {
    console.log(error);
  });
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
createPost = function(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      let error = false;
      if (!error) {
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 2000);
  });
};

*/

// Using Async Await

$(document).ready(function() {
  init();
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
createPost = function(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      let error = false;
      if (!error) {
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 2000);
  });
};

init = async function() {
  await createPost({title: 'Post Three', body: 'This is post three'});

  getPosts();
};
