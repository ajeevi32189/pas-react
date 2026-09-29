import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box, Divider, Button, IconButton, Paper, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, InputBase, MenuItem, Pagination, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Breadcrumbs, TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileExcel, FaFileCsv, FaFilePdf } from 'react-icons/fa';

// ─── Inlined constants ─────────────────────────────────────────────────────────
const C = {
  primary:   '#2563eb',
  secondary: '#8b5cf6',
  success:   '#10b981',
  error:     '#ef4444',
  info:      '#06b6d4',
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
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'PAS_Devices_Report.csv'; a.click();
  URL.revokeObjectURL(url);
};

const exportToExcel = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  let tableHtml = `<table><th>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;
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
  a.href = url; a.download = 'PAS_Devices_Report.xls'; a.click();
  URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  const html = `
    <html><head><title>PAS Devices Report</title>
    <style>
      body { font-family: sans-serif; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
      th { background: #c6ccc7; }
    </style>
    </head><body>
      <h2>PAS Devices Report</h2>
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}<td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </body></html>`;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.print();
};

// ─── Export Buttons (without Print) ────────────────────────────────────────────
const ExportButtons = ({ tableData }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button
      size="small" variant="outlined" color="success"
      startIcon={<FaFileExcel size={14} />}
      onClick={() => exportToExcel(tableData)}
      sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px', whiteSpace: 'nowrap' }}
    >
      Excel
    </Button>
    <Button
      size="small" variant="outlined" color="info"
      startIcon={<FaFileCsv size={14} />}
      onClick={() => exportToCSV(tableData)}
      sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px', whiteSpace: 'nowrap' }}
    >
      CSV
    </Button>
    <Button
      size="small" variant="outlined" color="error"
      startIcon={<FaFilePdf size={14} />}
      onClick={() => exportToPDF(tableData)}
      sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px', whiteSpace: 'nowrap' }}
    >
      PDF
    </Button>
  </Box>
);

// ─── Main Component with Sorting and Date Filtering ──────────────────────────────
const DeviceReport = () => {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Date range state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Sorting state
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Load data from localStorage or API
  React.useEffect(() => {
    // Try to load PAS device data from localStorage
    const storedDevices = localStorage.getItem('pas_devices');
    if (storedDevices) {
      setData(JSON.parse(storedDevices));
    } else {
      // Sample data for demo
      const sampleData = [
        {
          id: 1,
          deviceCode: 'PAS001',
          name: 'Main Gate Speaker',
          ipAddress: '192.168.1.101',
          macAddress: '00:1A:2B:3C:4D:5E',
          imei: '123456789012345',
          address: '123 Main Street',
          street: 'Main Street',
          landmark: 'Near Main Gate',
          city: 'New York',
          state: 'NY',
          pinCode: '10001',
          addressType: 'PUBLIC',
          latitude: '40.7128',
          longitude: '-74.0060',
          deviceStatus: 'ONLINE',
          regDate: '2025-03-15T10:30:00',
        },
        {
          id: 2,
          deviceCode: 'PAS002',
          name: 'Building A Speaker',
          ipAddress: '192.168.1.102',
          macAddress: '00:1A:2B:3C:4D:5F',
          imei: '123456789012346',
          address: '456 Park Avenue',
          street: 'Park Avenue',
          landmark: 'Near Building A',
          city: 'Los Angeles',
          state: 'CA',
          pinCode: '90001',
          addressType: 'COMMERCIAL',
          latitude: '34.0522',
          longitude: '-118.2437',
          deviceStatus: 'ONLINE',
          regDate: '2025-03-20T14:15:00',
        },
        {
          id: 3,
          deviceCode: 'PAS003',
          name: 'Parking Area Speaker',
          ipAddress: '192.168.1.103',
          macAddress: '00:1A:2B:3C:4D:60',
          imei: '123456789012347',
          address: '789 Oak Street',
          street: 'Oak Street',
          landmark: 'Parking Lot',
          city: 'Chicago',
          state: 'IL',
          pinCode: '60601',
          addressType: 'PUBLIC',
          latitude: '41.8781',
          longitude: '-87.6298',
          deviceStatus: 'OFFLINE',
          regDate: '2025-02-10T09:00:00',
        },
        {
          id: 4,
          deviceCode: 'PAS004',
          name: 'Cafeteria Speaker',
          ipAddress: '192.168.1.104',
          macAddress: '00:1A:2B:3C:4D:61',
          imei: '123456789012348',
          address: '321 Pine Street',
          street: 'Pine Street',
          landmark: 'Near Cafeteria',
          city: 'Houston',
          state: 'TX',
          pinCode: '77001',
          addressType: 'COMMERCIAL',
          latitude: '29.7604',
          longitude: '-95.3698',
          deviceStatus: 'ONLINE',
          regDate: '2025-03-25T11:45:00',
        },
        {
          id: 5,
          deviceCode: 'PAS005',
          name: 'Emergency Broadcast Speaker',
          ipAddress: '192.168.1.105',
          macAddress: '00:1A:2B:3C:4D:62',
          imei: '123456789012349',
          address: '555 Cedar Road',
          street: 'Cedar Road',
          landmark: 'Emergency Center',
          city: 'Phoenix',
          state: 'AZ',
          pinCode: '85001',
          addressType: 'PUBLIC',
          latitude: '33.4484',
          longitude: '-112.0740',
          deviceStatus: 'ONLINE',
          regDate: '2025-03-28T08:30:00',
        },
      ];
      setData(sampleData);
      localStorage.setItem('pas_devices', JSON.stringify(sampleData));
    }
  }, []);

  // Filter data based on search query and date range
  const filteredRows = data.filter((row) => {
    // Search filter
    const matchesSearch = [row.deviceCode, row.name, row.ipAddress, row.city, row.state, row.macAddress, row.imei].some((field) =>
      (field || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Date range filter
    let matchesDateRange = true;
    if (fromDate || toDate) {
      const rowDate = new Date(row.regDate);
      if (fromDate) {
        const fromDateTime = new Date(fromDate);
        fromDateTime.setHours(0, 0, 0, 0);
        if (rowDate < fromDateTime) matchesDateRange = false;
      }
      if (toDate && matchesDateRange) {
        const toDateTime = new Date(toDate);
        toDateTime.setHours(23, 59, 59, 999);
        if (rowDate > toDateTime) matchesDateRange = false;
      }
    }
    
    return matchesSearch && matchesDateRange;
  });

  // Sorting function
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Get value for sorting based on column
  const getSortValue = (row, column) => {
    switch (column) {
      case 'sno':
        return row.id;
      case 'deviceCode':
        return row.deviceCode || '';
      case 'name':
        return row.name || '';
      case 'ipAddress':
        return row.ipAddress || '';
      case 'macAddress':
        return row.macAddress || '';
      case 'imei':
        return row.imei || '';
      case 'location':
        return `${row.city || ''} ${row.state || ''}`.trim() || '';
      case 'status':
        return row.deviceStatus || '';
      case 'registerDate':
        return new Date(row.regDate).getTime();
      default:
        return '';
    }
  };

  // Apply sorting to filtered rows
  const sortedRows = [...filteredRows];
  if (sortColumn) {
    sortedRows.sort((a, b) => {
      let valueA = getSortValue(a, sortColumn);
      let valueB = getSortValue(b, sortColumn);
      
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

  const handleDelete = () => {
    const updatedData = data.filter((item) => item.id !== deleteId);
    setData(updatedData);
    localStorage.setItem('pas_devices', JSON.stringify(updatedData));
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  // Render sort icon
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' 
      ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
      : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
  };

  // Sortable Header Component
  const SortableHeader = ({ column, children }) => (
    <TableCell 
      sx={{ 
        fontWeight: 700, 
        fontSize: '13px', 
        color: '#374151', 
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: '#e5e9ed',
        },
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

  // Clear date filters
  const handleClearDates = () => {
    setFromDate('');
    setToDate('');
    setCurrentPage(1);
  };

  return (
    <div style={styles.root}>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Are you sure you want to delete this PAS device?
        </DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Breadcrumb */}
      <Breadcrumb>
        <Typography
          component={Link}
          to="/classic-dashboard"
          variant="subtitle2"
          color="inherit"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          PAS Device Report
        </Typography>
      </Breadcrumb>

      {/* Main content card */}
      <div style={styles.mainCard}>
        <p style={styles.cardTitle}>PAS Device Report</p>
        <p style={styles.cardSubtitle}>
          View and analyze all Public Addressing System devices
        </p>

        <Divider sx={{ mb: 2.5 }} />

        {/* Single Row Toolbar - All controls in one row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2.5,
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Left side - Entries selector and Export buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>Show</Typography>
              <Select
                size="small"
                value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                sx={{ minWidth: 70 }}
              >
                {[10, 25, 50, 100].map((val) => (
                  <MenuItem key={val} value={val}>{val}</MenuItem>
                ))}
              </Select>
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>entries</Typography>
            </Box>
            <ExportButtons tableData={sortedRows} />
          </Box>

          {/* Right side - Date filters and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="From Date"
              type="datetime-local"
              size="small"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setCurrentPage(1); }}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 180 }}
            />
            <TextField
              label="To Date"
              type="datetime-local"
              size="small"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setCurrentPage(1); }}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 180 }}
            />
            {(fromDate || toDate) && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearDates}
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                Clear
              </Button>
            )}
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 240,
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                bgcolor: '#f3f4f6',
                boxShadow: 'none',
                border: '1px solid #e5e7eb',
              }}
            >
              <InputBase
                sx={{ flex: 1, fontSize: '14px' }}
                placeholder="Search records…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </Paper>
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              border: '1px solid #e5e7eb',
            }}
          >
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
                  <SortableHeader column="sno">S.No</SortableHeader>
                  <SortableHeader column="deviceCode">Device Code</SortableHeader>
                  <SortableHeader column="name">Name</SortableHeader>
                  <SortableHeader column="ipAddress">IP Address</SortableHeader>
                  {/* <SortableHeader column="macAddress">MAC Address</SortableHeader> */}
                  <SortableHeader column="imei">IMEI</SortableHeader>
                  <SortableHeader column="location">Location</SortableHeader>
                  <SortableHeader column="status">Status</SortableHeader>
                  <SortableHeader column="registerDate">Register Date</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
                        {index + 1 + (currentPage - 1) * entries}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.deviceCode}</TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{row.name}</TableCell>
                      <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.ipAddress}</TableCell>
                      {/* <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.macAddress || '—'}</TableCell> */}
                      <TableCell sx={{ fontSize: '13px' }}>{row.imei || '—'}</TableCell>
                      <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
                        {[row.city, row.state].filter(Boolean).join(', ') || '—'}
                      </TableCell>
                      <TableCell> 
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 700,
                            background: row.deviceStatus === 'ONLINE' ? '#10b98120' : '#ef444420',
                            color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
                            border: `1px solid ${row.deviceStatus === 'ONLINE' ? '#10b98140' : '#ef444440'}`,
                          }}
                        >
                          ● {row.deviceStatus}
                        </span>
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
                        {new Date(row.regDate).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            title="View on Map"
                            sx={{ color: C.info }}
                            onClick={() => {
                              if (row.latitude && row.longitude) {
                                window.open(`https://www.google.com/maps?q=${row.latitude},${row.longitude}`, '_blank');
                              } else {
                                alert('No coordinates available for this device.');
                              }
                            }}
                          >
                            📍
                          </IconButton>
                          <IconButton
                            size="small"
                            title="Delete"
                            sx={{ color: C.error }}
                            onClick={() => {
                              setDeleteId(row.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2.5,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
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
              variant="outlined"
              shape="rounded"
              size="small"
            />
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default DeviceReport;