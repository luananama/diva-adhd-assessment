/* eslint-disable react/prop-types */
import { useAssessment } from "../contexts/AssessmentContext";
import questionsData from "../assets/questions.json";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StyledCheckbox from "../components/ui/StyledCheckbox";
import SymptomToggle from "../components/ui/SymptomToggle";

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #2b2b2b;
`;

const TableHeader = styled.th`
  padding: 14px;
  background-color: #3db2c4;
  color: white;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
`;

const TotalRow = styled.tr`
  background-color: #f0f0f0;
  font-weight: bold;
`;

const TotalSymptomsCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  color: #333;
`;

const SummaryContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
`;

const TableHeaderCell = styled.td`
  padding: 14px;
  background-color: #3db2c4; /* Light blue background */
  color: white;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  vertical-align: middle;
  width: 180px; /* Width of the first column */
  border-bottom: 1px solid #f0f0f0;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
  color: #4a4a4a;
`;

const SimpleCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 0.95rem;
  color: #4a4a4a;
  background-color: white; /* Ensure white background for section 1 */
  border-bottom: none; /* Remove the line between rows */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const SummaryReport = () => {
  const { answers } = useAssessment();

  const section1Questions =
    questionsData.sections.find((s) => s.sectionNumber === 1)?.questions || [];

  const section1Responses = answers["section1"] || {};
  // count all the symptoms that were present in adulthood
  const section1AdultCount = section1Questions.reduce((count, q) => {
    const id = `adult-${q.id}`;
    const present = section1Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  // count all the symptoms that were present in childhood
  const section1ChildCount = section1Questions.reduce((count, q) => {
    const id = `child-${q.id}`;
    const present = section1Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  // if the symptom was present for a criteria return "Yes", otherwise "No"
  const getSymptomResponse = (sectionKey, id) => {
    const entry = answers[sectionKey]?.[id];
    return entry?.symptomPresent ? "Da" : "Nu";
  };

  const [section2AdulthoodTotal, setSection2AdulthoodTotal] = useState(0);
  const [section2ChildhoodTotal, setSection2ChildhoodTotal] = useState(0);

  const [section3Responses, setSection3Responses] = useState({});
  const [adulthoodCategoryCount, setAdulthoodCategoryCount] = useState(0);
  const [childhoodCategoryCount, setChildhoodCategoryCount] = useState(0);

  const [symptom, setSymptom] = useState(null); // 'yes' | 'no' | null
  // Load responses from localStorage and process sections
  useEffect(() => {
    const storedResponses =
      JSON.parse(localStorage.getItem("assessmentAnswers")) || {};

    // Section 1
    const section1 = storedResponses.section1 || {};
    // setSection1Responses(section1);
    console.log("storedResponses", section1.keys);
    // Count symptoms present in section 1 for adulthood and childhood
    // const adulthoodCount = Object.keys(section1).filter(
    //   (category) => section1[category]?.adulthood?.symptomPresent
    // ).length;

    // const childhoodCount = Object.keys(section1).filter(
    //   (category) => section1[category]?.childhood?.symptomPresent
    // ).length;

    // setSection1AdulthoodTotal(adulthoodCount);
    // setSection1ChildhoodTotal(childhoodCount);

    const s2ad = 0;
    setSection2AdulthoodTotal(s2ad);
    const s2ch = 0;
    setSection2ChildhoodTotal(s2ch);

    // Section 3 responses
    const section3 = storedResponses.section3 || {};
    setSection3Responses(section3);

    const adulthoodCategoryCount = Object.keys(section3).filter(
      (category) => section3[category]?.adulthood?.length > 0
    ).length;

    const childhoodCategoryCount = Object.keys(section3).filter(
      (category) => section3[category]?.childhood?.length > 0
    ).length;

    setAdulthoodCategoryCount(adulthoodCategoryCount);
    setChildhoodCategoryCount(childhoodCategoryCount);
  }, []);

  return (
    <SummaryContainer>
      <Title>Symptom Summary</Title>
      <div>
        <h3>Is the symptom present?</h3>
        <SymptomToggle value={symptom} onChange={setSymptom} />
      </div>

      {/* ===================== */}
      {/*  Section 1 Symptoms   */}
      {/* ===================== */}
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Criteriul DSM-IV TR</TableHeader>
            <TableHeader>Simptom</TableHeader>
            <TableHeader>Prezent la maturitate</TableHeader>
            <TableHeader>Prezent în copilărie</TableHeader>
          </tr>
        </thead>
        <tbody>
          {section1Questions.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.questionNumber}</TableCell>
              <TableCell>{q.questionText}</TableCell>
              <TableCell>
                {getSymptomResponse("section1", `adult-${q.id}`)}
              </TableCell>
              <TableCell>
                {getSymptomResponse("section1", `child-${q.id}`)}
              </TableCell>
            </TableRow>
          ))}
          <TotalRow>
            <TotalSymptomsCell colSpan="2">
              Numărul total al criteriilor pentru Deficit de atenție
            </TotalSymptomsCell>
            <TotalSymptomsCell>{section1AdultCount}/9</TotalSymptomsCell>
            <TotalSymptomsCell>{section1ChildCount}/9</TotalSymptomsCell>
          </TotalRow>
        </tbody>
      </StyledTable>

      {/* Section 3 Symptoms */}
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Category</TableHeader>
            <TableHeader>Adulthood Symptoms</TableHeader>
            <TableHeader>Childhood Symptoms</TableHeader>
          </tr>
        </thead>
        <tbody>
          {/* Map over section3Responses to display categories and their examples */}
          {Object.keys(section3Responses).map((category, index) => (
            <TableRow key={index}>
              {/* Display Category */}
              <TableCell>{category}</TableCell>

              {/* Display Adulthood Symptoms */}
              <TableCell>
                <ul>
                  {section3Responses[category]?.adulthood?.length > 0 ? (
                    section3Responses[category]?.adulthood.map((example, i) => (
                      <li key={`adulthood-example-${i}`}>{example}</li>
                    ))
                  ) : (
                    <li>No symptoms</li>
                  )}
                </ul>
              </TableCell>

              {/* Display Childhood Symptoms */}
              <TableCell>
                <ul>
                  {section3Responses[category]?.childhood?.length > 0 ? (
                    section3Responses[category]?.childhood.map((example, i) => (
                      <li key={`childhood-example-${i}`}>{example}</li>
                    ))
                  ) : (
                    <li>No symptoms</li>
                  )}
                </ul>
              </TableCell>
            </TableRow>
          ))}

          {/* Summary Row */}
          <TotalRow>
            <TableCell colSpan="3">
              <strong>Adulthood: Symptoms in ≥ 2 categories?</strong>{" "}
              {adulthoodCategoryCount >= 2 ? "Yes" : "No"}
            </TableCell>
          </TotalRow>

          <TotalRow>
            <TableCell colSpan="3">
              <strong>Childhood: Symptoms in ≥ 2 categories?</strong>{" "}
              {childhoodCategoryCount >= 2 ? "Yes" : "No"}
            </TableCell>
          </TotalRow>
        </tbody>
      </StyledTable>

      {/* Formular calificative */}

      <StyledTable>
        <tbody>
          {/* DSM-IV criteriul A */}
          <tr>
            <TableHeaderCell rowSpan="6">DSM-IV criteriul A</TableHeaderCell>
            {/* childhood */}
            <SimpleCell>
              <strong>Copilărie</strong>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor A este ≥ 6?</SimpleCell>
            <StyledCheckbox
              label="Da"
              checked={section2ChildhoodTotal >= 6}
              disabled={section2ChildhoodTotal < 6}
              readOnly
            />
            <StyledCheckbox
              label="Nu"
              checked={section2ChildhoodTotal < 6}
              disabled={section2ChildhoodTotal >= 6}
              readOnly
            />
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor H/I este ≥ 6?</SimpleCell>
            <StyledCheckbox
              label="Da"
              checked={section2ChildhoodTotal >= 6}
              disabled={section2ChildhoodTotal < 6}
              readOnly
            />

            <StyledCheckbox
              label="Nu"
              checked={section2ChildhoodTotal < 6}
              disabled={section2ChildhoodTotal >= 6}
              readOnly
            />
          </tr>
          {/* adulthood */}
          <tr>
            <SimpleCell>
              <strong>Maturitate</strong>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor A este ≥ 6?</SimpleCell>
            {/* <StyledCheckbox
              label="Da"
              checked={section1AdulthoodTotal >= 6}
              disabled={section1AdulthoodTotal < 6}
              readOnly
            /> */}
            {/* <StyledCheckbox
              label="Nu"
              checked={section1AdulthoodTotal < 6}
              disabled={section1AdulthoodTotal >= 6}
              readOnly
            /> */}
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor H/I este ≥ 6?</SimpleCell>
            <StyledCheckbox
              label="Da"
              checked={section2AdulthoodTotal >= 6}
              disabled={section2AdulthoodTotal < 6}
              readOnly
            />

            <StyledCheckbox
              label="Nu"
              checked={section2AdulthoodTotal < 6}
              disabled={section2AdulthoodTotal >= 6}
              readOnly
            />
          </tr>

          {/* DSM-IV criteriul B */}

          <tr>
            <TableHeaderCell> DSM-IV criteriul B </TableHeaderCell>
            <SimpleCell>
              {" "}
              Există semnele unui tipar pe viață al simptomelor și limitărilor?{" "}
            </SimpleCell>

            {/* <MultiOption options={["Da", "Nu"]} /> */}
          </tr>

          {/* DSM-IV criteriul C și D */}
          <tr>
            <TableHeaderCell rowSpan="6">
              {" "}
              DSM-IV criteriul C și D{" "}
            </TableHeaderCell>
            <SimpleCell>
              Simptomele și tulburarea sunt exprimate în cel puțin două domenii
              de funcționare
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>
              <strong>Copilărie</strong>
            </SimpleCell>
            {/* <MultiOption options={["Da", "Nu"]} /> */}
          </tr>
          <tr>
            <SimpleCell>
              <strong>Maturitate</strong>
            </SimpleCell>
            {/* <MultiOption options={["Da", "Nu"]} /> */}
          </tr>
        </tbody>
      </StyledTable>
    </SummaryContainer>
  );
};

export default SummaryReport;
