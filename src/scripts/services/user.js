import { baseUrl } from '../variables.js';

// async function that access API user endpoint
async function user(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

export { user }