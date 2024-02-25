
export default function DateFormat({createDate}) {

    let date = new Date({createDate}.createDate);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    let dateFormat = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  return (
    <div>
      {dateFormat}
    </div>
  )
}
