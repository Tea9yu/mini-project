import { BsFillTelephoneFill } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { IoMdHome } from "react-icons/io";

export default function TailCard({ imgSrc, title, subtitle, tags, tel, addr }) {
  let sps = tags.split(',');

  // 영업시간 텍스트를 추가합니다.
  // sps.push(`영업시간 : ${sps}`);

  sps = sps.map((item, idx) =>
    <span key={`sp${idx}`} className="flex bg-orange-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      <GoClockFill className="mt-0.5" /><span className="ml-2">{item}</span>
    </span>
  )

  // sps = sps.length === 0 ? sps = '' : sps


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-orange-300 border-2">
      <img className="w-full" src={imgSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {subtitle}
        </p>
      </div>
      <div>
        <div className="px-6 pt-4 pb-2">
          {sps}
        </div>
        <div className="flex flex-col">
          <p className="flex ml-5 bg-orange-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <IoMdHome className="mt-0.5" /> <span className="ml-2">{addr}</span>
          </p>
          <p className="flex ml-5 bg-orange-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <BsFillTelephoneFill className="mt-0.5" /><span className="flex ml-2">{tel}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
