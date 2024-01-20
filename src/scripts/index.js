async function user() {
    const response = await fetch('https://api.github.com/users/als-samara')
    return await response.json()
}

function getUserProfile(){
    
    user().then(userData => {
        console.log(userData);

        let userInfo = `<img src="${userData.avatar_url}" alt="Foto do Perfil do usuário" />
                        <div class="data">
                            <h1>${userData.name ?? ' Não possui nome cadastrado 😥'}</h1>
                            <p>${userData.bio ?? 'Não possui bio cadastrada 😨'}</p>
                        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo
    })
}

getUserProfile();