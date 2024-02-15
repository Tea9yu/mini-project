import catImage from '../../images/cat.jpg'
import RiotAPISearch from '../search/RiotAPISearch'

export default function Main() {

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex lg:flex-grow gap-36 my-2'>
      <h1>홈</h1>
      <h1>랭킹</h1>
      <h1>게시판</h1>
      </div>      
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className='flex flex-col justify-center items-center'>
            <img src={catImage} className='w-96' alt='Cat' />
          </div>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex flex-col justify-center items-center bg-sky-300 w-full h-full my-3'>
              <h1 className='text-xl'>롤 전적 검색</h1>
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full my-5'>
              <RiotAPISearch />
            </div>
            <div className='w-1/2 grid grid-cols-2 gap-20'>
              <section className='text-xl'>게시판</section>
              <section className='text-xl'>랭킹</section>
            </div>
          </div>
        </div>      
    </div>
  )
}

