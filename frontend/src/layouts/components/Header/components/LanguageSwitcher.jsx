import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import i18n from "../../../../i18n";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleChange = (event) => {
    const lng = event.target.value;
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  // Đồng bộ khi i18n thay đổi từ nơi khác
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const renderValue = (value) => {
    return value === "en" ? "EN" : "VI";
  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 60,
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          color: "white",
          borderRadius: 2,
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.5)",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiSvgIcon-root": {
          color: "white", // icon mũi tên cũng màu trắng
        },
      }}
    >
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        renderValue={renderValue}
      >
        <MenuItem value="en">🇬🇧 English</MenuItem>
        <MenuItem value="vi">🇻🇳 Tiếng Việt</MenuItem>
      </Select>
    </FormControl>
  );
}
