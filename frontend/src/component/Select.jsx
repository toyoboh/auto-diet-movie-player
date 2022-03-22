import React from "react";
import styled from "styled-components";

function Select({
    LabelIcon,
    labelTitle,
    optionItems,
    selectValue,
    selectChangeFunction,
    error = "",
    placeHolder = ""
}) {

    const options = optionItems.map((item) => {
        return (
            <li
                key={ item.id }
                onMouseDown={ () => selectChangeFunction({ id: item.id, value: item.value }) }
            >{ item.value }</li>
        )
    })

    return (
        <Container className="select">
            <LabelBox>
                <label htmlFor="">
                    <span><LabelIcon /></span>
                    <span>{ labelTitle }</span>
                </label>
            </LabelBox>

            <SelectBox>
                <input
                    defaultValue={ selectValue.value }
                    placeholder={ placeHolder}
                    readOnly
                />
                <ul>
                    { options }
                </ul>
            </SelectBox>

            {error !== "" &&
                <ErrorBox>{ error }</ErrorBox>
            }
        </Container>
    )
}

const Container = styled.div`
    margin-bottom: 16px;
    position: relative;
    width: 300px;
`;

const LabelBox = styled.div`
    width: 100%;

    & > label {

        align-items: center;
        display: flex;
        margin-bottom: 8px;
        
        & > span:nth-child(1) > .MuiSvgIcon-root {
            color: var(--black-2);
            font-size: 20px;
            margin-right: 4px;
        }

        & > span:nth-child(2) {
            color: var(--black-2);
        }
    }
`;

const SelectBox = styled.div`
    position: relative;
    width: 100%;

    & > input {
        border: 1px solid var(--black-4);
        border-radius: 8px;
        color: var(--black-2);
        cursor: pointer;
        padding: 8px 16px;
        width: 100%;

        &:focus {
            outline: none;
        }
    }

    & > ul {
        background-color: var(--white-1);
        border: 1px solid var(--black-4);
        border-radius: 8px;
        display: none;
        padding: 8px 0px;
        position: absolute;
        width: 100%;
        z-index: 1;
        max-height: 150px;
        overflow-y: scroll;
        
    }
    
    & > input:focus ~ ul {
        display: block;
    }

    & > ul > li {
        padding: 8px 16px;

        &:hover {
            background-color: var(--blue-8);
            cursor: pointer;
        }
    }
`;

const ErrorBox = styled.p`
    color: var(--red-2);
    font-size: 14px;
    position: absolute;
`;

export default Select
