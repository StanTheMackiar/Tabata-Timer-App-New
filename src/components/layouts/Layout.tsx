
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components';
import { Header, VolumeControl } from '../ui';


export const Layout:FC<PropsWithChildren> = ({ children }) => {

   return (
    <AppContainer>
        <Header />
            { children }
        <VolumeControl />
    </AppContainer>
   )
}


const AppContainer = styled.main`
    border-width: 2px;
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    user-select: none;
    background-color: #ffffff16;
    border: thin #1d1c1c solid;
`;
