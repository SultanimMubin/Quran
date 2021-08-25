const chapters = fetch('https://api.quran.com/api/v3/chapters')
.then(response => {
    return response.json();
})
.then(data => {
    return data.chapters;
})
.catch(error => {
    console.log(error);
    throw new Error('Error reading API from api.quran.com');
});

export default chapters;