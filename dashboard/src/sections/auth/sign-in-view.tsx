/* eslint-disable perfectionist/sort-imports */
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { signin } from 'src/redux/apiRequest';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // --- Load cookie nếu có ---
  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // --- Hàm xử lý đăng nhập ---
  const handleSignIn = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error(t('auth.pleaseFillInAllInformation'));
        return;
      }

      try {
        setLoading(true);
        const user = { email, password };

        // Lưu cookie nếu tick “Remember me”
        if (rememberMe) {
          Cookies.set('email', email, { expires: 7 });
          Cookies.set('password', password, { expires: 7 });
        } else {
          Cookies.remove('email');
          Cookies.remove('password');
        }

        const result = await signin(user, dispatch, navigate);
      } catch (err) {
        console.error(err);
        toast.error(t('auth.signInError'));
      } finally {
        setLoading(false);
      }
    },
    [email, password, rememberMe, dispatch, navigate]
  );

  // --- Giao diện Form ---
  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label={t('auth.emailAddress')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link
        href={`${import.meta.env.VITE_USER_BASE_URL}restore-password`}
        variant="body2"
        color="inherit"
        sx={{ mb: 1.5, alignSelf: 'flex-end' }}
      >
        {t('auth.forgotPassword')}
      </Link>

      <TextField
        fullWidth
        name="password"
        label={t('auth.password')}
        value={password}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            color="default"
          />
        }
        label={t('auth.rememberMe')}
        sx={{ mb: 2, alignSelf: 'flex-start' }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={loading}
      >
        {loading ? t('auth.signingIn') : t('auth.signIn')}
      </Button>
    </Box>
  );

  // --- Return ---
  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">{t('auth.signIn')}</Typography>
      </Box>

      {renderForm}
    </>
  );
}
