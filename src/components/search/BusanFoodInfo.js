import { useState, useRef, useEffect } from "react";
import TailH1 from "../../UI/TailH1";
import TailCard from "../../UI/TailCard";
import Pagination from "react-js-pagination";
import TailSelect from "../../UI/TailSelect";
import getFoodKr from "../data/getFoodKr.json";
import { json } from "react-router-dom";
import TailButton from "../../UI/TailButton";

export default function BusanFoodInfo() {
  // 환경변수값 가져오기
  // let apikey = process.env.REACT_APP_APIKEY;

  const [tdata, setTdata] = useState('');

  const [page, setPage] = useState(1);
  const [totalNum, setTotalNum] = useState(260);
  // 총 아이템 갯수를 동적으로 설정하기 위해 JSON 파일의 길이를 이용
  // const totalItemCount = getFoodKr.getFoodKr.item.length;

  // const [gu, setGu] = useState('');
  const [selGuData, setSelGuData] = useState('');
  const selSido = ["전체", "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"];
  // const 전체 = getFoodKr.getFoodKr.item
  
  // 화면 재 랜더링
  const [tags, setTags] = useState([]);

  // const [selected, setSelected] = useState([]);

  // console.log("data:", getFoodKr);

  // console.log("totalNum:", totalNum);
  // console.log("handle", page)

  // 페이지 넘버를 변경할때 사용
  const handlePageChange = (page) => {
    setPage(page);
  }

  // select박스가 선택이 되면
  const handleSelect = (e) => {
    let gu = e.target.value;
    if (gu === "전체") {
      setSelGuData('');
      setPage(1);
      return;
    }
    let tm = tdata.filter(item => item.GUGUN_NM === gu);
    setTotalNum(tm.length);
    setSelGuData(tm);
    setPage(1);
    // console.log(e.target.value);
    // let tm = tdata.filter(item => item.GUGUN_NM === e.target.value);
    // console.log(tm);
    // setTotalNum(tm.length);
    // setSelGuData(tm);
    // setPage(1);
  }

  // 한 페이지에 보여주는 아이템 갯수
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;

  // const currentPageData = 
  const [currentPageData, setCurrentPageData] = useState([]);


  const getData = async (e) => {
    const jsonData = getFoodKr.getFoodKr.item;
    const totalLength = jsonData.length;
    const endIndex = Math.min(startIndex + itemsPerPage, totalLength);
    setCurrentPageData(jsonData.slice(startIndex, endIndex));
    setTdata(jsonData);
    setTotalNum(totalLength);

    // console.log("data=", currentPageData);
    // console.log("length=", getFoodKr.getFoodKr.item.length);

    // // URL
    // let url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?`;
    // url = url + `serviceKey=${apikey}`;
    // url = url + `&pageNo=${page}`;
    // url = url + `&numOfRows=10`;
    // url = url + `&resultType=json`;

    // console.log(url);

    // const resp = await axios.get(url)
    // .then(res=>{
    //   // console.log("resp", res.data.getFoodKr.totalCount);

    // setTdata(res.data.getFoodKr.item);
    // setTotalNum(res.data.getFoodKr.totalCount);})
    // .catch(err =>{
    //   // alert("잠시 후 시도하세요")
    //   console.log(err)
    // });

    // const data = await resp.data;     
  }

  // 컴포넌트 업데이트
  useEffect(() => {
    if (selGuData === "") {
      getData();
    }
  }, [page]);

  // tdata 변경
  useEffect(() => {
    if (tdata === '') {
      return;
    }
    // console.log("totalNum", totalNum);

    let tm = currentPageData.map((t, idx) =>
      <TailCard imgSrc={t.MAIN_IMG_NORMAL}
        key={`card${idx}`}
        title={t.MAIN_TITLE}
        subtitle={t.ITEMCNTNTS}
        tags={t.USAGE_DAY_WEEK_AND_TIME}
        tel={t.CNTCT_TEL}
        addr={t.ADDR1} />
    );

    setTags(tm)

    //2. 구를 추출해서 저장
    // let tmgu = tdata.map((item) => item.GUGUN_NM)
    // tmgu = [... new Set(tmgu)].sort();  // 집합을 만드려면 new 키워드를 사용해야함. set으로 중복제거
    // setGu(tmgu);

  }, [currentPageData])

  useEffect(() => {
    if (selGuData === '') {
      return;
    }    

    const endIndex = Math.min(startIndex + itemsPerPage, selGuData.length);
    setCurrentPageData(selGuData.slice(startIndex, endIndex));

    // let tm = currentPageData.map((t, idx) =>
    //   <TailCard imgSrc={t.MAIN_IMG_NORMAL}
    //     key={`card${idx}`}
    //     title={t.MAIN_TITLE}
    //     subtitle={t.ITEMCNTNTS}
    //     tags={t.USAGE_DAY_WEEK_AND_TIME}
    //     tel={t.CNTCT_TEL} />
    // );

    // setTags(tm)

  }, [selGuData, page])



  // const handleSearch = async (e) => {
  //   e.prevenDefault();
  // }

  // 음식 검색
  const foodKeyword = useRef();

  const [foodField, setFoodField] = useState();

  const foodSearch = async (e) => {
    e.preventDefault();
    // 검색어
    const keyword = foodKeyword.current.value.trim();

    // 키워드 인코딩
    // let enkw = encodeURI(foodKeyword.current.value);

    if (keyword === '') {
      alert("검색어를 입력하세요.")
      // foodKeyword.current.focus();
      return;
    }
    
    // 검색어를 포함하는 아이템 필터링
    // if (!selGuData) {
    // const filteredData = tdata.filter(item =>
    //   item.MAIN_TITLE.includes(keyword) ||
    //   item.ITEMCNTNTS.includes(keyword) ||
    //   item.USAGE_DAY_WEEK_AND_TIME.includes(keyword)
    // );
    // // 필터링된 결과 설정
    // setCurrentPageData(filteredData);
    //   }
    //   else{
    //     const filteredData = selGuData.filter(item =>
    //       item.MAIN_TITLE.includes(keyword) ||
    //       item.ITEMCNTNTS.includes(keyword) ||
    //       item.USAGE_DAY_WEEK_AND_TIME.includes(keyword)
    //     );
    //     // 필터링된 결과 설정
    // setCurrentPageData(filteredData);
    //   }

    let searchData = selGuData.length > 0 ? 
    selGuData.filter(item => 
    item.MAIN_TITLE.includes(keyword) || 
    item.ITEMCNTNTS.includes(keyword) ||
    item.USAGE_DAY_WEEK_AND_TIME.includes(keyword))
    : tdata.filter(item => 
    item.MAIN_TITLE.includes(keyword) || 
    item.ITEMCNTNTS.includes(keyword) ||
    item.USAGE_DAY_WEEK_AND_TIME.includes(keyword));
    
    setSelGuData(searchData);
    setPage(1);

  }

  // 검색 기준 변경
  const handleFoodFieldChange = (e) => {
    setFoodField(e.target.value);
  }
  // console.log("foodSearch", foodSearch) 
  console.log("foodKeyword", currentPageData)
  return (
    <div className="py-5 flex flex-col justify-center items-center bg-orange-50">
      <TailH1 title={"부산맛집정보"} />
      <form name="kform" className="my-5 w-4/5 flex justify-center items-center">
        <div className=" w-1/2 my-4 flex">
          <TailSelect opItem={selSido} handleChange={handleSelect} onChange={handleFoodFieldChange} />
          {/* <select ref={kwSelect} onChange={handleSelect} value={selected} className="block w-full p-4 ps-10 text-sm
                                                    text-gray-900 border border-gray-300 rounded-lg
                                                    bg-gray-50" placeholder="--지역 선택--"
                                                    //  {(e) => handleChange(e)}
                                                    > 
                                                    <option value="지역선택">--지역선택--</option>
                     </select> */}
          <input
            ref={foodKeyword}
            type="search"
            id="search"
            className="outline-none block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          {/* <button
            type="submit"
            onClick={foodSearch} // 검색 버튼 클릭 시 handleSearch 함수 호출
            className="mt- text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button> */}
        </div>
        <TailButton
          caption={'search'}
          bcolor={'orange'}
          handleClick={(e) => foodSearch(e)}
        />
        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <button type="submit" class="mt- text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div> */}
      </form>
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {tags}
      </div>
      {/* 페이지 기능 */}
      <div className="flex flex-col justify-center items-center pt-2">
        <Pagination
          activePage={page}   // 현재 페이지
          itemsCountPerPage={10}  // 한 페이지에 보여줄 아이템 갯수
          totalItemsCount={totalNum}  // 총 아이템 갯수
          pageRangeDisplayed={5}  // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </div>
  )
}
