/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable perfectionist/sort-imports */
import { useState, useCallback } from 'react';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import Box from '@mui/material/Box';
import Cookie from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

export type UserProps = {
  _id: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  user_role?: any;
  user_gender?: string;
  user_password?: string;
  isActive?: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: (user: UserProps) => void;
  onActivate: (user: UserProps) => void;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onDelete,
  onActivate,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const currentRole = Cookie.get('user_role_name');
  const targetRole = row?.user_role?.name;

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <TableRow hover tabIndex={-1} selected={selected}>
        <TableCell component="th" scope="row">
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.user_name} src={row.user_avatar || undefined} />
            {row.user_name}
          </Box>
        </TableCell>

        <TableCell>{row.user_email}</TableCell>

        <TableCell>{t(`user.${row.user_gender}`) || '-'}</TableCell>

        <TableCell>{t(`user.${row?.user_role?.name}`) || '-'}</TableCell>

        {/* <TableCell align="center">{row.isAdmin ? '✔️' : '-'}</TableCell> */}

        <TableCell>
          {row.isActive ? (
            <Label color="success">{t('active')}</Label>
          ) : (
            <Label color="error">{t('inactive')}</Label>
          )}
        </TableCell>

        <TableCell>
          <Button
            onClick={() => {
              handleClosePopover();
              onDelete(row);
            }}
            variant="contained"
            color="error"
            disabled={
              row._id === Cookie.get('_id') ||
              !(
                currentRole === 'admin' ||
                (currentRole === 'receptionist' && targetRole !== 'admin')
              )
            }
          >
            {t('disable')}
          </Button>

          <Button
            onClick={() => {
              onActivate(row);
            }}
            sx={{ marginLeft: '8px' }}
            variant="contained"
            color="success"
            disabled={
              !(
                (Cookie.get('user_role_name') === 'admin' ||
                  Cookie.get('user_role_name') === 'receptionist') &&
                !row.isActive
              )
            }
          >
            {t('activate')}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
