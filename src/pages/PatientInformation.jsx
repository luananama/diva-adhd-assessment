/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useAssessment } from "../contexts/AssessmentContext";
import { PageContainer, PageTitle } from "../components/ui/StyledTextElements";
import MultiOptionToggle from "../components/ui/MultiOptionToggle";
import StyledButton, { ButtonContainer } from "../components/ui/StyledButton";

const InfoCard = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
`;
const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 160px;
  font-weight: 600;
  color: var(--color-gray-800);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--color-gray-300);
  border-radius: 6px;
  font-size: 1rem;
  color: var(--color-gray-900);
`;

const DateInput = styled.input.attrs({ type: "date" })`
  flex: 1;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: var(--color-gray-900);
  padding: 10px;
  border: 1px solid var(--color-gray-300);
  border-radius: 6px;
`;

const Disclaimer = styled.p`
  font-size: 0.9rem;
  color: var(--color-gray-600);
  margin-top: 40px;
  line-height: 1.4;
  text-align: left;
`;
export default function PatientInformation() {
  const { answers, updatePatientInfo } = useAssessment();

  const handleChange = (e) => {
    updatePatientInfo(e.target.name, e.target.value);
  };

  //   const handleGenderChange = (value) => {
  //     updatePatientInfo("gender", value);
  //   };

  return (
    <PageContainer>
      <InfoCard>
        <PageTitle>Informații despre pacient</PageTitle>
        <Disclaimer>
          <strong>Notă:</strong> Datele introduse sunt stocate doar temporar,
          până la finalul sesiunii curente, și sunt folosite exclusiv pentru
          generarea unui raport descărcabil. Nu sunt transmise sau salvate pe
          niciun server.
        </Disclaimer>

        <FormRow>
          <Label htmlFor="name">Nume pacient</Label>
          <Input
            name="name"
            value={answers.patientInfo?.name || ""}
            onChange={handleChange}
            placeholder="Ex: Popescu Ana"
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="birthDate">Data nașterii</Label>
          <DateInput
            name="birthDate"
            value={answers.patientInfo?.birthDate || ""}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="sex">Sex:</Label>
          <MultiOptionToggle
            options={["Masculin", "Feminin"]}
            value={answers.patientInfo?.gender || null}
            onSelect={(val) =>
              handleChange({ target: { name: "gender", value: val } })
            }
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="assessmentDate">Data interviului</Label>
          <DateInput
            name="assessmentDate"
            value={answers.patientInfo?.assessmentDate || ""}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="assessorName">Nume cercetător</Label>
          <Input
            name="assessorName"
            value={answers.patientInfo?.assessorName || ""}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="patientNumber">Număr pacient</Label>
          <Input
            name="patientNumber"
            value={answers.patientInfo?.patientNumber || ""}
            onChange={handleChange}
          />
        </FormRow>

        <ButtonContainer>
          <StyledButton to="/">Înapoi la pagina de start</StyledButton>
          <StyledButton to="/section/1">Înainte</StyledButton>
        </ButtonContainer>
      </InfoCard>
    </PageContainer>
  );
}
