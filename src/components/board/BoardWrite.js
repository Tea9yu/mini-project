

export default function BoardWrite() {
  return (
    <div>      
      <form>
        <table>
          <tr>
            <td>제목</td>
            <td>
              <input className="w-full" type="text" name="title"/>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea className="w-full h-full"name="content"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">작성 완료</button>
              <button type="reset">다시 입력</button>
              <button type="button" value="목록 보기">목록 보기</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
