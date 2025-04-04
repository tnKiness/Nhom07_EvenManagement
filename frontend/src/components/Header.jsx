import { Link } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const Header = () => {
  const eventListRef = useRef(null);

  const scrollToEventList = () => {
    if (eventListRef.current) {
      eventListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="far fa-clock text-primary me-2"></i>Giờ làm việc: Thứ 2 - Thứ 7 (6:00 - 21:00)
              </small>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-end">
            <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div className="me-3 pe-3 border-end py-2">
                <p className="m-0">
                  <i className="fa fa-envelope-open me-2"></i>
                  events.ueh@gmail.com
                </p>
              </div>
              <div className="py-2">
                <p className="m-0">
                  <i className="fa fa-phone-alt me-2"></i>012 345 6789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg fixed z-50 w-full text-center bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <img
              src="https://hotro.ueh.edu.vn/images/logo-ueh-footer.png"
              alt="home-logo"
              style={{ width: "30%" }}
            ></img>
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link
              className="nav-link active"
              to={"/list-events"}
              onClick={scrollToEventList}
            >
              Sự Kiện
            </Link>
            <Link className="nav-link active" to={"/attendance-history"}>
              Lịch Sử Tham Gia
            </Link>
            <Link className="nav-link active" to={`/my-notifications/${user?.id}`}>
              Thông Báo
            </Link>
          </div>
          <ul className="nav-link flex items-center">
            <img 
              className="w-[50px] rounded-full"
              src={user
                ? (user.avatar
                  ? user.avatar
                  : "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg")
                : ""
              }
              alt=""
            />
            <li className="dropdown">
              {user ? (
                <a
                  className="nav-link text-black dropdown-toggle text-lg"
                  data-bs-toggle="dropdown"
                  role="button"
                >
                  {user.username}
                </a>
              ) : (
                <div className="flex items-center">
                  <a href="/login" className="nav-link">
                    Đăng nhập
                  </a>
                </div>
              )}
              {user ? (
                <ul>
                  <li className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href={`/update-info/${user?.id}`}
                    >
                      Chỉnh Sửa Hồ Sơ
                    </a>
                    <a
                      onClick={handleLogOut}
                      href="#"
                      className="dropdown-item"
                    >
                      Đăng Xuất
                    </a>
                  </li>
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
