import {
  PageContainer,
  PageTitle,
  Paragraph,
  List,
  ListItem,
  ReferenceBox,
} from "../components/ui/StyledTextElements";

const About = () => {
  return (
    <PageContainer>
      <PageTitle>Despre Aplicație</PageTitle>
      <Paragraph>
        Această aplicație implementează digital interviul DIVA 2.0 pentru
        diagnosticarea ADHD la adulți. DIVA are la bază criteriile DSM-IV şi
        este împărțit în trei părți:
      </Paragraph>
      <List>
        <ListItem>
          <b>Partea 1:</b> Criterii pentru Deficit de atenţie (A1)
        </ListItem>
        <ListItem>
          <b>Partea 2:</b> Criterii pentru Hiperactivitate-Impulsivitate (A2)
        </ListItem>
        <ListItem>
          <b>Partea 3:</b> Vârsta debutului şi Disfunctiile asociate
          simptomatologie
        </ListItem>
      </List>
      <Paragraph>
        La finalul evaluării, va fi generat un raport sumar. Numărul de criterii
        pentru Deficit de atenţie şi Hiperactivitate/Impulsivitate este
        completate automat pe baza selecțiilor dumneavoastră. Este necesară doar
        completarea câtorva informații suplimentare, și stabilirea
        diagnosticului de ADHD și a subtipului corespunzător (conform DSM-IV).
      </Paragraph>
      <Paragraph>
        Aplicația este destinată uzului profesional. Datele nu sunt transmise și
        rămân pe dispozitivul dumneavoastră până la închiderea ferestrei sau
        începerea unui nou interviu.
      </Paragraph>
      <Paragraph>
        Această aplicație este open-source și poate fi folosită, adaptată sau
        extinsă în scopuri proprii. Codul sursă este disponibil public și
        contribuțiile sunt binevenite.
      </Paragraph>
      <ReferenceBox>
        <strong>Referință:</strong>
        <br />
        Kooij JJS, Francken MH. Diagnostic Interview for ADHD in Adults
        (DIVA-5). DIVA Foundation; 2018.
      </ReferenceBox>
    </PageContainer>
  );
};

export default About;
