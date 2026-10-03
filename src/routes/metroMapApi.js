import { Router } from 'express';
import { config } from '../config.js';
import { requirePassword } from '../middleware/requirePassword.js';
import { debugHandler } from '../controllers/debugController.js';

const router = Router();

// => /metro_map_api/debug (protégé par mot de passe)
router.route('/debug')
  .all(requirePassword(config.debugPassword))
  .get(debugHandler)
  .post(debugHandler);

export default router;
