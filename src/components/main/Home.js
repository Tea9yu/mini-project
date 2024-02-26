import busannightImage from '../../images/Busannight.jpg'

export default function Home() {
  return (
    <div className="bg-orange-50 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to Mat.Zip in Busan</h1>
        <p className="text-lg text-center text-gray-600 mb-8">부산의 무한 매력 속에 담긴 다채로운 맛과 멋을 탐험하며, 그 곳마다 펼쳐지는 다양한 이야기를 만나보세요. 부산 맛집 여행은 오롯이 당신만의 특별한 추억으로 기억될 것입니다. 함께 부산의 밤을 더욱 풍성하고 매력적으로 만들어줄 최고의 맛집들을 발견하고, 그 곳에서 느껴지는 특별한 감동과 즐거움을 만끽하세요.</p>
        <img src={busannightImage} alt="busannight" className="rounded-lg shadow-lg mb-8" />
        <p className="text-lg text-center text-gray-600">K-digital 크루들을 위한 부산 맛집 탐방 도우미
</p>
      </div>
    </div>
  )
}
