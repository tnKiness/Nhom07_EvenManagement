import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./loading.css";
import { getCategory } from "../../../redux/categorySlice";
import { addEvent } from "../../../redux/eventSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  location: yup.string().required("Vui lòng nhập địa điểm"),
  capacity: yup.number().required("Vui lòng nhập sức chứa"),
  startDate: yup.date().required("Vui lòng nhập thời gian bắt đầu"),
  endDate: yup.date().required("Vui lòng nhập thời gian kết thúc")
});

const AddEvent = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [description, setDescription] = useState("");
  const isLoading = useSelector((state) => state.event.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const category = useSelector((state) => state.category.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "ROLE_ADMIN") {
      navigate("/login");
    }
  }, [user.role]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleUploadImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleAddEvent = async (data) => {
    const { name, location, capacity, startDate, endDate, category } = data;

    let formData = new FormData();
    // Append the form values
    formData.append('image', imageUpload);
    formData.append('data', new Blob([JSON.stringify({
      "name": name,
      "description": description,
      "startDate": startDate,
      "endDate": endDate,
      "location": location,
      "capacity": capacity,
      "category": category
    })], {
      type: "application/json"
    }));

    dispatch(
      addEvent(formData)
    );
  };

  return (
    <div className="flex h-[100vh]">
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Sự Kiện</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddEvent)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sự kiện:
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Hãy nhập tên sự kiện"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="text-sm text-gray-600">
                Địa điểm:
              </label>
              <input
                name="location"
                type="text"
                id="location"
                placeholder="Hãy nhập địa điểm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("location")}
              />
              <p className="text-red-500 mt-1">{errors.location?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="capacity" className="text-sm text-gray-600">
                Sức chứa:
              </label>
              <input
                name="capacity"
                type="number"
                min={1}
                id="capacity"
                placeholder="Hãy nhập sức chứa"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("capacity")}
              />
              <p className="text-red-500 mt-1">{errors.capacity?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="text-sm text-gray-600">
                Thời gian bắt đầu:
              </label>
              <input
                name="startDate"
                type="datetime-local"
                id="startDate"
                placeholder="Hãy nhập thời gian bắt đầu"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("startDate")}
              />
              <p className="text-red-500 mt-1">{errors.startDate?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="text-sm text-gray-600">
                Thời gian kết thúc:
              </label>
              <input
                name="endDate"
                type="datetime-local"
                id="endDate"
                placeholder="Hãy nhập thời gian kết thúc"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("endDate")}
              />
              <p className="text-red-500 mt-1">{errors.endDate?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-sm text-gray-600">
                Danh mục
              </label>
              <select
                name="category"
                id="category"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("category")}
              >
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-sm text-gray-600">
                Hình ảnh (không quá 1 MB):
              </label>
              <input
                {...register("image")}
                type="file"
                onChange={handleUploadImage}
              />
              <p className="text-red-500 mt-1">{errors.file?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm text-gray-600">
                Mô tả:
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={addEvent.modules}
                formats={addEvent.formats}
                placeholder="Write something..."
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>
            <button className="block w-full h-10 bg-blue-800 text-white rounded-md">
              Thêm
            </button>
            <a href="/event-management">Quay lại</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
