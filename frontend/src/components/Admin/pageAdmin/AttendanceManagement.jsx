import Swal from "sweetalert2";
import {
  CardBody,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/userSlice";
import { getAttendance, updateStatusAttendance } from "../../../redux/attendanceSlice";
import "../cruds/loading.css";

const TABLE_HEAD = [
  "ID",
  "MSSV",
  "Tên sinh viên",
  "Tên sự kiện",
  "Thời điểm đăng ký",
  "Trạng thái",
  ""
];

const AttendanceManagement = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.attendance);
  const users = useSelector((state) => state.user.users);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAttendance());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateStatus = (id) => {
    Swal.fire({
      title: "Cập nhật trạng thái",
      input: "select",
      inputOptions: {
        "ATTENDED": "Đã tham gia",
        "CANCELLED": "Không tham gia",
      },
      inputPlaceholder: "Chọn trạng thái",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id,
          status: result.value,
        };
        dispatch(updateStatusAttendance(data));
      }
    });
  };

  return (
    <div className="content-wrapper">
      <Card className="ml-2 w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="content-header rounded-none"
        >
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Tham Gia Sự Kiện</h1>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
              <div className="flex items-center gap-5 w-[350px] h-[40px] border border-gray-200 rounded-lg py-3 px-5">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Tìm kiếm theo tên sự kiện"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span className="flex-shrink-0 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="container-fluid px-0 ">
          <table id="otherTable" className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-blue-800 text-white">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendance.filter(
                  (item) => item.eventName.toLowerCase().includes(searchTerm)
                )
                .map(
                  (
                    { id, userId, eventName, registeredAt, attendanceStatus },
                    index
                  ) => {
                    const user = users.find((user) => user.id === userId);
                    const isLast = index === attendance.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user?.studentId}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {eventName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(registeredAt).toLocaleDateString("en-GB")}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {attendanceStatus}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
                            onClick={() => handleUpdateStatus(id)}
                          >
                            Cập nhật
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AttendanceManagement;

