
// The second part of XHR - handling the response once we've made the request
// defining an event listener on the request to listen for the load event, - tells us that the request is complete
//give this listener a callback function - a function that will get called when the event fires.

function showRepositories() {

  // tell JavaScript that it's working with JSON
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  // parsing the text into an array of objects

  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  //data attribute to hold the repo name
  document.getElementById('repositories').innerHTML = repoList;
}



function getRepositories() {
  // creating a new instance of an XMLHttpRequest
  // initiate XHR request
  const req = new XMLHttpRequest();

  // add event listener to our req object, this will be our req object inside our callback function.
  req.addEventListener('load', showRepositories);

  // call open with the HTTP verb GET and the URI for request.
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}


function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
