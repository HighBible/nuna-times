

const API_KEY = 'bb51046ed57e470b8dfa522463d8ebc4'
let url;
let newsList = []
const menus = document.querySelectorAll('.menus button')
menus.forEach(menu => menu.addEventListener('click', (event) => getNewsByCategory(event)))


const getURL = async () => {
  const response = await fetch(url);
  const data = await response.json()
  newsList = data.articles;
  render()
}

const  getLatestNews = async () => {
  //new 인스턴스
  //  url = new URL (`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
  url = new URL (`https://bible-nuna-times.netlify.app/top-headlines?country=kr`)
  //fetch ; 해당 url에 데이터 요청
  getURL()
}
getLatestNews()

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  // console.log(category)
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
    url = new URL (`https://bible-nuna-times.netlify.app/top-headlines?country=kr&category=${category}`)
  getURL()
}

const getNewsByKeyword =  async() => {
  const keyword = document.getElementById('search-input').value;
  //  url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  url = new URL (`https://bible-nuna-times.netlify.app/top-headlines?country=kr&q=${keyword}`)
  getURL()
}


const render = () => {
  const newsHTML = newsList.map( news => 
    `<div class="row news">
      <div class="col-lg-4 news-img">
        <img class="news-img-size" src=${news.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc_RSgy4uE0T2Ed44bBrHaaveVkYMJg1m7fcijiiGVyw&s'}>
      </div>
    <div class="col-lg-8 news-content">
      <h2>${news.title}</h2>
      <p>${news.description == null || news.description == '' ? '내용 없음' : news.description.length > 200 ?
      news.description.substring(0, 200) + '...' : news.description
    }</p>
    <div>
      ${news.source.name || 'no source'} * ${moment(news.publishedAt).fromNow()}
    </div>
  </div>
</div>`).join('')

  document.getElementById('news-board').innerHTML = newsHTML

} 

//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스 보여주기



// 이벤트
let openAside = document.querySelector('.btn_open_aside span')
let closeAside = document.querySelector('.btn_close')
let aside = document.querySelector('.aside')
let showSearch = document.querySelector('.btn_search')
let searchArea = document.querySelector('.search_area')
let toggle = false;

openAside.addEventListener('click', ()=> {
  aside.style.transform = 'translateX(100%)'
})

closeAside.addEventListener('click', ()=> {
  aside.style.transform = 'translateX(0%)'
})

showSearch.addEventListener('click', () => {
  if(toggle) {
    searchArea.style.transform ='translateX(-10%)'
    toggle=false;
  } else {
    searchArea.style.transform ='translateX(270px)'
    toggle=true;
  }

})