/* load all posts or replies */

async function loadPostOrReplies() {
  /* url */
  const url = `${window.location.origin}/posts?tweetedBy=${
    userProfile._id
  }&replyTo=${tab === "replies"}`;

  const result = await fetch(url);
  const posts = await result.json();

  posts.forEach(post => {
    const tweetEl = createTweet(post);
    tweetContainer.insertAdjacentElement("afterbegin", tweetEl);
  });
}
loadPostOrReplies();

/* following & follower */
function followHandler(e, userId) {
  console.log(e.target);
  console.log(userId);
}
