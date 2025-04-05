import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/post/Footer";

const NotificationPage = () => {
  const { id } = useParams();
  const [scorecard, setScorecard] = React.useState({});
  const [notificationList, setNotificationList] = React.useState([]);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/users/${id}`
    );
    setScorecard(res.data.scorecard);
    setNotificationList(res.data.notifications);
  };

  React.useEffect(() => {
    getData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("vi-VN")}, ${date.toLocaleTimeString("vi-VN")}`;
  };

  return (
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
                            Thông Tin Điểm Tích Lũy
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
                                  Điểm tích lũy của bạn:
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
                                            position: "relative",
                                          }}
                                        >
                                          <p style={{ fontSize: "14pt" }}>
                                            {scorecard.score}
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{ float: "left", fontSize: "14pt" }}
                              valign="top"
                            >
                              <strong>
                                <span style={{ fontWeight: "bold" }}>
                                  Cập nhật ngày:
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
                                            position: "relative",
                                          }}
                                        >
                                          <p style={{ fontSize: "14pt" }}>
                                            {formatDate(scorecard.lastUpdated)}
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
                            Thông Báo
                          </span>
                        </p>
                      </div>
                      <br />
                      &nbsp;
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
                      <span>Ngày Gửi</span>
                    </th>
                    <th className="mount-header">
                      <span>Nội Dung</span>
                    </th>
                  </tr>
                </thead>

                <tbody id="ItemsTable">
                  {notificationList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <span>{formatDate(item.sentAt)}</span>
                      </td>
                      <td>
                        <span>{item.message}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;
