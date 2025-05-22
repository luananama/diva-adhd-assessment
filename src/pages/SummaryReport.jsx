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
  color: var(--color-gray-800);
`;

const TableHeader = styled.th`
  padding: 14px;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
`;

const TotalRow = styled.tr`
  background-color: var(--color-primary-light);
  font-weight: bold;
`;

const TotalSymptomsCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  color: var(--color-gray-700);
`;

const SummaryContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-gray-100);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
`;

const TableHeaderCell = styled.td`
  padding: 14px;
  background-color: var(--color-primary); /* Light blue background */
  color: var(--color-white);
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  vertical-align: middle;
  width: 180px; /* Width of the first column */
  border-bottom: 1px solid var(--color-gray-200);
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-gray-200);
  font-size: 0.95rem;
  color: var(--color-gray-700);
`;

const SimpleCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 0.95rem;
  color: var(--color-gray-700);
  background-color: var(
    --color-white
  ); /* Ensure white background for section 1 */
  border-bottom: none; /* Remove the line between rows */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-gray-100);
  }
`;

const InlineCheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const PatientInfoBox = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1rem;
  color: var(--color-gray-800);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  span {
    flex: 1 1 45%;
  }

  strong {
    font-weight: 600;
  }
`;

const SummaryReport = () => {
  const { answers } = useAssessment();

  const patientInfo = answers.patientInfo || {};

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

      <PatientInfoBox>
        <InfoRow>
          <span>
            <strong>Nume pacient:</strong> {patientInfo.name || "—"}
          </span>
          <span>
            <strong>Data nașterii:</strong> {patientInfo.birthDate || "—"}
          </span>
        </InfoRow>
        <InfoRow>
          <span>
            <strong>Gen:</strong> {patientInfo.gender || "—"}
          </span>
          <span>
            <strong>Data interviului:</strong>{" "}
            {patientInfo.assessmentDate || "—"}
          </span>
        </InfoRow>
        <InfoRow>
          <span>
            <strong>Nume cercetător:</strong> {patientInfo.assessorName || "—"}
          </span>
          <span>
            <strong>Număr pacient:</strong> {patientInfo.patientNumber || "—"}
          </span>
        </InfoRow>
      </PatientInfoBox>
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
            <TableHeaderCell></TableHeaderCell>
            <TableCell>Diagnostic ADHD***</TableCell>

            <TableCell>
              <MultiOptionToggle
                options={[
                  "Nu",
                  "314.01 Da, tip combinat",
                  "314.00 Da, tip predominant neatent",
                  "314.01 Da, tip predominant Hiperactiv-impulsiv",
                ]}
                onSelect={(value) => console.log("Selected:", value)}
                inline={false}
              />
            </TableCell>
          </tr>
        </tbody>
      </StyledTable>
    </SummaryContainer>
  );
};

export default SummaryReport;
