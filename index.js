
const user = require('./user');
const search = require('./search');

async function searching(args){
  const tweets = await search.getSearchResult(args);
  for (const id in tweets) {
    if (tweets.hasOwnProperty(id)) {
      const tweet = tweets[id];
      console.log(tweet.created_at);
      console.log('\t'+tweet.full_text.replace(/\r?\n/g,' '));
    }
  }
}

async function timeline(args){
  const profile = await user.getProfile(args);
  const tweets = await user.getTimeline(args);
  for (const id in tweets) {
    if (tweets.hasOwnProperty(id)) {
      const tweet = tweets[id];
      if(tweet.user_id_str === profile.user_id_str){
        console.log(tweet.created_at);
        console.log('\t'+tweet.full_text.replace(/\r?\n/g,' '));
      }
    }
  }
}

!(async() => {
  const command_type = process.argv[2];
  const command_args = process.argv[3];
  switch (command_type) {
    case 'timeline':
      await timeline(command_args);
      break;
    case 'search':
      await searching(command_args);
      break;
    default:
      break;
  }
})();
