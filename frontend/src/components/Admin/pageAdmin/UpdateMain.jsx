// TODO: Resolve NULL id after updating

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../redux/userSlice";
import "../cruds/loading.css";
import Footer from "../../post/Footer";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().required("Vui lòng nhập địa chỉ email"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
});

const UpdateMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      dispatch(getUserById(id));
    };
    getUser();
  }, [dispatch, id]);

  const user = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleSelectFile = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpdateUser = async (data) => {
    const { name, email, phoneNumber } = data;

    let formData = new FormData();
    formData.append("avatar", avatar ? avatar : user.avatar);
    formData.append("data", new Blob([JSON.stringify({
      "username": user.username,
      "password": user.password,
      "role": user.role,
      "studentId": user.studentId,
      "name": name ? name : user.name,
      "email": email ? email : user.email,
      "phoneNumber": phoneNumber ? phoneNumber : user.phoneNumber,
    })], { type: "application/json" }));
    dispatch(updateUser({ id: id, formData: formData }));
  };

  useEffect(() => {
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  }, [dispatch]);

  return (
    <div>
      <div className="container mt-28">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="container-fluid bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          encType="multipart/form-data"
        >
          <h1 style={{ fontSize: "25px", marginLeft: "50px" }}>
            Cập Nhật Thông Tin
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Tên
            </label>
            <input
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              {...register("name")}
              defaultValue={user.name}
            />
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              {...register("email")}
              defaultValue={user.email}
            />
            <p className="text-red-500 mt-1">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Số điện thoại
            </label>
            <input
              name="phoneNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
              defaultValue={user.phoneNumber}
            />
            <p className="text-red-500 mt-1">{errors.phoneNumber?.message}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="avatar"
            >
              Ảnh đại diện
            </label>
            <input
              onChange={handleSelectFile}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
            />
            <img className="w-[50px] rounded-full mt-2" src={avatar} alt="" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cập nhật thông tin
            </button>
            <a href="/">quay lại</a>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdateMain;
