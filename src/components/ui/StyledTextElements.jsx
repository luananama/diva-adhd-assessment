import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const PageTitle = styled.h1`
  font-size: 1.5;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  text-align: left;
`;

export const List = styled.ul`
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
`;

export const ReferenceBox = styled.div`
  background-color: var(--color-surface-border);
  color: var(--color-text-muted);
  padding: 1rem;
  font-size: 0.95rem;
  border-left: 4px solid var(--color-primary);
  text-align: left;
  margin-top: 2rem;
`;

// const Citation = styled.div`
//   font-size: 1rem;
//   color: #555;
//   margin-bottom: 2rem;
//   text-align: left;
// `;

// const LeftPageTitle = styled.h1`
//   font-size: 2rem;
//   text-align: left;
//   color: var(--color-text-primary);
//   margin-bottom: 1.5rem;
// `;

// const LeftPageContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 2rem;
//   text-align: left;
// `;
