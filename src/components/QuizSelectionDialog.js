import React from 'react';
import './QuizSelectionDialog.css'

const QuizSelectionDialog = ({ onSelectQuizType }) => {
  return (
    <div className="quiz-selection-dialog">
      <h2>Select Quiz Type</h2>
      <button onClick={() => onSelectQuizType('S')}>Single Question</button>
      <button onClick={() => onSelectQuizType('M')}>Multiple Question</button>
      {/* Message Container */}
      <div>
        <p>This is a Quiz app developed by <span className="developer-name">Hira Datta Dhakal</span>.</p>
        <p>This is developed with backend DRF and frontend React.</p>
        <p>It consists of <span className="quiz-types">5 Multiple</span> and <span className="quiz-types">5 Single</span> Question.</p>
        <p>Please choose all possible answers for <span className="quiz-types">Multiple</span>.</p>
      </div>

    </div>
  );
};

export default QuizSelectionDialog;
