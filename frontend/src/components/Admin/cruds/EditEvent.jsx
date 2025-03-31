import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, updateEvent } from "../../../redux/eventSlice";
import { getCategory } from "../../../redux/categorySlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./loading.css";
import Swal from "sweetalert2";

const schema = yup.object().shape({});

const EditEvent = () => {
  const category = useSelector((state) => state.category.category);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) => state.event.event);
  const isLoading = useSelector((state) => state.event.isLoading);
  const [imageUpload, setImageUpload] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEventById(id));
    dispatch(getCategory());
  }, [dispatch, id]);

  const handleSelectImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleEditEvent = (data) => {
    const { name, location, capacity, startDate, endDate, category, description } = data;

    let formData = new FormData();
    // Append the form values
    formData.append('image', imageUpload ? imageUpload : event.image);
    formData.append('data', new Blob([JSON.stringify({
      "name": name ? name : event.name,
      "description": description ? description : event.description,
      "startDate": startDate ? startDate : event.startDate,
      "endDate": endDate ? endDate : event.endDate,
      "location": location ? location : event.location,
      "capacity": capacity ? capacity : event.capacity,
      "category": category ? category : event.category
    })], {
      type: "application/json"
    }));

    dispatch(
      updateEvent({
        id: id,
        formData: formData
      })
    ).then(() => {
      Swal.fire({
        title: "Success",
        text: "Event updated successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/event-management");
      });
    });
  };

  return (
    <div className="flex h-[100vh]">
      <div className="container flex justify-center overflow-y-scroll p-4">
        <div className="h-max w-full max-w-[60rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <h1 className="font-bold text-2xl text-center mb-9">
            Cập nhật Sự Kiện
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleEditEvent)}
            className="w-full max-w-[60rem]"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tên sự kiện:
              </label>
              <input
                name="name"
                type="text"
                placeholder="Hãy nhập tên sự kiện"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.name}
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="text-lg text-gray-600">
                Địa điểm:
              </label>
              <input
                name="location"
                type="text"
                placeholder="Hãy nhập địa điểm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.location}
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
                placeholder="Hãy nhập sức chứa"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.capacity}
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
                placeholder="Hãy nhập thời gian bắt đầu"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.startDate}
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
                placeholder="Hãy nhập thời gian kết thúc"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.endDate}
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
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.category}
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
              <label htmlFor="image" className="text-lg text-gray-600">
                Hình ảnh:
              </label>
              {event?.image && (
                <img
                  src={event.image}
                  alt="Event"
                  className="w-[200px] h-[100px] p-2"
                />
              )}
              <input
                type="file"
                {...register("image")}
                onChange={handleSelectImage}
              />
              <p className="text-red-500 mt-1">{errors.image?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-lg text-gray-600">
                Mô tả
              </label>
              <textarea
                name="description"
                placeholder="Nhập mô tả"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.description}
                {...register("description")}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>
            <button
              className="h-10 w-20 rounded-sm bg-slate-200"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
