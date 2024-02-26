export default function TailButton({caption, bcolor, handleClick}) {
    const tailColor = {
      sky : 'hover:bg-sky-200 hover:text-sky-700 bg-sky-700',
      orange : 'hover:bg-orange-200 hover:text-orange-400 bg-orange-400',
      lime : 'hover:bg-lime-200 hover:text-lime-700 bg-lime-700'
    }
  
    return (
      <button 
      className={`inline-flex justify-center items-center 
                px-5 py-2 rounded-md m-2 
                ${tailColor[bcolor]}             
                text-white`}
      onClick={handleClick}
      >
        {caption}
      </button>
    )
  }
  