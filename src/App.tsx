import { BrowserRouter as Router } from "react-router-dom";

import { Navigation } from "./routes/Navigation"
import { createGlobalStyle } from "styled-components";
import { SoundProvider, FormProvider } from "./context";
import { Layout } from "./components/layouts/Layout";
import { TimerProvider } from "./context/timer";

const App = () => {

  return (
    <Router>
      <SoundProvider>
        <FormProvider>
          <TimerProvider>
            <GlobalStyle /> 
            <Navigation />
          </TimerProvider>
        </FormProvider>
      </SoundProvider>
    </Router>
  )
}


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    background-color: rgb(8, 8, 8);
    color: white;
    font-family: 'Poppins', sans-serif;
  }
  p {
    color: rgb(156, 192, 247);
    font-size: 1rem;
    text-align: center;
  }
`;

export default App
