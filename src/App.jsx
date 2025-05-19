/* eslint-disable react/prop-types */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./components/ui/AppLayout";
import AssessmentSection from "./components/assessment/AssessmentSection";
import { AssessmentProvider } from "./contexts/AssessmentContext";
import SummaryReport from "./pages/SummaryReport";
import Instructions from "./pages/Instructions";
function App() {
  return (
    <>
      <GlobalStyles />
      <AssessmentProvider>
        <BrowserRouter>
          <Routes>
            {/* app layout wraps the other routes because it should show up on all pages #TODO remove and place header footer manually */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="instructions" element={<Instructions />} />
              <Route
                path="/section/:sectionNumber"
                element={<AssessmentSection />}
              />
              <Route path="/summary" element={<SummaryReport />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </>
  );
}

export default App;
