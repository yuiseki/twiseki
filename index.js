
const user = require('./user');

!(async() => {
  const tweets = await user.getTimeline("yuiseki");
  for (const tweet of tweets) {
    console.log(tweet.time);
    console.log('\t@'+tweet.screenName);
    console.log('\t'+tweet.text);
    console.log('\treply: '+tweet.replyCount);
    console.log('\trt: '+tweet.retweetCount);
    console.log('\tlike: '+tweet.likeCount);
  }
})();
