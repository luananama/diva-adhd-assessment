import styled from "styled-components";
import { NavLink } from "react-router-dom";


const FooterContainer = styled.footer`
  padding: 1rem 2rem;
  background: #fefefe;
  border-top: 1px solid #f0f0f0; /* <-- only top border */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled(NavLink)`
  color: #1c688a;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #f56b6b;
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <FooterContainer>
        <FooterLink>
            hi.
        </FooterLink>
    </FooterContainer>
  );
}

export default Footer;
