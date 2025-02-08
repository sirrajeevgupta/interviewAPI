const Question = require('../model/Question');

const getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  if (!questions)
    return res.status(204).json({ message: 'No questions to display.' });
  res.json(questions);
};

const addQuestion = async (req, res) => {
  const { question, answer, codeSnippet, domain, referenceUrl } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: 'Question & answer are required.' });
  }

  // check for duplicate question in the db
  const dublicate = await Question.findOne({ question: question }).exec();
  if (dublicate) {
    return res.status(409).json({ message: 'This question already exists.' }); //Conflict
  }

  try {
    //create and store the new question
    const result = await Question.create({
      question: question,
      answer: answer,
      codeSnippet: codeSnippet,
      domain: domain,
      referenceUrl: referenceUrl,
    });
    console.log(result);

    res.status(201).json({
      success: `New question created in ${
        domain ? domain : 'Miscellaneous'
      } domain!`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'Question ID required.' });

  const question = await Question.findOne({ _id: id }).exec();
  if (!question)
    return res.status(400).json({ message: 'Question not found.' });

  const result = await question.deleteOne();
  console.log('Deleted Question:', result);
  res.json({ message: 'One question deleted.' });
};

const updateQuestion = async (req, res) => {
  const { id, question, answer, codeSnippet, domain, referenceUrl } = req.body;

  if (!id || !question || !answer)
    return res
      .status(400)
      .json({ message: 'Atleast mandatory fields are required.' });

  const oldQuestion = await Question.findById(id).exec();

  if (!oldQuestion)
    return res.status(204).json({ message: 'Question not found.' });

  const dublicate = await Question.findOne({ question: question }).exec();
  if (dublicate)
    return res.status(400).json({ message: 'Question already exists.' });

  oldQuestion.question = question;
  oldQuestion.answer = answer;
  oldQuestion.codeSnippet = codeSnippet;
  oldQuestion.domain = domain;
  oldQuestion.referenceUrl = referenceUrl;

  const result = await oldQuestion.save();
  console.log(result);
  res.json({
    message: `This question from ${
      domain ? domain : 'miscellaneous'
    } domain has been updated.`,
  });
};

const getQuestion = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Question ID is required' });

  const question = await Question.findById(id).exec();
  if (!question)
    return res.status(400).json({ message: 'Question not found.' });
  res.json(question);
};

module.exports = {
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
};
