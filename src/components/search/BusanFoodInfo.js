import { useState, useRef, useEffect } from "react";
import TailH1 from "../../UI/TailH1";
import axios from "axios";
import TailCard from "../../UI/TailCard";
import Pagination from "react-js-pagination";
import TailSelect from "../../UI/TailSelect";


export default function BusanFoodInfo() {
    // 환경변수값 가져오기
    let apikey =  process.env.REACT_APP_APIKEY;

    const [tdata, setTdata] = useState('');
    const [page, setPage] = useState(1);
    const [totalNum, setTotalNum] = useState(0);
    const [gu, setGu] = useState('');
    const [selGuData, setSelGuData] = useState('');
    const selSido = ["강서구", "금정구", "남구", "동래구", "부산진구", "북구", "사상구", "서구", "수영구", "연제구", "영도구", "해운대구"];

    // 화면 재 랜더링
    const [tags, setTags] = useState([]);

    const [selected, setSelected] = useState([]);

    

    // 키워드 입력
    const kwInput = useRef();
    
    // 키워드 선택
    const kwSelect = useRef();

    // const handleGetData = async(e) => {
    //     e.preventDefault();

    //     //키워드 인코딩
    //     let enkw = encodeURI(kwInput.current.value);
    //     if (enkw === '') {
    //         alert("키워드를 입력하세요.");
    //         kwInput.current.focus();
    //         return;
    //     }

    //     let url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?`;
    //     url = url + `serviceKey=${apikey}`;
    //     url = url + `&pageNo=1`;
    //     url = url + `&numOfRows=10`;
    //     url = url + `&resultType=json`;

    //     console.log(url);
    // }
    const handlePageChange = (page) => {
      setPage(page);
  }
const handleSelect = (e) => {
  console.log(e.target.value);
        let tm = tdata.filter(item => item.GUGUN_NM === e.target.value);
        console.log(tm);
        setSelGuData(tm);

}
    const getData = async(e) => {
        

        // URL
        let url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?`;
        url = url + `serviceKey=${apikey}`;
        url = url + `&pageNo=${page}`;
        url = url + `&numOfRows=50`;
        url = url + `&resultType=json`;

        console.log(url);

        const resp = await axios.get(url)
        .then(res=>{
          // console.log("resp", res.data.getFoodKr.totalCount);
          setTotalNum(res.data.getFoodKr.totalCount);
          setTdata(res.data.getFoodKr.item)})
        .catch(err =>{
          // alert("잠시 후 시도하세요")
          console.log(err)
        });
          
        // const data = await resp.data;     
    }
    

    useEffect(() => {
      getData();

    },[page]);
    // tdata 변경
    useEffect(()=>{
        if (tdata ==='') {
          return;
        }
        console.log("tdata=", tdata);
        // console.log("totalNum", totalNum);

        let tm = tdata.map((t, idx) =>
        <TailCard imgSrc={t.MAIN_IMG_NORMAL}
        key={`card${idx}`}
        title={t.MAIN_TITLE}
        subtitle={t.ITEMCNTNTS}
        tags={t.USAGE_DAY_WEEK_AND_TIME}/>
        );
        
       setTags(tm)

       //2. 구를 추출해서 저장
       let tmgu = tdata.map((item) => item.GUGUN_NM)
       tmgu = [... new Set(tmgu)].sort();  // 집합을 만드려면 new 키워드를 사용해야함. set으로 중복제거
       setGu(tmgu);
        
    },[tdata])

    
    
  return (
    <div className="py-5 flex flex-col justify-center items-center">
      <TailH1 title={"부산맛집정보"} />
      <form name="kform" className="my-5 w-4/5 flex justify-center items-center">
                <div className=" w-1/2 mx-4">
                <TailSelect opItem={gu} handleChange={handleSelect} />
                    {/* <select ref={kwSelect} onChange={handleSelect} value={selected} className="block w-full p-4 ps-10 text-sm
                                                    text-gray-900 border border-gray-300 rounded-lg
                                                    bg-gray-50" placeholder="--지역 선택--"
                                                    //  {(e) => handleChange(e)}
                                                    > 
                                                    <option value="지역선택">--지역선택--</option>
                     </select> */}
                </div>
            </form>
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {tags}
            </div>
            {/* 페이지 기능 */}
            <div className="flex flex-col justify-center items-center pt-2">
                    <Pagination
                        activePage={page}   // 현재 페이지
                        itemsCountPerPage={5}  // 한 페이지에 보여줄 아이템 갯수
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