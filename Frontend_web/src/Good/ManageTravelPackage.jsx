import { useState } from "react"

const ManageTravelPackage = () => {
  const [images, setImages] = useState([])
  const handleImages = (e) => {
    const selectedImage = Array.from(e.target.files)
    setImages((prevImage) => [...prevImage, ...selectedImage])
  }

  const handleRemoveImage = (index) => {
    setImages(prevImage => prevImage.filter((_, i) => i !== index))
  }
  return (
    <>
      {/* main div */}
      {/* <div className="w-full h-screen flex flex-col shadow-lg"> */}
      {/* semidiv */}
      <div className=" w-full p-5 shadow-xl drop-shadow-sm flex flex-col mx-5 my-5">
        <h1 className="font-bold mb-2 text-2xl">Add Travel Packages</h1>
        <form action="">
          <label className="text-gray-500">Name</label>
          <input
            className="border focus: outline-none mb-2 h-10 w-[98%]"
            type="text"
          />
          <label className="text-gray-500">Price</label>
          <input
            className="border focus: outline-none mb-2 h-10 w-[98%]"
            type="number"
          />

          <label className="text-gray-500">Images</label>
          <input
            className="border focus: outline-none mb-2 h-10 w-[98%]"
            type="file" multiple
            onChange={(e) => {
              handleImages(e);
            }}
          />
          <div className="flex gap-4 mb-5">
            {images.map((imag, i) => (<>
              <img className="h-30 w-20 rounded-sm object-cover relative" src={URL.createObjectURL(imag)} alt="" />
              <div className=" cursor-pointer h-5 w-5 flex bg-red-600 rounded-sm justify-center items-center text-white"
                onClick={() => handleRemoveImage(i)}
              >
                x
              </div>
            </>))}

          </div>

          {/* free cancelation */}
          <div className="flex justify-start mb-10">
            <label className="text-gray-500 flex-[0.5]" >Free Cancellation</label>
            <input className="accent-blue-600 items-center" type="checkbox"  id="cancellation"/>
          </div>

          {/* Reserve Now */}
          <div className="flex justify-start mb-10">
            <label className="text-gray-500 flex-[0.5]" >Reserve Now</label>
            <input className="accent-blue-600 items-center" type="checkbox" />
          </div>

          <label className="text-gray-500">Description</label>
          <textarea
            className="border focus: outline-none mb-2 h-20 w-[98%]"
            type="text"
          />
          <button className="bg-sky-500 h-10 w-[20vh] rounded-md text-white">Add Travel Packages</button>

        </form>

      </div>
      {/* </div> */}
    </>
  )
}

export default ManageTravelPackage;