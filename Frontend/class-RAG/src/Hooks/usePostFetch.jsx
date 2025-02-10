import { useState, useEffect } from "react";


export function usePostFetch(){
  //Declare State Variables for updating UI
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  //Post Fetch Function for Posts to Flask API
  //Takes in the path and Body as the Input
  const postFetch = async (path,body) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
        console.log('fetching')
        console.log(body)
        const response = await fetch(`http://10.54.11.61:8000/${path}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (!response.ok){
            const result = await response.json();
            console.log("Here is teh REsult,", result['error']);
            throw new Error(result['error']);
        }
        const result = await response.json();
    //Data is in the body of the Flask Return
    setData(result['body']);
    } catch (error) {
        console.log("Here is the error", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
  return { data, loading, error, postFetch }

}