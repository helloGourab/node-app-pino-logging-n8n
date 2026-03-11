import * as ghService from '../services/github.service.js';

export const importRepo = async (req, res, next) => {
    try {
        const { username, repo } = req.body;
        const savedData = await ghService.fetchAndSaveRepo(username, repo);

        // We keep this info log because it's a "Happy Path" milestone
        req.log.info({ msg: "GITHUB_REPO_IMPORTED", id: savedData._id });

        res.status(201).json(savedData);
    } catch (error) {
        // Hand off to the global handler for n8n notification and 500 response
        next(error);
    }
};

export const listRepos = async (req, res, next) => {
    try {
        const repos = await ghService.getSavedRepos();
        res.json(repos);
    } catch (error) {
        next(error);
    }
};