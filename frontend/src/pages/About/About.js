import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import { Link } from "react-router-dom";
import ServiceSlide from "../../components/ServiceSlide";

const cx = classNames.bind(styles);

function About() {
  const shopInfo = {
    name: "MAN HAIRCUTS",
    slogan: "NƠI PHÁI MẠNH TỎA SÁNG",
    established: "2023",
    locations: "3 chi nhánh trên toàn quốc",
    stylists: "15+ chuyên gia tạo mẫu tóc",
    description: [
      "MAN HAIRCUTS là thương hiệu cắt tóc nam chuyên nghiệp hàng đầu, được thành lập với mục tiêu mang đến những trải nghiệm cắt tóc hoàn hảo cho nam giới Việt Nam.",
      "Với không gian hiện đại, sang trọng cùng đội ngũ stylist được đào tạo bài bản trong và ngoài nước, chúng tôi tự hào mang đến kiểu tóc phù hợp và phong cách riêng cho từng khách hàng.",
      "Chúng tôi không chỉ đơn thuần là một tiệm cắt tóc, mà còn là điểm đến của phong cách và sự tự tin cho nam giới hiện đại."
    ],
    features: [
      {
        icon: "fa-cut",
        title: "Stylist Chuyên Nghiệp",
        description: "Đội ngũ stylist được đào tạo chuyên nghiệp, luôn cập nhật xu hướng tóc mới nhất."
      },
      {
        icon: "fa-home",
        title: "Không Gian Hiện Đại",
        description: "Thiết kế không gian sang trọng, tiện nghi mang đến trải nghiệm thư giãn tuyệt vời."
      },
      {
        icon: "fa-clock",
        title: "Đặt Lịch Dễ Dàng",
        description: "Hệ thống đặt lịch trực tuyến giúp bạn tiết kiệm thời gian chờ đợi."
      },
      {
        icon: "fa-smile",
        title: "Dịch Vụ Tận Tâm",
        description: "Chúng tôi lắng nghe và thấu hiểu nhu cầu của từng khách hàng."
      }
    ],
    services: [
      {
        name: "Cắt Tóc Tạo Kiểu",
        description: "Tạo kiểu chuyên nghiệp với nhiều lựa chọn phù hợp với khuôn mặt và phong cách của bạn.",
        image: "images/haircut.jpg"
      },
      {
        name: "Gội Đầu Thư Giãn",
        description: "Trải nghiệm thư giãn với dầu gội cao cấp và kỹ thuật massage chuyên nghiệp.",
        image: "images/wash.jpg"
      },
      {
        name: "Uốn Tóc Chuyên Nghiệp",
        description: "Tạo sóng tự nhiên, phong cách hiện đại dành riêng cho bạn.",
        image: "images/perm.jpg"
      }
    ],
    stylists: [
      {
        name: "Nguyễn Văn A",
        position: "Senior Stylist",
        image: "https://res.cloudinary.com/vinhisreal/image/upload/v1744220756/pvbarbershop/1744220691543-Mavuika.full.4229035.jpg.jpg"
      },
      {
        name: "Trần Văn B",
        position: "Master Barber",
        image: "https://res.cloudinary.com/vinhisreal/image/upload/v1744220799/pvbarbershop/1744220735911-c02a4932-a159-4940-96c6-0851caaff611.png.png"
      },
      {
        name: "Lê Văn C",
        position: "Color Specialist",
        image: "images/stylist3.jpg"
      }
    ]
  };

  return (
    <div className={cx("container")}>
      {/* Hero Section */}
      <div className={cx("hero")}>
        <div className={cx("hero-content")}>
          <h1 className={cx("title")}>PHONG CÁCH TÓC HIỆN ĐẠI CHO PHÁI MẠNH</h1>
          <p className={cx("subtitle")}>Nơi kiến tạo phong cách và sự tự tin cho các quý ông</p>
          <Link to="/booking" className={cx("btn", "btn-primary")}>
            ĐẶT LỊCH NGAY
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className={cx("about-section")}>
        <h2 className={cx("section-title")}>VỀ CHÚNG TÔI</h2>
        <div className={cx("divider")}></div>
        
        <div className={cx("about-content")}>
          <div className={cx("about-image")}>
            <img src="https://res.cloudinary.com/lewisshop/image/upload/v1743512910/toeic/answers/1743512902665-BackgroundImg.png.png" alt="MAN HAIRCUTS Interior" />
          </div>
          <div className={cx("about-text")}>
            <h3>{shopInfo.slogan}</h3>
            
            {shopInfo.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <div className={cx("about-stats")}>
              <div className={cx("stat-item")}>
                <span className={cx("stat-number")}>{shopInfo.established}</span>
                <span className={cx("stat-label")}>Thành lập</span>
              </div>
              {/* <div className={cx("stat-item")}>
                <span className={cx("stat-number")}>{shopInfo.locations}</span>
                <span className={cx("stat-label")}>Chi nhánh</span>
              </div> */}
              <div className={cx("stat-item")}>
                <span className={cx("stat-number")}>{shopInfo.stylists.length}</span>
                <span className={cx("stat-label")}>Chuyên gia</span>
              </div>
            </div>
            
            {/* <Link to="/about-detail" className={cx("btn", "btn-outline")}>
              TÌM HIỂU THÊM
            </Link> */}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className={cx("features-section")}>
        <h2 className={cx("title-service")}>TẠI SAO CHỌN CHÚNG TÔI</h2>
        <div className={cx("divider")}></div>
        <p className={cx("section-desc")}>Những lý do làm nên sự khác biệt của MAN HAIRCUTS</p>
        
        <div className={cx("features-grid")}>
          {shopInfo.features.map((feature, index) => (
            <div key={index} className={cx("feature-item")}>
              <div className={cx("feature-icon")}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Overview */}
      <div className={cx("services-section")}>
        <h2 className={cx("title-service")}>DỊCH VỤ CỦA CHÚNG TÔI</h2>
        <div className={cx("divider")}></div>
        <p className={cx("section-desc")}>Chúng tôi cung cấp đa dạng các dịch vụ chăm sóc tóc chất lượng cao</p>
        
        <section className={cx("service-container")}>
                <section className={cx("service")}>
                  <ServiceSlide />
                </section>
              </section>
        
        {/* <div className={cx("text-center")}>
          <Link to="/services" className={cx("btn", "btn-primary")}>
            XEM TẤT CẢ DỊCH VỤ
          </Link>
        </div> */}
      </div>

      {/* Stylist Team */}
      <div className={cx("team-section")}>
        <h2 className={cx("title-service")}>ĐỘI NGŨ STYLIST</h2>
        <div className={cx("divider")}></div>
        <p className={cx("section-desc")}>Gặp gỡ những chuyên gia tạo mẫu tóc tài năng của chúng tôi</p>
        
        <div className={cx("btn-container")}>
          <Link to="/barbers" className={cx("btn", "btn-light")}>
            DANH SÁCH CÁC BARBER
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className={cx("cta-section")}>
        <div className={cx("cta-content")}>
          <h2>SẴN SÀNG CHO MỘT KIỂU TÓC MỚI?</h2>
          <p>Đặt lịch ngay hôm nay và trải nghiệm dịch vụ chất lượng của chúng tôi</p>
          <Link to="/booking" className={cx("btn", "btn-light")}>
            ĐẶT LỊCH NGAY
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;