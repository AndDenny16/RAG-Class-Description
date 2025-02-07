import { useState, useEffect } from "react";


export function useDavidsonFetch(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const fetchDavidsonCourse = async (body) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
        console.log('fetching')
        console.log(body)
        const response = await fetch("http://10.54.11.129:8000/getclasses", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'description': body})
        });
        console.log(response);
        const result = await response.json();
        console.log(result['body'])
    setData(result['body']);
    } catch (err) {
    setError(err);
    } finally {
    setLoading(false);
    }
};

  return { data, loading, error, fetchDavidsonCourse }

}