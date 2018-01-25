function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  request
  .get('url')
  .on('error', function(err) {
    throw err;
  })
  .pipe(fs.createWriteStream('./future.jpg'));



// getRepoContributors('jquery', 'jquery', function(err, result) {
//   console.log('Errors:', err);
//   console.log('Result:', result);
// });



// Create and test this function in isolation of (without) downloadImageByURL,
// by hard-coding valid string values for url and local filePath, like so
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")