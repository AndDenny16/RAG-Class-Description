import { useState } from "react";



export function useForm(initalValues){
    const [values, setValues] = useState(initalValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const fetchDescAPI = async(url) => {
        setLoading(true);
        setData(null);
        console.log(data)
        setError(null);
        console.log("url", url);
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'topics': Object.values(values)})
            });
            if (!response.ok){
                throw new Error("Issue Making Request")
            }
            const resData = await response.json()
            console.log(resData);
            setData(resData)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { values, handleChange, fetchDescAPI, loading, error, data };


}