# twiseki

## Install
```
npm install -g @yuiseki/twiseki
```

## Basic usage
```
# show help
twiseki --help

# get profile json of specific user
twiseki profile yuiseki

# save tweets json of specific user
twiseki timeline yuiseki > yuiseki.json

# extract only tweet text from specific user
twiseki timeline yuiseki | jq '.[].full_text'

# extract only photo or video url from specific user
twiseki timeline yuiseki | jq '.[] | select(.entities.media != null) | .entities.media[].media_url_https'

# extract only tweet text by search specific query
twiseki search from:yuiseki | jq '.[].full_text'
```

## Development

### Install head of this repository
```
npm install -g .
```

### Run test
```
npm test
```

or

```
jest
```

## !!! Punishment of Windows Powershell !!!
If you want to use this command in Windows Powershell, you should do following commands before using this command!!!

```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding
```