
const user = require('./user');

!(async() => {
  const tweets = await user.getTimeline("yuiseki");
  for (const tweet of tweets) {
    console.log(tweet.time);
    console.log('\t@'+tweet.screenName);
    if (tweet.isRetweet){
      console.log('\tis retweet');
      console.log('\t\t@'+tweet.retweetFrom);
      console.log('\t\t'+tweet.text.replace(/\r?\n/g,' '));
      if (tweet.photos.length > 0){
        console.log('\t\tphotos:');
        for (const photo of tweet.photos) {
          console.log('\t\t\t'+photo);
        }
      }
      console.log('\t\treply: '+tweet.replyCount);
      console.log('\t\trt: '+tweet.retweetCount);
      console.log('\t\tlike: '+tweet.likeCount);
    }else{
      console.log('\t'+tweet.text.replace(/\r?\n/g,' '));
      if (tweet.photos.length > 0){
        console.log('\tphotos:');
        for (const photo of tweet.photos) {
          console.log('\t\t'+photo);
        }
      }
      console.log('\treply: '+tweet.replyCount);
      console.log('\trt: '+tweet.retweetCount);
      console.log('\tlike: '+tweet.likeCount);
    }
  }
})();
