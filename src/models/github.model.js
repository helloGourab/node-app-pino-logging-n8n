import mongoose from 'mongoose';

const githubSchema = new mongoose.Schema({
    repoName: { type: String, required: true },
    owner: { type: String, required: true },
    stars: { type: Number },
    description: { type: String },
    url: { type: String },
    fetchedAt: { type: Date, default: Date.now }
});

export default mongoose.model('GithubRepo', githubSchema);