import { baseUrl } from '../variables.js';

// async function that access API user endpoint
async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

export { getUser }