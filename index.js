#!/usr/bin/env node
const yargs = require("yargs");

const user = require("./user");
const search = require("./search");

yargs
  .scriptName("twitter-puppeteer")
  .usage("$0 <cmd> [args]")
  .command(
    "profile [USER NAME]",
    "Download Profile",
    (yargs) => {},
    async (argv) => {
      const { username } = argv;
      const profile = await user.getProfile(username);
      console.log(JSON.stringify(profile));
    }
  )
  .command(
    "timeline [USER NAME]",
    "Download Timeline",
    (yargs) => {},
    async (argv) => {
      const { username } = argv;
      const timeline = await user.getTimeline(username);
      console.log(JSON.stringify(timeline));
    }
  )
  .command(
    "search [QUERY]",
    "Search Twitter",
    (yargs) => {},
    async (argv) => {
      const { query } = argv;
      const searchResult = await search.getSearchResult(query);
      console.log(JSON.stringify(searchResult));
    }
  ).argv;
