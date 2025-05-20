/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Roboto font
Font.register({
  family: "Roboto",
  src: "/src/assets/Roboto-Regular.ttf", // Adjust the path if needed
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 9,
    fontFamily: "Roboto",
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  tableColHeader: {
    borderBottom: "1 solid black",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
    flexWrap: "wrap",
  },
  tableCol: {
    borderBottom: "1 solid #ccc",
    padding: 5,
    textAlign: "center",
    flexWrap: "wrap",
    wordBreak: "break-word",
  },
  smallCol: {
    width: "15%", // Smaller for Criteriu and Maturitate/Copilărie
  },
  largeCol: {
    width: "55%", // Much larger for Symptom
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
  },
  totalCell: {
    width: "70%",
    padding: 5,
    fontWeight: "bold",
    textAlign: "left",
  },
  totalValue: {
    width: "15%",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const SummaryPDF = ({
  section1Questions,
  section2Questions,
  section1AdultCount,
  section1ChildCount,
  section2AdultCount,
  section2ChildCount,
  getSymptomResponse,
}) => (
  <Document>
    <Page
      size="A4"
      style={styles.page}
      render={({ pageNumber, totalPages }) => (
        <>
          <Text style={styles.sectionTitle}>Rezumat Simptome ADHD</Text>

          {/* ============ Section 1 ============ */}
          <Text style={styles.sectionTitle}>
            Rezumatul simptomelor A și H/I
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableColHeader, styles.smallCol]}>
                Nr. Criteriu
              </Text>
              <Text style={[styles.tableColHeader, styles.largeCol]}>
                Simptom
              </Text>
              <Text style={[styles.tableColHeader, styles.smallCol]}>
                Maturitate
              </Text>
              <Text style={[styles.tableColHeader, styles.smallCol]}>
                Copilărie
              </Text>
            </View>

            {section1Questions.map((q) => (
              <View style={styles.tableRow} key={q.id}>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {q.questionNumber}
                </Text>
                <Text style={[styles.tableCol, styles.largeCol]}>
                  {q.questionText}
                </Text>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {getSymptomResponse("section1", `adult-${q.id}`)}
                </Text>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {getSymptomResponse("section1", `child-${q.id}`)}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalCell}>
                Numărul total al criteriilor pentru
                Hiperactivitate/Impulsivitate
              </Text>
              <Text style={styles.totalValue}>{section1AdultCount}/9</Text>
              <Text style={styles.totalValue}>{section1ChildCount}/9</Text>
            </View>

            {section2Questions.map((q) => (
              <View style={styles.tableRow} key={q.id}>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {q.questionNumber}
                </Text>
                <Text style={[styles.tableCol, styles.largeCol]}>
                  {q.questionText}
                </Text>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {getSymptomResponse("section2", `adult-${q.id}`)}
                </Text>
                <Text style={[styles.tableCol, styles.smallCol]}>
                  {getSymptomResponse("section2", `child-${q.id}`)}
                </Text>
              </View>
            ))}

            {/* Total symptoms row for section 2 */}
            <View style={styles.totalRow}>
              <Text style={styles.totalCell}>
                Numărul total al criteriilor pentru
                Hiperactivitate/Impulsivitate
              </Text>
              <Text style={styles.totalValue}>{section2AdultCount}/9</Text>
              <Text style={styles.totalValue}>{section2ChildCount}/9</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Formular calificative</Text>

          {/* ========== DSM-IV Evaluation ========== */}
          <Text style={styles.sectionTitle}>Evaluare criterii DSM-IV</Text>

          {/* Criteriul A */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>DSM-IV criteriul A</Text>

            <Text style={styles.label}>Copilărie:</Text>
            <Text>Numărul caracteristicilor A este ≥ 6? ● Da / ○ Nu</Text>
            <Text>Numărul caracteristicilor H/I este ≥ 6? ● Da / ○ Nu</Text>

            <Text style={styles.label}>Maturitate:</Text>
            <Text>Numărul caracteristicilor A este ≥ 6? ● Da / ○ Nu</Text>
            <Text>Numărul caracteristicilor H/I este ≥ 6? ● Da / ○ Nu</Text>
          </View>

          {/* Criteriul B */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>DSM-IV criteriul B</Text>
            <Text>
              Există semnele unui tipar pe viață al simptomelor și limitărilor?
              ● Da / ○ Nu
            </Text>
          </View>

          {/* Criteriul C și D */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>DSM-IV criteriul C și D</Text>
            <Text>
              Simptomele sunt exprimate în cel puțin două domenii de
              funcționare:
            </Text>
            <Text>Copilărie: ● Da / ○ Nu</Text>
            <Text>Maturitate: ● Da / ○ Nu</Text>
          </View>

          {/* Criteriul E */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>DSM-IV criteriul E</Text>
            <Text>
              Simptomele nu pot fi explicate mai bine de prezența unei alte
              tulburări psihiatrice
            </Text>
            <Text>● Da / ○ Nu</Text>
            <Text>Dacă da, de: ________________________</Text>
          </View>

          {/* Heteroanamneză */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>Informații heteroanamnestice</Text>
            <Text>Părinte(ți)/frate/soră/alții: N/A ○ 0 ○ 1 ○ 2 ○</Text>
            <Text>Partener/prieten/alții: N/A ○ 0 ○ 1 ○ 2 ○</Text>
            <Text>Rapoarte școlare: N/A ○ 0 ○ 1 ○ 2 ○</Text>
            <Text>
              0 = fără/puțin sprijin | 1 = oarecare sprijin | 2 = sprijin
              evident
            </Text>
            <Text>Explicație: ________________________</Text>
          </View>

          {/* Diagnostic final */}
          <View style={styles.formBlock}>
            <Text style={styles.bold}>Diagnostic ADHD</Text>
            <Text>○ Nu</Text>
            <Text>○ Da, subtip:</Text>
            <Text>- 314.01 Tip combinat</Text>
            <Text>- 314.00 Tip predominant neatent</Text>
            <Text>- 314.01 Tip predominant Hiperactiv-impulsiv</Text>
          </View>

          <Footer pageNumber={pageNumber} totalPages={totalPages} />
        </>
      )}
    />
  </Document>
);

export default SummaryPDF;

const Footer = ({ pageNumber, totalPages }) => {
  const today = new Date().toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={footerStyles.container} fixed>
      <Text>{`Generat la: ${today}`}</Text>
      <Text>{`Pagina ${pageNumber} din ${totalPages}`}</Text>
    </View>
  );
};

const footerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    fontSize: 8,
    bottom: 15,
    left: 30,
    right: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#555",
  },
});
