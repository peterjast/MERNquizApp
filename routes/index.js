const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const quizController = require('../controllers/quizController');
const statsController = require('../controllers/statsController');
const adminController = require('../controllers/adminController');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  authController.signIn
);

router.get('/api/current_user', authController.getCurrentUser);
router.get('/api/logout', authController.logout);
router.post('/api/profile', authController.updateUserProfile);
router.delete('/api/profile', authController.deleteUserAccount);
router.get('/api/questions/:category/:page', questionController.getQuestions);
router.post('/api/question/new', questionController.addQuestion);
router.post('/api/question/submit', questionController.submitQuestion);
router.get('/api/quiz/current', quizController.getCurrentQuiz);
router.post('/api/quiz/current', quizController.submitCurrentQuiz);
router.get('/api/quiz/history', quizController.getQuizHistory);

router.get(
  '/api/stats/:category/:page/:sortBy/:order',
  statsController.getStatsByCategory
);

router.get('/api/admin/questions', adminController.getUnpublishedQuestions);
router.post('/api/admin/quiz/new', adminController.addQuiz);
router.get('/api/admin/quiz', adminController.getQuizzes);
router.post('/api/admin/quiz/publish', adminController.publishQuiz);
router.post('/api/admin/setCurrentQuiz', adminController.setCurrentQuiz);

module.exports = router;
