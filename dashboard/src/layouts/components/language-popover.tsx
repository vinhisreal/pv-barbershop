import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import i18n from 'src/i18n';

export function LanguagePopover() {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const data = [
    {
      value: 'en',
      label: 'English',
      icon: 'https://flagcdn.com/w20/gb.png', // 🇬🇧
    },
    {
      value: 'vi',
      label: 'Tiếng Việt',
      icon: 'https://flagcdn.com/w20/vn.png', // 🇻🇳
    },
  ];

  const [locale, setLocale] = useState(i18n.language || 'en');

  const handleChangeLang = useCallback(
    (newLang: string) => {
      setLocale(newLang);
      i18n.changeLanguage(newLang);
      onClose();
    },
    [onClose]
  );

  const currentLang = data.find((lang) => lang.value === locale);

  const renderFlag = (label?: string, icon?: string) => (
    <Box
      component="img"
      alt={label}
      src={icon}
      sx={{ width: 26, height: 20, borderRadius: 0.5, objectFit: 'cover' }}
    />
  );

  return (
    <>
      <IconButton
        aria-label="Languages button"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            width: 40,
            height: 40,
            color: 'white',
            ...(open && { bgcolor: theme.vars.palette.action.selected }),
          }),
        ]}
      >
        {renderFlag(currentLang?.label, currentLang?.icon)}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang?.value}
              onClick={() => handleChangeLang(option.value)}
            >
              {renderFlag(option.label, option.icon)}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
