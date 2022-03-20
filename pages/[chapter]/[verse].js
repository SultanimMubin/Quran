const fs = require('fs');
const path = require('path');
import Error from 'next/error';
import { marked } from 'marked';
import chapters from '../../components/Chapters';

const ChapterAndVerse = ({ chapter, content, errorCode, verse, verseText }) => {

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    content = `<h1>${chapter.name_simple} - ${chapter.name_arabic}</h1>`
        + `<h2>${chapter.chapter_number} - ${verse}</h2>`
        + `<p class="text-2xl leading-10 pr-10" dir="rtl">${verseText}</p>`
        + `<div><a target="_blank" href="https://corpus.quran.com/wordbyword.jsp?chapter=${chapter.chapter_number}&verse=${verse}">Corpus</a></div>`
        + content;

    return <div
        className={' prose pl-10 my-10'}
        dangerouslySetInnerHTML={{ __html: content }}
    >
    </div>
}

const notFound = { props: { errorCode: 404 } };

export async function getServerSideProps({ params, res }) {
    const chapter = params.chapter;
    const verse = params.verse;
    if (isNaN(chapter * 1)) {
        res.statusCode = 404;
        return notFound;
    }
    if (chapter * 1 > 114 || chapter * 1 < 1) {
        res.statusCode = 404;
        return notFound;
    }
    if (isNaN(verse * 1)) {
        res.statusCode = 404;
        return notFound;
    }
    const chapterJson = (await chapters).filter(i => i.chapter_number == chapter)[0];
    if (verse * 1 > chapterJson.verses_count || verse * 1 < 1) {
        res.statusCode = 404;
        return notFound;
    }
    const diskSegments = [process.cwd(), 'contents', 'surahs'].concat(chapter.toString().padStart(3, '0'), verse.toString().padStart(3, '0') + '.md');
    var filePath = path.join.apply(null, [...diskSegments]);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        return notFound;
    }
    var verseText = await fetch(`https://api.alquran.cloud/v1/ayah/${chapter * 1}:${verse * 1}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.data.text;
        })
        .catch(error => {
            console.log(error);
        });
    try {
        var content = fs.readFileSync(filePath, 'utf8');
        if (content.charCodeAt(0) == 65279) {
            content = content.slice(1);
        }
        content = marked.parse(content);
        const result = { props: { chapter: chapterJson, content: content, verseText: verseText, verse: verse * 1 } };
        return result;
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        const result = { props: { chapter: chapterJson, errorCode: 500 } }
        return result;
    }
}

export default ChapterAndVerse;