import { Router } from 'express';
import { createUserSchema } from '../schemas/user.schema.js'
import * as userCtrl from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post('/', validate(createUserSchema), userCtrl.create);
router.get('/', userCtrl.fetchAll);
router.get('/:id', userCtrl.fetchOne);

export default router;