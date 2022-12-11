import { FC } from "react";
import { Form } from '../components';
import { Layout } from "../components/layouts/Layout";
import { TotalTime } from "../components/ui/TotalTime";

export const HomePage: FC = () => {


  return (
      <Layout>
        <TotalTime />
        <Form />
      </Layout>
  );
};

