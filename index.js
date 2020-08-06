
const user = require('./user');
const puppeteer = require('puppeteer');

!(async() => {
  const profile = await user.getProfile('yuiseki');
  const tweets = await user.getTimeline('yuiseki');
  for (const id in tweets) {
    if (tweets.hasOwnProperty(id)) {
      const tweet = tweets[id];
      if(tweet.user_id_str === profile.user_id_str){
        console.log(tweet.created_at);
        console.log('\t'+tweet.full_text.replace(/\r?\n/g,' '));
      }
      
    }
  }
})();
