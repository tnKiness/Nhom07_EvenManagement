import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/post/Footer";
import { getEvent } from "../redux/eventSlice";
import axios from "axios";

function ListEvents() {
  const eventListRef = useRef(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.event);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([]);
  const category = useSelector((state) => state.category.category);

  const getCategoryList = async () => {
    const res = await axios.get("http://localhost:8080/api/category");
    setCategoryList(res.data);
  };

  // Hàm xử lý sự kiện khi thay đổi danh mục
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Lọc danh sách sự kiện theo danh mục
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    dispatch(getEvent());
    getCategoryList();
  }, [dispatch]);

  return (
    <div>
      <div
        ref={eventListRef}
        className="container-fluid pt-36 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-title">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  Danh Mục Sự Kiện
                </h5>
              </div>
              <div className="col-lg-10 my-4 flex ">
                <h5 className="mr-3 mt-2">Tùy Chọn: </h5>
                <div className="w-72">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="form-select"
                  >
                    <option value="All">Tất cả</option>
                    {categoryList.length > 0 &&
                      categoryList?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-4">
            {filteredEvents.length > 0 &&
              filteredEvents?.map((item) => {
                return (
                  <div key={item.id}>
                    <Link to={`/event-detail/${item.id}`}>
                      <div
                        className="max-w-sm mb-5 wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700"
                        data-wow-delay="0.9s"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-sm shadow-md border border-gray-200"
                        />

                        <div className="p-4 text-lg font-normal text-center">
                          {item.name}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ListEvents;
