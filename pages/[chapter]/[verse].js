const fs = require('fs');
const path = require('path');
import Error from 'next/error';
const marked = require("marked");

const ChapterAndVerse = ({ content, errorCode, type }) => {

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return <>
        <div className={type + (type === 'markdown' ? ' prose pl-10 mb-10' : '')} dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
}

export async function getServerSideProps({ params, res }) {
    const diskSegments = [process.cwd(), 'contents', 'surahs'].concat(params.chapter, params.verse);
    var filePath = path.join.apply(null, [...diskSegments, 'index.html']);
    if (!fs.existsSync(filePath)) {
        filePath = path.join.apply(null, [...diskSegments, 'index.md']);
    }
    if (!fs.existsSync(filePath)) {
        filePath = path.join.apply(null, [...diskSegments]) + '.md';
    }
    if (!fs.existsSync(filePath)) {
        filePath = path.join.apply(null, [...diskSegments]) + '.html';
    }
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        const result = { props: { chapter: params.chapter, verse: params.verse, errorCode: 404 } }
        return result;
    }
    else {
        var type = 'html';
        try {
            var content = fs.readFileSync(filePath, 'utf8');
            if (filePath.endsWith('.md')) {
                type = 'markdown';
                if (content.charCodeAt(0) == 65279) {
                    content = content.slice(1);
                }
                content = marked(content);
            }
            const result = { props: { chapter: params.chapter, verse: params.verse, content: content, type } };
            return result;
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            const result = { props: { chapter: params.chapter, verse: params.verse, errorCode: 500 } }
            return result;
        }
    }
}

export default ChapterAndVerse;