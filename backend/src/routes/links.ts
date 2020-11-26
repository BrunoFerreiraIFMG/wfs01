import {Router} from 'express';
import linksControllers from '../controllers/links'

const router = Router();

router.post('/links', linksControllers.postLink);

router.get('/links/:code',linksControllers.hitLink);

 router.get('/links/:code/stats', linksControllers.getLink);

export default router; 