const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;
const { HTML, JAVASCRIPT, REACT, NEWQUIZ  } = require('../constants/categories');

const questionResponseSchema = new Schema({
  [HTML]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ],
  [JAVASCRIPT]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ],
  [REACT]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ],
  [NEWQUIZ]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ]
});

questionResponseSchema.statics.getQuestionsCount = function(
  questionResponseId,
  category
) {
  return new Promise(resolve => {
    this.aggregate([
      {
        $match: {
          _id: ObjectId(questionResponseId)
        }
      },
      {
        $project: {
          _id: 0,
          noOfQuestions: { $size: `$${category}` }
        }
      }
    ]).exec((err, response) => {
      const result = response[0].noOfQuestions;
      resolve(result);
    });
  });
};

questionResponseSchema.statics.getStatsByCategory = function(
  questionResponseId,
  category,
  sortBy,
  order,
  skip,
  limit
) {
  return new Promise(resolve => {
    this.aggregate([
      {
        $match: {
          _id: ObjectId(questionResponseId)
        }
      },
      {
        $project: {
          [category]: 1
        }
      },
      {
        $unwind: `$${category}`
      },
      {
        $sort: {
          [`${category}.${sortBy}`]: order
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $group: {
          [category]: {
            $push: `$${category}`
          },
          _id: 1
        }
      }
    ]).exec((err, result) => {
      this.populate(
        result,
        { path: `${category}.questionId` },
        (err, newResult) => {
          resolve(newResult[0][category]);
        }
      );
    });
  });
};

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);
