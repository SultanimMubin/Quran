const chapters = [
    { number: 1, name: "فاتحه" },
    { number: 2, name: "بقره" },
    { number: 3, name: "آل عمران" },
    { number: 4, name: "نساء" },
    { number: 5, name: "مائده" },
    { number: 6, name: "انعام" },
    { number: 7, name: "اعراف" },
    { number: 8, name: "انفال" },
    { number: 9, name: "توبه" },
    { number: 10, name: "یونس" },
    { number: 11, name: "هود" },
    { number: 12, name: "یوسف" },
    { number: 13, name: "الرعد" },
    { number: 14, name: "ابراهیم" },
    { number: 15, name: "حجر" },
    { number: 16, name: "نحل" },
    { number: 17, name: "اسراء" },
    { number: 18, name: "کهف" },
    { number: 19, name: "مریم" },
    { number: 20, name: "طه" },
    { number: 21, name: "انبیاء" },
    { number: 22, name: "حج" },
    { number: 23, name: "مؤمنون" },
    { number: 24, name: "نور" },
    { number: 25, name: "فرقان" },
    { number: 26, name: "شعراء" },
    { number: 27, name: "نمل" },
    { number: 28, name: "قصص" },
    { number: 29, name: "عنکبوت" },
    { number: 30, name: "روم" },
    { number: 31, name: "لقمان" },
    { number: 32, name: "سجدة" },
    { number: 33, name: "احزاب" },
    { number: 34, name: "سبأ" },
    { number: 35, name: "فاطر" },
    { number: 36, name: "یس" },
    { number: 37, name: "صافات" },
    { number: 38, name: "ص" },
    { number: 39, name: "زمر" },
    { number: 40, name: "غافر" },
    { number: 41, name: "فصلت" },
    { number: 42, name: "شوری" },
    { number: 43, name: "زخرف" },
    { number: 44, name: "دخان" },
    { number: 45, name: "جاثیة" },
    { number: 46, name: "احقاف" },
    { number: 47, name: "محمد" },
    { number: 48, name: "فتح" },
    { number: 49, name: "حجرات" },
    { number: 50, name: "ق" },
    { number: 51, name: "ذاریات" },
    { number: 52, name: "طور" },
    { number: 53, name: "نجم" },
    { number: 54, name: "قمر" },
    { number: 55, name: "الرحمن" },
    { number: 56, name: "واقعه" },
    { number: 57, name: "حدید" },
    { number: 58, name: "مجادله" },
    { number: 59, name: "حشر" },
    { number: 60, name: "ممتحنه" },
    { number: 61, name: "صف" },
    { number: 62, name: "جمعه" },
    { number: 63, name: "منافقون" },
    { number: 64, name: "تغابن" },
    { number: 65, name: "طلاق" },
    { number: 66, name: "تحریم" },
    { number: 67, name: "ملک" },
    { number: 68, name: "قلم" },
    { number: 69, name: "حاقه" },
    { number: 70, name: "معارج" },
    { number: 71, name: "نوح" },
    { number: 72, name: "جن" },
    { number: 73, name: "مزمل" },
    { number: 74, name: "مدثر" },
    { number: 75, name: "قیامه" },
    { number: 76, name: "انسان" },
    { number: 77, name: "مرسلات" },
    { number: 78, name: "نبأ" },
    { number: 79, name: "نازعات" },
    { number: 80, name: "عبس" },
    { number: 81, name: "تکویر" },
    { number: 82, name: "انفطار" },
    { number: 83, name: "مطففین" },
    { number: 84, name: "انشقاق" },
    { number: 85, name: "بروج" },
    { number: 86, name: "طارق" },
    { number: 87, name: "اعلی" },
    { number: 88, name: "غاشیه" },
    { number: 89, name: "فجر" },
    { number: 90, name: "بلد" },
    { number: 91, name: "شمس" },
    { number: 92, name: "لیل" },
    { number: 93, name: "ضحی" },
    { number: 94, name: "شرح" },
    { number: 95, name: "تین" },
    { number: 96, name: "علق" },
    { number: 97, name: "قدر" },
    { number: 98, name: "بینه" },
    { number: 99, name: "زلزال" },
    { number: 100, name: "عادیات" },
    { number: 101, name: "قارعة" },
    { number: 102, name: "تکاثر" },
    { number: 103, name: "عصر" },
    { number: 104, name: "همزه" },
    { number: 105, name: "فیل" },
    { number: 106, name: "قریش" },
    { number: 107, name: "ماعون" },
    { number: 108, name: "کوثر" },
    { number: 109, name: "کافرون" },
    { number: 110, name: "نصر" },
    { number: 111, name: "مسد" },
    { number: 112, name: "اخلاص" },
    { number: 113, name: "فلق" },
    { number: 114, name: "ناس" }
];

const getAhlolbaitUrl = (chapterNumber, verse) => {
    var chapter = chapters.filter(i => i.number == chapterNumber)[0]
    const url = `https://wiki.ahlolbait.com/آیه_${verse}_سوره_${chapter.name}`
    return url
}

export default getAhlolbaitUrl