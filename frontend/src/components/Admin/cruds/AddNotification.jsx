import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./loading.css";
import { addNotification } from "../../../redux/notificationSlice";
import "react-quill/dist/quill.snow.css";

const schema = yup.object().shape({
  message: yup.string().required("Vui lòng nhập nội dung thông báo!"),
});

const AddNotification = () => {
  const isLoading = useSelector((state) => state.notification.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const handleAddNotification = async (data) => {
    const { message } = data;

    dispatch(
      addNotification({
        message,
        createdAt: new Date(),
      })
    );
  };

  return (
    <div className="flex h-[100vh]">
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Thông Báo</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddNotification)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="message" className="text-lg text-gray-600">
                Nội dung:
              </label>
              <textarea
                name="message"
                placeholder="Nhập mô tả"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("message")}
              />
              <p className="text-red-500 mt-1">{errors.message?.message}</p>
            </div>
            <button className="block w-full h-10 bg-blue-800 text-white rounded-md">
              Thêm
            </button>
            <a href="/notifications">Quay lại</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;