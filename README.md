# twitter-puppeteer

## Install
```
npm install -g twitter-puppeteer
```

## Basic usage
```
# show help
twitter-puppeteer --help

# get profile json of specific user
twitter-puppeteer profile yuiseki

# save tweets json of specific user
twitter-puppeteer timeline yuiseki > yuiseki.json

# extract only tweet text from specific user
twitter-puppeteer timeline yuiseki | jq '.[].full_text'

# extract only photo or video url from specific user
twitter-puppeteer timeline yuiseki | jq '.[] | select(.entities.media != null) | .entities.media[].media_url_https'

# extract only tweet text by search specific query
twitter-puppeteer search from:yuiseki | jq '.[].full_text'
```

## Development

### Run test
```
jest
```

## !!! Punishment of Windows Powershell !!!
If you want to use this command in Windows Powershell, you should do following commands before using this command!

```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding
```