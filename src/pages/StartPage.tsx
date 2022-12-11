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
               <Timer form={form} currentTimerName='recovery' />
            </TimerContainer>
            )
         }
     
         <CyclesAndTabata disabled/>
         <StartStopButton action='stop'/>
      </Layout>
   )
}


const TimerContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;