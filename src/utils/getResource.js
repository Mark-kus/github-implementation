export const getUser = (octokit, username) => {
    // Gets user data
    return octokit.request('GET /users/{username}', {
        username,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

export const getRepo = (octokit, owner, repo) => {
    // Gets repo data
    return octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}