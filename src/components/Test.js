import { useEffect, useState } from "react"


export default function Test() {
    const [dt, setDt] = useState();

    const getData = async () => {
        fetch('http://10.125.121.201/board')
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log('useeffect');
        getData();
    });

  return (
    <div>
      test
    </div>
  )
}
