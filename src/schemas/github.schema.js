import { z } from 'zod';

export const fetchRepoSchema = z.object({
    username: z.string().min(1, "GitHub username is required"),
    repo: z.string().min(1, "Repository name is required")
});