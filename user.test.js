const user = require('./user');

test('getProfile of @yuiseki', async () => {
  try{
    const profile = await user.getProfile("jal123_bot");
    expect(profile.screenName).toBe("jal123_bot");
    expect(profile.description).toBe("1985年8月12日。飛行中に垂直尾翼が吹き飛ぶという前代未聞のトラブルに見舞われたJAL123便。危機を回避しようと懸命に努力を続けるクルーたちの言葉を呟きます。このような事故が二度と起こらないように。忘れないように。");
    expect(profile.iconImage).toBe("https://pbs.twimg.com/profile_images/1107736699/jal-123_200x200.jpg");
    expect(profile.location).toBe("御巣鷹の尾根");
    expect(profile.url).toBe(null);
    expect(profile.followingsCount).toBeGreaterThanOrEqual(0);
    expect(profile.followersCount).toBeGreaterThan(1);
  }catch(e){
    console.log(e);
  }
});

test('getProfile of @TwitterJP', async () => {
  try{
    const profile = await user.getProfile("TwitterJP");
    expect(profile.screenName).toBe("TwitterJP");
    expect(profile.description).toBe("日本語版Twitter公式アカウントです。サービスに関してのご質問、お問い合わせは ");
    expect(profile.iconImage).toBe("https://pbs.twimg.com/profile_images/875091517198614528/eeNe_9Pc_200x200.jpg");
    expect(profile.location).toBe("東京都中央区");
    expect(profile.url).toBe("blog.twitter.com/ja_jp.html");
    expect(profile.followingsCount).toBeGreaterThan(1);
    expect(profile.followersCount).toBeGreaterThan(1);
  }catch(e){
    console.log(e);
  }
});

test('getTimeline of @yuiseki', async () => {
  const tweets = await user.getTimeline("yuiseki");
  expect(tweets[0]).not.toBe(null);
  expect(tweets[0].screenName).toBe("yuiseki");
  expect(tweets[0].text).not.toBe(null);
  expect(tweets[0].time).not.toBe(null);
  expect(tweets[0].replayCount).toBeGreaterThanOrEqual(0);
  expect(tweets[0].retweetCount).toBeGreaterThanOrEqual(0);
  expect(tweets[0].likeCount).toBeGreaterThanOrEqual(0);
});