const fs = require('fs');
const path = require('path');
import React, { useState, useEffect } from 'react';
import chapters from '../components/Chapters';

const Index = () => {

    return <div>hi</div>
}

export async function getServerSideProps({ params, res }) {

    const createDirectoriesAndFiles = (chapters) => {
        if (chapters.length === 0) {
            return;
        }
        for (var i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];
            const pathSegments = [process.cwd(), 'contents', 'surahs'].concat(chapter.chapter_number.toString().padStart(3, '0'));
            const directory = path.join.apply(null, [...pathSegments]);
            console.log(directory);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
            for (var j = 1; j <= chapter.verses_count; j++) {
                const filePath = path.join.apply(null, [...pathSegments, j.toString().padStart(3, '0')]) + '.md';
                if (!fs.existsSync(filePath)) {
                    fs.appendFile(filePath, '', () => { });
                }
            }
        }
    }

    return { props: {} };
}

export default Index;