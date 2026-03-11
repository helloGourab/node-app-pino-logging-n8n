import axios from 'axios';
import GithubRepo from '../models/github.model.js';

export const fetchAndSaveRepo = async (username, repo) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}`);
    const { name, owner, stargazers_count, description, html_url } = response.data;

    const newRepo = new GithubRepo({
        repoName: name,
        owner: owner.login,
        stars: stargazers_count,
        description,
        url: html_url
    });

    return await newRepo.save();
};

export const getSavedRepos = async () => {
    return await GithubRepo.find().sort({ fetchedAt: -1 });
};