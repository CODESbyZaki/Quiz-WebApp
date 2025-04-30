import { Router } from 'express';
import * as controller from '../controllers/controller.js'
const router = Router();

// Question Routes
router.route('/questions')
    .get(controller.getQuestions) //Get request
    .post(controller.addQuestions) //POST request
    .delete(controller.dropQuestions) //DELETE request


// Result Routes
router.route('/results')
    .get(controller.getResults) 
    .post(controller.saveResult)
    .delete(controller.deleteResult);

export default router;