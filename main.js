

const API_KEY = 'bb51046ed57e470b8dfa522463d8ebc4'
let news;
const  getLatestNews = async () => {
  //new 인스턴스
  // const url = new URL (`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
  const url = new URL (`https://bible-nuna-times.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`)
  //fetch ; 해당 url에 데이터 요청
  const response = await fetch(url);
  const data = await response.json()

  news = data.articles

  console.log('dddd', news)
}
getLatestNews()
