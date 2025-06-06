import axios from 'axios';
import { useEffect, useState } from "react";
import { getHotels } from "../api";

const ManageHotel = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [reserveNow, setReserveNow] = useState(false);
  const [description, setDescription] = useState("");
  const [hotelData, setHotelData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteHotelId, setDeleteHotelId] = useState(null);

  const handleImages = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleEdit = (hotel) => {
    setIsEditing(true);
    setName(hotel.name);
    setPrice(hotel.price);
    setImages(hotel.img);
    setFreeCancellation(hotel.freeCancellation);
    setReserveNow(hotel.reserveNow);
    setDescription(hotel.desc);
    setCurrentHotel(hotel);
  };

  const UploadImagesToCloudinary = async () => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/johnthedonxyz/image/upload";
    const uploadPreset = "zvrwqulp";

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        const response = await axios.post(cloudinaryUrl, formData);
        return response.data.secure_url;
      })
    );

    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const imageUrls = await UploadImagesToCloudinary();

      const hotel = {
        id: isEditing ? currentHotel.id : (hotelData.length + 1).toString(),
        name,
        price,
        img: imageUrls,
        freeCancellation,
        
        reserveNow,
        desc: description
      };

      if (isEditing) {
        await axios.put(`http://localhost:3000/hotels/${currentHotel.id}`, hotel);
        setHotelData((prevHotelData) =>
          prevHotelData.map((h) => (h.id === currentHotel.id ? hotel : h))
        );
      } else {
        const response = await axios.post("http://localhost:3000/hotels", hotel);
        setHotelData((prevHotelData) => [...prevHotelData, response.data]);
      }

      setIsEditing(false);
      setCurrentHotel(null);
      setName("");
      setPrice("");
      setImages([]);
      setFreeCancellation(false);
      setReserveNow(false);
      setDescription("");
    } catch (error) {
      console.error("Error submitting hotel data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/hotels/${id}`);
      setHotelData((prevHotelData) => prevHotelData.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.log("Error deleting hotel:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const data = await getHotels();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <>
      <div className="w-full p-5 shadow-xl drop-shadow-sm flex flex-col mx-5 my-5">
        <h1 className="font-bold mb-2 text-2xl">
          {isEditing ? "Edit Hotel" : "Add New Hotel"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="text-gray-500">Name</label>
          <input
            className="border focus:outline-none mb-2 h-10 w-[98%]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="text-gray-500">Price</label>
          <input
            className="border focus:outline-none mb-2 h-10 w-[98%]"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label className="text-gray-500">Images</label>
          <input
            className="border focus:outline-none mb-2 h-10 w-[98%]"
            type="file"
            multiple
            onChange={handleImages}
          />
          <div className="flex gap-4 relative flex-wrap mb-5">
            {images.map((image, i) => (
              <div className="flex relative" key={i}>
                <img
                  className="h-24 w-24 rounded-sm object-cover"
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt=""
                />
                <button
                  className="absolute top-0 right-0 cursor-pointer h-5 w-5 flex bg-red-600 rounded-full justify-center items-center text-white"
                  onClick={() => handleRemoveImage(i)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-start mb-10">
            <label className="text-gray-500 flex-[0.5]">Free Cancellation</label>
            <input
              className="accent-blue-600 items-center"
              type="checkbox"
              checked={freeCancellation}
              onChange={(e) => setFreeCancellation(e.target.checked)}
            />
          </div>
          <div className="flex justify-start mb-10">
            <label className="text-gray-500 flex-[0.5]">Reserve Now</label>
            <input
              className="accent-blue-600 items-center"
              type="checkbox"
              checked={reserveNow}
              onChange={(e) => setReserveNow(e.target.checked)}
            />
          </div>
          <label className="text-gray-500">Description</label>
          <textarea
            className="border focus:outline-none mb-2 h-20 w-[98%]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            className={`bg-sky-500 h-10 w-[15vh] rounded-md mb-10 text-white py-2 px-4 ${loading ? "cursor-not-allowed bg-blue-300" : "cursor-pointer"}`}
            disabled={loading}
          >
            {isEditing ? "Update Hotel" : "Add Hotel"}
          </button>
        </form>
        <div>
          <h1 className="font-bold mb-10 text-2xl">View Hotels</h1>
          {loading ? (
            <p>Loading hotels...</p>
          ) : (
            <table className="w-full">
              <thead className="border-b-2">
                <tr>
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2 text-start">Price</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="border-collapse divide-y border-b-4">
                {hotelData.map((hotel) => (
                  <tr className="border" key={hotel.id}>
                    <td className="border-b-2 px-4 py-2">{hotel.name}</td>
                    <td className="border px-4 py-2">{hotel.price}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-500 rounded-md text-white h-6 w-20"
                        onClick={() => handleEdit(hotel)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setDeleteHotelId(hotel.id);
                          setOpen(true);
                        }}
                        className="bg-red-500 rounded-md text-white h-6 w-20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {open && (
          <div className="h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <h1 className="text-red-600 mb-4">Are you sure?</h1>
              <div className="flex justify-between">
                <button
                  className="h-8 w-12 bg-red-500 text-white rounded mr-2"
                  onClick={() => {
                    handleDelete(deleteHotelId);
                    handleClose();
                  }}
                >
                  Yes
                </button>
                <button
                  className="h-8 w-12 bg-gray-500 text-white rounded"
                  onClick={handleClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageHotel;
