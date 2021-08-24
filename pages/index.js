const fs = require('fs');
const path = require('path');
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

    useEffect(() => {

    }, [chapters]);

    return <div>hi</div>
}

export async function getServerSideProps({ params, res }) {

    const createDirectoriesAndFiles = (chapters) => {
        if (chapters.length === 0) {
            return;
        }
        for (var i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];
            const pathSegments = [process.cwd(), 'contents', 'surahs'].concat(chapter.chapter_number.toString());
            const directory = path.join.apply(null, [...pathSegments]);
            console.log(directory);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
            for (var j = 1; j <= chapter.verses_count; j++) {
                const filePath = path.join.apply(null, [...pathSegments, j.toString()]) + '.md';
                if (!fs.existsSync(filePath)) {
                    fs.appendFile(filePath, `# ${chapter.name_simple} (${chapter.chapter_number})`, () => { });
                    fs.appendFile(filePath, `\n# ${chapter.name_arabic}`, () => { });
                }
            }
        }
    }

    fetch('https://api.quran.com/api/v3/chapters')
        .then(data => {
            return data.json();
        }).then(data => {
            createDirectoriesAndFiles(data.chapters);
            return data.chapters;
        }).catch(error => {
            console.log(error);
            return errlr;
        });

    return { props: {} };
}

export default Index;