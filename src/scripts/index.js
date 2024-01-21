import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

// 'click' event that triggers a function to capture what was typed in input, store it in 'userName' than send it to getUserData argument
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário no GitHub')
        return true
    }
}

// create 'keyup' event to trigger the function getUserData
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value // gets the value of the element that is the target of the event
    const key = e.wwhich || e.keyCode // get the key code when a key is pressed
    const isEnterKeyPressed = key === 13 // checks if the key pressed is enter (code 13)

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}