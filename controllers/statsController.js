const mongoose = require('mongoose');
const QuestionResponse = mongoose.model('QuestionResponse');

exports.getStatsByCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }
  
  const questionResponseId = req.user.questionResponse;

  if (!questionResponseId) {
    return res.json({ questions: [], pages: 1 });
  }

  const category = req.params.category;
  const sortBy = req.params.sortBy;
  let page = req.params.page || 1;
  let limit = 5;
  let skip = page * limit - limit;
  let order = -1;

  if (req.params.order === 'ascending') {
    order = 1;
  }

  const questionsPromise = QuestionResponse.getStatsByCategory(
    questionResponseId,
    category,
    sortBy,
    order,
    skip,
    limit
  );

  const countPromise = QuestionResponse.getQuestionsCount(
    questionResponseId,
    Category
  );

  let [questions, count] = await Promise.all([questionsPromise, countPromise]);

  let pages = Math.ceil(count / limit);

  if (pages === 0) pages = 1; 

  if (!questions.length && skip) {
    page = pages;
    skip = page * limit - limit;

    response = await QuestionResponse.getStatsByCategory(
      questionResponseId,
      Category,
      sortBy,
      order,
      skip,
      limit
    );
    return res.json({ questions, pages });
  }

  res.json({ questions, pages });
};
