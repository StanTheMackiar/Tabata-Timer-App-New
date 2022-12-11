
import { FC } from 'react'
import styled from 'styled-components';
import { ImPause2, ImPlay2 } from "react-icons/im"

interface Props {
    togglePause: () => void,
    isPaused: boolean,
}


export const PauseTimer:FC<Props> = ({ isPaused, togglePause }) => {


    
   return (
        <Container>
            {
                isPaused 
                ?   <ImPlay2 style={{ cursor: 'pointer' }} onClick={ togglePause }/>
                :   <ImPause2 style={{ cursor: 'pointer' }} onClick={ togglePause }/>
            }
          
        </Container>
   )
}

const Container = styled.div`
    display: flex;
    position: relative;
    bottom: 1rem;
    justify-content: center;
    align-items: center;
    flex: 1;
    outline: none;
    border: none;
    color: white;
    font-size: 35px;

`