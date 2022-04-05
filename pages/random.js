import quran from "../contents/quran"

const Random = ({ chapter, verse }) => {
    return <div>
        <a target='_blank' href={`https://quran.com/${chapter}/${verse}`}>{chapter}:{verse}</a>
    </div>
}

export default Random

export async function getServerSideProps({ params, res }) {
    const randomChapter = Math.floor(Math.random() * 114)
    const verseCount = quran.filter(i => i.chapter * 1 === randomChapter)[0].verseCount
    const randomVerse = Math.floor(Math.random() * verseCount)
    return {
        props: {
            chapter: randomChapter,
            verse: randomVerse
        }
    }
}