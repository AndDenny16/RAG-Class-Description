import { useState } from 'react'
import './HomePage.css'
import StyleButton from '../Components/StyleButton'
import DavidsonClass from '../Components/DavidsonClass'
import { useFormInput } from '../Hooks/useFormInput'
import IdealClass from '../Components/IdealClass'
import DavidsonImage from '../assets/Davidson.png'
import { usePostFetch } from '../Hooks/usePostFetch'

function HomePage() {
    const word1 = useFormInput('pandemics');
    const word2 = useFormInput('health care policy');
    const word3 = useFormInput('medicine');
    const {loading: descLoading, error: descError, data: descData, postFetch: fetchDescriptions} = usePostFetch();
    const {loading: classLoading, error: classError, data: classData, postFetch: fetchDavidsonCourse} = usePostFetch();
    console.log("herhelre", descError);
  return (
    <div className='overall_container'>
        <div class = "image_title_container">
            <img className = "home_image" src = {DavidsonImage} alt = "Davidson Logo"></img>
            <div className='title_container'>
                <h1 style = {{ fontSize: 60, marginBottom: '2px'}}>Davidson Class Explorer</h1>
                <h3 style={{ marginTop: '2px'}}>A New Way to Explore the Class Schedule</h3>
            </div>
        </div>
        <hr style={{ border: '1px solid red', width: '100%', margin: '10px 0'}}></hr>
        
        
       
        <h2>Three Random Words/Concepts to Describe Your Ideal Class</h2>
        <div className='word_container'>
            <input className='text_box_container'{...word1} placeholder='Word 1' />
            <input className='text_box_container'{...word2} placeholder='Word 2' />
            <input className='text_box_container'{...word3} placeholder='Word 3' />
            <StyleButton text = "Discover Your Ideal Course" onClick = {() => fetchDescriptions("build", {"topics": [word1.value, word2.value, word3.value]})}/>
        </div>
        <div className='ideal_class_container'>
            {descLoading && 
            <div style ={{marginTop: "12px"}}>
                <div className='spinner'/>
            </div>}
            {descData && 
            <div>
                <h2>Your Ideal Class Description</h2>
                <div style = {{display:'flex',  marginRight: '122px', flexDirection: 'row', alignItems: 'center'}}>
                    <IdealClass class = {descData} />
                    <StyleButton style={{marginLeft : 'auto'}} text = "Find Davidson Courses" onClick = {() => {fetchDavidsonCourse("getclasses", {"description": descData})}}/>
                </div>
                
            </div>}
            {descError && <h3>{descError}</h3>}
        </div>
        <div>
           
        </div>
        <div className='larger_container'>
            {classLoading && 
            <div style ={{marginTop: "12px"}}>
                <div className='spinner'/>
            </div>}
            {classData && 
            <div>
                <h2>Your Suggested Classes</h2>
                <div className='class_container'>
                    {classData.map((item, index) => {
                        console.log(item);
                    return( <DavidsonClass class = {item} key={index} />)
                    })}
                </div>
            </div>
            }
            {classError && <h3>{classError}</h3>}
        </div>
    </div>
  )
}

export default HomePage