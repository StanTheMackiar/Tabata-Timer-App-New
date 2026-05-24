
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
    width: min(100%, 34rem);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    user-select: none;
    background-color: var(--pf-bg);
    border-left: 1px solid var(--pf-line);
    border-right: 1px solid var(--pf-line);
`;
