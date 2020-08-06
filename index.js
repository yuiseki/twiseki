
const user = require('./user');
const search = require('./search');

!(async() => {
  const tweets = await search.getSearchResult('from:yuiseki');
  for (const id in tweets) {
    if (tweets.hasOwnProperty(id)) {
      const tweet = tweets[id];
      console.log(tweet.created_at);
      console.log('\t'+tweet.full_text.replace(/\r?\n/g,' '));
    }
  }
  /*
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
  */
})();
