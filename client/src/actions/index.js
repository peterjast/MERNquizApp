import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CURRENT_QUIZ,
  QUIZ_LOADING,
  FETCH_QUESTIONS,
  QUESTIONS_LOADING,
  GET_ERROR_MSG,
  GET_SUCCESS_MSG,
  CLEAR_NOTIFICATIONS,
  FETCH_QUIZ_HISTORY,
  FETCH_QUIZ_STATS,
  FETCH_UNPUBLISHED_QUESTIONS,
  FETCH_QUIZZES
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUserProfile = (userData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/profile', userData);
    dispatch(fetchUser());
    dispatch({
      type: GET_SUCCESS_MSG,
      payload: res.data
    });
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
};

export const fetchCurrentQuiz = () => async dispatch => {
  dispatch(setQuizLoading());
  const res = await axios.get('/api/quiz/current');
  dispatch({ type: FETCH_CURRENT_QUIZ, payload: res.data });
};

export const submitQuizResponse = data => async dispatch => {
  try {
    const res = await axios.post('/api/quiz/current', data);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
};

export const addQuestion = (data, onCancel) => async dispatch => {
  try {
    const res = await axios.post('/api/question/new', data);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
  onCancel();
};
export const setQuizLoading = () => {
  return {
    type: QUIZ_LOADING
  };
};

export const getQuestions = (category, page) => async dispatch => {
  dispatch(setQuestionsLoading());
  const res = await axios.get(`/api/questions/${category}/${page}`);
  dispatch({ type: FETCH_QUESTIONS, payload: res.data });
};

export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING
  };
};

export const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
};

export const submitQuestionResponse = userResponse => async dispatch => {
  try {
    const res = await axios.post('/api/question/submit', userResponse);
    dispatch({
      type: GET_SUCCESS_MSG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
};

export const getQuizHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/quiz/history');
    dispatch({
      type: FETCH_QUIZ_HISTORY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQuizStats = (
  category,
  page,
  sortBy,
  order
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/stats/${category}/${page}/${sortBy}/${order}`
    );
    dispatch({
      type: FETCH_QUIZ_STATS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUnpublishedQuestions = () => async dispatch => {
  const res = await axios.get('/api/admin/questions');
  dispatch({
    type: FETCH_UNPUBLISHED_QUESTIONS,
    payload: res.data
  });
};

export const addQuiz = quizData => async dispatch => {
  try {
    const res = await axios.post('/api/admin/quiz/new', quizData);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};

export const getQuizzes = () => async dispatch => {
  const res = await axios.get('/api/admin/quiz');
  dispatch({
    type: FETCH_QUIZZES,
    payload: res.data
  });
};

export const publishQuiz = quiz => async dispatch => {
  try {
    const res = await axios.post('/api/admin/quiz/publish', quiz);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};
export const setCurrentQuiz = quiz => async dispatch => {
  try {
    const res = await axios.post('/api/admin/setCurrentQuiz', quiz);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};

export const deleteUserAccount = history => async dispatch => {

  const res = await axios.delete('/api/profile');
  history.push('/');
};
