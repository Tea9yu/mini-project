import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Comment({seq}) {

    // let seq = useParams().seq;
    console.log("Comment", seq);
    const [boardCmts, setBoardCmts] = useState([]);
    const [reple, setReple] = useState([]);

    // const getBoardCmts = async () => {
    //     // const cmts = await axios.get(`http://10.125.121.170:8080/board/${seq}/comments`);
    //     // setBoardCmts(cmts)
    //     // console.log("cmt", cmts)
    // }

    // // useEffect(() => {
    // //     // console.log("cmt", boardCmts)
    // //     getBoardCmts();
    // // }, []);

    // useEffect(() => {
    //     console.log("boardCmts", boardCmts)

    //     let cmt = boardCmts.map((item) =>
    //         <tr className="flex justify-center items-center w-full h-full border">
    //             <td className="flex justify-center items-center w-1/2 h-full">{item.cmt_content}</td>
    //             <td className="flex justify-center items-center w-1/3 h-full">{item.cmt_writer}</td>
    //             <td className="flex justify-center items-center w-1/2 h-full">{item.createDate}</td>
    //         </tr>
    //     )
    //     setReple(cmt);

    // }, [boardCmts]);



    return (
        <div>
            {/* <div>
                {reple}
            </div>
            <form>
                <div className='flex flex-col '>
                    <div className='flex'>
                        <input type="text" className="py-2 px-3 block w-1/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="작성자" />
                        <input type="text" className="py-2 px-3 block w-1/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="비밀번호" />
                        <button className='border'>등록</button>
                        <button className='border'>수정</button>
                        <button className='border'>삭제</button>
                    </div>
                </div>
                <div>
                    <input type="text" class="p-4 sm:p-5 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="댓글을 작성하세요" />

                </div>
            </form> */}
            <div className="mt-10 mb-5">댓글</div>
                    {reple}

                    {/* 댓글작성 */}
                    <div className="flex mt-10 ">
                      <div className="ml-5">
                        <input className="flex border justify-center items-center flex-grow" placeholder="  닉네임" type="text" name="reple" value={reple.cmt_content} />
                        <input className="flex border justify-center items-center flex-grow" placeholder="  비밀번호" type="text" name="reple" value={reple.cmt_content} />
                      </div>
                      <input className="flex border justify-center items-center flex-grow" placeholder="  댓글 입력" type="text" name="reple" value={reple.cmt_content} />
                      <button className="border border-green-900 bg-green-400 rounded-lg text-white ml-2 px-2 py-2">작성</button>
                    </div>
        </div>
    )
}
