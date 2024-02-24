

const API_KEY = 'bb51046ed57e470b8dfa522463d8ebc4'
let url = new URL (`https://bible-nuna-times.netlify.app/top-headlines?country=kr`)
let newsList = []
const menus = document.querySelectorAll('.menus button')
let totalResults = 0;
let page = 1;
const pageSize = 5;
const groupSize = 5;

menus.forEach(menu => menu.addEventListener('click', (event) => getNewsByCategory(event)))


const getURL = async () => {
  try {

    url.searchParams.set('page', page) // => &page=page
    url.searchParams.set('pageSize', pageSize) // => &pageSize=pageSize
    const response = await fetch(url);
    const data = await response.json();

    console.log(data)
    if(response.status === 200) {
      if(data.articles.length === 0) {
        throw new Error("No results for this search")
      }
      newsList = data.articles;
      totalResults = data.totalResults;

      console.log(totalResults)
      render();
      paginationRender();
    } else {
      throw new Error(data.message)
    }

  } catch(error) {
    errorRender(error.message)
  }

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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
</div>`

document.getElementById('news-board').innerHTML =  errorHTML
}

const paginationRender = () => {
  const totalPages =  Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page/groupSize);
  const lastPage = pageGroup * groupSize;
  //마지막 페이지 그룹이 그룹 사이즈보다 작다면 la stPage = totalPage 
  if(lastPage > totalPages) {
    lastPage = totalPages
  }

  let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHTML = ``

  for(let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page ? 'active' : ''}"  onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>
    `
  }
  
  let hidden;

if ( 5 < totalPages || totalPages < lastPage) {
  hidden = false;
  paginationHTML += `<li class="page-item"><a class="page-link btnNext" aria-label="Next" onclick='moveToGroup(${firstPage})'><span aria-hidden="${hidden}">&raquo;</span></a></li>`

}

document.querySelector('.pagination').innerHTML = paginationHTML
}

const moveToPage = (pageNumber) => {
  console.log('move', pageNumber);
  page = pageNumber;
  getURL()
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