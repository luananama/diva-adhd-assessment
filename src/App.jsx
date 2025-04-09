import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./components/ui/AppLayout";
function App() {
  return (
    <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        {/* app layout wraps the other routes because it should show up on all pages #TODO remove and place header footer manually */}
        <Route element={<AppLayout/>}> 
          <Route path="/" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
