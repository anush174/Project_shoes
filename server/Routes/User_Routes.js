
import express from 'express';

import {
    RegisterUser,
    LoginUser,
    ViewUsers,
    DeleteUser
} from '../Controller/User_controller.js';

const router = express.Router();

router.post('/Register', RegisterUser);
router.post('/Login', LoginUser);
router.get('/View', ViewUsers);
router.delete('/Delete/:id', DeleteUser);

export default router;
