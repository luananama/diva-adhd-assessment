// AssessmentSection.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionsData from "../../assets/questions.json";

const AssessmentSection = () => {
  const { sectionNumber } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  // Get current section questions
  const currentSection = questionsData.sections.find(
    section => section.sectionNumber === parseInt(sectionNumber)
  );

  // Load saved answers
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('assessment-answers')) || {};
    setAnswers(saved[sectionNumber] || {});
  }, [sectionNumber]);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Auto-save
    const allAnswers = JSON.parse(localStorage.getItem('assessment-answers')) || {};
    localStorage.setItem('assessment-answers', 
      JSON.stringify({
        ...allAnswers,
        [sectionNumber]: newAnswers
      })
    );
  };

  // #TODO after 3rd section don't increment, navigate to summary page, 
  const handleNext = () => {
    navigate(`/section/${parseInt(sectionNumber) + 1}`);
  };

  if (!currentSection) return <div>Section not found</div>;

  return (
    <div>
      <h2>Section {sectionNumber}</h2>
      
      {currentSection.questions.map(q => (
        <div key={q.id}>
          <h3>{q.questionText}</h3>
          
          {/* Adult options */}
          <div>
            <h4>Adulthood:</h4>
            {q.adulthoodOptions.map((option, index) => (
              <div key={`adult-${index}`}>
                <input
                  type="radio"
                  id={`adult-${q.id}-${index}`}
                  name={`adult-${q.id}`}
                  onChange={() => handleAnswer(`adult-${q.id}`, index)}
                  checked={answers[`adult-${q.id}`] === index}
                />
                <label htmlFor={`adult-${q.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>

          {/* Childhood options */}
          <div>
            <h4>Childhood:</h4>
            {q.childhoodOptions.map((option, index) => (
              <div key={`child-${index}`}>
                <input
                  type="radio"
                  id={`child-${q.id}-${index}`}
                  name={`child-${q.id}`}
                  onChange={() => handleAnswer(`child-${q.id}`, index)}
                  checked={answers[`child-${q.id}`] === index}
                />
                <label htmlFor={`child-${q.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button 
        onClick={handleNext}
        disabled={Object.keys(answers).length < currentSection.questions.length * 2}
      >
        Next
      </button>
    </div>
  );
};

export default AssessmentSection; 