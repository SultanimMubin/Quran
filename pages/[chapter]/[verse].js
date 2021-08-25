const fs = require('fs');
const path = require('path');
import Error from 'next/error';
const marked = require("marked");
import chapters from '../../components/Chapters';

const ChapterAndVerse = ({ chapter, content, errorCode }) => {

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    content = `<h1>${chapter.name_simple} (${chapter.chapter_number})</h1>`
        + `<h2>${chapter.name_arabic}</h2>`
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
    if (isNaN(verse * 1)) {
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
    const chapterJson = (await chapters).filter(i => i.chapter_number == chapter)[0];
    try {
        var content = fs.readFileSync(filePath, 'utf8');
        if (content.charCodeAt(0) == 65279) {
            content = content.slice(1);
        }
        content = marked(content);
        const result = { props: { chapter: chapterJson, content: content } };
        return result;
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        const result = { props: { chapter: chapterJson, errorCode: 500 } }
        return result;
    }
}

export default ChapterAndVerse;