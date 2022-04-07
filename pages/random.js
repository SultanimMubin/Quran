import { useEffect, useRef } from 'react'
import quran from "../contents/quran"

const Random = ({ chapter, verse }) => {

    const link = useRef()

    const reload = () => {
        link.current.click()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    return <div onClick={() => reload()} className="flex w-screen h-screen items-center justify-center">
        <a ref={link} className="text-5xl" target='_blank' href={`/${chapter}/${verse}`}>{chapter}:{verse}</a>
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