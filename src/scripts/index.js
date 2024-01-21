import { baseUrl } from 'src/scripts/variables.js'
import { reposQuantity } from './variables'

// 'click' event that triggers a function to capture what was typed in input, store it in 'userName' than send it to getUserProfile argument
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

// create 'keyup' event to trigger the function getUserProfile
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value // gets the value of the element that is the target of the event
    const key = e.wwhich || e.keyCode // get the key code when a key is pressed
    const isEnterKeyPressed = key === 13 // checks if the key pressed is enter (code 13)

    if (isEnterKeyPressed) {
        getUserProfile(userName)
    }
})

// async function that access API user endpoint
async function user(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

// async function that access API repositories endpoint
async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${reposQuantity}`)
    return await response.json()
}

// uses the profile returned in the async function, creates a dynamic HTML and assigns it to the div previously constructed in the HTML
function getUserProfile(userName) {

    user(userName).then(userData => {

        // show the profile data on console
        console.log(userData);

        let userInfo = `
                        <div class="info">
                            <img src="${userData.avatar_url}" alt="Foto do Perfil do usuário" />
                            <div class="data">
                                <h1>${userData.name ?? ' Não possui nome cadastrado 😥'}</h1>
                                <p>${userData.bio ?? 'Não possui bio cadastrada 😥'}</p>
                            </div>
                        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {

    // return an Array of repositories
    repos(userName).then(reposData => {
        let repositoriesItens = ""

        // goes through the list and creates a li for each item
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        })

        // complements the user information with the repositories li's assigned to the variable repositoriesItens
        document.querySelector('.profile-data').innerHTML += `
                                                                <div class="repositories section"
                                                                    <h2>Repositórios</h2>
                                                                    <ul>${repositoriesItens}</ul>
                                                                </div>`
    })
}