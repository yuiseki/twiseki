# twitter-puppeteer

## Install
```
npm install -g twitter-puppeteer
```

## Basic usage
```
twitter-puppeteer --help
twitter-puppeteer profile yuiseki
twitter-puppeteer timeline yuiseki | jq '.[].full_text'
twitter-puppeteer search from:yuiseki | jq '.[].full_text'
```

## Development

### Run test
```
jest
```

## Punishment of Windows Powershell
If you want to use this command in Windows Powershell, you should do following commands before using this command!

```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncodin
```