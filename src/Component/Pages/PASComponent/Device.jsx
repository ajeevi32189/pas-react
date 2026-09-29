import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box, Divider, Button, Grid, IconButton, Paper, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, InputBase, MenuItem, Pagination, Stack,
  Breadcrumbs, CircularProgress, Snackbar, Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileExcel, FaFileCsv } from 'react-icons/fa';
import { API_URL } from '../../../config';
import DeviceFormModal from './DeviceForm';
import Cookies from "js-cookie";


// ─── Token Helper ──────────────────────────────────────────────────────────────
const getToken = () => {
  return (
        Cookies.get('token')
  );
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  accept: '*/*',
  Authorization: `Bearer ${getToken()}`,
});

// ─── Constants ─────────────────────────────────────────────────────────────────
const C = {
  primary: '#2563eb',
  secondary: '#8b5cf6',
  success: '#10b981',
  error: '#ef4444',
  info: '#06b6d4',
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    padding: '24px',
    backgroundColor: '#EEF2F6',
    fontFamily: "'Segoe UI', sans-serif",
  },
  breadcrumbCard: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    borderRadius: '16px',
    padding: '14px 24px',
    marginBottom: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    borderTop: `4px solid ${C.primary}`,
  },
  mainCard: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    borderTop: `4px solid ${C.secondary}`,
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 4px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 20px',
  },
};

// ─── Breadcrumb ────────────────────────────────────────────────────────────────
const Breadcrumb = ({ children }) => (
  <div style={styles.breadcrumbCard}>
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {children}
    </Breadcrumbs>
  </div>
);

// ─── Export Utilities ──────────────────────────────────────────────────────────
const exportToCSV = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'Address', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.address || '', r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'PAS_Devices.csv'; a.click();
  URL.revokeObjectURL(url);
};

const exportToExcel = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'Address', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.address || '', r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  let tableHtml = `<table><tr>${headers.map((h) => `<th>${h}</th>`).join('')}<tr>`;
  rows.forEach((row) => {
    tableHtml += `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`;
  });
  tableHtml += '</table>';
  const blob = new Blob(
    [`<html xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='utf-8'/></head><body>${tableHtml}</body></html>`],
    { type: 'application/vnd.ms-excel' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'PAS_Devices.xls'; a.click();
  URL.revokeObjectURL(url);
};

// ─── Export Buttons ────────────────────────────────────────────────────────────
const ExportButtons = ({ tableData }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button size="small" variant="outlined" color="success" startIcon={<FaFileExcel size={14} />}
      onClick={() => exportToExcel(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
      Excel
    </Button>
    <Button size="small" variant="outlined" color="info" startIcon={<FaFileCsv size={14} />}
      onClick={() => exportToCSV(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
      CSV
    </Button>
  </Box>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Device = () => {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const [tableLoading, setTableLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const showSnack = (message, severity = 'success') =>
    setSnack({ open: true, message, severity });

  const fetchUsers = async () => {
  setTableLoading(true);

  try {
    const res = await fetch(
      "https://pasapi.puducherrysmartcity.in/api/device-permission",
      {
        method: "GET",
        headers: authHeaders(),
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    setData(Array.isArray(json) ? json : []);
  } catch (err) {
    showSnack(`Failed to load Device Permissions : ${err.message}`, "error");
  } finally {
    setTableLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (devicePermissionId) => {
  if (!window.confirm("Delete this Device Permission?")) return;

  try {
    const res = await fetch(
      `https://pasapi.puducherrysmartcity.in/api/device-permission/remove?devicePermissionId=${devicePermissionId}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    showSnack("Device Permission deleted successfully");

    fetchUsers();
  } catch (err) {
    showSnack(err.message, "error");
  }
};

const filteredRows = data.filter((row) =>
  [
    String(row.id),
    String(row.userId),
    String(row.deviceId),
    row.deviceName || "",
  ].some((field) =>
    field.toLowerCase().includes(searchQuery.toLowerCase())
  )
);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };
const getSortValue = (row, column) => {
  switch (column) {
    case "sno":
      return row.id;

    case "id":
      return row.id;

    case "userId":
      return row.userId;

    case "deviceId":
      return row.deviceId;

    case "deviceName":
      return row.deviceName || "";

    case "canView":
      return row.canView;

    case "canEdit":
      return row.canEdit;

    case "canDelete":
      return row.canDelete;

    default:
      return "";
  }
};

  const sortedRows = [...filteredRows];
  if (sortColumn) {
    sortedRows.sort((a, b) => {
      let va = getSortValue(a, sortColumn);
      let vb = getSortValue(b, sortColumn);
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return sortDirection === 'asc' ? -1 : 1;
      if (va > vb) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc'
      ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
      : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
  };

  const SortableHeader = ({ column, children }) => (
    <TableCell
      sx={{
        fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap',
        cursor: 'pointer', userSelect: 'none',
        '&:hover': { backgroundColor: '#e5e9ed' },
      }}
      onClick={() => handleSort(column)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {children}
        <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>
          {renderSortIcon(column)}
        </Box>
      </Box>
    </TableCell>
  );

  return (
    <div style={styles.root}>
      <Snackbar
        open={snack.open} autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>

      <DeviceFormModal
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditData(null);
        }}
        editData={editData}
        loading={formLoading}
        onSuccess={fetchUsers}
      />

      <Breadcrumb>
        <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">User Management</Typography>
      </Breadcrumb>

      <div style={styles.mainCard}>
        <p style={styles.cardTitle}>PAS User Management</p>
        {/* <p style={styles.cardSubtitle}>Manage and monitor all Public Addressing System devices</p> */}
        <Divider sx={{ mb: 2.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Show</Typography>
              <Select size="small" value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                sx={{ minWidth: 70 }}>
                {[10, 25, 50, 100].map((val) => (
                  <MenuItem key={val} value={val}>{val}</MenuItem>
                ))}
              </Select>
              <Typography variant="body2">entries</Typography>
            </Box>
            <ExportButtons tableData={sortedRows} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setEditData(null);
                setIsDialogOpen(true);
              }}
              startIcon={<AddIcon />}
            >
              Add User
            </Button>
            <Paper sx={{ display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb' }}>
              <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
            </Paper>
          </Box>
        </Box>

        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
            <Table sx={{ minWidth: 1100 }}>
             <TableHead>
  <TableRow sx={{ backgroundColor: "#EEF2F6" }}>
    <SortableHeader column="sno">S.No</SortableHeader>

    <SortableHeader column="id">
      Permission ID
    </SortableHeader>

    <SortableHeader column="userId">
      User ID
    </SortableHeader>

    <SortableHeader column="deviceId">
      Device ID
    </SortableHeader>

    <SortableHeader column="deviceName">
      Device Name
    </SortableHeader>

    <SortableHeader column="canView">
      View
    </SortableHeader>

    <SortableHeader column="canEdit">
      Edit
    </SortableHeader>

    <SortableHeader column="canDelete">
      Delete
    </SortableHeader>

    <TableCell>Action</TableCell>
  </TableRow>
</TableHead>
              <TableBody>
                {tableLoading ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={32} />
                    </TableCell>
                  </TableRow>
                ) : paginatedRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center" sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRows.map((row, index) => (
                   <TableRow key={row.id} hover>

  <TableCell>
    {index + 1 + (currentPage - 1) * entries}
  </TableCell>

  <TableCell>{row.id}</TableCell>

  <TableCell>{row.userId}</TableCell>

  <TableCell>{row.deviceId}</TableCell>

  <TableCell>{row.deviceName || "-"}</TableCell>

  <TableCell>
    <span style={{ color: row.canView ? "green" : "red", fontWeight: 600 }}>
      {row.canView ? "Yes" : "No"}
    </span>
  </TableCell>

  <TableCell>
    <span style={{ color: row.canEdit ? "green" : "red", fontWeight: 600 }}>
      {row.canEdit ? "Yes" : "No"}
    </span>
  </TableCell>

  <TableCell>
    <span style={{ color: row.canDelete ? "green" : "red", fontWeight: 600 }}>
      {row.canDelete ? "Yes" : "No"}
    </span>
  </TableCell>

  <TableCell>

    {/* <IconButton
      onClick={() => {
        setEditData(row);
        setIsDialogOpen(true);
      }}
    >
      <EditIcon />
    </IconButton> */}

    <IconButton
      onClick={() => handleDelete(row.id)}
    >
      <DeleteIcon />
    </IconButton>

  </TableCell>

</TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Showing{' '}
            {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{' '}
            {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
          </Typography>
          <Stack spacing={2} direction="row">
            <Pagination
              count={Math.ceil(sortedRows.length / entries) || 1}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined" shape="rounded" size="small"
            />
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default Device;