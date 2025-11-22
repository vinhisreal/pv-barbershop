import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getAllServices } from "../../redux/apiRequest"; // Giả sử API này đã được cài sẵn
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./PricingTable.module.scss";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
const PricingTable = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]); // Để lưu dịch vụ từ API

  const handleGetService = async () => {
    const res = await getAllServices(dispatch);
    if (res?.metadata) {
      const activeServices = res.metadata.filter((service) => service.isActive);
      const formattedServices = activeServices.map((service) => ({
        name: service.service_name,
        price: service.service_price,
        description: service.service_description,
      }));
      setServices(formattedServices);
    }
  };

  useEffect(() => {
    handleGetService(); // Lấy dịch vụ khi component được mount
  }, []);
  const { t } = useTranslation();

  return (
    <div>
      <h4 className={cx("subtitle")}>{t("pricing.subtitle")}</h4>
      <h1 className={cx("title")}>{t("pricing.title")}</h1>
      <Grid container spacing={2} justifyContent="center">
        {services.length > 0 ? (
          services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
              {" "}
              {/* Giảm kích thước ở đây */}
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 220, // Giảm chiều cao card, làm nó dài hơn
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ flexShrink: 0, fontSize: "16px" }}
                  >
                    {service?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", mt: 1, fontSize: "14px" }}
                  >
                    {service?.price} {t("service.vnd")}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1, fontSize: "13px" }}
                  >
                    {service?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            {t("pricing.noServices")}
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default PricingTable;
