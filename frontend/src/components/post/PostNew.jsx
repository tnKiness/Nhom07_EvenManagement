import React from 'react';

const PostNew = () => {
  return (
    <div>
      <div className="container-fluid bg-offer my-5 py-5 wow fadeInUp" data-wow-delay="0.1s" >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
              <div className="offer-text text-center rounded p-5">
                <h1 className="display-5 text-white">Cơ hội về tay bạn</h1>
                <p className="text-white mb-4">
                  Tích lũy kỹ năng và trải nghiệm thú vị, nâng cao kết quả rèn luyện. Hãy nắm bắt!
                </p>
                <a href="/login" className="btn btn-dark py-3 px-5 me-3">Tìm Hiểu Thêm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNew;