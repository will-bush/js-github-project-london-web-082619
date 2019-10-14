// CONSTANTS
const searchUserURL = "https://api.github.com/search/users?q="
const searchForm = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")
const userRepos = "https://api.github.com/users/"
const reposList = document.querySelector("#repos-list")
// API STUFF

	function getUser(url, searchTerm) {
        return fetch(url + searchTerm).then(resp => resp.json())
    }
    function getUserRepos(url, username) {
        return fetch(url + username + "/repos").then( resp => resp.json());
    }

    function post( url, data) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(resp => resp.json())
      }



// EVENT LISTENERS
searchForm.addEventListener("submit", event => conductSearch(event))


// FUNCTIONS
function conductSearch(event) {
    event.preventDefault()
    let searchTerm = event.target.elements.search.value;
    getUser(searchUserURL, searchTerm).then( resp => renderResults(resp))
}

function renderResults(results) {
    results.items.forEach( result => renderResult(result))
}

function renderResult(result) {
let resultLi = document.createElement("li")
resultLi.innerText = result.login
let userAvatar = document.createElement("img")
userAvatar.src = result.avatar_url
let userLink = document.createElement("a")
userLink.innerText = `View ${result.login}'s profile`
userLink.href = result.html_url
let userRepoLink = document.createElement("p")
userRepoLink.innerText = "View their Repos"
userRepoLink.id = result.login
userRepoLink.addEventListener("click", event => showUsersRepos(event))
userList.append(resultLi, userAvatar, userLink, userRepoLink)
}

function showUsersRepos(user) {
event.preventDefault();
let id = user.target.id
getUserRepos(userRepos, id).then( resp => renderUserRepos(resp))
}

function renderUserRepos(repos) {
    repos.forEach( repo => renderUserRepo(repo))
}

function renderUserRepo(repo) {
    // reposList.innerHTML = ""
    let repoName = document.createElement("a")
    repoName.innerText = repo.name
    repoName.href = repo.html_url
reposList.append(repoName)
}