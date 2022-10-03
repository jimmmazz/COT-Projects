import { Router } from 'express'
import {
  getProjects,
  getProject,
  addProject,
  deleteProject,
} from '../controllers/projectController.js'
import { isAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/addProject', isAuth, addProject)
router.put('/addProject', isAuth, addProject)

router.delete('/delete/:id', isAuth, deleteProject)

export default router
