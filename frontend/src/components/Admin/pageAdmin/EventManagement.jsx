import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvent } from "../../../redux/eventSlice";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import "../../../App.css";
import "../cruds/loading.css";

const TABLE_HEAD = [
  "Hình Ảnh",
  "Tên",
  "Mô Tả",
  "Địa Điểm",
  "Sức Chứa",
  "Bắt Đầu",
  "Kết Thúc",
  "",
];

const EventManagement = () => {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);
  const loading = useSelector((state) => state.event.isLoading);
  const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ từ khóa tìm kiếm

  // Function để cập nhật state khi người dùng nhập từ khóa tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Bước 2: Filter dữ liệu dựa trên từ khóa tìm kiếm
  const filteredEvents = event.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const handleDelete = (id) => async () => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="content-wrapper">
      <Card className="ml-2 w-full overflow-y-scroll">
        <CardHeader
          floated={false}
          shadow={false}
          className="content-header rounded-none"
        >
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Sự Kiện</h1>
            </div>
            <div className="flex shrink-0 gap-2 md:w-max mt-10 mr-3 items-center ">
              <div className="flex items-center gap-5 w-[350px] h-[40px] border border-gray-200 rounded-lg py-3 px-5">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearch} // Gọi hàm khi người dùng thay đổi input
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
              <div className="mt-2 h-14">
                <Link to="/add-event">
                  <Button className="flex items-center gap-1 rounded-md h-11 bg-blue-500 w-29 hover:bg-blue-600 text-md">
                    <PlusIcon className="h-7 w-7" />
                    Thêm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="container-fluid w-full px-2  ">
          {loading ? (
            <div className="body">
              <div className="spinner"></div>
              <div className="message">
                <h1>Loading...</h1>
              </div>
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className=" bg-blue-800 text-white">
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
                {!loading &&
                  filteredEvents.length > 0 &&
                  filteredEvents.map((row) => (
                    <tr key={row.id}>
                      <td className="w-[100px] h-[90px] ">
                        <img src={row.image} alt={row.name} />
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <div className="flex items-center">
                          <div>
                            <Typography color="blue-gray" variant="paragraph">
                              {row.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <Typography color="blue-gray" variant="paragraph">
                          {row.description}
                        </Typography>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <Typography color="blue-gray" variant="paragraph">
                          {row.location}
                        </Typography>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <Typography color="blue-gray" variant="paragraph">
                          {row.capacity}
                        </Typography>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <Typography color="blue-gray" variant="paragraph">
                          {new Date(row.startDate).toLocaleDateString("en-GB")}
                        </Typography>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <Typography color="blue-gray" variant="paragraph">
                          {new Date(row.endDate).toLocaleDateString("en-GB")}
                        </Typography>
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/edit-event/${row.id}`}>
                            <Button className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[50px] mr-2">
                              <span>
                                <PencilIcon className="h-4 w-4" />
                              </span>
                              <span>Sửa</span>
                            </Button>
                          </Link>
                          <Button
                            className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg  h-[50px] w-[50px]"
                            buttontype="link"
                            size="md"
                            rounded="false"
                            block="false"
                            icononly="false"
                            onClick={handleDelete(row.id)}
                          >
                            <span>
                              <TrashIcon className="h-4 w-4" />
                            </span>
                            <span>Xóa</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default EventManagement;
