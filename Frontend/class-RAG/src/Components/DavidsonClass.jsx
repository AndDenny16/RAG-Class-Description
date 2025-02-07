import { useState } from "react"
import DavidsonImage from '../assets/Davidson.png'
import "./DavidsonClass.css"

const DavidsonClass = (props) => {

    return (

        <div className="class_cont">
            <div className = "header">
                <img className = "image_style" src = {DavidsonImage} alt = "Davidson Logo"></img>
                <h2 className="header_text"> {props.class['course_title']} {props.class['course_number']}</h2>
            </div>
            
            <p className="paragraph_text">{props.class['description']}</p>
        </div>


    )




}

export default DavidsonClass