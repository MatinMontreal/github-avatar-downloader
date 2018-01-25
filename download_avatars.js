var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

// write a if statement to accept input from the command line and run the function
// return an error message if one of the inputs is missing
if ((process.argv[2] == null) || (process.argv[3] == null)) {

    console.log ('Error! You need to input both the owner and the repository');
    return;
}

//assign the command line inputs to variables
var owner = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
//take the variables and create a single url
  var options = {
    url:
      'https://api.github.com/repos/' +
        repoOwner +
        '/' +
        repoName +
        '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN,
    },
  };


  request(options, function(err, res, body) {
//parse the body and assign to a variable
    var contributors = JSON.parse(body);

//run the callback function with the new variable contributors
    cb(err, contributors);
  });
}

//pass the avatars into the function and download them to a new file
function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  result.forEach (function(element) {
    downloadImageByURL(element.avatar_url, 'avatars/'+ element.login + '.jpg')
  });
  console.log('Errors:', err);
});

