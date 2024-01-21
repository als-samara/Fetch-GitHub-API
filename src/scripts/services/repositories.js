import { baseUrl, reposQuantity } from '../variables.js';

// async function that access API repositories endpoint
async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${reposQuantity}`)
    return await response.json()
}

export { repos }