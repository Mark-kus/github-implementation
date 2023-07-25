export const getUser = async (octokit, username) => {
    const res = await octokit.request('GET /users/{username}', {
        username,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return {
        image: res.data.avatar_url,
        url: res.data.html_url,
        name: res.data.login,
        description: res.data.bio ?? "No description provided",
        updatedAt: new Date(res.data.updated_at).toLocaleDateString(),
        createdAt: new Date(res.data.created_at).toLocaleDateString(),
        location: res.data.location,
    }
}

export const getRepo = async (octokit, owner, repo) => {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return {
        image: res.data.owner.avatar_url,
        url: res.data.svn_url,
        name: res.data.name,
        description: res.data.description ?? "No description provided",
        updatedAt: new Date(res.data.updated_at).toLocaleDateString(),
        createdAt: new Date(res.data.created_at).toLocaleDateString(),
        language: res.data.language,
        owner: {
            name: res.data.owner.login,
            url: res.data.owner.html_url,
        }
    }
}