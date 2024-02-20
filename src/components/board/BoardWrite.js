import { Link } from "react-router-dom"

export default function BoardWrite() {

  
  return (
    <div className="w-full h-full">      
      <form className="flex flex-col justify-center items-center h-full">
        <table className="w-auto h-auto">
          <tr>
            <td className="flex flex-col">제목</td>
            <td className="flex flex-col">
              <input className="border w-full" type="text" name="title" placeholder="제목을 입력해주세요"/>
            </td>
          </tr>
          <tr>
            <td className="flex flex-col">내용</td>
            <td className="flex flex-col">
              <textarea className="border w-full h-full"name="content" placeholder="내용을 입력해주세요"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">작성</button>              
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link to={`/list`}><button type="button" value="목록 ">목록</button></Link>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
