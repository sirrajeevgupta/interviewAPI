const express = require('express');
const router = express.Router();
const questionsController = require('../../controllers/questionsController');

router
  .route('/')
  .get(questionsController.getAllQuestions)
  .post(questionsController.addQuestion)
  .delete(questionsController.deleteQuestion)
  .put(questionsController.updateQuestion);

router.route('/:id').get(questionsController.getQuestion);

module.exports = router;
