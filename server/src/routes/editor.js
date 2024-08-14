import { Router } from 'express'
import { getEditorState } from '../controllers/editor.js';

const router = Router()

router.get('/state', getEditorState);

export default router
