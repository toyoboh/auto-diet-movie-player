import styled from "styled-components";
import React from "react";

function Button({ onClick, children }) {
    return(
        <Container
            onClick={ onClick }
            className="button"
        >{ children }</Container>
    )
}

const Container = styled.button`
    padding: 8px 24px;
    font-size: 16px;
    background-color: var(--blue-2);
    color: var(--white-1);
    transition: 0.2s;
    border-radius: 8px;
    text-align: center;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 1;
        background-color: var(--blue-1);
    }
`;

export default Button;
