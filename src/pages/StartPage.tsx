import { FC } from 'react'
import { Layout } from '../components/layouts/Layout';
import { CyclesAndTabata, StartStopButton, Timer } from '../components';
import { useInitialValues } from '../hooks';
import styled from 'styled-components';


export const StartPage:FC = () => {

   const { form, isLoaded } = useInitialValues();

   return (
      <Layout>
         
         {    isLoaded && (
            <TimerContainer>
               <Timer form={form} currentTimerName='prepare' />
               <Timer form={form} currentTimerName='work' />
               <Timer form={form} currentTimerName='rest' />
            </TimerContainer>
            )
         }
     
         <CyclesAndTabata disabled/>
         <StartStopButton action='stop'/>
      </Layout>
   )
}


const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
