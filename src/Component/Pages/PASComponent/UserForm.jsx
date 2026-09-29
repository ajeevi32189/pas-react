import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box, Divider, Button, Grid, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select as MuiSelect, MenuItem,
  Switch, FormControlLabel, Typography, CircularProgress,
} from '@mui/material';
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "12345678901234567890123456789012";
const encryptPassword = (password) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  // 🔥 random IV generate (same as backend)
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(password),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // 🔥 IV + ciphertext combine (IMPORTANT)
  const combined = iv.concat(encrypted.ciphertext);

  // 🔥 Base64 return (same as backend expects)
  return CryptoJS.enc.Base64.stringify(combined);
};



// ─── Empty User Form State ─────────────────────────────────────────────────────
export const emptyUserForm = {
  name: '',
  email: '',
  mobile: '',
  userName: '',
  password: '',
  role: 'USER',
  status: true,
};

// ─── UserForm (User Add/Edit Modal) ───────────────────────────────────────────
const UserForm = ({ open, onClose, onSuccess, editData, loading }) => {
  const [form, setForm] = useState(emptyUserForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const getToken = () => {

    return (
            Cookies.get('token')
    );

  };

  const authHeaders = () => ({

    "Content-Type": "application/json",

    accept: "*/*",

    Authorization: `Bearer ${getToken()}`,

  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...emptyUserForm,
        ...editData,
        password: '', // don't prefill password on edit
      });
    } else {
      setForm({ ...emptyUserForm });
    }
    setErrors({});
    setShowPassword(false);
  }, [editData, open]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return 'Name is required';
        break;
      case 'email':
        if (!value || !value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        break;
      case 'mobile':
        if (value && !/^[+\d\s-]{7,15}$/.test(value)) return 'Enter a valid mobile number';
        break;
      case 'userName':
        if (!value || !value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        break;
      case 'password':
        if (!editData && (!value || !value.trim())) return 'Password is required for new user';
        if (value && value.length < 6) return 'Password must be at least 6 characters';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleStatusToggle = (e) => {
    setForm((prev) => ({ ...prev, status: e.target.checked }));
  };

    const encryptedPassword = encryptPassword(form.password);
  const handleSubmit = () => {
    const newErrors = {};

    if (!form.name?.trim()) newErrors.name = "Name is required";

    if (!form.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.userName?.trim())
      newErrors.userName = "Username is required";

    if (!editData && !form.password?.trim())
      newErrors.password = "Password is required";

    if (form.password && form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = {

      id: editData?.id || 0,

      name: form.name,

      email: form.email,

      mobile: form.mobile,

      userName: form.userName,

      password: encryptedPassword,

      role: form.role,

      status: form.status,

      lastPassword: null,

      failedAttempts: 0,

      lockoutEnd: null,

      salt: null,

      regDate:
        editData?.regDate ||
        new Date().toISOString(),

    };

    if (editData) {
      updateUser(payload);
    } else {
      addUser(payload);
    }
  };

  const addUser = async (payload) => {

    try {

      const res = await fetch(
        "https://pasapi.puducherrysmartcity.in/api/User/user",
        {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok)
        throw new Error();

      onSuccess();

      onClose();

    } catch (err) {

      console.log(err);

    }

  };

  const updateUser = async (payload) => {

    try {

      const res = await fetch(
        "https://pasapi.puducherrysmartcity.in/api/User/user",
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok)
        throw new Error();

      onSuccess();

      onClose();

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editData ? 'Edit User' : 'Add User'}
        <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} direction="column">

          <Grid item xs={12}>
            <TextField
              fullWidth label="Full Name" name="name"
              value={form.name || ''} onChange={handleChange}
              size="small" required error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g. John Doe"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Email" name="email"
              value={form.email || ''} onChange={handleChange}
              size="small" required error={!!errors.email}
              helperText={errors.email}
              placeholder="e.g. user@example.com"
              type="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Mobile" name="mobile"
              value={form.mobile || ''} onChange={handleChange}
              size="small" error={!!errors.mobile}
              helperText={errors.mobile || "e.g. +91-9818476105"}
              placeholder="+91-XXXXXXXXXX"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Username" name="userName"
              value={form.userName || ''} onChange={handleChange}
              size="small" required error={!!errors.userName}
              helperText={errors.userName}
              placeholder="e.g. admin"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label={editData ? 'New Password (leave blank to keep current)' : 'Password'}
              name="password"
              value={form.password || ''} onChange={handleChange}
              size="small"
              required={!editData}
              error={!!errors.password}
              helperText={errors.password || (editData ? 'Leave blank to keep existing password' : 'Min 6 characters')}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ minWidth: 0, px: 1, color: '#6b7280', fontSize: '11px', textTransform: 'none' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <MuiSelect name="role" value={form.role || 'USER'} label="Role" onChange={handleChange}>
                {['MASTER', 'ADMIN', 'USER'].map((v) => (
                  <MenuItem key={v} value={v}>{v}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.status === true || form.status === 'true'}
                  onChange={handleStatusToggle}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">Status:</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: (form.status === true || form.status === 'true') ? '#10b981' : '#ef4444'
                    }}
                  >
                    {(form.status === true || form.status === 'true') ? 'ACTIVE' : 'INACTIVE'}
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, mt: 1 }}
            />
          </Grid>

        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="info"
          disabled={loading}
          sx={{ textTransform: 'none', fontWeight: 600, minWidth: 130 }}>
          {loading
            ? <CircularProgress size={18} color="inherit" />
            : editData ? 'Update User' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;