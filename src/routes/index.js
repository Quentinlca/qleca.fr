import { Router } from 'express';
import metroMapApi from './metroMapApi.js';

const router = Router();

router.use('/metro_map_api', metroMapApi);

export default router;
