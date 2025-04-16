// src/components/SummaryReport.jsx
import { useAssessment } from '../contexts/AssessmentContext';

const SummaryReport = () => {
  const { answers } = useAssessment();

  // Calculate scores
  const calculateScores = () => {
    const scores = {};
    Object.entries(answers).forEach(([section, questions]) => {
      scores[section] = Object.values(questions).filter(q => q.value).length;
    });
    return scores;
  };

  return (
    <div>
      <h2>Assessment Summary</h2>
      <pre>{JSON.stringify(calculateScores(), null, 2)}</pre>
      {/* Render detailed report here */}
    </div>
  );
};

export default SummaryReport;