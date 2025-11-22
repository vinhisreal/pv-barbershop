/* eslint-disable perfectionist/sort-imports */
import Cookie from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DashboardContent } from 'src/layouts/dashboard';
import {
  findUser,
  getAllAppointmentsOfBarber,
  getHighlightImages,
  addHighlightImage,
  removeHighlightImage,
} from 'src/redux/apiRequest';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
  Stack,
} from '@mui/material';

export function ProfileView() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentUser = useSelector((state: any) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = Cookie.get('_id');

  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImages, setActiveImages] = useState<string[]>([]);

  const handleGetUserProfile = async () => {
    try {
      const res = await findUser(userID, dispatch);
      if (res?.metadata?.user) setUser(res.metadata.user);
    } catch (err) {
      console.error('Failed to load user', err);
    }
  };

  const handleGetMyAppointments = async () => {
    try {
      const res = await getAllAppointmentsOfBarber(userID, dispatch);
      if (Array.isArray(res?.metadata)) setAppointments(res.metadata);
    } catch (err) {
      console.error('Failed to load appointments', err);
    }
  };

  const handleGetHighlightImages = async () => {
    try {
      const res = await getHighlightImages(userID, dispatch);
      if (Array.isArray(res?.metadata)) {
        setActiveImages(res.metadata);
      }
    } catch (err) {
      console.error('Failed to load highlights', err);
    }
  };

  const handleToggleActive = async (id: string, img: string) => {
    try {
      const isActive = activeImages.includes(img);
      if (isActive) {
        await removeHighlightImage(accessToken, userID, img, dispatch, axios);
        setActiveImages((prev) => prev.filter((image) => image !== img));
      } else {
        await addHighlightImage(accessToken, userID, img, dispatch, axios);
        setActiveImages((prev) => [...prev, img]);
      }
    } catch (err) {
      console.error('Failed to toggle highlight', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        handleGetUserProfile(),
        handleGetMyAppointments(),
        handleGetHighlightImages(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  const highlightImages = appointments
    .filter((app) => app.complete_picture)
    .map((app) => ({
      id: app._id,
      img: app.complete_picture,
    }));

  return (
    <DashboardContent>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('profile.profileTitle') || 'Barber Profile'}
      </Typography>

      {/* Barber Info */}
      {user && (
        <Card
          sx={{
            p: 3,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 100, height: 100, border: '2px solid #ccc' }}
          />
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Typography color="text.secondary">
              {t('profile.gender') || 'Gender'}: {t(`profile.${user.gender}`)}
            </Typography>
            <Typography color="text.secondary">
              {t('profile.joined') || 'Joined'}: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Card>
      )}

      {/* Highlighted Works */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('profile.highlightWorks') || 'Highlighted Works'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {highlightImages.length === 0 ? (
          <Typography color="text.secondary">
            {t('profile.noHighlights') || 'No completed works yet.'}
          </Typography>
        ) : (
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            spacing={2}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            alignItems="stretch"
          >
            {highlightImages.map((item) => {
              const isActive = activeImages.includes(item.img);
              return (
                <Card
                  key={item.id}
                  sx={{
                    width: { xs: 180, sm: 200, md: 220 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: isActive ? '3px solid #1976d2' : '2px solid transparent',
                    boxShadow: isActive ? 6 : 2,
                    transition: '0.25s',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt="Highlight work"
                    sx={{
                      width: '100%',
                      height: 250,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant={isActive ? 'contained' : 'outlined'}
                      color={isActive ? 'primary' : 'inherit'}
                      onClick={() => handleToggleActive(item.id, item.img)}
                    >
                      {isActive
                        ? t('profile.activated') || 'Activated'
                        : t('profile.activate') || 'Activate'}
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        )}
      </Card>
    </DashboardContent>
  );
}
