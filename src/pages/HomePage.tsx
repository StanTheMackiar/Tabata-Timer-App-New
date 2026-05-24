import { FC } from "react";
import styled from "styled-components";
import { Form } from "../components";
import { Layout } from "../components/layouts/Layout";
import { TotalTime } from "../components/ui/TotalTime";

export const HomePage: FC = () => {
  return (
    <Layout>
      <HomeContent>
        <TotalTime />
        <Form />
      </HomeContent>
    </Layout>
  );
};

const HomeContent = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 2dvh, 1rem);
  padding: clamp(0.75rem, 1dvh, 1.25rem);

  @media (min-width: 1050px) {
    display: grid;
    grid-template-columns: minmax(18rem, 0.42fr) minmax(34rem, 1fr);
    align-items: stretch;
  }
`;
