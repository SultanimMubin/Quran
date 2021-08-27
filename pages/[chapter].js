import Error from 'next/error';
import chapters from '../components/Chapters';

const ChapterAndVerse = ({ chapter, errorCode }) => {

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return <>
        <h1 className="flex py-4 text-5xl font-bold justify-center">{chapter.name_simple} <span className="text-sm ml-2">({chapter.chapter_number})</span></h1>
        <h3 className="flex py-2 text-3xl font-medium justify-center">{chapter.name_arabic}</h3>
        <ul id='verses' className="flex flex-wrap mx-12 mb-4">
            {
                Array(chapter.verses_count).fill().map(
                    (x, i) => <li key={i} className="p-4 m-2 bg-green-200 rounded hover:bg-green-900 hover:text-white transition-all duration-200 cursor-pointer w-16 flex items-center justify-center">
                        {i + 1}
                    </li>)
            }
        </ul>
    </>
}

const notFound = { props: { errorCode: 404 } };

export async function getServerSideProps({ params, res }) {
    const chapterNumber = params.chapter;
    if (isNaN(chapterNumber * 1)) {
        res.statusCode = 404;
        return notFound;
    }
    if (chapterNumber * 1 > 114 || chapterNumber * 1 < 1) {
        res.statusCode = 404;
        return notFound;
    }
    const chapter = (await chapters).filter(i => i.chapter_number == chapterNumber)[0];
    return { props: { chapter } };
}

export default ChapterAndVerse;