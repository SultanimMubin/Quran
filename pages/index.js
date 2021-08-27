const fs = require('fs');
const path = require('path');
import React, { useState, useEffect } from 'react';
import chapters from '../components/Chapters';

const Index = ({ chaptersJson }) => {

    return <>
        <h1 className="py-4 flex items-center justify-center text-5xl">Quran</h1>
        <ul id='chapters' className="flex flex-wrap flex-grow mx-12 mb-4">
        {
            chaptersJson.map(
                chapter => <li className="m-1 py-2 px-4 bg-green-200 rounded cursor-pointer hover:bg-green-900 hover:text-white transition-all duration-200">
                    <div className="text-sm font-bold">{chapter.chapter_number}</div>
                    <div>{chapter.name_simple}</div>
                    <div className="text-right">{chapter.name_arabic}</div>
                </li>
            )
        }
        </ul>
    </>
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

    const chaptersJson = (await chapters);

    console.log(chaptersJson.length);

    return { props: { chaptersJson } };
}

export default Index;