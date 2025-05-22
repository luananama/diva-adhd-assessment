import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 1rem 2rem;
  background: #fefefe;
  border-top: 1px solid #f0f0f0; /* <-- only top border */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: var(--color-accent-blue);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: var(--color-accent-pink);
    text-decoration: underline;
  }
`;

const InfoBox = styled.div`
  color: var(--color-text-muted, #666);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-radius: 4px;
  max-width: 720px;
  text-align: center;

  a {
    color: var(--color-accent-blue, #0074cc);
    text-decoration: underline;

    &:hover {
      color: var(--color-accent-pink, #3db2c4);
    }
  }
`;
const Attribution = styled.small`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`;
function Footer() {
  return (
    <FooterContainer>
      <InfoBox>
        Aplicație open-source 🐙 — contribuțiile sunt binevenite pe{" "}
        <FooterLink
          href="https://github.com/tu-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </FooterLink>{" "}
        💖
        <br />
        <Attribution>
          <a
            href="https://www.flaticon.com/authors/afif-fudin"
            title="icon by afif fudin"
          >
            Adhd icon created by afif fudin - Flaticon
          </a>
        </Attribution>
      </InfoBox>
    </FooterContainer>
  );
}

export default Footer;
