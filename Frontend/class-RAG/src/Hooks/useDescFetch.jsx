import { useState, useEffect } from "react";


export function useDescFetch(body){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const fetchFakeCourse = async (body) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
        console.log('fetching')
        const response = await fetch("http://10.54.11.129:8000/build", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'topics': body})
        });
        const result = await response.json();
        console.log("Fetched")
    setData(result['body']);
    } catch (err) {
    setError(err);
    } finally {
    setLoading(false);
    }
};

  return { data, loading, error, fetchFakeCourse }

}