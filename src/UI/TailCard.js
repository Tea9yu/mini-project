import { BsFillTelephoneFill } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { IoMdHome } from "react-icons/io";

export default function TailCard({ imgSrc, title, subtitle, tags, tel, addr }) {
  let sps = tags.split(',');

  // 영업시간 텍스트를 추가합니다.
  // sps.push(`영업시간 : ${sps}`);

  sps = sps.map((item, idx) =>
    <span key={`sp${idx}`} className="flex bg-orange-200 rounded-lg py-1 text-sm font-semibold text-gray-700 mb-2">
      <GoClockFill className="ms-2 mt-1" /><span className="ps-2">{item}</span>
    </span>
  )

  // sps = sps.length === 0 ? sps = '' : sps


  return (
    <div className="max-w-sm rounded shadow-lg bg-white border-orange-300 border-2">
      <div className="h-2/5">
        <img className="w-full" src={imgSrc} alt={title} />
      </div>
      <div className="h-1/3 p-2">
        <div className="font-bold text-xl my-1">{title}</div>
        <p className="text-gray-700 text-sm">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="py-1 w-11/12">
          {sps}
        </div>
        <div className="flex flex-col items-center w-11/12 mb-4">
          <p className="flex w-full bg-orange-200 rounded-lg py-1 text-sm font-semibold text-gray-700 mb-2">
            <IoMdHome className="ms-2 mt-1" /> <span className="ps-2">{addr}</span>
          </p>
          <p className="flex justify-start w-full bg-orange-200 rounded-lg py-1 text-sm font-semibold text-gray-700">
            <BsFillTelephoneFill className="ms-2 mt-1" /><span className="ps-2">{tel}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
