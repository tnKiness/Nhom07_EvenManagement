import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../redux/eventSlice";
import {
  addFeedback,
  getFeedbackByEventId,
} from "../redux/feedbackSlice";
import { getUsers } from "../redux/userSlice";
import { getAttendanceByEventId, addAttendance } from "../redux/attendanceSlice";
import Footer from "../components/post/Footer";

function EventDetail() {
  const [feedback, setFeedback] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);
  const auth = useSelector((state) => state.auth);
  const userId = auth.currentUser?.id;
  const feedbackList = useSelector((state) => state.feedback.feedback);
  const users = useSelector((state) => state.user.users);
  const attendance = useSelector((state) => state.attendance.attendance);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEventById(id));
    dispatch(getAttendanceByEventId(id));
    dispatch(getFeedbackByEventId(id));
  }, [id, dispatch, feedbackList.length]);

  const isRegistered = attendance.some((item) => item.eventId === id && item.userId === userId);
  const isCurrent = new Date() >= new Date(event.startDate) && new Date() <= new Date(event.endDate);
  const remainingCapacity = event.capacity - attendance.length;
  
  const handleAddFeedback = (feedback) => {
    if (!auth.currentUser) {
      navigate("/login");
      return null;
    } else {
      const data = {
        userId: userId,
        eventId: id,
        content: feedback,
        createdAt: new Date().toISOString(),
      };
      dispatch(addFeedback(data));
    }
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    const data = {
      userId: userId,
      eventId: id,
      eventName: event.name,
      registeredAt: new Date().toISOString(),
      attendanceStatus: "REGISTERED",
    };
    dispatch(addAttendance(data));
  };

  return (
    <div>
      <div className="container py-5 mt-24">
        <div className="row">
          <div className="col-md-5">
            <img
              src={event.image}
              alt={event.name}
              className="img-fluid"
              style={{ borderRadius: "5px", border: "1px solid #ddd", height: "auto", marginLeft: "120px" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-4">{event.name}</h1>
            <h2 className="text-danger">Còn {remainingCapacity} suất</h2>
            <h2 className="text-danger">Thời gian: {new Date(event.startDate).toLocaleDateString("en-GB")} đến {new Date(event.endDate).toLocaleDateString("en-GB")}</h2>
            <p className="lead" dangerouslySetInnerHTML={{ __html: event.description }}></p>
            {isCurrent && event.capacity > attendance.length
              ? (
                <button
                  onClick={handleRegister}
                  className="btn btn-primary btn-lg btn-block mb-2"
                  disabled={isRegistered}
                >
                  {isRegistered ? "Đã đăng ký" : "ĐĂNG KÝ"}
                </button>
              )
              : (
                <button className="btn btn-secondary btn-lg btn-block mb-2" disabled>
                  {isCurrent ? "Đã kết thúc" : "Hết suất"}
                </button>
              )}
          </div>
        </div>
      
        {/* Comment Section */}
        <div className="row mt-5">
          <div className="col">
            <h3>Phản Hồi</h3>
            <form>
              <div className="form-group">
                <label htmlFor="message">Phản Hồi:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="form-control"
                  placeholder="Nhập bình luận của bạn..."
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddFeedback(feedback);
                }}
                className="btn btn-primary mt-3"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            {feedbackList.length > 0 ? (
              feedbackList.map((item) => {
                const user = users.find((user) => user.id === item.userId);
                return (
                  <div key={item.id} className="media mb-4">
                    <img
                      src={user?.avatar ? user.avatar : "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}
                      alt="User Avatar"
                      className="w-[50px] rounded-full"
                    />
                    <div className="media-body">
                      <h5 className="mt-0">{user?.username}</h5>
                      <p>{item.content}</p>
                      <small className="text-muted">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có bình luận nào.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetail;
