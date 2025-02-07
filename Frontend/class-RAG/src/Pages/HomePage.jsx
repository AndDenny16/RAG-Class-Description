import { useState } from 'react'
import { useDescFetch } from '../Hooks/useDescFetch'
import { useDavidsonFetch } from '../Hooks/useDavidsonFetch'
import './HomePage.css'
import StyleButton from '../Components/StyleButton'
import DavidsonClass from '../Components/DavidsonClass'
import { useFormInput } from '../Hooks/useFormInput'
import IdealClass from '../Components/IdealClass'
import DavidsonImage from '../assets/Davidson.png'

function HomePage() {
    const word1 = useFormInput('pandemics');
    const word2 = useFormInput('health care policy');
    const word3 = useFormInput('medicine');
    const {loading: descLoading, error: descError, data: descData, fetchFakeCourse} = useDescFetch();
    const {loading, error, data, fetchDavidsonCourse} = useDavidsonFetch();
    console.log(data)
  return (
    <div className='overall_container'>
        <div className='title_container'>
            <h1 style = {{ fontSize: 60, marginBottom: '2px'}}>Davidson Class Explorer</h1>
            <h3 style={{ marginTop: '2px'}}>A New Way to Explore the Class Schedule</h3>
            <hr style={{color: 'red'}}></hr>
        </div>
       
        <h2>Three Random Words/Concepts to Describe Your Ideal Class</h2>
        <div className='word_container'>
            <input className='text_box_container'{...word1} placeholder='Word 1' />
            <input className='text_box_container'{...word2} placeholder='Word 2' />
            <input className='text_box_container'{...word3} placeholder='Word 3' />
            <StyleButton text = "Discover Your Ideal Course" onClick = {() => fetchFakeCourse([word1.value, word2.value, word3.value])}/>
        </div>
        <div className='ideal_class_container'>
            {descLoading && <div className='spinner'/>}
            {descData && 
            <div>
                <h2>Your Ideal Class Description</h2>
                <div style = {{display:'flex',  marginRight: '122px', flexDirection: 'row', alignItems: 'center'}}>
                    <IdealClass class = {descData} />
                    <StyleButton style={{marginLeft : 'auto'}} text = "Find Davidson Courses Like This" onClick = {() => {fetchDavidsonCourse(descData)}}/>
                </div>
                
            </div>}
            {descError && <p>{descError}</p>}
        </div>
        <div>
           
        </div>
        <div className='larger_container'>
            {loading && <div className='spinner'/>}
            {data && 
            <div>
                <h2>Your Suggested Classes</h2>
                <div className='class_container'>
                    {data.map((item, index) => {
                        console.log(item);
                    return( <DavidsonClass class = {item} key={index} />)
                    })}
                </div>
            </div>
            }
            {error && <p>{error}</p>}
        </div>
    </div>
  )
}

export default HomePage