import React, { useState, useEffect } from 'react';

const Index = () => {


    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetch('https://api.quran.com/api/v3/chapters')
            .then(data => {
                return data.json();
            }).then(data => {
                setChapters(data);
                return data;
            }).catch(error => {
                console.log(error);
            })
    }, []);

    return <div>hi</div>
}

export default Index;