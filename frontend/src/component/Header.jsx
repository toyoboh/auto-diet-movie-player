import React from "react"
import styled from "styled-components";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

function Header() {
    return (
        <Container>
            <Content>
                <Icon />
                <Title>Auto Diet Movie Player</Title>
            </Content>
        </Container>
    )
}

const Container = styled.header`
    align-items: center;
    background-color: var(--black-2);
    display: flex;
    height: 60px;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
    top: 0px;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled(DirectionsWalkIcon)`
    &.MuiSvgIcon-root {
        color: var(--white-1);
        font-size: 24px;
        margin-right: 8px;
    }
`;

const Title = styled.h1`
    color: var(--white-1);
    font-family: 'Sansita Swashed', cursive;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
`;

export default Header
