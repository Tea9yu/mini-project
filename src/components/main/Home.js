import busannightImage from '../../images/Busannight.jpg'

export default function Home() {
  return (
    <div className="bg-orange-50 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to Our Website</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <img src={busannightImage} alt="busannight" className="rounded-lg shadow-lg mb-8" />
        <p className="text-lg text-center text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  )
}
