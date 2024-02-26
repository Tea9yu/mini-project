import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function BusanFoodInfo2() {
    const [foodList, setFoodList] = useState([]);
    const [foodTag, setFoodTag] = useState([]);
    const [page, setPage] = useState(1);
    const [totalNum, setTotalNum] = useState(0);

    // 음식점 목록 가져오기
    const getFoodList = async (pgno) => {
        const resp = await axios.get(`http://10.125.121.170:8080/food?pageNo=1`);
        // setTotalNum(resp.data)
        setFoodList(resp.data.content);

        // console.log("foodList", foodList);
        // console.log("totalNum", totalNum);
        console.log("resp", resp);
    }
    // console.log("totalNum", totalNum);
    
    // console.log("foodList=", foodList);

    useEffect(() => {
        getFoodList();
    }, []);

    useEffect(() => {

    }, [foodList]);

    // // 페이지 변경
    // const handlePageChange = (page) => {
    //     setPage(page);
    // }

    // // 페이지 변경 했을 때
    // useEffect(() => {

    //     axios.get(`http://10.125.121.170:8080/food?pageNo=${page}`, {})
    //         .then(resp => {
    //             setFoodList(resp.data.content);
    //         })

    // }, [page])


    return (
        <div>

        </div>
    )
}
