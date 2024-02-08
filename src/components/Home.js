import logo from '../logo.svg';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <div>
            <img src={logo} width='100%' alt='logo' />
        </div>
        <div className='text-4xl'>
            K-digital 5기 강태규
        </div>     
    </div>
  )
}
