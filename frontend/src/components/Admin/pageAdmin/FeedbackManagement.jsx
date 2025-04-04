import Swal from "sweetalert2";
import {
  TrashIcon,
} from "@heroicons/react/24/solid";
import { CardBody, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback, deleteFeedbackById } from "../../../redux/feedbackSlice";
import { getUsers } from "../../../redux/userSlice";
import { getEvent } from "../../../redux/eventSlice";
import "../cruds/loading.css";

const TABLE_HEAD = [
  "id",
  "Tên sinh viên",
  "Tên sự kiện",
  "Nội dung",
  "Ngày đăng",
  "",
];

const FeedbackManagement = () => {
  const dispatch = useDispatch();
  
  const feedback = useSelector((state) => state.feedback.feedback);
  const users = useSelector((state) => state.user.users);
  const events = useSelector((state) => state.event.event);

  useEffect(() => {
    dispatch(getEvent());
    dispatch(getUsers());
    dispatch(getFeedback());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa bình luận này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFeedbackById(id));
      }
    });
  };

  return (
    <div className="content-wrapper">
      <Card className="ml-2 w-full">
        <CardHeader floated={false} shadow={false} className="content-header rounded-none">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Phản Hồi Và Bình Luận</h1>
            </div>
          </div>
        </CardHeader>
        <CardBody className="container-fluid px-0">
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
              {feedback.length > 0 &&
                feedback.map(
                  ({ id, userId, eventId, content, createdAt }, index) => {
                    const user = users.find((user) => user.id === userId);
                    const event = events.find((e) => e.id === eventId);

                    const isLast = index === feedback.length - 1;
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
                            {user?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {content}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).toLocaleDateString("en-GB")}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Button 
                            className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-[50px] w-[50px]"
                            onClick={() => handleDelete(id)}
                          >
                            <span>
                              <TrashIcon className="h-4 w-4" />
                            </span>
                            <span>Xóa</span>
                          </Button>
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

export default FeedbackManagement;
