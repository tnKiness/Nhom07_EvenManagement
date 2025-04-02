import {
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/userSlice";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Tên Tài Khoản",
  "MSSV",
  "Tên",
  "Email",
  "Số Điện Thoại",
  "Vai Trò",
  "",
];

const AccountManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users || []);
  const isLoading = useSelector((state) => state.user.isLoading);
  const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (auth.role !== "ROLE_ADMIN") {
    return null;
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="content-wrapper">
        <Card className="w-full ml-2">
          <CardHeader
            floated={false}
            shadow={false}
            className="content-header rounded-none"
          >
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl">
                <h1>Quản Lý Tài Khoản</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="flex items-center gap-5 w-[300px] border border-gray-200 rounded-lg py-3 px-5">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent"
                    placeholder="Tìm kiếm..."
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
                <div className="mb-2 h-14">
                  <Link to="/add-account">
                    <Button className="flex items-center gap-1 rounded-md h-11 bg-blue-500 w-29 hover:bg-blue-600 text-md">
                      <PlusIcon className="h-7 w-7" />
                      Thêm
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="container-fluid px-0 ">
            <table className="w-full min-w-max table-auto text-left">
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
                {users.length > 0 &&
                  users.map(
                    (
                      {
                        username,
                        studentId,
                        name,
                        email,
                        phoneNumber,
                        role
                      },
                      index
                    ) => {
                      const isLast = index === users.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={username}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {username}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {studentId}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {phoneNumber}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {role}
                            </Typography>
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
    </>
  );
};

export default AccountManagement;
