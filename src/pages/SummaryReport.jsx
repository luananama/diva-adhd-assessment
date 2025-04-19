/* eslint-disable react/prop-types */
import { useAssessment } from "../contexts/AssessmentContext";
import questionsData from "../assets/questions.json";
import styled from "styled-components";
import StyledCheckbox from "../components/ui/StyledCheckbox";
import SymptomToggle from "../components/ui/SymptomToggle";
import MultiOptionToggle from "../components/ui/MultioptionToggle";

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
  background-color: #d4daf3;
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

const InlineCheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const SummaryReport = () => {
  const { answers } = useAssessment();

  const section1Questions =
    questionsData.sections.find((s) => s.sectionNumber === 1)?.questions || [];

  const section2Questions =
    questionsData.sections.find((s) => s.sectionNumber === 1)?.questions || [];

  const section3Questions =
    questionsData.sections.find((s) => s.sectionNumber === 3)?.questions || [];

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

  const section2Responses = answers["section2"] || {};
  // count all the symptoms that were present in adulthood
  const section2AdultCount = section2Questions.reduce((count, q) => {
    const id = `adult-${q.id}`;
    const present = section2Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  // count all the symptoms that were present in childhood
  const section2ChildCount = section2Questions.reduce((count, q) => {
    const id = `child-${q.id}`;
    const present = section2Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  const section3Responses = answers["section3"] || {};
  // count all the symptoms that were present in adulthood
  const section3AdultCount = section2Questions.reduce((count, q) => {
    const id = `adult-${q.id}`;
    const present = section3Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  // count all the symptoms that were present in childhood
  const section3ChildCount = section3Questions.reduce((count, q) => {
    const id = `child-${q.id}`;
    const present = section3Responses[id]?.symptomPresent;
    return present ? count + 1 : count;
  }, 0);

  return (
    <SummaryContainer>
      <Title>Symptom Summary</Title>

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
          {/* ===================== */}
          {/*  Section 2 Symptoms   */}
          {/* ===================== */}
          {section2Questions.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.questionNumber}</TableCell>
              <TableCell>{q.questionText}</TableCell>
              <TableCell>
                {getSymptomResponse("section2", `adult-${q.id}`)}
              </TableCell>
              <TableCell>
                {getSymptomResponse("section2", `child-${q.id}`)}
              </TableCell>
            </TableRow>
          ))}
          <TotalRow>
            <TotalSymptomsCell colSpan="2">
              Numărul total al criteriilor pentru Hiperactivitate/Impulsivitate
            </TotalSymptomsCell>
            <TotalSymptomsCell>{section1AdultCount}/9</TotalSymptomsCell>
            <TotalSymptomsCell>{section1ChildCount}/9</TotalSymptomsCell>
          </TotalRow>
        </tbody>
      </StyledTable>

      {/* =============================================================== */}
      {/*                   Formular calificative                         */}
      {/* =============================================================== */}

      <StyledTable>
        <tbody>
          {/* ===================== */}
          {/*  DSM-IV criteriul A   */}
          {/* ===================== */}
          <tr>
            <TableHeaderCell rowSpan="6">DSM-IV criteriul A</TableHeaderCell>
            {/* childhood */}
            <SimpleCell>
              <strong>Copilărie</strong>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor A este ≥ 6?</SimpleCell>
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section1ChildCount >= 6}
                  disabled={section1ChildCount < 6}
                  readOnly
                />
                <StyledCheckbox
                  label="Nu"
                  checked={section1ChildCount < 6}
                  disabled={section1ChildCount >= 6}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor H/I este ≥ 6?</SimpleCell>
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section2ChildCount >= 6}
                  disabled={section2ChildCount < 6}
                  readOnly
                />

                <StyledCheckbox
                  label="Nu"
                  checked={section2ChildCount < 6}
                  disabled={section2ChildCount >= 6}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>
          {/* adulthood */}
          <tr>
            <SimpleCell>
              <strong>Maturitate</strong>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor A este ≥ 6?</SimpleCell>
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section1AdultCount >= 6}
                  disabled={section1AdultCount < 6}
                  readOnly
                />
                <StyledCheckbox
                  label="Nu"
                  checked={section1ChildCount < 6}
                  disabled={section1ChildCount >= 6}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>Numărul caracteristicilor H/I este ≥ 6?</SimpleCell>
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section2AdultCount >= 6}
                  disabled={section2AdultCount < 6}
                  readOnly
                />
                <StyledCheckbox
                  label="Nu"
                  checked={section2AdultCount < 6}
                  disabled={section2AdultCount >= 6}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>

          {/* ===================== */}
          {/*  DSM-IV criteriul B   */}
          {/* ===================== */}

          <tr>
            <TableHeaderCell> DSM-IV criteriul B </TableHeaderCell>
            <SimpleCell>
              Există semnele unui tipar pe viață al simptomelor și limitărilor?
            </SimpleCell>
            <SimpleCell>
              <SymptomToggle />
            </SimpleCell>
          </tr>

          {/* ========================= */}
          {/*  DSM-IV criteriul C si D  */}
          {/* ========================= */}

          <tr>
            <TableHeaderCell rowSpan="3">
              DSM-IV criteriul C și D
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
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section3ChildCount >= 2}
                  disabled={section3ChildCount < 2}
                  readOnly
                />
                <StyledCheckbox
                  label="Nu"
                  checked={section3ChildCount < 2}
                  disabled={section3ChildCount >= 2}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>
          <tr>
            <SimpleCell>
              <strong>Maturitate</strong>
            </SimpleCell>
            <SimpleCell>
              <InlineCheckboxGroup>
                <StyledCheckbox
                  label="Da"
                  checked={section3AdultCount >= 2}
                  disabled={section3AdultCount < 2}
                  readOnly
                />
                <StyledCheckbox
                  label="Nu"
                  checked={section3AdultCount < 2}
                  disabled={section3AdultCount >= 2}
                  readOnly
                />
              </InlineCheckboxGroup>
            </SimpleCell>
          </tr>

          {/* ==================== */}
          {/*  DSM-IV criteriul E  */}
          {/* ==================== */}
          <tr>
            <TableHeaderCell rowSpan={2}>DSM-IV criteriul E</TableHeaderCell>
            <SimpleCell>
              Simptomele nu pot fi explicate mai bine de prezența unei alte
              tulburări psihiatrice
            </SimpleCell>
            <SimpleCell>
              <SymptomToggle />
            </SimpleCell>
          </tr>
          <tr>
            {/* <SimpleCell>Daca da, de: </SimpleCell> */}
            <SimpleCell></SimpleCell>
            <SimpleCell>
              Daca da, de:
              <input></input>
            </SimpleCell>
          </tr>

          <tr>
            <TableHeaderCell rowSpan={6}></TableHeaderCell>
            <TableCell>
              Diagnosticul este sprijinit de informații heteroanamnestice
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              Părinte(ți)/frate/soră/alții, ș.a. <input></input>
            </TableCell>
            <TableCell>
              <MultiOptionToggle
                options={["N/A", "0", "1", "2"]}
                onSelect={(value) => console.log("Selected:", value)}
              />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              Partener/prieten bun/alții, ș.a. <input></input>
            </TableCell>
            <TableCell>
              <MultiOptionToggle
                options={["N/A", "0", "1", "2"]}
                onSelect={(value) => console.log("Selected:", value)}
              />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              Rapoarte scolare <input></input>
            </TableCell>
            <TableCell>
              <MultiOptionToggle
                options={["N/A", "0", "1", "2"]}
                onSelect={(value) => console.log("Selected:", value)}
              />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              0 = fără/puțin sprijin 1 = oarecare sprijin 2 = sprijin evident
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              Explicație: <input></input>
            </TableCell>
          </tr>
          <tr>
            <TableHeaderCell rowSpan={8}></TableHeaderCell>
            <TableCell>Diagnostic ADHD***</TableCell>
            <TableCell>
              <tr>
                <StyledCheckbox label="Nu" />
              </tr>
              <tr>
                Da, subtip:
                <MultiOptionToggle
                  options={[
                    "314.01 Tip combinat",
                    "314.00 Tip predominant neatent",
                    "314.01 Tip predominant Hiperactiv-impulsiv",
                  ]}
                  onSelect={(value) => console.log("Selected:", value)}
                  inline={false}
                />
              </tr>
            </TableCell>
          </tr>
        </tbody>
      </StyledTable>
    </SummaryContainer>
  );
};

export default SummaryReport;
