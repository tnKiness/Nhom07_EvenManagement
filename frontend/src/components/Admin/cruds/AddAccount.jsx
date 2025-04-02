import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../../../redux/authSlice";
import "./loading.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  studentId: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
});

const AddAccount = () => {
  const [imageUpload, setImageUpload] = useState("");
  const isLoading = useSelector((state) => state.user.isLoading);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUploadImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleAddAccount = async (data) => {
    const { studentId, name, email, phone } = data;

    let formData = new FormData();
    // Append the form values
    formData.append('avatar', imageUpload);
    formData.append('data', new Blob([JSON.stringify({
      "username": studentId,
      "password": studentId, // mặc định là MSSV đã cấp
      "role": "ROLE_USER",
      "studentId": studentId,
      "name": name,
      "email": email,
      "phoneNumber": phone,
    })], {
      type: "application/json"
    }));

    try {
      dispatch(registerStart());
      const res = await axios.post(
        "http://localhost:8080/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(registerSuccess(res.data));
      Swal.fire({
        icon: "success",
        title: "Thêm tài khoản thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div className="flex h-[100vh]">
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Tài Khoản</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddAccount)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="studentId" className="text-sm text-gray-600">
                MSSV:
              </label>
              <input
                name="studentId"
                type="text"
                id="studentId"
                placeholder="Hãy nhập mã số"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("studentId")}
              />
              <p className="text-red-500 mt-1">{errors.studentId?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sinh viên:
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Hãy nhập họ và tên"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email:
              </label>
              <input
                name="email"
                type="text"
                min={1}
                id="email"
                placeholder="Hãy nhập email"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("email")}
              />
              <p className="text-red-500 mt-1">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="text-sm text-gray-600">
                Số điện thoại:
              </label>
              <input
                name="phone"
                type="text"
                id="phone"
                placeholder="Hãy nhập số điện thoại"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("phone")}
              />
              <p className="text-red-500 mt-1">{errors.phone?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="text-sm text-gray-600">
                Hình ảnh (không quá 1 MB):
              </label>
              <input
                {...register("avatar")}
                type="file"
                onChange={handleUploadImage}
              />
              <p className="text-red-500 mt-1">{errors.file?.message}</p>
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

export default AddAccount;