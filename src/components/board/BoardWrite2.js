import { useState } from "react";


export default function BoardWrite2() {
    
  const [text, setText] = useState({
    title: "",
    writer: "",
    content: ""
  })
    const onClick = () => {
        console.log(text);
    }
    const onChange = (e) => {
        setText({
          ...text,
          [e.target.name]: e.target.value
        });
      }
  return (
    <div>
      <div>
        <div>
            <input className="border" name="title" onChange={onChange} placeholder="제목"/>
        </div>
        <div>
            <input className="border" name="writer" onChange={onChange} placeholder="작성자"/>
        </div>
        <div>
            <input className="border" name="content" onChange={onChange} placeholder="내용"/>
        </div>
        <button onClick={onClick}>작성</button>
      </div>
      <div>
        {/* {text} */}
      </div>
    </div>
  )
}
