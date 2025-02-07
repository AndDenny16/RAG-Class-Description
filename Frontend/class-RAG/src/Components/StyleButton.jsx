import styled from "styled-components";

const StyledButton = styled.button`
    background-color: red;
    color: white;
    border-radius: 5px;
    margin: 20px 0px;
    cursor: pointer;
    width: 150px;
    height: 80px;
    border-radius: 30px;
    box-shadow: 0px 2px 2px lightgray;
    outline: white;
    font-size: 1em;

    &:hover {
        background-color: darkred;
    }
`;

const StyleButton = (props) => {
    return <StyledButton style = {props.style} onClick={props.onClick}>{props.text} </StyledButton>;
};

export default StyleButton;
