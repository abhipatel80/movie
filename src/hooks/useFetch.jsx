import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'

const useFetch = (url) => {

    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(null);

    useEffect(() => {
        setloading("Loading...")
        fetchData(url).then((res) => {
            setdata(res)
            setloading(false)
        })
    }, [url])

    return {
        data, loading
    }
}

export default useFetch
