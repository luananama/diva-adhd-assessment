import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function AppLayout() {
    return (
        <PageWrapper>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </PageWrapper>
  );
}

export default AppLayout; 