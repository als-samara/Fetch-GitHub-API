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

    if(isEnterKeyPressed){
        getUserProfile(userName)
    }
})

/// async function that makes the API request
async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

// uses the profile returned in the async function, creates a dynamic HTML and assigns it to the div previously constructed in the HTML
function getUserProfile(userName){
    user(userName).then(userData => {
        
        // show the profile data on console
        console.log(userData);

        let userInfo = `<img src="${userData.avatar_url}" alt="Foto do Perfil do usuário" />
                        <div class="data">
                            <h1>${userData.name ?? ' Não possui nome cadastrado 😥'}</h1>
                            <p>${userData.bio ?? 'Não possui bio cadastrada 😥'}</p>
                        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo
    })
}