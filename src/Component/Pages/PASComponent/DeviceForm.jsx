import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Divider, Button, Grid, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, InputLabel, Select as MuiSelect, MenuItem,
    Switch, FormControlLabel, Typography, CircularProgress,
} from '@mui/material';
import Cookies from "js-cookie";


// ─── Empty User Form State ─────────────────────────────────────────────────────
export const emptyPermissionForm = {
    userId: "",
    deviceId: "",
    canView: true,
    canEdit: true,
    canDelete: true,
};

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
// ─── UserForm (User Add/Edit Modal) ───────────────────────────────────────────
const DeviceForm = ({ open, onClose, onSuccess, loading }) => {
    const [form, setForm] = useState(emptyPermissionForm);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);

    const [devices, setDevices] = useState([]);
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

    const getUsers = async () => {

        try {

            const res = await fetch(
                "https://pasapi.puducherrysmartcity.in/api/User/users",
                {
                    headers: authHeaders()
                }
            );
            if (!res.ok) throw new Error("Failed to fetch");
            const json = await res.json();

            setUsers(json);

        } catch (err) {

            console.log(err);

        }

    };
    const getDevices = async () => {

        try {

            const res = await fetch(
                "https://pasapi.puducherrysmartcity.in/api/Device/GetAllDevice",
                {
                    headers: authHeaders()
                }
            );

            if (!res.ok) throw new Error("Failed to fetch devices");

            const json = await res.json();

            setDevices(json);

        } catch (err) {

            console.log(err);

        }

    };
    useEffect(() => {
        if (open) {
            getUsers();
            getDevices();
        }
        setForm(emptyPermissionForm);
        setErrors({});
    }, [open]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!form.userId)
            newErrors.userId = "User is required";

        if (!form.deviceId)
            newErrors.deviceId = "Device is required";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        addPermission();
    };

    const addPermission = async () => {

        const payload = {
            userId: Number(form.userId),
            deviceId: Number(form.deviceId),
            canView: form.canView,
            canEdit: form.canEdit,
            canDelete: form.canDelete
        };

        try {

            const res = await fetch(
                "https://pasapi.puducherrysmartcity.in/api/device-permission/add",
                {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            onSuccess();
            alert("Device Permission Added Successfully");
            setForm(emptyPermissionForm);
            onClose();

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {'Add Device Permission'}
                <IconButton
                    onClick={() => {
                        setForm(emptyPermissionForm);
                        onClose();
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ pt: 2 }}>
                <Grid container spacing={2} direction="column">

                    <Grid item xs={12}>
                        <FormControl fullWidth size="small" error={!!errors.userId}>
                            <InputLabel>User</InputLabel>

                            <MuiSelect
                                name="userId"
                                value={form.userId}
                                label="User"
                                onChange={handleChange}
                            >
                                {users.map((u) => (
                                    <MenuItem key={u.id} value={u.id}>
                                        {u.name}
                                    </MenuItem>
                                ))}
                            </MuiSelect>
                        </FormControl>

                        {errors.userId && (
                            <Typography color="error" variant="caption">
                                {errors.userId}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth size="small" error={!!errors.deviceId}>
                            <InputLabel>Device</InputLabel>

                            <MuiSelect
                                name="deviceId"
                                value={form.deviceId}
                                label="Device"
                                onChange={handleChange}
                            >
                                {devices.map((d) => (
                                    <MenuItem key={d.id} value={d.id}>
                                        {d.name}
                                    </MenuItem>
                                ))}
                            </MuiSelect>
                        </FormControl>

                        {errors.deviceId && (
                            <Typography color="error" variant="caption">
                                {errors.deviceId}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.canView}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            canView: e.target.checked
                                        })
                                    }
                                />
                            }
                            label="Can View"
                        />
                        </Grid>
                    <Grid item xs={12}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.canEdit}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            canEdit: e.target.checked
                                        })
                                    }
                                />
                            }
                            label="Can Edit"
                        />
                        </Grid>
                    <Grid item xs={12}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.canDelete}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            canDelete: e.target.checked
                                        })
                                    }
                                />
                            }
                            label="Can Delete"
                        />
                        </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button
                    onClick={() => {
                        setForm(emptyPermissionForm);
                        onClose();
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="info"
                    disabled={loading}
                    sx={{ textTransform: 'none', fontWeight: 600, minWidth: 130 }}>
                    {loading
                        ? <CircularProgress size={18} color="inherit" />
                        : "Save Permission"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeviceForm;