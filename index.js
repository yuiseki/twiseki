
const user = require('./user');
const search = require('./search');

!(async() => {
  const command_type = process.argv[2];
  const command_args = process.argv[3];
  switch (command_type) {
    case 'profile':
      const profile = await user.getProfile(command_args);
      console.log(profile);
      break
    case 'timeline':
      const timeline = await user.getTimeline(command_args);
      console.log(timeline);
      break;
    case 'search':
      const searchResult = await search.getSearchResult(command_args);
      console.log(searchResult);
      break;
    default:
      break;
  }
})();
