function testTweet(tweet){
  expect(tweet).not.toBe(null);
  expect(tweet.id_str).not.toBe(null);
  expect(tweet.created_at).not.toBe(null);
  expect(tweet.user_id_str).not.toBe(null);
  expect(tweet.full_text).not.toBe(null);
  expect(tweet.source).not.toBe(null);
  expect(tweet.reply_count).toBeGreaterThanOrEqual(0);
  expect(tweet.retweet_count).toBeGreaterThanOrEqual(0);
  expect(tweet.quote_count).toBeGreaterThanOrEqual(0);
  expect(tweet.favorite_count).toBeGreaterThanOrEqual(0);
  if(tweet.entities.hasOwnProperty('media') && tweet.entities.media.length > 0){
    expect(tweet.entities.media[0].type).not.toBe(null);
    expect(tweet.entities.media[0].media_url_https).not.toBe(null);
  }
  if(tweet.entities.hasOwnProperty('hashtags') && tweet.entities.hashtags.length > 0){
    expect(tweet.entities.hashtags[0].text).not.toBe(null);
  }
  if(tweet.entities.hasOwnProperty('user_mentions') && tweet.entities.user_mentions.length > 0){
    expect(tweet.entities.user_mentions[0].screen_name).not.toBe(null);
    expect(tweet.entities.user_mentions[0].name).not.toBe(null);
    expect(tweet.entities.user_mentions[0].is_str).not.toBe(null);
  }
  if(tweet.entities.hasOwnProperty('urls') && tweet.entities.urls.length > 0){
    expect(tweet.entities.urls[0].expanded_url).not.toBe(null);
  }
  if(tweet.hasOwnProperty('in_reply_to_status_id_str') && tweet.in_reply_to_status_id_str !== null){
    expect(tweet.in_reply_to_status_id_str).not.toBe(null);
    expect(tweet.in_reply_to_user_id_str).not.toBe(null);
    expect(tweet.in_reply_to_screen_name).not.toBe(null);
  }
  if(tweet.hasOwnProperty('retweeted_status_id_str')){
    expect(tweet.retweeted_status_id_str).not.toBe(null);
  }
  if(tweet.hasOwnProperty('is_quote_status') && tweet.is_quote_status){
    expect(tweet.quoted_status_id_str).not.toBe(null);
    expect(tweet.quoted_status_permalink.expanded).not.toBe(null);
  }
}

const user = require('./user');
test('getProfile of @TwitterJP', async () => {
    const profile = await user.getProfile("TwitterJP");
    expect(profile.screen_name).toBe("TwitterJP");
    expect(profile.name).toBe("Twitter Japan");
    expect(profile.user_id_str).not.toBe(null);
    expect(profile.verified).toBe(true);
    expect(profile.protected).toBe(false);
    expect(profile.description).toBe("日本語版Twitter公式アカウントです。サービスに関してのご質問、お問い合わせは https://t.co/mfQkUQLUhe および https://t.co/NZ3xoejW5Zをご利用ください。");
    expect(profile.profile_image_url_https).toBe("https://pbs.twimg.com/profile_images/875091517198614528/eeNe_9Pc_normal.jpg");
    expect(profile.location).toBe("東京都中央区");
    expect(profile.entities.url.urls[0].expanded_url).toBe("https://blog.twitter.com/ja_jp.html");
    expect(profile.statuses_count).toBeGreaterThan(1);
    expect(profile.favourites_count).toBeGreaterThan(1);
    expect(profile.friends_count).toBeGreaterThan(1);
    expect(profile.followers_count).toBeGreaterThan(1);
});

test('getProfile of @jal123_bot', async () => {
    const profile = await user.getProfile("jal123_bot");
    expect(profile.screen_name).toBe("jal123_bot");
    expect(profile.name).toBe("JAL123_bot");
    expect(profile.user_id_str).not.toBe(null);
    expect(profile.verified).toBe(false);
    expect(profile.protected).toBe(false);
    expect(profile.description).toBe("1985年8月12日。飛行中に垂直尾翼が吹き飛ぶという前代未聞のトラブルに見舞われたJAL123便。危機を回避しようと懸命に努力を続けるクルーたちの言葉を呟きます。このような事故が二度と起こらないように。忘れないように。");
    expect(profile.profile_image_url_https).toBe("https://pbs.twimg.com/profile_images/1107736699/jal-123_normal.jpg");
    expect(profile.location).toBe("御巣鷹の尾根");
    expect(profile.statuses_count).toBeGreaterThanOrEqual(0);
    expect(profile.favourites_count).toBeGreaterThanOrEqual(0);
    expect(profile.friends_count).toBeGreaterThanOrEqual(0);
    expect(profile.followers_count).toBeGreaterThan(1);
});

test('getTimeline of @jal123_bot', async () => {
  const tweets = await user.getTimeline("jal123_bot");
  for (const key in tweets) {
    if (tweets.hasOwnProperty(key)) {
      const tweet = tweets[key];
      testTweet(tweet);
    }
  }
});


test('getTimeline of @rhkya', async () => {
  const tweets = await user.getTimeline("rhkya");
  for (const key in tweets) {
    if (tweets.hasOwnProperty(key)) {
      const tweet = tweets[key];
      testTweet(tweet);
    }
  }
});

test('getTimeline of @yuiseki', async () => {
  const tweets = await user.getTimeline("yuiseki");
  for (const key in tweets) {
    if (tweets.hasOwnProperty(key)) {
      const tweet = tweets[key];
      testTweet(tweet);
    }
  }
});

const search = require('./search');
test('search from:yuiseki', async () => {
  const tweets = await search.getSearchResult("from:yuiseki");
  for (const key in tweets) {
    if (tweets.hasOwnProperty(key)) {
      const tweet = tweets[key];
      testTweet(tweet);
    }
  }
});
