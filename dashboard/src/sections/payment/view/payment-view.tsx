/* eslint-disable perfectionist/sort-imports */
import { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, Stack, Avatar, Divider } from '@mui/material';
import { redirect, useParams } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  applyDiscount,
  createInvoice,
  deleteInvoice,
  getAppointment,
  getInvoicesByAppointments,
  getUserDiscounts,
} from 'src/redux/apiRequest';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { _id } from 'src/_mock/_mock';

export function PaymentView() {
  const accessToken = Cookie.get('accessToken');
  const { id } = useParams();
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState<any>(null);
  const [method, setMethod] = useState<'cash' | 'momo' | null>(null);
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [payQr, setPayQr] = useState<string>('');
  const [discount, setDiscount] = useState<any>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null);
  const [finalPrice, setFinalPrice] = useState<any>(0);
  const [invoiceId, setInvoiceId] = useState('');
  const [discountPrice, setDiscountPrice] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { t } = useTranslation();

  const handleCreateInvoice = async () => {
    if (invoiceId) {
      await deleteInvoice(accessToken, invoiceId);
    }
    const data = await createInvoice(
      accessToken,
      {
        appointment_id: id,
        total_amount: finalPrice < 0 ? 0 : finalPrice,
        payment_method: method ? method : 'cash',
      },
      dispatch
    );

    if (data) {
      setInvoiceId(data.metadata._id);
      toast.success(t('invoice.createSuccess'));
    }
    return data.metadata._id;
  };

  const handleMomoPayment = async () => {
    try {
      await applyDiscount(
        accessToken,
        {
          code: selectedDiscount?.code,
          user_id: appointment?.customer?._id,
        },
        dispatch
      );

      const newInvoiceId = await handleCreateInvoice();
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}payment/momo`, {
        method: 'POST',
        body: JSON.stringify({
          amount: finalPrice.toString(),
          redirectUrl: `${import.meta.env.VITE_REACT_APP_DASHBOARD_URL}thankyou/${appointment._id}/${finalPrice}/momo/${newInvoiceId}`,
          orderInfo: `Thanh toán hóa đơn của ${appointment.user_name}`,
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      });

      const result = await res.json();

      if (result) {
        setPayUrl(result.link);
        setPayQr(result.qr);
      }
    } catch (err) {
      alert(t('payment.momoPaymentError'));
      console.error(err);
    }
  };

  useEffect(() => {
    if (!appointment) return;

    const total = appointment.service.reduce((acc: number, s: any) => acc + s.service_price, 0);
    setTotalPrice(total);
    setFinalPrice(total);
  }, [appointment]);

  useEffect(() => {
    const setup = async () => {
      // Lấy appointment
      const data = await getAppointment(id, dispatch, true);
      const apm = data.metadata;
      setAppointment(apm);

      // Lấy discount
      const usableDiscount = await getUserDiscounts(
        data?.metadata?.customer?._id || data?.metadata?.customer,
        dispatch
      );
      setDiscount(usableDiscount?.data?.metadata || []);

      // Tính total ban đầu
      const total = apm.service.reduce((a: any, s: any) => a + s.service_price, 0);
      setTotalPrice(total);

      // Tìm invoice cũ
      const existing = await getInvoicesByAppointments([id], dispatch);

      if (existing?.metadata && existing.metadata.length > 0) {
        const inv = existing.metadata[0];

        // Khôi phục dữ liệu invoice cũ
        setInvoiceId(inv._id);
        setFinalPrice(inv.total_amount);
        setDiscountPrice(inv.discount_price || 0);
        setSelectedDiscount(inv.discount_code || null);
        return;
      }

      // Chưa có → tạo invoice mới
      const inv = await createInvoice(
        accessToken,
        {
          appointment_id: id,
          total_amount: total,
          payment_method: 'cash',
        },
        dispatch
      );

      setInvoiceId(inv.metadata._id);
      setFinalPrice(total);
    };

    setup();
  }, []);

  if (!appointment) return <DashboardContent>{t('payment.loading')}</DashboardContent>;

  return (
    <DashboardContent>
      <Card sx={{ p: 3, mx: 'auto', minWidth: '800px' }}>
        <Typography variant="h5" gutterBottom>
          {t('payment.payment')}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={appointment.barber?.user_avatar || appointment.barber.avatar} />
          <Box>
            <Typography fontWeight="bold">{appointment.customer_name}</Typography>
            <Typography fontSize="0.875rem" color="text.secondary">
              {t('payment.barber')}: {appointment.barber?.user_name || appointment.barber.name}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {appointment?.service?.map((s: any) => (
          <Box key={s._id} sx={{ mb: 1 }}>
            <Typography>{s.service_name}</Typography>
            <Typography fontSize="0.875rem" color="text.secondary">
              {s.service_price.toLocaleString('vi-VN')}đ
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight="bold">
          {t('payment.total')}: {totalPrice.toLocaleString('vi-VN')} {t('vnd')}
        </Typography>
        <Typography mt={2} fontWeight="bold">
          {t('payment.discountCodes')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(800px, 1fr))',
          }}
        >
          {appointment?.customer &&
            discount
              ?.filter(
                (d: any) =>
                  d.assigned_user === null || d.assigned_user === appointment?.customer?._id
              )
              ?.map((d: any) => (
                <Card
                  key={d._id}
                  sx={{
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr) auto',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Typography fontWeight="bold">{d.code}</Typography>
                  <Typography color="primary">
                    {d.percentage ? `${d.percentage}%` : `${d.amount.toLocaleString('vi-VN')}đ`}
                  </Typography>
                  <Typography fontSize="0.875rem">
                    {new Date(d.start_date).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography fontSize="0.875rem">
                    {new Date(d.end_date).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography fontSize="0.875rem">
                    {d.assigned_user}
                    {d.assigned_user
                      ? t(`payment.usageLimit`, { count: d.usage_limit - d.used_count })
                      : t('payment.applyToAll')}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const newPrice = appointment.service.reduce(
                        (acc: number, s: any) => acc + s.service_price,
                        0
                      );
                      const discountAmount = d.percentage
                        ? Math.floor((newPrice * d.percentage) / 100)
                        : d.amount;

                      setDiscountPrice(discountAmount);
                      setFinalPrice(newPrice - discountAmount);
                      setSelectedDiscount(d);
                    }}
                  >
                    {selectedDiscount?._id === d._id ? t('payment.selected') : t('payment.select')}
                  </Button>
                </Card>
              ))}
          {!appointment?.customer && (
            <Typography fontSize="0.875rem" color="text.secondary">
              {t('payment.noDiscountForGuest')}
            </Typography>
          )}
        </Box>

        <Typography mt={1}>
          {t('payment.discount')}: {discountPrice.toLocaleString('vi-VN')}đ
        </Typography>
        <Typography fontWeight="bold">
          {t('payment.finalPrice')}: {finalPrice < 0 ? 0 : finalPrice.toLocaleString('vi-VN')}đ
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography fontWeight="medium" sx={{ mb: 1 }}>
            {t('payment.selectPaymentMethod')}:
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant={method === 'cash' ? 'contained' : 'outlined'}
              onClick={() => setMethod('cash')}
            >
              {t('payment.cash')}
            </Button>

            <Button
              variant={method === 'momo' ? 'contained' : 'outlined'}
              onClick={() => setMethod('momo')}
            >
              {t('payment.momo')}
            </Button>
          </Stack>

          {method === 'cash' && (
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={async () => {
                await applyDiscount(
                  accessToken,
                  {
                    code: selectedDiscount?.code,
                    user_id: appointment?.customer?._id,
                  },
                  dispatch
                );
                const newInvoiceId = await handleCreateInvoice();
                const url = `${import.meta.env.VITE_REACT_APP_DASHBOARD_URL}thankyou/${appointment._id}/${finalPrice}/cash/${newInvoiceId}`;
                window.location.href = url;
              }}
            >
              {t('payment.confirmPayment')}
            </Button>
          )}

          {method === 'momo' && payUrl && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography fontWeight="medium" sx={{ mb: 1 }}>
                {t('payment.scanToPay')}:
              </Typography>
              <QRCodeSVG value={payQr} size={200} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {t('payment.orClick')}{' '}
                <a
                  href={payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2' }}
                >
                  {t('payment.thisLink')}
                </a>
              </Typography>
            </Box>
          )}

          {method === 'momo' && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleMomoPayment}
            >
              {t('payment.payWithMomo')}
            </Button>
          )}
        </Box>
      </Card>
    </DashboardContent>
  );
}
