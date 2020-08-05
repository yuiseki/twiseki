const utils = require('./utils')

function getUserPageUrl (username){
  const url = `https://twitter.com/${username}`;
  return url;
}

/*
 * Fetch user profile
 */

async function getProfile(screenName){
  result = {}
  result.screenName = screenName
  const url = getUserPageUrl(screenName);
  const page = await utils.getPage(url, 50);
  result.displayName = await getDisplayName(page);
  result.description = await getDescription(page);
  result.iconImage = await getIconImage(page, screenName);
  result.location = await getLocation(page);
  result.url = await getUrl(page);
  result.createdAt = await getCreatedAt(page);
  result.followingsCount = await getFollowingsCount(page, screenName);
  result.followersCount = await getFollowersCount(page, screenName);
  utils.closeBrowser();
  return result;
}
exports.getProfile = getProfile;

async function getDisplayName(page){
   const elementHandles = await page.$x('//head');
  return utils.getInnerText(elementHandles[0], 'title');
}

async function getDescription(page){
  const sel = 'div[data-testid="UserDescription"] span';
  const elementHandles = await page.$x('//body');
  return utils.getInnerText(elementHandles[0], sel);
}

async function getIconImage(page, screenName){
  const sel = `a[href="/${screenName}/photo"] img`;
  const elementHandles = await page.$x('//body');
  return utils.getAttribute(elementHandles[0], sel, 'src');
}

async function getLocation(page){
  const sel = 'div[data-testid="UserProfileHeader_Items"] span:nth-child(1)';
  const elementHandles = await page.$x('//body');
  return utils.getInnerText(elementHandles[0], sel);
}

async function getUrl(page){
  const sel = 'div[data-testid="UserProfileHeader_Items"] a';
  const elementHandles = await page.$x('//body');
  return utils.getInnerText(elementHandles[0], sel);
}

async function getBirthDay(page){
  const sel = 'div[data-testid="UserProfileHeader_Items"] span:nth-child(2)';
  const elementHandles = await page.$x('//body');
  return utils.getInnerText(elementHandles[0], sel);
}

async function getCreatedAt(page){
  const sel = 'div[data-testid="UserProfileHeader_Items"] span:nth-child(3)';
  const elementHandles = await page.$x('//body');
  return utils.getInnerText(elementHandles[0], sel);
}

async function getFollowingsCount(page, screenName){
  const sel = `a[href="/${screenName}/following"]`;
  const elementHandles = await page.$x('//body');
  const countStr = await utils.getAttribute(elementHandles[0], sel, 'title');
  const count = BigInt( countStr.replace(/,/g, '') );
  return count;
}

async function getFollowersCount(page, screenName){
  const sel = `a[href="/${screenName}/followers"]`;
  const elementHandles = await page.$x('//body');
  const countStr = await utils.getAttribute(elementHandles[0], sel, 'title');
  const count = BigInt( countStr.replace(/,/g, '') );
  return count;
}

/*
 * Fetch user timeline
 */

async function getTimeline(screenName){
  const url = getUserPageUrl(screenName);
  const page = await utils.getPage(url, 50);
  const tweets = await getTimelineTweets(page);
  utils.closeBrowser();
  return tweets;
}
exports.getTimeline = getTimeline;

async function getTimelineTweets(page){
  let tweets = []
  const tweets_xpath = '//section[@role="region"]//article';
  await page.waitForXPath(tweets_xpath);
  const tweetElementHandles = await page.$x(tweets_xpath);
  for (let tweetElementHandle of tweetElementHandles) {
    let tweet = {}
    tweet.time = await getTweetTime(tweetElementHandle);
    tweet.text = await getTweetText(tweetElementHandle);
    tweet.screenName = await getScreenName(tweetElementHandle);
    tweet.displayName = await getDisplayName(tweetElementHandle);
    tweet.isRetweet = await getTweetIsRetweet(tweetElementHandle);
    tweet.retweetFrom = await getTweetRetweetFrom(tweetElementHandle);
    tweet.replyCount = await getTweetReplyCount(tweetElementHandle);
    tweet.retweetCount = await getTweetRetweetCount(tweetElementHandle);
    tweet.likeCount = await getTweetLikeCount(tweetElementHandle);
    tweet.hashtags = await getTweetHashTags(tweetElementHandle);
    tweet.links = await getTweetLinks(tweetElementHandle);
    tweet.photos = await getTweetPhotos(tweetElementHandle);
    tweet.video = await getTweetVideo(tweetElementHandle);
    tweets.push(tweet);
  }
  return tweets;
}

async function getTweetTime(tweetElementHandle){
  return await utils.getAttribute(tweetElementHandle, 'time', 'datetime');
}

async function getTweetText(tweetElementHandle){
  return await utils.getInnerText(tweetElementHandle, 'div[lang] span');
}

async function getScreenName(tweetElementHandle){
  return (await utils.getAttribute(tweetElementHandle, 'a', 'href')).replace('/', '');
}

async function getDisplayName(tweetElementHandle){
  return 'not implemented'
}

async function getTweetIsRetweet(tweetElementHandle){
  const anchorElementHandles = await tweetElementHandle.$x('//a')
  const text = await utils.getInnerText(anchorElementHandles[0], 'span');
  return (text.indexOf('リツイート') !== 0)
}

async function getTweetRetweetFrom(tweetElementHandle){
  const spanElementHandles = await tweetElementHandle.$x('//span')
  return await (await spanElementHandles[5].getProperty('textContent')).jsonValue()
}

async function getTweetReplyCount(tweetElementHandle){
  let countStr = await utils.getAttribute(tweetElementHandle, 'div[data-testid="reply"]', 'aria-label');
  count = parseInt(countStr);
  if(isNaN(count)){
    return 0;
  }
  return BigInt(count);
}

async function getTweetRetweetCount(tweetElementHandle){
  let countStr = await utils.getAttribute(tweetElementHandle, 'div[data-testid="retweet"]', 'aria-label');
  count = parseInt(countStr);
  if(isNaN(count)){
    return 0;
  }
  return BigInt(count);
}

async function getTweetLikeCount(tweetElementHandle){
  let countStr = await utils.getAttribute(tweetElementHandle, 'div[data-testid="like"]', 'aria-label');
  count = parseInt(countStr);
  if(isNaN(count)){
    return 0;
  }
  return BigInt(count);
}

async function getTweetHashTags(tweetElementHandle){
  return await utils.getAttributes(tweetElementHandle, 'a[href^="/hash/"]', 'href');
}

async function getTweetLinks(tweetElementHandle){
  return await utils.getAttributes(tweetElementHandle, 'a[target="_blank"]', 'title');
}

async function getTweetPhotos(tweetElementHandle){
  return await utils.getAttributes(tweetElementHandle, 'a img[src^="https://pbs.twimg.com/media/"]', 'src');
}

async function getTweetVideo(tweetElementHandle){
  return await utils.getAttribute(tweetElementHandle, 'video', 'src');
}