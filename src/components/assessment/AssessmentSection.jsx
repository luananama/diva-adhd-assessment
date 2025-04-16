import { useParams, useNavigate } from 'react-router-dom';
import questionsData from "../../assets/questions.json";
import { useAssessment } from '../../contexts/AssessmentContext';

const AssessmentSection = () => {
  const { sectionNumber } = useParams();
  const navigate = useNavigate();
  const { answers, updateAnswers } = useAssessment();

  const currentSection = questionsData.sections.find(
    section => section.sectionNumber === parseInt(sectionNumber)
  );

  const handleAnswer = (questionId, value, context = {}) => {
    updateAnswers(`section${sectionNumber}`, questionId, value, {
      questionText: context.questionText,
      summaryText: context.summaryText,
      optionText: context.optionText || ''
    });
  };

  const handleNext = () => {
    const nextSection = parseInt(sectionNumber) + 1;
    const hasMoreSections = questionsData.sections.some(
      section => section.sectionNumber === nextSection
    );
    if (hasMoreSections) {
      navigate(`/section/${nextSection}`);
    } else {
      navigate('/summary'); // Navigate to summary when done
    }
  };

  if (!currentSection) return <div>Section not found</div>;

  const currentAnswers = answers[`section${sectionNumber}`] || {};
  const totalAnswered = Object.keys(currentAnswers).length;
  const totalExpected = currentSection.questions.length * 2; // adult + child

  return (
    <div>
      <h2>Section {sectionNumber}</h2>

      {currentSection.questions.map(q => (
        <div key={q.id}>
          <h3>{q.questionText}</h3>

          {/* Adult options */}
          <div>
            <h4>Adulthood:</h4>
            {q.adulthoodOptions.map((option, index) => {
              const id = `adult-${q.id}`;
              const checked = currentAnswers[id]?.value === index;
              return (
                <div key={`${id}-${index}`}>
                  <input
                    type="radio"
                    id={`${id}-${index}`}
                    name={id}
                    onChange={() =>
                      handleAnswer(id, index, {
                        questionText: q.questionText,
                        summaryText: q.summaryText,
                        optionText: option
                      })
                    }
                    checked={checked}
                  />
                  <label htmlFor={`${id}-${index}`}>{option}</label>
                </div>
              );
            })}
          </div>

          {/* Childhood options */}
          <div>
            <h4>Childhood:</h4>
            {q.childhoodOptions.map((option, index) => {
              const id = `child-${q.id}`;
              const checked = currentAnswers[id]?.value === index;
              return (
                <div key={`${id}-${index}`}>
                  <input
                    type="radio"
                    id={`${id}-${index}`}
                    name={id}
                    onChange={() =>
                      handleAnswer(id, index, {
                        questionText: q.questionText,
                        summaryText: q.summaryText,
                        optionText: option
                      })
                    }
                    checked={checked}
                  />
                  <label htmlFor={`${id}-${index}`}>{option}</label>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleNext}
        disabled={totalAnswered < totalExpected}
      >
        Next
      </button>
    </div>
  );
};

export default AssessmentSection;
