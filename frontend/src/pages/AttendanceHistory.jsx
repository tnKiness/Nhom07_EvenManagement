import React, { useState, useEffect } from "react";
import "./Hoadon.css"; // Import file CSS để style
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/post/Footer";

const AttendanceHistory = () => {
  const [myAttendance, setMyAttendance] = useState([]);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/attendance/user/${auth?.id}`)
      .then((res) => {
        setMyAttendance(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!auth) {
    navigate("/login");
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <>
      <div className="pt-36">
        <div className="invoice-container container-xxl mb-5">
          <div className="invoice-wrap">
            <div className="invoice-inner">
              <table
                border="0"
                cellPadding="0"
                cellSpacing="0"
                width="100%"
                className="mb-4"
              >
                <tbody>
                  <tr>
                    <td align="right" valign="top">
                      <div className="business_info">
                        <table
                          border="0"
                          cellPadding="0"
                          cellSpacing="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <div
                                  className="mce-content-body"
                                  id="business_info_editor"
                                  style={{
                                    width: "255px",
                                    minHeight: "80px",
                                    position: "relative",
                                  }}
                                  spellCheck="false"
                                >
                                  <p
                                    style={{ fontSize: "20pt" }}
                                    data-mce-style="font-size: 20pt;"
                                  >
                                    UEH EVENTS
                                  </p>
                                  <p className="text-lg">
                                    279 Nguyễn Tri Phương
                                    <br /> Phường 5, Quận 10, TP.HCM
                                    <br /> <br /> 0123 456 789
                                    <br /> events.ueh@gmail.com
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className="invoice-address pt-8"
                style={{ borderTop: "3px double #000000" }}
              >
                <table
                  border="0"
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td align="right" colSpan="2" valign="top">
                        <div
                          className="mce-content-body"
                          style={{
                            textAlign: "center",
                          }}
                          spellCheck="false"
                        >
                          <p>
                            <span
                              style={{ fontSize: "20pt" }}
                              data-mce-style="font-size: 20pt;"
                            >
                              Lịch Sử Tham Gia
                            </span>
                          </p>
                        </div>
                        <br />
                        &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top" width="60%">
                        <table border="0" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td
                                style={{ float: "left", fontSize: "14pt" }}
                                valign="top"
                              >
                                <strong>
                                  <span style={{ fontWeight: "bold" }}>
                                    Mã số sinh viên:
                                  </span>
                                </strong>
                              </td>
                              <td valign="top">
                                <div className="client_info">
                                  <table
                                    border="0"
                                    cellPadding="0"
                                    cellSpacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ paddingLeft: "20px" }}>
                                          <div
                                            className="mce-content-body"
                                            id="client_info"
                                            style={{
                                              width: "200px",
                                              minHeight: "80px",
                                              position: "relative",
                                            }}
                                          >
                                            <p style={{ fontSize: "14pt" }}>
                                              {auth.username}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="items-list">
                <table className="table table-condensed table-bordered items-table">
                  <thead>
                    <tr>
                      <th>
                        <span>Tên Sự Kiện</span>
                      </th>
                      <th className="mount-header">
                        <span>Ngày Đăng Ký</span>
                      </th>
                      <th className="mount-header">
                        <span>Trạng Thái</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody id="ItemsTable">
                    {myAttendance.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span>{item.eventName}</span>
                        </td>
                        <td>
                          <span>{formatDate(item.registeredAt)}</span>
                        </td>
                        <td>
                          <span>{{
                            "REGISTERED": "Đã Đăng Ký",
                            "ATTENDED": "Đã Tham Gia",
                            "CANCELLED": "Đã Hủy",
                          }[item.attendanceStatus]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default AttendanceHistory;
