const express = require('express');
const router = express.Router();
const questionsController = require('../../controllers/questionsController');

router
  .route('/')
  .get(questionsController.getAllQuestions)
  .post(questionsController.addQuestion)
  .put(questionsController.updateQuestion);

router.route('/:id').get(questionsController.getQuestion);
router.route('/:id').delete(questionsController.deleteQuestion);

router.route('/domains/:domain').get(questionsController.getQuestionsByDomain);

module.exports = router;
