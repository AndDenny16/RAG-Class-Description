import styled from "styled-components";

const StyledButton = styled.button`
    background-color: red;
    color: white;
    border: 1px solid gray; /* Ensures a uniform border */
    border-radius: 30px; /* Smooth rounded corners */
    padding: 10px 20px;
    cursor: pointer;
    width: 160px;
    height: 80px;
    font-size: 1em;
    font-weight: bold;
    text-align: center;

    /* Shadow Effect */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2), 
                0px 8px 12px rgba(0, 0, 0, 0.15); 

    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: darkred;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3), 
                    0px 10px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px); /* Subtle lift effect */
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    };
`;

const StyleButton = (props) => {
    return <StyledButton style = {props.style} onClick={props.onClick}>{props.text} </StyledButton>;
};

export default StyleButton;
