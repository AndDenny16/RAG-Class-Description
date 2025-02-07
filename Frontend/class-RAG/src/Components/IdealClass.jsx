import { useState } from "react"
import DavidsonImage from '../assets/Davidson.png'
import "./DavidsonClass.css"

const IdealClass = (props) => {

    return (

        <div className="ideal_class_cont" style = {props.style}> 
        <h3 className="paragraph_text">Description</h3>
            <p className="paragraph_text"> {props.class}</p>
        </div>


    )




}

export default IdealClass