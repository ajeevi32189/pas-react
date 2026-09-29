// import React, { useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import {
//   Box, Divider, Button, Grid, IconButton, Paper, Select,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Typography, InputBase, MenuItem, Pagination, Stack,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   FormControl, InputLabel, Select as MuiSelect, Breadcrumbs,
//   Switch, FormControlLabel,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa';

// // ─── Inlined constants ─────────────────────────────────────────────────────────
// const C = {
//   primary:   '#2563eb',
//   secondary: '#8b5cf6',
//   success:   '#10b981',
//   error:     '#ef4444',
//   info:      '#06b6d4',
// };

// // ─── Styles (mirrors ClassicDashboard) ────────────────────────────────────────
// const styles = {
//   root: {
//     width: '100%',
//     minHeight: '100%',
//     boxSizing: 'border-box',
//     padding: '24px',
//     backgroundColor: '#EEF2F6',
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   breadcrumbCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '14px 24px',
//     marginBottom: '20px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     borderTop: `4px solid ${C.primary}`,
//   },
//   mainCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '28px 32px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     borderTop: `4px solid ${C.secondary}`,
//   },
//   cardTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     margin: '0 0 4px',
//   },
//   cardSubtitle: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '0 0 20px',
//   },
//   sortableHeader: {
//     cursor: 'pointer',
//     userSelect: 'none',
//     '&:hover': {
//       backgroundColor: '#e0e4e8',
//     },
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//   },
// };

// // ─── Breadcrumb ────────────────────────────────────────────────────────────────
// const Breadcrumb = ({ children }) => (
//   <div style={styles.breadcrumbCard}>
//     <Breadcrumbs aria-label="breadcrumb" separator="›">
//       {children}
//     </Breadcrumbs>
//   </div>
// );

// // ─── Export Utilities ──────────────────────────────────────────────────────────
// const exportToCSV = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csv], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'PAS_Devices.csv'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToExcel = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   let tableHtml = `<tr><th>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;
//   rows.forEach((row) => {
//     tableHtml += `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`;
//   });
//   tableHtml += '</table>';
//   const blob = new Blob(
//     [`<html xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='utf-8'/></head><body>${tableHtml}</body></html>`],
//     { type: 'application/vnd.ms-excel' }
//   );
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'PAS_Devices.xls'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToPDF = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city, r.state, r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   const html = `
//     <html><head><title>PAS Devices</title>
//     <style>
//       body { font-family: sans-serif; font-size: 12px; }
//       table { width: 100%; border-collapse: collapse; }
//       th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
//       th { background: #c6ccc7; }
//     </style>
//     </head><body>
//       <h2>PAS Devices</h2>
//       <table>
//         <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
//         <tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
//       40able
//     </body></html>`;
//   const win = window.open('', '_blank');
//   win.document.write(html);
//   win.document.close();
//   win.print();
// };

// // ─── Export Buttons ────────────────────────────────────────────────────────────
// const ExportButtons = ({ tableData }) => (
//   <Box sx={{ display: 'flex', gap: 1 }}>
//     <Button
//       size="small" variant="outlined" color="success"
//       startIcon={<FaFileExcel size={14} />}
//       onClick={() => exportToExcel(tableData)}
//       sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}
//     >
//       Excel
//     </Button>
//     <Button
//       size="small" variant="outlined" color="info"
//       startIcon={<FaFileCsv size={14} />}
//       onClick={() => exportToCSV(tableData)}
//       sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}
//     >
//       CSV
//     </Button>
//     <Button
//       size="small" variant="outlined" color="error"
//       startIcon={<FaFilePdf size={14} />}
//       onClick={() => exportToPDF(tableData)}
//       sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}
//     >
//       PDF
//     </Button>
//     <Button
//       size="small" variant="outlined"
//       startIcon={<FaPrint size={14} />}
//       onClick={() => window.print()}
//       sx={{
//         textTransform: 'none', fontSize: '13px', borderRadius: '6px',
//         color: '#555', borderColor: '#aaa',
//         '&:hover': { borderColor: '#555' },
//       }}
//     >
//       Print
//     </Button>
//   </Box>
// );

// // ─── Empty Form State ──────────────────────────────────────────────────────────
// const emptyForm = {
//   deviceCode: '',
//   name: '',
//   ipAddress: '',
//   macAddress: '',
//   imei: '',
//   address: '',
//   street: '',
//   landmark: '',
//   city: '',
//   state: '',
//   pinCode: '',
//   addressType: 'RESIDENTIAL',
//   latitude: '',
//   longitude: '',
//   deviceStatus: 'OFFLINE',
//   regDate: new Date().toISOString().slice(0, 16),
// };

// // ─── Add / Edit Device Modal (Single Column + Toggle) ───────────────
// const DeviceFormModal = ({ open, onClose, onSave, editData }) => {
//   const [form, setForm] = useState(editData || emptyForm);

//   React.useEffect(() => {
//     setForm(editData ? { ...editData } : { ...emptyForm, regDate: new Date().toISOString().slice(0, 16) });
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleStatusToggle = (e) => {
//     setForm((prev) => ({ ...prev, deviceStatus: e.target.checked ? 'ONLINE' : 'OFFLINE' }));
//   };

//   const handleSubmit = () => {
//     if (!form.deviceCode.trim() || !form.name.trim() || !form.ipAddress.trim()) {
//       alert('Device Code, Name, and IP Address are required.');
//       return;
//     }
//     onSave(form);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {editData ? 'Edit PAS Device' : 'Add PAS Device'}
//         <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <Divider />
//       <DialogContent sx={{ pt: 2 }}>
//         <Grid container spacing={2} direction="column">
//           <Grid item xs={12}>
//             <TextField fullWidth label="Device Code" name="deviceCode"
//               value={form.deviceCode} onChange={handleChange} size="small" required />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Device Name" name="name"
//               value={form.name} onChange={handleChange} size="small" required />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="IP Address" name="ipAddress"
//               value={form.ipAddress} onChange={handleChange}
//               size="small" required placeholder="e.g. 192.168.1.1" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="MAC Address" name="macAddress"
//               value={form.macAddress} onChange={handleChange}
//               size="small" placeholder="e.g. 00:1A:2B:3C:4D:5E" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="IMEI" name="imei"
//               value={form.imei} onChange={handleChange}
//               size="small" placeholder="15-digit IMEI number" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Address" name="address"
//               value={form.address} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Street" name="street"
//               value={form.street} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Landmark" name="landmark"
//               value={form.landmark} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="City" name="city"
//               value={form.city} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="State" name="state"
//               value={form.state} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Pin Code" name="pinCode"
//               value={form.pinCode} onChange={handleChange} size="small" />
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Address Type</InputLabel>
//               <MuiSelect name="addressType" value={form.addressType}
//                 label="Address Type" onChange={handleChange}>
//                 <MenuItem value="RESIDENTIAL">RESIDENTIAL</MenuItem>
//                 <MenuItem value="COMMERCIAL">COMMERCIAL</MenuItem>
//                 <MenuItem value="INDUSTRIAL">INDUSTRIAL</MenuItem>
//                 <MenuItem value="PUBLIC">PUBLIC</MenuItem>
//                 <MenuItem value="OTHER">OTHER</MenuItem>
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Register Date & Time" name="regDate"
//               value={form.regDate} onChange={handleChange}
//               size="small" type="datetime-local"
//               InputLabelProps={{ shrink: true }} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Latitude" name="latitude"
//               value={form.latitude} onChange={handleChange}
//               size="small" type="number" placeholder="e.g. 11.9139" />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Longitude" name="longitude"
//               value={form.longitude} onChange={handleChange}
//               size="small" type="number" placeholder="e.g. 79.8145" />
//           </Grid>

//           {/* <Grid item xs={12}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={form.deviceStatus === 'ONLINE'}
//                   onChange={handleStatusToggle}
//                   color="success"
//                 />
//               }
//               label={
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   Device Status: <span style={{ color: form.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontWeight: 700 }}>{form.deviceStatus}</span>
//                 </Typography>
//               }
//               labelPlacement="start"
//               sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
//             />
//           </Grid> */}
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button onClick={onClose} variant="outlined" color="inherit"
//           sx={{ textTransform: 'none' }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="info"
//           sx={{ textTransform: 'none', fontWeight: 600 }}>
//           {editData ? 'Update Device' : 'Add Device'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // ─── Main Component with Sorting ──────────────────────────────────────────────
// const AddPASDevice = () => {
//   const [data, setData] = useState([]);
//   const [entries, setEntries] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editData, setEditData] = useState(null);

//   // Sorting state
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

//   // Filter data based on search query
//   const filteredRows = data.filter((row) =>
//     [row.deviceCode, row.name, row.ipAddress, row.city, row.state, row.macAddress, row.imei].some((field) =>
//       (field || '').toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   // Sorting function
//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       // Toggle direction if same column
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       // New column, default to ascending
//       setSortColumn(column);
//       setSortDirection('asc');
//     }
//     setCurrentPage(1); // Reset to first page when sorting
//   };

//   // Get value for sorting based on column
//   const getSortValue = (row, column) => {
//     switch (column) {
//       case 'sno':
//         return row.id; // Use id for sorting
//       case 'deviceCode':
//         return row.deviceCode || '';
//       case 'name':
//         return row.name || '';
//       case 'ipAddress':
//         return row.ipAddress || '';
//       case 'macAddress':
//         return row.macAddress || '';
//       case 'imei':
//         return row.imei || '';
//       case 'location':
//         return `${row.city || ''} ${row.state || ''}`.trim() || '';
//       case 'status':
//         return row.deviceStatus || '';
//       case 'registerDate':
//         return new Date(row.regDate).getTime();
//       default:
//         return '';
//     }
//   };

//   // Apply sorting to filtered rows
//   const sortedRows = [...filteredRows];
//   if (sortColumn) {
//     sortedRows.sort((a, b) => {
//       let valueA = getSortValue(a, sortColumn);
//       let valueB = getSortValue(b, sortColumn);

//       // Handle different types
//       if (typeof valueA === 'string') {
//         valueA = valueA.toLowerCase();
//         valueB = valueB.toLowerCase();
//       }

//       if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
//       if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

//   const handleOpenDialog = () => { setEditData(null); setIsDialogOpen(true); };
//   const handleEdit = (row) => { setEditData(row); setIsDialogOpen(true); };
//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this PAS device?')) return;
//     setData((prev) => prev.filter((item) => item.id !== id));
//   };
//   const handleSave = (newOrUpdated) => {
//     setData((prev) => {
//       const exists = prev.find((d) => d.id === newOrUpdated.id);
//       if (exists) return prev.map((d) => (d.id === newOrUpdated.id ? newOrUpdated : d));
//       return [...prev, { ...newOrUpdated, id: Date.now() }];
//     });
//   };

//   // Render sort icon
//   const renderSortIcon = (column) => {
//     if (sortColumn !== column) return null;
//     return sortDirection === 'asc' 
//       ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
//       : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
//   };

//   // Sortable Header Component
//   const SortableHeader = ({ column, children }) => (
//     <TableCell 
//       sx={{ 
//         fontWeight: 700, 
//         fontSize: '13px', 
//         color: '#374151', 
//         whiteSpace: 'nowrap',
//         cursor: 'pointer',
//         userSelect: 'none',
//         '&:hover': {
//           backgroundColor: '#e5e9ed',
//         },
//       }}
//       onClick={() => handleSort(column)}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//         {children}
//         <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>
//           {renderSortIcon(column)}
//         </Box>
//       </Box>
//     </TableCell>
//   );

//   return (
//     <div style={styles.root}>
//       <DeviceFormModal
//         open={isDialogOpen}
//         onClose={() => { setIsDialogOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//       />

//       <Breadcrumb>
//         <Typography
//           component={Link}
//           to="/classic-dashboard"
//           variant="subtitle2"
//           color="inherit"
//           sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
//         >
//           Home
//         </Typography>
//         <Typography variant="subtitle2" color="primary">
//           PAS Devices
//         </Typography>
//       </Breadcrumb>

//       <div style={styles.mainCard}>
//         <p style={styles.cardTitle}>PAS Device Management</p>
//         <p style={styles.cardSubtitle}>
//           Manage and monitor all Public Addressing System devices
//         </p>

//         <Divider sx={{ mb: 2.5 }} />

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2.5,
//             flexWrap: 'wrap',
//             gap: 2,
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2">Show</Typography>
//               <Select
//                 size="small"
//                 value={entries}
//                 onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
//                 sx={{ minWidth: 70 }}
//               >
//                 {[10, 25, 50, 100].map((val) => (
//                   <MenuItem key={val} value={val}>{val}</MenuItem>
//                 ))}
//               </Select>
//               <Typography variant="body2">entries</Typography>
//             </Box>
//             <ExportButtons tableData={sortedRows} />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Button
//               variant="contained"
//               color="info"
//               onClick={handleOpenDialog}
//               startIcon={<AddIcon />}
//               sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}
//             >
//               Add Device
//             </Button>
//             <Paper
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 width: 240,
//                 px: 1.5,
//                 py: 0.5,
//                 borderRadius: '8px',
//                 bgcolor: '#f3f4f6',
//                 boxShadow: 'none',
//                 border: '1px solid #e5e7eb',
//               }}
//             >
//               <InputBase
//                 sx={{ flex: 1, fontSize: '14px' }}
//                 placeholder="Search records…"
//                 value={searchQuery}
//                 onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//               />
//             </Paper>
//           </Box>
//         </Box>

//         <Box sx={{ width: '100%', overflowX: 'auto' }}>
//           <TableContainer
//             component={Paper}
//             sx={{
//               width: '100%',
//               borderRadius: '10px',
//               boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
//               border: '1px solid #e5e7eb',
//             }}
//           >
//             <Table sx={{ minWidth: 1000 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
//                   <SortableHeader column="sno">S.No</SortableHeader>
//                   <SortableHeader column="deviceCode">Device Code</SortableHeader>
//                   <SortableHeader column="name">Name</SortableHeader>
//                   <SortableHeader column="ipAddress">IP Address</SortableHeader>
//                   <SortableHeader column="macAddress">MAC Address</SortableHeader>
//                   <SortableHeader column="imei">IMEI</SortableHeader>
//                   <SortableHeader column="location">Location</SortableHeader>
//                   <SortableHeader column="status">Status</SortableHeader>
//                   <SortableHeader column="registerDate">Register Date</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedRows.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center" sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
//                       No records found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedRows.map((row, index) => (
//                     <TableRow
//                       key={row.id}
//                       hover
//                       sx={{ '&:last-child td': { border: 0 } }}
//                     >
//                       <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                         {index + 1 + (currentPage - 1) * entries}
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.deviceCode}</TableCell>
//                       <TableCell sx={{ fontSize: '13px' }}>{row.name}</TableCell>
//                       <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.ipAddress}</TableCell>
//                       <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.macAddress || '—'}</TableCell>
//                       <TableCell sx={{ fontSize: '13px' }}>{row.imei || '—'}</TableCell>
//                       <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                         {[row.city, row.state].filter(Boolean).join(', ') || '—'}
//                       </TableCell>
//                       <TableCell>
//                         <span
//                           style={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             gap: '4px',
//                             padding: '2px 10px',
//                             borderRadius: '20px',
//                             fontSize: '12px',
//                             fontWeight: 700,
//                             background: row.deviceStatus === 'ONLINE' ? '#10b98120' : '#ef444420',
//                             color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
//                             border: `1px solid ${row.deviceStatus === 'ONLINE' ? '#10b98140' : '#ef444440'}`,
//                           }}
//                         >
//                           ● {row.deviceStatus}
//                         </span>
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
//                         {new Date(row.regDate).toLocaleString()}
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                           <IconButton
//                             size="small"
//                             title="View on Map"
//                             onClick={() => {
//                               if (row.latitude && row.longitude) {
//                                 window.open(`https://www.google.com/maps?q=${row.latitude},${row.longitude}`, '_blank');
//                               } else {
//                                 alert('No coordinates available for this device.');
//                               }
//                             }}
//                           >
//                             📍
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             title="Edit"
//                             sx={{ color: C.primary }}
//                             onClick={() => handleEdit(row)}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             title="Delete"
//                             sx={{ color: C.error }}
//                             onClick={() => handleDelete(row.id)}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mt: 2.5,
//             flexWrap: 'wrap',
//             gap: 1,
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing{' '}
//             {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{' '}
//             {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
//           </Typography>
//           <Stack spacing={2} direction="row">
//             <Pagination
//               count={Math.ceil(sortedRows.length / entries) || 1}
//               page={currentPage}
//               onChange={(_, page) => setCurrentPage(page)}
//               variant="outlined"
//               shape="rounded"
//               size="small"
//             />
//           </Stack>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default AddPASDevice;


///////--------------------------------------------api code below-----------------------------------










//---------best code below--------

// import React, { useState, useEffect } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import {
//   Box, Divider, Button, Grid, IconButton, Paper, Select,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Typography, InputBase, MenuItem, Pagination, Stack,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   FormControl, InputLabel, Select as MuiSelect, Breadcrumbs,
//   CircularProgress, Snackbar, Alert,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa';
// import { API_URL } from '../../../config';

// // ─── Token Helper ──────────────────────────────────────────────────────────────
// const getToken = () => {
//   // Try localStorage first, then sessionStorage, then cookies
//   return (
//     localStorage.getItem('token') ||
//     localStorage.getItem('authToken') ||
//     localStorage.getItem('accessToken') ||
//     sessionStorage.getItem('token') ||
//     sessionStorage.getItem('authToken') ||
//     document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('token='))
//       ?.split('=')[1] ||
//     ''
//   );
// };

// const authHeaders = () => ({
//   'Content-Type': 'application/json',
//   accept: '*/*',
//   Authorization: `Bearer ${getToken()}`,
// });

// // ─── Inlined constants ─────────────────────────────────────────────────────────
// const C = {
//   primary:   '#2563eb',
//   secondary: '#8b5cf6',
//   success:   '#10b981',
//   error:     '#ef4444',
//   info:      '#06b6d4',
// };

// // ─── Styles ────────────────────────────────────────────────────────────────────
// const styles = {
//   root: {
//     width: '100%',
//     minHeight: '100%',
//     boxSizing: 'border-box',
//     padding: '24px',
//     backgroundColor: '#EEF2F6',
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   breadcrumbCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '14px 24px',
//     marginBottom: '20px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     borderTop: `4px solid ${C.primary}`,
//   },
//   mainCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '28px 32px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     borderTop: `4px solid ${C.secondary}`,
//   },
//   cardTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     margin: '0 0 4px',
//   },
//   cardSubtitle: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '0 0 20px',
//   },
// };

// // ─── Breadcrumb ────────────────────────────────────────────────────────────────
// const Breadcrumb = ({ children }) => (
//   <div style={styles.breadcrumbCard}>
//     <Breadcrumbs aria-label="breadcrumb" separator="›">
//       {children}
//     </Breadcrumbs>
//   </div>
// );

// // ─── Export Utilities ──────────────────────────────────────────────────────────
// const exportToCSV = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csv], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'PAS_Devices.csv'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToExcel = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   let tableHtml = `<table><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;
//   rows.forEach((row) => {
//     tableHtml += `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`;
//   });
//   tableHtml += '</table>';
//   const blob = new Blob(
//     [`<html xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='utf-8'/></head><body>${tableHtml}</body></html>`],
//     { type: 'application/vnd.ms-excel' }
//   );
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'PAS_Devices.xls'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToPDF = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
//     r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
//     r.deviceStatus, new Date(r.regDate).toLocaleString(),
//   ]);
//   const html = `
//     <html><head><title>PAS Devices</title>
//     <style>
//       body { font-family: sans-serif; font-size: 12px; }
//       table { width: 100%; border-collapse: collapse; }
//       th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
//       th { background: #c6ccc7; }
//     </style>
//     </head><body>
//       <h2>PAS Devices</h2>
//       <table>
//         <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
//         <tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
//       </table>
//     </body></html>`;
//   const win = window.open('', '_blank');
//   win.document.write(html);
//   win.document.close();
//   win.print();
// };

// // ─── Export Buttons ────────────────────────────────────────────────────────────
// const ExportButtons = ({ tableData }) => (
//   <Box sx={{ display: 'flex', gap: 1 }}>
//     <Button size="small" variant="outlined" color="success" startIcon={<FaFileExcel size={14} />}
//       onClick={() => exportToExcel(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
//       Excel
//     </Button>
//     <Button size="small" variant="outlined" color="info" startIcon={<FaFileCsv size={14} />}
//       onClick={() => exportToCSV(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
//       CSV
//     </Button>
//     <Button size="small" variant="outlined" color="error" startIcon={<FaFilePdf size={14} />}
//       onClick={() => exportToPDF(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
//       PDF
//     </Button>
//     <Button size="small" variant="outlined" startIcon={<FaPrint size={14} />}
//       onClick={() => window.print()}
//       sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px', color: '#555', borderColor: '#aaa', '&:hover': { borderColor: '#555' } }}>
//       Print
//     </Button>
//   </Box>
// );

// // ─── Empty Form State ──────────────────────────────────────────────────────────
// const emptyForm = {
//   name: '',
//   deviceCode: '',
//   template: '',
//   macAddress: '',
//   brightness: 0,
//   imei: '',
//   ipAddress: '',
//   deviceStatus: 'OFFLINE',
//   deviceType: '',
//   lastUpdate: new Date().toISOString(),
//   deviceId: 0,
//   status: true,
//   regDate: new Date().toISOString().slice(0, 16),
//   addressId: 0,
//   moduleName: '',
//   address: '',
//   street: '',
//   landmark: '',
//   state: '',
//   city: '',
//   pinCode: 0,
//   latitude: 0,
//   longitude: 0,
//   addressType: 'RESIDENTIAL',
// };

// // ─── Add / Edit Device Modal ───────────────────────────────────────────────────
// const DeviceFormModal = ({ open, onClose, onSave, editData, loading }) => {
//   const [form, setForm] = useState(editData || emptyForm);

//   useEffect(() => {
//     setForm(
//       editData
//         ? { ...editData, regDate: editData.regDate ? editData.regDate.slice(0, 16) : new Date().toISOString().slice(0, 16) }
//         : { ...emptyForm, regDate: new Date().toISOString().slice(0, 16) }
//     );
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!form.deviceCode.trim() || !form.name.trim() || !form.ipAddress.trim()) {
//       alert('Device Code, Name, and IP Address are required.');
//       return;
//     }
//     onSave(form);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {editData ? 'Edit PAS Device' : 'Add PAS Device'}
//         <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <Divider />
//       <DialogContent sx={{ pt: 2 }}>
//         <Grid container spacing={2} direction="column">
//           {[
//             { label: 'Device Code', name: 'deviceCode', required: true },
//             { label: 'Device Name', name: 'name', required: true },
//             { label: 'IP Address', name: 'ipAddress', required: true, placeholder: 'e.g. 192.168.1.1' },
//             { label: 'MAC Address', name: 'macAddress', placeholder: 'e.g. 00:1A:2B:3C:4D:5E' },
//             { label: 'IMEI', name: 'imei', placeholder: '15-digit IMEI number' },
//             // { label: 'Template', name: 'template' },
//             { label: 'Device Type', name: 'deviceType' },
//             // { label: 'Module Name', name: 'moduleName' },
//             { label: 'Address', name: 'address' },
//             { label: 'Street', name: 'street' },
//             { label: 'Landmark', name: 'landmark' },
//             { label: 'City', name: 'city' },
//             { label: 'State', name: 'state' },
//             { label: 'Pin Code', name: 'pinCode', type: 'number' },
//             { label: 'Latitude', name: 'latitude', type: 'number', placeholder: 'e.g. 11.9139' },
//             { label: 'Longitude', name: 'longitude', type: 'number', placeholder: 'e.g. 79.8145' },
//           ].map(({ label, name, required, placeholder, type }) => (
//             <Grid item xs={12} key={name}>
//               <TextField
//                 fullWidth label={label} name={name}
//                 value={form[name]} onChange={handleChange}
//                 size="small" required={required}
//                 placeholder={placeholder} type={type || 'text'}
//                 InputLabelProps={type === 'number' ? { shrink: true } : undefined}
//               />
//             </Grid>
//           ))}

//           <Grid item xs={12}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Address Type</InputLabel>
//               <MuiSelect name="addressType" value={form.addressType} label="Address Type" onChange={handleChange}>
//                 {['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'PUBLIC', 'OTHER'].map((v) => (
//                   <MenuItem key={v} value={v}>{v}</MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Register Date & Time" name="regDate"
//               value={form.regDate} onChange={handleChange}
//               size="small" type="datetime-local" InputLabelProps={{ shrink: true }} />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="info"
//           disabled={loading}
//           sx={{ textTransform: 'none', fontWeight: 600, minWidth: 130 }}>
//           {loading
//             ? <CircularProgress size={18} color="inherit" />
//             : editData ? 'Update Device' : 'Add Device'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // ─── Main Component ────────────────────────────────────────────────────────────
// const AddPASDevice = () => {
//   const [data, setData]               = useState([]);
//   const [entries, setEntries]         = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editData, setEditData]       = useState(null);
//   const [sortColumn, setSortColumn]   = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   // API state
//   const [tableLoading, setTableLoading] = useState(false);
//   const [formLoading, setFormLoading]   = useState(false);
//   const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

//   const showSnack = (message, severity = 'success') =>
//     setSnack({ open: true, message, severity });

//   // ── Fetch all devices on mount ───────────────────────────────────────────────
//   const fetchDevices = async () => {
//     setTableLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/api/Device/GetAllDevice`, {
//         method: 'GET',
//         headers: authHeaders(),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       setData(Array.isArray(json) ? json : []);
//     } catch (err) {
//       showSnack(`Failed to load devices: ${err.message}`, 'error');
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   useEffect(() => { fetchDevices(); }, []);

//   // ── Add Device ───────────────────────────────────────────────────────────────
//   const addDevice = async (form) => {
//     setFormLoading(true);
//     try {
//       const payload = {
//         ...form,
//         pinCode: Number(form.pinCode) || 0,
//         latitude: Number(form.latitude) || 0,
//         longitude: Number(form.longitude) || 0,
//         brightness: Number(form.brightness) || 0,
//         regDate: new Date(form.regDate).toISOString(),
//         lastUpdate: new Date().toISOString(),
//         status: true,
//         deviceId: 0,
//         addressId: 0,
//       };
//       const res = await fetch(`${API_URL}/api/Device/AddDevice`, {
//         method: 'POST',
//         headers: authHeaders(),
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       showSnack('Device added successfully!');
//       setIsDialogOpen(false);
//       fetchDevices();
//     } catch (err) {
//       showSnack(`Failed to add device: ${err.message}`, 'error');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ── Update Device ────────────────────────────────────────────────────────────
//   const updateDevice = async (form) => {
//     setFormLoading(true);
//     try {
//       const payload = {
//         ...form,
//         id: form.id,
//         pinCode: Number(form.pinCode) || 0,
//         latitude: Number(form.latitude) || 0,
//         longitude: Number(form.longitude) || 0,
//         brightness: Number(form.brightness) || 0,
//         regDate: new Date(form.regDate).toISOString(),
//         lastUpdate: new Date().toISOString(),
//         status: true,
//         deviceId: form.deviceId || 0,
//         addressId: form.addressId || 0,
//         moduleId: form.moduleId || 0,
//       };
//       const res = await fetch(`${API_URL}/api/Device/UpdateDevice/${form.id}`, {
//         method: 'PUT',
//         headers: authHeaders(),
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       showSnack('Device updated successfully!');
//       setIsDialogOpen(false);
//       setEditData(null);
//       fetchDevices();
//     } catch (err) {
//       showSnack(`Failed to update device: ${err.message}`, 'error');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ── Delete Device ────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this PAS device?')) return;
//     try {
//       const res = await fetch(`${API_URL}/api/Device/${id}`, {
//         method: 'DELETE',
//         headers: authHeaders(),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       showSnack('Device deleted successfully!');
//       fetchDevices();
//     } catch (err) {
//       showSnack(`Failed to delete device: ${err.message}`, 'error');
//     }
//   };

//   // ── Save dispatcher ──────────────────────────────────────────────────────────
//   const handleSave = (form) => {
//     if (editData) {
//       updateDevice(form);
//     } else {
//       addDevice(form);
//     }
//   };

//   // ── Filtering ────────────────────────────────────────────────────────────────
//   const filteredRows = data.filter((row) =>
//     [row.deviceCode, row.name, row.ipAddress, row.city, row.state, row.macAddress, row.imei].some((field) =>
//       (field || '').toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   // ── Sorting ──────────────────────────────────────────────────────────────────
//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortColumn(column);
//       setSortDirection('asc');
//     }
//     setCurrentPage(1);
//   };

//   const getSortValue = (row, column) => {
//     switch (column) {
//       case 'sno':        return row.id;
//       case 'deviceCode': return row.deviceCode || '';
//       case 'name':       return row.name || '';
//       case 'ipAddress':  return row.ipAddress || '';
//       case 'macAddress': return row.macAddress || '';
//       case 'imei':       return row.imei || '';
//       case 'location':   return `${row.city || ''} ${row.state || ''}`.trim();
//       case 'status':     return row.deviceStatus || '';
//       case 'registerDate': return new Date(row.regDate).getTime();
//       default:           return '';
//     }
//   };

//   const sortedRows = [...filteredRows];
//   if (sortColumn) {
//     sortedRows.sort((a, b) => {
//       let va = getSortValue(a, sortColumn);
//       let vb = getSortValue(b, sortColumn);
//       if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
//       if (va < vb) return sortDirection === 'asc' ? -1 : 1;
//       if (va > vb) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

//   // ── Sortable Header ──────────────────────────────────────────────────────────
//   const renderSortIcon = (column) => {
//     if (sortColumn !== column) return null;
//     return sortDirection === 'asc'
//       ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
//       : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
//   };

//   const SortableHeader = ({ column, children }) => (
//     <TableCell
//       sx={{
//         fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap',
//         cursor: 'pointer', userSelect: 'none',
//         '&:hover': { backgroundColor: '#e5e9ed' },
//       }}
//       onClick={() => handleSort(column)}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//         {children}
//         <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>
//           {renderSortIcon(column)}
//         </Box>
//       </Box>
//     </TableCell>
//   );

//   // ── Render ───────────────────────────────────────────────────────────────────
//   return (
//     <div style={styles.root}>
//       {/* Snackbar */}
//       <Snackbar
//         open={snack.open} autoHideDuration={3500}
//         onClose={() => setSnack((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))} sx={{ width: '100%' }}>
//           {snack.message}
//         </Alert>
//       </Snackbar>

//       {/* Modal */}
//       <DeviceFormModal
//         open={isDialogOpen}
//         onClose={() => { setIsDialogOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//         loading={formLoading}
//       />

//       {/* Breadcrumb */}
//       <Breadcrumb>
//         <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
//           sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//           Home
//         </Typography>
//         <Typography variant="subtitle2" color="primary">PAS Devices</Typography>
//       </Breadcrumb>

//       {/* Main Card */}
//       <div style={styles.mainCard}>
//         <p style={styles.cardTitle}>PAS Device Management</p>
//         <p style={styles.cardSubtitle}>Manage and monitor all Public Addressing System devices</p>
//         <Divider sx={{ mb: 2.5 }} />

//         {/* Toolbar */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2">Show</Typography>
//               <Select size="small" value={entries}
//                 onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
//                 sx={{ minWidth: 70 }}>
//                 {[10, 25, 50, 100].map((val) => (
//                   <MenuItem key={val} value={val}>{val}</MenuItem>
//                 ))}
//               </Select>
//               <Typography variant="body2">entries</Typography>
//             </Box>
//             <ExportButtons tableData={sortedRows} />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Button variant="contained" color="info"
//               onClick={() => { setEditData(null); setIsDialogOpen(true); }}
//               startIcon={<AddIcon />}
//               sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}>
//               Add Device
//             </Button>
//             <Paper sx={{ display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb' }}>
//               <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
//                 value={searchQuery}
//                 onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
//             </Paper>
//           </Box>
//         </Box>

//         {/* Table */}
//         <Box sx={{ width: '100%', overflowX: 'auto' }}>
//           <TableContainer component={Paper} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
//             <Table sx={{ minWidth: 1000 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
//                   <SortableHeader column="sno">S.No</SortableHeader>
//                   <SortableHeader column="deviceCode">Device Code</SortableHeader>
//                   <SortableHeader column="name">Name</SortableHeader>
//                   <SortableHeader column="ipAddress">IP Address</SortableHeader>
//                   <SortableHeader column="macAddress">MAC Address</SortableHeader>
//                   <SortableHeader column="imei">IMEI</SortableHeader>
//                   {/* <SortableHeader column="location">Location</SortableHeader> */}
//                   <SortableHeader column="status">Status</SortableHeader>
//                   <SortableHeader column="registerDate">Register Date</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tableLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
//                       <CircularProgress size={32} />
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedRows.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center" sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
//                       No records found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedRows.map((row, index) => (
//                     <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
//                       <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                         {index + 1 + (currentPage - 1) * entries}
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.deviceCode}</TableCell>
//                       <TableCell sx={{ fontSize: '13px' }}>{row.name}</TableCell>
//                       <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.ipAddress}</TableCell>
//                       <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.macAddress || '—'}</TableCell>
//                       <TableCell sx={{ fontSize: '13px' }}>{row.imei || '—'}</TableCell>
//                       {/* <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                         {[row.city, row.state].filter(Boolean).join(', ') || '—'}
//                       </TableCell> */}
//                       <TableCell>
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: '4px',
//                           padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
//                           background: row.deviceStatus === 'ONLINE' ? '#10b98120' : '#ef444420',
//                           color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
//                           border: `1px solid ${row.deviceStatus === 'ONLINE' ? '#10b98140' : '#ef444440'}`,
//                         }}>
//                           ● {row.deviceStatus || 'OFFLINE'}
//                         </span>
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
//                         {new Date(row.regDate).toLocaleString()}
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                           {/* <IconButton size="small" title="View on Map"
//                             onClick={() => {
//                               if (row.latitude && row.longitude) {
//                                 window.open(`https://www.google.com/maps?q=${row.latitude},${row.longitude}`, '_blank');
//                               } else {
//                                 alert('No coordinates available for this device.');
//                               }
//                             }}>
//                             📍
//                           </IconButton> */}
//                           <IconButton size="small" title="Edit"
//                             sx={{ color: C.primary }}
//                             onClick={() => { setEditData(row); setIsDialogOpen(true); }}>
//                             <EditIcon  n fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" title="Delete"
//                             sx={{ color: C.error }}
//                             onClick={() => handleDelete(row.id)}>
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Pagination */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing{' '}
//             {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{' '}
//             {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
//           </Typography>
//           <Stack spacing={2} direction="row">
//             <Pagination
//               count={Math.ceil(sortedRows.length / entries) || 1}
//               page={currentPage}
//               onChange={(_, page) => setCurrentPage(page)}
//               variant="outlined" shape="rounded" size="small"
//             />
//           </Stack>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default AddPASDevice;

//---------best code above--------


import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box, Divider, Button, Grid, IconButton, Paper, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, InputBase, MenuItem, Pagination, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select as MuiSelect, Breadcrumbs,
  CircularProgress, Snackbar, Alert, Switch, FormControlLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa';
import { API_URL } from '../../../config';
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

// ─── Validation Functions ──────────────────────────────────────────────────────
const validateIPAddress = (ip) => {
  if (!ip) return true;
  const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  if (!ipRegex.test(ip)) return false;
  const parts = ip.split('.');
  for (let i = 0; i < 4; i++) {
    const num = parseInt(parts[i], 10);
    if (isNaN(num) || num < 0 || num > 255) return false;
  }
  return true;
};

const validateMACAddress = (mac) => {
  if (!mac) return true;
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

const validateIMEI = (imei) => {
  if (!imei) return true;
  const imeiRegex = /^\d{15}$/;
  return imeiRegex.test(imei);
};

const validatePinCode = (pinCode) => {
  if (!pinCode) return true;
  const pinRegex = /^\d{6}$/;
  return pinRegex.test(pinCode);
};

// ─── Inlined constants ─────────────────────────────────────────────────────────
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

const exportToPDF = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Name', 'IP Address', 'MAC Address', 'IMEI', 'Address', 'City', 'State', 'Street', 'Landmark', 'Address Type', 'Status', 'Register Date'];
  const rows = data.map((r) => [
    r.deviceCode, r.name, r.ipAddress, r.macAddress || '', r.imei || '',
    r.address || '', r.city || '', r.state || '', r.street || '', r.landmark || '', r.addressType || '',
    r.deviceStatus, new Date(r.regDate).toLocaleString(),
  ]);
  const html = `
    <html><head><title>PAS Devices</title>
    <style>
      body { font-family: sans-serif; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
      th { background: #c6ccc7; }
    </style>
    </head><body>
      <h2>PAS Devices</h2>
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </body></html>`;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.print();
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
    {/* <Button size="small" variant="outlined" color="error" startIcon={<FaFilePdf size={14} />}
      onClick={() => exportToPDF(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>
      PDF
    </Button> */}
    {/* <Button size="small" variant="outlined" startIcon={<FaPrint size={14} />}
      onClick={() => window.print()}
      sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px', color: '#555', borderColor: '#aaa', '&:hover': { borderColor: '#555' } }}>
      Print
    </Button> */}
  </Box>
);

// ─── Empty Form State ──────────────────────────────────────────────────────────
const emptyForm = {
  name: '',
  deviceCode: '',
  template: '',
  macAddress: '',
  brightness: 0,
  imei: '',
  ipAddress: '',
  deviceStatus: 'OFFLINE',
  deviceType: 'PAS',
  lastUpdate: new Date().toISOString(),
  deviceId: 0,
  status: true,
  regDate: new Date().toISOString().slice(0, 16),
  addressId: 0,
  moduleName: '',
  address: '',
  street: '',
  landmark: '',
  state: '',
  city: '',
  pinCode: 0,
  latitude: 0,
  longitude: 0,
  addressType: 'RESIDENTIAL',
};

// ─── Add / Edit Device Modal ───────────────────────────────────────────────────
const DeviceFormModal = ({ open, onClose, onSave, editData, loading }) => {
  const [form, setForm] = useState(editData || emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        regDate: editData.regDate ? editData.regDate.slice(0, 16) : new Date().toISOString().slice(0, 16)
      });
    } else {
      setForm({ ...emptyForm, regDate: new Date().toISOString().slice(0, 16) });
    }
    setErrors({});
  }, [editData, open]);

  const validateField = (name, value) => {
    switch (name) {
      case 'ipAddress':
        if (value && !validateIPAddress(value)) {
          return 'Invalid IP address. Format: 0.0.0.0 - 255.255.255.255';
        }
        break;
      case 'macAddress':
        if (value && !validateMACAddress(value)) {
          return 'Invalid MAC address. Format: AA:BB:CC:DD:EE:FF or AA-BB-CC-DD-EE-FF';
        }
        break;
      case 'imei':
        if (value && !validateIMEI(value)) {
          return 'Invalid IMEI. Must be exactly 15 digits';
        }
        break;
      case 'pinCode':
        if (value && !validatePinCode(value.toString())) {
          return 'Invalid PIN code. Must be exactly 6 digits';
        }
        break;
      case 'latitude':
        if (value && (isNaN(parseFloat(value)) || parseFloat(value) < -90 || parseFloat(value) > 90)) {
          return 'Latitude must be between -90 and 90';
        }
        break;
      case 'longitude':
        if (value && (isNaN(parseFloat(value)) || parseFloat(value) < -180 || parseFloat(value) > 180)) {
          return 'Longitude must be between -180 and 180';
        }
        break;
      case 'deviceCode':
        if (!value.trim()) {
          return 'Device Code is required';
        }
        break;
      case 'name':
        if (!value.trim()) {
          return 'Device Name is required';
        }
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
    const isChecked = e.target.checked;
    setForm((prev) => ({
      ...prev,
      deviceStatus: isChecked ? 'ONLINE' : 'OFFLINE'
    }));
  };

  // FIXED: Proper float/decimal input handling
  const handleNumberInput = (e, name, min, max) => {
    let value = e.target.value;

    // Allow empty value
    if (value === '') {
      handleChange({ target: { name, value: '' } });
      return;
    }

    // Allow negative sign and decimal point during typing
    const isValidPartial = /^-?\d*\.?\d*$/.test(value);
    if (!isValidPartial) return;

    // Only validate complete numbers (not ending with decimal point or negative sign)
    if (value !== '-' && !value.endsWith('.')) {
      let num = parseFloat(value);
      if (!isNaN(num)) {
        if (min !== undefined && num < min) {
          handleChange({ target: { name, value: min.toString() } });
          return;
        }
        if (max !== undefined && num > max) {
          handleChange({ target: { name, value: max.toString() } });
          return;
        }
      }
    }

    handleChange({ target: { name, value } });
  };

  const handleIPInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, '');
    value = value.replace(/\.\.+/g, '.');
    const parts = value.split('.');
    if (parts.length > 4) {
      value = parts.slice(0, 4).join('.');
    }
    const limitedParts = value.split('.').map(part => part.slice(0, 3));
    value = limitedParts.join('.');

    handleChange({ target: { name: 'ipAddress', value } });
  };

  const handleMACInput = (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9A-F:-]/g, '');
    if (value.length === 2 && !value.includes(':')) {
      value = value + ':';
    } else if (value.length === 5 && value[2] === ':' && !value.includes(':', 3)) {
      value = value + ':';
    } else if (value.length === 8 && value[5] === ':' && !value.includes(':', 6)) {
      value = value + ':';
    } else if (value.length === 11 && value[8] === ':' && !value.includes(':', 9)) {
      value = value + ':';
    } else if (value.length === 14 && value[11] === ':' && !value.includes(':', 12)) {
      value = value + ':';
    }
    if (value.length > 17) {
      value = value.slice(0, 17);
    }
    handleChange({ target: { name: 'macAddress', value } });
  };

  const handleIMEIInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 15) value = value.slice(0, 15);
    handleChange({ target: { name: 'imei', value } });
  };

  const handlePinCodeInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 6) value = value.slice(0, 6);
    handleChange({ target: { name: 'pinCode', value: value ? parseInt(value) : '' } });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.deviceCode.trim()) newErrors.deviceCode = 'Device Code is required';
    if (!form.name.trim()) newErrors.name = 'Device Name is required';
    if (!form.ipAddress.trim()) newErrors.ipAddress = 'IP Address is required';
    else if (!validateIPAddress(form.ipAddress)) newErrors.ipAddress = 'Invalid IP address. Format: 0.0.0.0 - 255.255.255.255';

    if (form.macAddress && !validateMACAddress(form.macAddress)) {
      newErrors.macAddress = 'Invalid MAC address. Format: AA:BB:CC:DD:EE:FF or AA-BB-CC-DD-EE-FF';
    }
    if (form.imei && !validateIMEI(form.imei)) {
      newErrors.imei = 'Invalid IMEI. Must be exactly 15 digits';
    }
    if (form.pinCode && form.pinCode.toString() && !validatePinCode(form.pinCode.toString())) {
      newErrors.pinCode = 'Invalid PIN code. Must be exactly 6 digits';
    }
    if (form.latitude && (isNaN(parseFloat(form.latitude)) || parseFloat(form.latitude) < -90 || parseFloat(form.latitude) > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    if (form.longitude && (isNaN(parseFloat(form.longitude)) || parseFloat(form.longitude) < -180 || parseFloat(form.longitude) > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editData ? 'Edit PAS Device' : 'Add PAS Device'}
        <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth label="Device Code" name="deviceCode"
              value={form.deviceCode || ''} onChange={handleChange}
              size="small" required error={!!errors.deviceCode}
              helperText={errors.deviceCode}
              placeholder="e.g. PAS-001"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Device Name" name="name"
              value={form.name || ''} onChange={handleChange}
              size="small" required error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g. Main Office PAS"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="IP Address" name="ipAddress"
              value={form.ipAddress || ''} onChange={handleIPInput}
              size="small" required error={!!errors.ipAddress}
              helperText={errors.ipAddress || "Format: 192.168.1.1 (each octet 0-255)"}
              placeholder="e.g. 192.168.1.1"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="MAC Address" name="macAddress"
              value={form.macAddress || ''} onChange={handleMACInput}
              size="small" error={!!errors.macAddress}
              helperText={errors.macAddress || "Format: AA:BB:CC:DD:EE:FF or AA-BB-CC-DD-EE-FF"}
              placeholder="e.g. AA:BB:CC:DD:EE:FF"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="IMEI" name="imei"
              value={form.imei || ''} onChange={handleIMEIInput}
              size="small" error={!!errors.imei}
              helperText={errors.imei || "15-digit IMEI number (digits only)"}
              placeholder="e.g. 123456789012345"
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Device Type" name="deviceType"
              value={form.deviceType || 'PAS'} onChange={handleChange}
              size="small" disabled
              helperText="Device type is set to PAS"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Address" name="address"
              value={form.address || ''} onChange={handleChange}
              size="small" placeholder="e.g. 123 Main Street"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Street" name="street"
              value={form.street || ''} onChange={handleChange}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Landmark" name="landmark"
              value={form.landmark || ''} onChange={handleChange}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="City" name="city"
              value={form.city || ''} onChange={handleChange}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="State" name="state"
              value={form.state || ''} onChange={handleChange}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Pin Code" name="pinCode"
              value={form.pinCode || ''} onChange={handlePinCodeInput}
              size="small" error={!!errors.pinCode}
              helperText={errors.pinCode || "6-digit PIN code"}
              placeholder="e.g. 110001"
              inputProps={{ maxLength: 6 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Latitude" name="latitude"
              value={form.latitude || ''}
              onChange={(e) => handleNumberInput(e, 'latitude', -90, 90)}
              size="small" error={!!errors.latitude}
              helperText={errors.latitude || "Range: -90 to 90 (e.g., 28.6139)"}
              placeholder="e.g. 28.6139"
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Longitude" name="longitude"
              value={form.longitude || ''}
              onChange={(e) => handleNumberInput(e, 'longitude', -180, 180)}
              size="small" error={!!errors.longitude}
              helperText={errors.longitude || "Range: -180 to 180 (e.g., 77.2090)"}
              placeholder="e.g. 77.2090"
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Address Type</InputLabel>
              <MuiSelect name="addressType" value={form.addressType || 'RESIDENTIAL'} label="Address Type" onChange={handleChange}>
                {['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'PUBLIC', 'OTHER'].map((v) => (
                  <MenuItem key={v} value={v}>{v}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.deviceStatus === 'ONLINE'}
                  onChange={handleStatusToggle}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">Device Status:</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: form.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444'
                    }}
                  >
                    {form.deviceStatus}
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, mt: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Register Date & Time" name="regDate"
              value={form.regDate || ''} onChange={handleChange}
              size="small" type="datetime-local" InputLabelProps={{ shrink: true }} />
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
            : editData ? 'Update Device' : 'Add Device'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const AddPASDevice = () => {
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

  const fetchDevices = async () => {
    setTableLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/Device/GetDevicesByType?deviceType=PAS`, {
        method: 'GET',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      showSnack(`Failed to load devices: ${err.message}`, 'error');
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => { fetchDevices(); }, []);

  const addDevice = async (form) => {
    setFormLoading(true);
    try {
      const payload = {
        ...form,
        pinCode: Number(form.pinCode) || 0,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        brightness: Number(form.brightness) || 0,
        regDate: new Date(form.regDate).toISOString(),
        lastUpdate: new Date().toISOString(),
        status: true,
        deviceId: 0,
        addressId: 0,
        deviceType: 'PAS',
      };
      const res = await fetch(`${API_URL}/api/Device/AddDevice`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSnack('Device added successfully!');
      setIsDialogOpen(false);
      fetchDevices();
    } catch (err) {
      showSnack(`Failed to add device: ${err.message}`, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const updateDevice = async (form) => {
    setFormLoading(true);
    try {
      const payload = {
        ...form,
        id: form.id,
        pinCode: Number(form.pinCode) || 0,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        brightness: Number(form.brightness) || 0,
        regDate: new Date(form.regDate).toISOString(),
        lastUpdate: new Date().toISOString(),
        status: true,
        deviceId: form.deviceId || 0,
        addressId: form.addressId || 0,
        moduleId: form.moduleId || 0,
      };
      const res = await fetch(`${API_URL}/api/Device/UpdateDevice/${form.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSnack('Device updated successfully!');
      setIsDialogOpen(false);
      setEditData(null);
      fetchDevices();
    } catch (err) {
      showSnack(`Failed to update device: ${err.message}`, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this PAS device?')) return;
    try {
      const res = await fetch(`${API_URL}/api/Device/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSnack('Device deleted successfully!');
      fetchDevices();
    } catch (err) {
      showSnack(`Failed to delete device: ${err.message}`, 'error');
    }
  };

  const handleSave = (form) => {
    if (editData) {
      updateDevice(form);
    } else {
      addDevice(form);
    }
  };

  const filteredRows = data.filter((row) =>
    [row.deviceCode, row.name, row.ipAddress, row.address, row.city, row.state, row.macAddress, row.imei].some((field) =>
      (field || '').toLowerCase().includes(searchQuery.toLowerCase())
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
      case 'sno': return row.id;
      case 'deviceCode': return row.deviceCode || '';
      case 'name': return row.name || '';
      case 'ipAddress': return row.ipAddress || '';
      case 'macAddress': return row.macAddress || '';
      case 'imei': return row.imei || '';
      case 'address': return row.address || '';
      case 'status': return row.deviceStatus || '';
      case 'registerDate': return new Date(row.regDate).getTime();
      default: return '';
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
        onClose={() => { setIsDialogOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
        loading={formLoading}
      />

      <Breadcrumb>
        <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">PAS Devices</Typography>
      </Breadcrumb>

      <div style={styles.mainCard}>
        <p style={styles.cardTitle}>PAS Device Management</p>
        <p style={styles.cardSubtitle}>Manage and monitor all Public Addressing System devices</p>
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
            <Button variant="contained" color="info"
              onClick={() => { setEditData(null); setIsDialogOpen(true); }}
              startIcon={<AddIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}>
              Add Device
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
                <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
                  <SortableHeader column="sno">S.No</SortableHeader>
                  <SortableHeader column="deviceCode">Device Code</SortableHeader>
                  <SortableHeader column="name">Name</SortableHeader>
                  <SortableHeader column="ipAddress">IP Address</SortableHeader>
                  {/* <SortableHeader column="macAddress">MAC Address</SortableHeader> */}
                  <SortableHeader column="imei">IMEI</SortableHeader>
                  <SortableHeader column="address">Address</SortableHeader>
                  <SortableHeader column="status">Status</SortableHeader>
                  <SortableHeader column="registerDate">Register Date</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
                    Action
                  </TableCell>
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
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
                        {index + 1 + (currentPage - 1) * entries}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.deviceCode}</TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{row.name}</TableCell>
                      <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.ipAddress}</TableCell>
                      {/* <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{row.macAddress || '—'}</TableCell> */}
                      <TableCell sx={{ fontSize: '13px' }}>{row.imei || '—'}</TableCell>
                      <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
                        {row.address || '—'}
                      </TableCell>
                      <TableCell>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                          background: row.deviceStatus === 'ONLINE' ? '#10b98120' : '#ef444420',
                          color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
                          border: `1px solid ${row.deviceStatus === 'ONLINE' ? '#10b98140' : '#ef444440'}`,
                        }}>
                          ● {row.deviceStatus || 'OFFLINE'}
                        </span>
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
                        {new Date(row.regDate).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton size="small" title="Edit"
                            sx={{ color: C.primary }}
                            onClick={() => { setEditData(row); setIsDialogOpen(true); }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Delete"
                            sx={{ color: C.error }}
                            onClick={() => handleDelete(row.id)}>
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

export default AddPASDevice;