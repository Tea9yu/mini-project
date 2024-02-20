import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function BoardDelete() {

  const Board = ({ seq, title, writer, content }) => {
    const navigate = useNavigate();
    
  }

  const boardDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니다?')) {
    await axios.delete(`http://10.125.121.170:8080/boardDel/${seq}`)
      .then((resp) => {
        alert('삭제되었습니다.');
        Navigate('/board');
      })
    }
};

  return (
    <div>
      
    </div>
  )
}
