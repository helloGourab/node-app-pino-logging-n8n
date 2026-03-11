import { Router } from 'express';
import * as ghCtrl from '../controllers/github.controller.js';
import { validate } from '../middlewares/validate.js';
import { fetchRepoSchema } from '../schemas/github.schema.js';

const router = Router();

// Uses your generic validation middleware
router.post('/import', validate(fetchRepoSchema), ghCtrl.importRepo);
router.get('/saved', ghCtrl.listRepos);

export default router;