/* eslint-disable perfectionist/sort-imports */
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import Cookie from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import {
  completeRedemption,
  contactAboutRedemptionViaEmail,
  getAllRedemptions,
} from 'src/redux/apiRequest';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function RedemptionView() {
  const dispatch = useDispatch();
  const table = useTable();
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const handleGetRedemption = async () => {
    const data = await getAllRedemptions(dispatch);
    console.log(data);
    setRedemptions(data);
  };

  const handleContact = async (redemption: any) => {
    const email = redemption?.user?.email;
    const address = redemption?.user?.user_address || redemption?.user?.address;
    const giftName = redemption?.gift?.name;
    const userName = redemption?.user?.name;

    try {
      await contactAboutRedemptionViaEmail({
        to: email,
        userName,
        address,
        giftName,
      });

      toast.success(t('redemption.sendMailSuccess'));
    } catch (error) {
      toast.error(t('redemption.sendMailError'));
      console.error(error);
    }
  };

  const handleDelete = async (redemption: any) => {
    const accessToken = Cookie.get('accessToken');
    await completeRedemption(accessToken, redemption._id, dispatch);
    await handleGetRedemption();
  };

  useEffect(() => {
    handleGetRedemption();
  }, []);

  const filteredData = redemptions?.filter((d) => d?.user?.name.toLowerCase().includes(search));

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {t('redemption.title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
          <TextField
            label={t('redemption.search')}
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </Box>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>{t('redemption.customer')}</b>
                  </TableCell>
                  <TableCell>
                    <b>{t('redemption.gift')}</b>
                  </TableCell>
                  <TableCell>
                    <b>{t('redemption.point')}</b>
                  </TableCell>
                  <TableCell>
                    <b>{t('redemption.redeemedAt')}</b>
                  </TableCell>
                  <TableCell>
                    <b>{t('redemption.actions')}</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  ?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  ?.map((redemption) => (
                    <TableRow key={redemption?._id}>
                      <TableCell>
                        <Box sx={{ mt: 2 }}>
                          <Card
                            key={redemption?.user?._id}
                            sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                          >
                            {redemption?.user?.avatar ? (
                              <img
                                src={redemption.user.avatar}
                                alt={redemption.user.name}
                                width="40"
                                height="40"
                                style={{ borderRadius: '50%', marginRight: '10px' }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  marginRight: '10px',
                                  backgroundColor: '#ccc',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                  fontSize: '16px',
                                  textTransform: 'uppercase',
                                }}
                              >
                                {redemption?.user?.name?.charAt(0) || '?'}
                              </div>
                            )}
                            <Typography>{redemption?.user?.name}</Typography>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ mt: 2 }}>
                          <Card
                            key={redemption?.gift?._id}
                            sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                          >
                            <img
                              src={redemption?.gift?.image}
                              alt={redemption?.gift?.name}
                              width="40"
                              height="40"
                              style={{ borderRadius: '50%', marginRight: '10px' }}
                            />
                            <Typography>{redemption?.gift?.name}</Typography>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell>{redemption?.points_used}</TableCell>
                      <TableCell>
                        {new Date(redemption?.redeemed_at).toLocaleString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{ minWidth: '80px', marginTop: '4px' }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleContact(redemption)}
                        >
                          {t('redemption.contact')}
                        </Button>
                        <Button
                          sx={{ minWidth: '80px', marginTop: '4px', marginLeft: '8px' }}
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(redemption)}
                        >
                          {t('redemption.delete')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={redemptions?.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected?.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
