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
//   Switch, FormControlLabel, Alert,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint, FaCalendarAlt } from 'react-icons/fa';

// // ─── Inlined constants ─────────────────────────────────────────────────────────
// const C = {
//   primary:   '#2563eb',
//   secondary: '#8b5cf6',
//   success:   '#10b981',
//   error:     '#ef4444',
//   info:      '#06b6d4',
//   warning:   '#f59e0b',
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
//   const headers = ['Device Code', 'Device Name', 'Content Title', 'Start Datetime', 'End Datetime', 'Duration', 'Status', 'Schedule Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.deviceName || '', r.contentTitle || '',
//     new Date(r.startDatetime).toLocaleString(), new Date(r.endDatetime).toLocaleString(),
//     r.duration || '', r.status, new Date(r.regDate).toLocaleString(),
//   ]);
//   const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csv], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'PAS_Schedule.csv'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToExcel = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Device Name', 'Content Title', 'Start Datetime', 'End Datetime', 'Duration', 'Status', 'Schedule Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.deviceName || '', r.contentTitle || '',
//     new Date(r.startDatetime).toLocaleString(), new Date(r.endDatetime).toLocaleString(),
//     r.duration || '', r.status, new Date(r.regDate).toLocaleString(),
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
//   a.href = url; a.download = 'PAS_Schedule.xls'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToPDF = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Device Name', 'Content Title', 'Start Datetime', 'End Datetime', 'Duration', 'Status', 'Schedule Date'];
//   const rows = data.map((r) => [
//     r.deviceCode, r.deviceName || '', r.contentTitle || '',
//     new Date(r.startDatetime).toLocaleString(), new Date(r.endDatetime).toLocaleString(),
//     r.duration || '', r.status, new Date(r.regDate).toLocaleString(),
//   ]);
//   const html = `
//     <html><head><title>PAS Schedule</title>
//     <style>
//       body { font-family: sans-serif; font-size: 12px; }
//       table { width: 100%; border-collapse: collapse; }
//       th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
//       th { background: #c6ccc7; }
//     </style>
//     </head><body>
//       <h2>PAS Schedule</h2>
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
//   deviceId: '',
//   deviceCode: '',
//   deviceName: '',
//   contentId: '',
//   contentTitle: '',
//   startDatetime: new Date().toISOString().slice(0, 16),
//   endDatetime: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
//   duration: '',
//   status: 'Scheduled',
//   regDate: new Date().toISOString().slice(0, 16),
// };

// // ─── Add / Edit Schedule Modal ─────────────────────────────────────────────────
// const ScheduleFormModal = ({ open, onClose, onSave, editData, devices, contents }) => {
//   const [form, setForm] = useState(editData || emptyForm);
//   const [error, setError] = useState('');

//   React.useEffect(() => {
//     if (editData) {
//       setForm({ ...editData });
//     } else {
//       setForm({ 
//         ...emptyForm, 
//         startDatetime: new Date().toISOString().slice(0, 16),
//         endDatetime: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
//         regDate: new Date().toISOString().slice(0, 16)
//       });
//     }
//     setError('');
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
    
//     // Calculate duration when both start and end datetimes are set
//     if (name === 'startDatetime' || name === 'endDatetime') {
//       const start = name === 'startDatetime' ? value : form.startDatetime;
//       const end = name === 'endDatetime' ? value : form.endDatetime;
      
//       if (start && end) {
//         const startDate = new Date(start);
//         const endDate = new Date(end);
//         if (endDate > startDate) {
//           const diffMs = endDate - startDate;
//           const diffMins = Math.floor(diffMs / 60000);
//           const hours = Math.floor(diffMins / 60);
//           const minutes = diffMins % 60;
//           setForm((prev) => ({ 
//             ...prev, 
//             [name]: value,
//             duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
//           }));
//         } else {
//           setError('End datetime must be after start datetime');
//         }
//       }
//     }
//   };

//   const handleDeviceChange = (e) => {
//     const deviceId = e.target.value;
//     const selectedDevice = devices.find(d => d.id === parseInt(deviceId) || d.id === deviceId);
//     setForm((prev) => ({
//       ...prev,
//       deviceId: deviceId,
//       deviceCode: selectedDevice?.deviceCode || '',
//       deviceName: selectedDevice?.name || '',
//     }));
//   };

//   const handleContentChange = (e) => {
//     const contentId = e.target.value;
//     const selectedContent = contents.find(c => c.id === parseInt(contentId) || c.id === contentId);
//     setForm((prev) => ({
//       ...prev,
//       contentId: contentId,
//       contentTitle: selectedContent?.contentTitle || '',
//     }));
//   };

//   const handleStatusToggle = (e) => {
//     setForm((prev) => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }));
//   };

//   const handleSubmit = () => {
//     if (!form.deviceId) {
//       alert('Please select a device.');
//       return;
//     }
//     if (!form.contentId) {
//       alert('Please select content.');
//       return;
//     }
//     if (!form.startDatetime || !form.endDatetime) {
//       alert('Please select start and end datetime.');
//       return;
//     }
//     const startDate = new Date(form.startDatetime);
//     const endDate = new Date(form.endDatetime);
//     if (endDate <= startDate) {
//       alert('End datetime must be after start datetime.');
//       return;
//     }
//     onSave(form);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {editData ? 'Edit Schedule' : 'Add Schedule'}
//         <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <Divider />
//       <DialogContent sx={{ pt: 2 }}>
//         <Grid container spacing={2} direction="column">
//           {/* Device Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth size="small" required>
//               <InputLabel>Select Device</InputLabel>
//               <MuiSelect
//                 name="deviceId"
//                 value={form.deviceId}
//                 label="Select Device"
//                 onChange={handleDeviceChange}
//               >
//                 <MenuItem value="">-- Select a Device --</MenuItem>
//                 {devices.map((device) => (
//                   <MenuItem key={device.id} value={device.id}>
//                     {device.deviceCode} - {device.name}
//                   </MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           {/* Selected Device Info */}
//           {form.deviceCode && (
//             <Grid item xs={12}>
//               <Alert severity="info" sx={{ fontSize: '13px' }}>
//                 Selected Device: <strong>{form.deviceCode}</strong> - {form.deviceName}
//               </Alert>
//             </Grid>
//           )}

//           {/* Content Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth size="small" required>
//               <InputLabel>Select Content</InputLabel>
//               <MuiSelect
//                 name="contentId"
//                 value={form.contentId}
//                 label="Select Content"
//                 onChange={handleContentChange}
//               >
//                 <MenuItem value="">-- Select Content --</MenuItem>
//                 {contents.map((content) => (
//                   <MenuItem key={content.id} value={content.id}>
//                     {content.contentTitle} ({content.duration})
//                   </MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           {/* Selected Content Info */}
//           {form.contentTitle && (
//             <Grid item xs={12}>
//               <Alert severity="success" sx={{ fontSize: '13px' }}>
//                 Selected Content: <strong>{form.contentTitle}</strong>
//               </Alert>
//             </Grid>
//           )}

//           {/* Start Datetime */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Start Datetime"
//               name="startDatetime"
//               value={form.startDatetime}
//               onChange={handleChange}
//               size="small"
//               type="datetime-local"
//               required
//               InputLabelProps={{ shrink: true }}
//               InputProps={{
//                 startAdornment: (
//                   <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
//                     <FaCalendarAlt size={14} color="#6b7280" />
//                   </Box>
//                 ),
//               }}
//             />
//           </Grid>

//           {/* End Datetime */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="End Datetime"
//               name="endDatetime"
//               value={form.endDatetime}
//               onChange={handleChange}
//               size="small"
//               type="datetime-local"
//               required
//               InputLabelProps={{ shrink: true }}
//               InputProps={{
//                 startAdornment: (
//                   <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
//                     <FaCalendarAlt size={14} color="#6b7280" />
//                   </Box>
//                 ),
//               }}
//             />
//           </Grid>

//           {/* Duration (Auto-calculated) */}
//           {form.duration && (
//             <Grid item xs={12}>
//               <Alert severity="info" sx={{ fontSize: '13px' }}>
//                 Duration: <strong>{form.duration}</strong>
//               </Alert>
//             </Grid>
//           )}

//           {error && (
//             <Grid item xs={12}>
//               <Alert severity="error" sx={{ fontSize: '13px' }}>
//                 {error}
//               </Alert>
//             </Grid>
//           )}

//           {/* Status Toggle */}
//           <Grid item xs={12}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={form.status === 'Active'}
//                   onChange={handleStatusToggle}
//                   color="success"
//                 />
//               }
//               label={
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   Status: <span style={{ color: form.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: 700 }}>{form.status}</span>
//                 </Typography>
//               }
//               labelPlacement="start"
//               sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
//             />
//           </Grid>

//           {/* Schedule Date */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Schedule Date & Time"
//               name="regDate"
//               value={form.regDate}
//               onChange={handleChange}
//               size="small"
//               type="datetime-local"
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="info" sx={{ textTransform: 'none', fontWeight: 600 }}>
//           {editData ? 'Update Schedule' : 'Add Schedule'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // ─── Main Component with Sorting ──────────────────────────────────────────────
// const ScheduleContent = () => {
//   const [data, setData] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [contents, setContents] = useState([]);
//   const [entries, setEntries] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editData, setEditData] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
  
//   // Sorting state
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   // Load devices and contents from localStorage or API
//   useEffect(() => {
//     // Load devices
//     const storedDevices = localStorage.getItem('pas_devices');
//     if (storedDevices) {
//       setDevices(JSON.parse(storedDevices));
//     } else {
//       // Sample devices for demo
//       setDevices([
//         { id: 1, deviceCode: 'PAS001', name: 'Main Gate Speaker', ipAddress: '192.168.1.101' },
//         { id: 2, deviceCode: 'PAS002', name: 'Building A Speaker', ipAddress: '192.168.1.102' },
//         { id: 3, deviceCode: 'PAS003', name: 'Parking Area Speaker', ipAddress: '192.168.1.103' },
//         { id: 4, deviceCode: 'PAS004', name: 'Cafeteria Speaker', ipAddress: '192.168.1.104' },
//       ]);
//     }

//     // Load contents
//     const storedContents = localStorage.getItem('pas_contents');
//     if (storedContents) {
//       setContents(JSON.parse(storedContents));
//     } else {
//       // Sample contents for demo
//       setContents([
//         { id: 1, contentTitle: 'Morning Announcement', duration: '2m 30s' },
//         { id: 2, contentTitle: 'Emergency Alert', duration: '1m 0s' },
//         { id: 3, contentTitle: 'Background Music', duration: '15m 0s' },
//         { id: 4, contentTitle: 'Security Message', duration: '3m 15s' },
//       ]);
//     }
//   }, []);

//   // Filter data based on search query
//   const filteredRows = data.filter((row) =>
//     [row.deviceCode, row.deviceName, row.contentTitle, row.status].some((field) =>
//       (field || '').toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   // Check if a schedule is currently active
//   const isScheduleActive = (startDatetime, endDatetime) => {
//     const now = new Date();
//     const start = new Date(startDatetime);
//     const end = new Date(endDatetime);
//     return now >= start && now <= end;
//   };

//   // Get schedule status display
//   const getScheduleStatus = (row) => {
//     if (row.status !== 'Active') return { text: 'Inactive', color: '#ef4444', bg: '#ef444420' };
//     const now = new Date();
//     const start = new Date(row.startDatetime);
//     const end = new Date(row.endDatetime);
    
//     if (now < start) return { text: 'Upcoming', color: '#f59e0b', bg: '#f59e0b20' };
//     if (now > end) return { text: 'Expired', color: '#6b7280', bg: '#6b728020' };
//     return { text: 'Playing Now', color: '#10b981', bg: '#10b98120' };
//   };

//   // Sorting function
//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortColumn(column);
//       setSortDirection('asc');
//     }
//     setCurrentPage(1);
//   };

//   // Get value for sorting based on column
//   const getSortValue = (row, column) => {
//     switch (column) {
//       case 'sno':
//         return row.id;
//       case 'deviceCode':
//         return row.deviceCode || '';
//       case 'deviceName':
//         return row.deviceName || '';
//       case 'contentTitle':
//         return row.contentTitle || '';
//       case 'startDatetime':
//         return new Date(row.startDatetime).getTime();
//       case 'endDatetime':
//         return new Date(row.endDatetime).getTime();
//       case 'duration':
//         return row.duration || '';
//       case 'status':
//         return row.status || '';
//       case 'scheduleStatus':
//         return getScheduleStatus(row).text;
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
  
//   const handleSave = (newOrUpdated) => {
//     setData((prev) => {
//       const exists = prev.find((d) => d.id === newOrUpdated.id);
//       if (exists) return prev.map((d) => (d.id === newOrUpdated.id ? newOrUpdated : d));
//       return [...prev, { ...newOrUpdated, id: Date.now(), regDate: newOrUpdated.regDate || new Date().toISOString() }];
//     });
//   };

//   const handleDelete = () => {
//     setData((prev) => prev.filter((item) => item.id !== deleteId));
//     setDeleteDialogOpen(false);
//     setDeleteId(null);
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
//       <ScheduleFormModal
//         open={isDialogOpen}
//         onClose={() => { setIsDialogOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//         devices={devices}
//         contents={contents}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle sx={{ fontWeight: 600 }}>
//           Are you sure you want to delete this schedule?
//         </DialogTitle>
//         <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
//           <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Breadcrumb */}
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
//           Schedule Content
//         </Typography>
//       </Breadcrumb>

//       {/* Main content card */}
//       <div style={styles.mainCard}>
//         <p style={styles.cardTitle}>Schedule Content Management</p>
//         <p style={styles.cardSubtitle}>
//           Schedule and manage content playback for Public Addressing System devices
//         </p>

//         <Divider sx={{ mb: 2.5 }} />

//         {/* Toolbar */}
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
//               Add Schedule
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

//         {/* Table */}
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
//             <Table sx={{ minWidth: 1100 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
//                   <SortableHeader column="sno">S.No</SortableHeader>
//                   <SortableHeader column="deviceCode">Device Code</SortableHeader>
//                   <SortableHeader column="deviceName">Device Name</SortableHeader>
//                   <SortableHeader column="contentTitle">Content Title</SortableHeader>
//                   <SortableHeader column="startDatetime">Start Datetime</SortableHeader>
//                   <SortableHeader column="endDatetime">End Datetime</SortableHeader>
//                   <SortableHeader column="duration">Duration</SortableHeader>
//                   {/* <SortableHeader column="scheduleStatus">Schedule Status</SortableHeader> */}
//                   <SortableHeader column="status">Status</SortableHeader>
//                   {/* <SortableHeader column="registerDate">Schedule Date</SortableHeader> */}
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
//                     Action 
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedRows.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center" sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
//                       No records found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedRows.map((row, index) => {
//                     const scheduleStatus = getScheduleStatus(row);
//                     return (
//                       <TableRow
//                         key={row.id}
//                         hover
//                         sx={{ '&:last-child td': { border: 0 } }}
//                       >
//                         <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                           {index + 1 + (currentPage - 1) * entries}
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.deviceCode}</TableCell>
//                         <TableCell sx={{ fontSize: '13px' }}>{row.deviceName}</TableCell>
//                         <TableCell sx={{ fontSize: '13px', fontWeight: 500 }}>{row.contentTitle}</TableCell>
//                         <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
//                           {new Date(row.startDatetime).toLocaleString()}
//                         </TableCell>
//                         <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
//                           {new Date(row.endDatetime).toLocaleString()}
//                         </TableCell>
//                         <TableCell sx={{ fontSize: '13px' }}>{row.duration || '—'}</TableCell>
//                         <TableCell>
//                           <span
//                             style={{
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               gap: '4px',
//                               padding: '2px 10px',
//                               borderRadius: '20px',
//                               fontSize: '12px',
//                               fontWeight: 700,
//                               background: scheduleStatus.bg,
//                               color: scheduleStatus.color,
//                               border: `1px solid ${scheduleStatus.color}40`,
//                             }}
//                           >
//                             {scheduleStatus.text === 'Playing Now' ? '🔴' : '●'} {scheduleStatus.text}
//                           </span>
//                         </TableCell>
//                         <TableCell>
//                           <span
//                             style={{
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               gap: '4px',
//                               padding: '2px 10px',
//                               borderRadius: '20px',
//                               fontSize: '12px',
//                               fontWeight: 700,
//                               background: row.status === 'Active' ? '#10b98120' : '#ef444420',
//                               color: row.status === 'Active' ? '#10b981' : '#ef4444',
//                               border: `1px solid ${row.status === 'Active' ? '#10b98140' : '#ef444440'}`,
//                             }}
//                           >
//                             ● {row.status}
//                           </span>
//                         </TableCell>
//                         <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
//                           {new Date(row.regDate).toLocaleString()}
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                             <IconButton
//                               size="small"
//                               title="Edit"
//                               sx={{ color: C.primary }}
//                               onClick={() => handleEdit(row)}
//                             >
//                               <EditIcon fontSize="small" />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               title="Delete"
//                               sx={{ color: C.error }}
//                               onClick={() => {
//                                 setDeleteId(row.id);
//                                 setDeleteDialogOpen(true);
//                               }}
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </IconButton>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Pagination */}
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

// export default ScheduleContent;


///=================

































//---------------------best code below----------------------------

// import React, { useState, useEffect, useRef } from 'react';
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
//   Switch, FormControlLabel, Alert, CircularProgress, Chip,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint, FaCalendarAlt } from 'react-icons/fa';
// import { API_URL } from "../../../config";

// // ─── Constants ─────────────────────────────────────────────────────────────────
// const C = {
//   primary:   '#2563eb',
//   secondary: '#8b5cf6',
//   success:   '#10b981',
//   error:     '#ef4444',
//   info:      '#06b6d4',
//   warning:   '#f59e0b',
// };

// // ─── PAS-py (ESP32 controller) ────────────────────────────────────────────────
// const PAS_PY_URL = 'https://paspy.puducherrysmartcity.in';
// const TICK_MS    = 10_000; // check every 10 seconds

// // ─── Token — read dynamically from cookie / localStorage / sessionStorage ─────
// const getToken = () => {
//   // 1. Try cookies first
//   for (const cookie of document.cookie.split(';')) {
//     const parts = cookie.trim().split('=');
//     const key   = parts[0];
//     const val   = parts.slice(1).join('=');
//     if (['authToken', 'token', 'jwt', 'access_token', 'Authorization'].includes(key))
//       return decodeURIComponent(val);
//   }
//   // 2. localStorage
//   for (const k of ['authToken', 'token', 'jwt', 'access_token']) {
//     const v = localStorage.getItem(k);
//     if (v) return v;
//   }
//   // 3. sessionStorage
//   for (const k of ['authToken', 'token', 'jwt', 'access_token']) {
//     const v = sessionStorage.getItem(k);
//     if (v) return v;
//   }
//   return '';
// };

// const authHeaders = () => ({
//   accept: '*/*',
//   Authorization: `Bearer ${getToken()}`,
//   'Content-Type': 'application/json',
// });

// // ─── Date helpers ─────────────────────────────────────────────────────────────
// /**
//  * Parse "YYYY-MM-DDTHH:mm:ss" (IST, no Z) → UTC ms, safe on any machine.
//  */
// const toUTCms = (str) => {
//   if (!str) return NaN;
//   if (str.endsWith('Z') || str.includes('+') || /T.*-\d\d:\d\d$/.test(str))
//     return new Date(str).getTime();
//   return new Date(str + '+05:30').getTime();
// };

// /**
//  * "YYYY-MM-DDTHH:mm:ss" (IST) → datetime-local input value
//  */
// const istToLocal = (istStr) => {
//   if (!istStr) return '';
//   const d = new Date(
//     istStr.includes('Z') || istStr.includes('+') ? istStr : istStr + '+05:30'
//   );
//   const pad = (n) => String(n).padStart(2, '0');
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
// };

// // ─── PAS-py API helpers ───────────────────────────────────────────────────────
// /**
//  * PUT https://paspy.puducherrysmartcity.in/setup
//  * Tells the PAS-py controller which device IP to target.
//  */
// const pasSetup = async (ip) => {
//   const res = await fetch(`${PAS_PY_URL}/setup`, {
//     method: 'PUT',
//     headers: { accept: 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ip }),
//   });
//   if (!res.ok) throw new Error(`Setup failed: HTTP ${res.status}`);
//   return res.json();
// };

// /**
//  * POST https://paspy.puducherrysmartcity.in/action/play
//  */
// const pasPlay = async (ip) => {
//   const res = await fetch(`${PAS_PY_URL}/action/play`, {
//     method: 'POST',
//     headers: { accept: 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ip }),
//   });
//   if (!res.ok) throw new Error(`Play failed: HTTP ${res.status}`);
//   return res.json();
// };

// /**
//  * POST https://paspy.puducherrysmartcity.in/action/stop
//  */
// const pasStop = async (ip) => {
//   const res = await fetch(`${PAS_PY_URL}/action/stop`, {
//     method: 'POST',
//     headers: { accept: 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ip }),
//   });
//   if (!res.ok) throw new Error(`Stop failed: HTTP ${res.status}`);
//   return res.json();
// };

// /**
//  * Run setup + action on multiple IPs in parallel; collect results.
//  */
// const runActionOnDevices = async (ips, action /* 'play' | 'stop' */) => {
//   const result = { success: [], failed: [] };
//   await Promise.allSettled(
//     ips.map(async (ip) => {
//       try {
//         await pasSetup(ip);
//         if (action === 'play') await pasPlay(ip);
//         else                   await pasStop(ip);
//         result.success.push(ip);
//         console.log(`[PAS-py] ✅ ${action} → ${ip}`);
//       } catch (err) {
//         result.failed.push(ip);
//         console.error(`[PAS-py] ❌ ${action} failed → ${ip}:`, err.message);
//       }
//     })
//   );
//   return result;
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = {
//   root: {
//     width: '100%', minHeight: '100%', boxSizing: 'border-box',
//     padding: '24px', backgroundColor: '#EEF2F6',
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   breadcrumbCard: {
//     width: '100%', boxSizing: 'border-box', background: '#fff',
//     borderRadius: '16px', padding: '14px 24px', marginBottom: '20px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: `4px solid ${C.primary}`,
//   },
//   mainCard: {
//     width: '100%', boxSizing: 'border-box', background: '#fff',
//     borderRadius: '16px', padding: '28px 32px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: `4px solid ${C.secondary}`,
//   },
//   cardTitle: {
//     fontSize: '20px', fontWeight: 700,
//     background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
//     WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text', margin: '0 0 4px',
//   },
//   cardSubtitle: { fontSize: '13px', color: '#6b7280', margin: '0 0 20px' },
// };

// // ─── Breadcrumb ───────────────────────────────────────────────────────────────
// const Breadcrumb = ({ children }) => (
//   <div style={styles.breadcrumbCard}>
//     <Breadcrumbs aria-label="breadcrumb" separator="›">{children}</Breadcrumbs>
//   </div>
// );

// // ─── Export helpers ───────────────────────────────────────────────────────────
// const exportToCSV = (data) => {
//   if (!data.length) return;
//   const H = ['Name', 'Device', 'IP Address', 'Start DateTime (IST)', 'Replay', 'Status', 'Created At'];
//   const rows = data.map((r) => [
//     r.name || '', r.deviceName || '', r.ipAddress || '',
//     r.startDateTime, r.replay ? 'Yes' : 'No',
//     r.status ? 'Active' : 'Inactive', r.reDate || '',
//   ]);
//   const csv = [H, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
//   const a = document.createElement('a');
//   a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
//   a.download = 'PAS_Schedule.csv'; a.click();
// };

// const exportToExcel = (data) => {
//   if (!data.length) return;
//   const H = ['Name', 'Device', 'IP Address', 'Start DateTime (IST)', 'Replay', 'Status', 'Created At'];
//   const rows = data.map((r) => [
//     r.name || '', r.deviceName || '', r.ipAddress || '',
//     r.startDateTime, r.replay ? 'Yes' : 'No',
//     r.status ? 'Active' : 'Inactive', r.reDate || '',
//   ]);
//   let tbl = `<table><tr>${H.map((h) => `<th>${h}</th>`).join('')}</tr>`;
//   rows.forEach((r) => { tbl += `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`; });
//   tbl += '</table>';
//   const a = document.createElement('a');
//   a.href = URL.createObjectURL(new Blob([`<html><body>${tbl}</body></html>`], { type: 'application/vnd.ms-excel' }));
//   a.download = 'PAS_Schedule.xls'; a.click();
// };

// const exportToPDF = (data) => {
//   if (!data.length) return;
//   const H = ['Name', 'Device', 'IP Address', 'Start DateTime', 'Replay', 'Status'];
//   const rows = data.map((r) => [
//     r.name || '', r.deviceName || '', r.ipAddress || '',
//     r.startDateTime, r.replay ? 'Yes' : 'No', r.status ? 'Active' : 'Inactive',
//   ]);
//   const html = `<html><head><style>body{font-family:sans-serif;font-size:12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 8px}th{background:#c6ccc7}</style></head><body><h2>PAS Schedule</h2><table><thead><tr>${H.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;
//   const w = window.open('', '_blank');
//   w.document.write(html); w.document.close(); w.print();
// };

// const ExportButtons = ({ tableData }) => (
//   <Box sx={{ display: 'flex', gap: 1 }}>
//     {[
//       { label: 'Excel', color: 'success', icon: <FaFileExcel size={14} />, fn: () => exportToExcel(tableData) },
//       { label: 'CSV',   color: 'info',    icon: <FaFileCsv   size={14} />, fn: () => exportToCSV(tableData)   },
//       { label: 'PDF',   color: 'error',   icon: <FaFilePdf   size={14} />, fn: () => exportToPDF(tableData)   },
//       { label: 'Print', color: 'inherit', icon: <FaPrint     size={14} />, fn: () => window.print()            },
//     ].map(({ label, color, icon, fn }) => (
//       <Button key={label} size="small" variant="outlined" color={color}
//         startIcon={icon} onClick={fn}
//         sx={{
//           textTransform: 'none', fontSize: '13px', borderRadius: '6px',
//           ...(color === 'inherit' ? { color: '#555', borderColor: '#aaa' } : {}),
//         }}>
//         {label}
//       </Button>
//     ))}
//   </Box>
// );

// // ─── Empty form ───────────────────────────────────────────────────────────────
// const getEmptyForm = () => {
//   const now = new Date();
//   const pad = (n) => String(n).padStart(2, '0');
//   const fmt = (d) =>
//     `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
//   const start = new Date(now.getTime() + 2 * 60000);
//   return { name: '', deviceIds: [], tempId: '', startDateTime: fmt(start), replay: false, status: true };
// };

// // ─── Schedule Form Modal ──────────────────────────────────────────────────────
// const ScheduleFormModal = ({ open, onClose, onSave, editData, devices, contents }) => {
//   const [form, setForm]     = useState(getEmptyForm());
//   const [error, setError]   = useState('');
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         setForm({
//           name:          editData.name || '',
//           // Support both deviceIds array and single deviceId field from API response
//           deviceIds:     editData.deviceIds?.length
//                            ? editData.deviceIds
//                            : editData.deviceId ? [editData.deviceId] : [],
//           tempId:        editData.tempId ?? '',
//           startDateTime: istToLocal(editData.startDateTime),
//           replay:        editData.replay === true,
//           status:        editData.status !== undefined ? editData.status : true,
//         });
//       } else {
//         setForm(getEmptyForm());
//       }
//       setError('');
//     }
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setError('');
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDeviceChange = (e) => {
//     const v = e.target.value;
//     setForm((prev) => ({ ...prev, deviceIds: typeof v === 'string' ? v.split(',') : v }));
//   };

//   const handleSubmit = async () => {
//     if (!form.name.trim())                         { alert('Please enter a schedule name.'); return; }
//     if (!form.deviceIds.length)                    { alert('Please select at least one device.'); return; }
//     if (form.tempId === '' || form.tempId === null) { alert('Please select content.'); return; }
//     if (!form.startDateTime)                       { alert('Please set start datetime.'); return; }

//     setSaving(true);
//     try {
//       const payload = {
//         name:          form.name,
//         deviceIds:     form.deviceIds.map((id) => (typeof id === 'string' ? parseInt(id, 10) : id)),
//         tempId:        typeof form.tempId === 'string' ? parseInt(form.tempId, 10) : form.tempId,
//         startDateTime: form.startDateTime,  // "YYYY-MM-DDTHH:mm" — IST, no Z
//         replay:        form.replay,
//         status:        form.status,
//       };
//       await onSave(payload, editData?.id);
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Failed to save schedule');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const selectedDeviceNames = form.deviceIds
//     .map((id) => {
//       const d = devices.find((dev) => String(dev.id) === String(id));
//       return d ? `${d.deviceCode} – ${d.name}` : id;
//     })
//     .join(', ');

//   const selectedContent = contents.find((c) => String(c.id) === String(form.tempId));

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{
//         fontWeight: 700, fontSize: '18px', pb: 1,
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//       }}>
//         {editData ? 'Edit Schedule' : 'Add Schedule'}
//         <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}><CloseIcon /></IconButton>
//       </DialogTitle>
//       <Divider />
//       <DialogContent sx={{ pt: 2 }}>
//         <Grid container spacing={2} direction="column">

//           {/* Name */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Schedule Name" name="name"
//               value={form.name} onChange={handleChange} size="small" required
//               placeholder="Enter schedule name" />
//           </Grid>

//           {/* Device multi-select */}
//           <Grid item xs={12}>
//             <FormControl fullWidth size="small" required>
//               <InputLabel>Select Device(s)</InputLabel>
//               <MuiSelect multiple name="deviceIds" value={form.deviceIds}
//                 label="Select Device(s)" onChange={handleDeviceChange}
//                 renderValue={(selected) =>
//                   selected.length === 0
//                     ? 'Select devices'
//                     : selected.map((id) => {
//                         const d = devices.find((dev) => String(dev.id) === String(id));
//                         return d ? d.deviceCode : id;
//                       }).join(', ')
//                 }>
//                 {devices.map((dev) => (
//                   <MenuItem key={dev.id} value={dev.id}>
//                     {dev.deviceCode} — {dev.name}
//                     <Typography variant="caption" sx={{ ml: 1, color: '#6b7280' }}>
//                       ({dev.ipAddress})
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           {form.deviceIds.length > 0 && (
//             <Grid item xs={12}>
//               <Alert severity="info" sx={{ fontSize: '13px' }}>
//                 Selected: <strong>{selectedDeviceNames}</strong>
//               </Alert>
//             </Grid>
//           )}

//           {/* Content */}
//           <Grid item xs={12}>
//             <FormControl fullWidth size="small" required>
//               <InputLabel>Select Content</InputLabel>
//               <MuiSelect name="tempId" value={form.tempId} label="Select Content"
//                 onChange={(e) => setForm((p) => ({ ...p, tempId: e.target.value }))}>
//                 <MenuItem value="">-- Select Content --</MenuItem>
//                 {contents.map((c) => (
//                   <MenuItem key={c.id} value={c.id}>
//                     {c.deviceData} ({c.deviceCode})
//                   </MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           {selectedContent && (
//             <Grid item xs={12}>
//               <Alert severity="success" sx={{ fontSize: '13px' }}>
//                 Content: <strong>{selectedContent.deviceData}</strong> — {selectedContent.deviceCode}
//               </Alert>
//             </Grid>
//           )}

//           {/* Start datetime */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Start Datetime (IST)" name="startDateTime"
//               value={form.startDateTime} onChange={handleChange}
//               size="small" type="datetime-local" required
//               InputLabelProps={{ shrink: true }}
//               helperText="Scheduler will call PAS-py setup → play at this IST time"
//               InputProps={{
//                 startAdornment: (
//                   <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
//                     <FaCalendarAlt size={14} color="#6b7280" />
//                   </Box>
//                 ),
//               }} />
//           </Grid>

//           {error && (
//             <Grid item xs={12}>
//               <Alert severity="error" sx={{ fontSize: '13px' }}>{error}</Alert>
//             </Grid>
//           )}

//           {/* AutoPlay (Replay) toggle */}
//           <Grid item xs={12}>
//             <Box sx={{
//               display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//               border: '1px solid #e5e7eb', borderRadius: '8px', px: 2, py: 1.5,
//               background: form.replay ? '#10b98108' : '#f9fafb',
//             }}>
//               <Box>
//                 <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
//                   🔁 AutoPlay (Replay)
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#6b7280' }}>
//                   {form.replay
//                     ? 'Content will replay continuously after playing'
//                     : 'Content will play once at scheduled time'}
//                 </Typography>
//               </Box>
//               <Switch
//                 checked={form.replay === true}
//                 onChange={(e) => setForm((p) => ({ ...p, replay: e.target.checked }))}
//                 color="success"
//               />
//             </Box>
//           </Grid>

//           {/* Status toggle */}
//           <Grid item xs={12}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={form.status === true}
//                   onChange={(e) => setForm((p) => ({ ...p, status: e.target.checked }))}
//                   color="success"
//                 />
//               }
//               label={
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   Status:{' '}
//                   <span style={{ color: form.status ? '#10b981' : '#ef4444', fontWeight: 700 }}>
//                     {form.status ? 'Active' : 'Inactive'}
//                   </span>
//                 </Typography>
//               }
//               labelPlacement="start"
//               sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button onClick={onClose} variant="outlined" color="inherit"
//           sx={{ textTransform: 'none' }} disabled={saving}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" color="info"
//           sx={{ textTransform: 'none', fontWeight: 600 }} disabled={saving}
//           startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
//           {saving ? 'Saving…' : editData ? 'Update Schedule' : 'Add Schedule'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ScheduleContent = () => {
//   const [data, setData]               = useState([]);
//   const [devices, setDevices]         = useState([]);
//   const [contents, setContents]       = useState([]);
//   const [entries, setEntries]         = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDialogOpen, setIsDialogOpen]         = useState(false);
//   const [currentPage, setCurrentPage]           = useState(1);
//   const [editData, setEditData]                 = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId]                 = useState(null);
//   const [loading, setLoading]                   = useState(false);
//   const [tableError, setTableError]             = useState('');
//   const [tickLog, setTickLog]                   = useState('');

//   // Sorting
//   const [sortColumn, setSortColumn]       = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   // Refs so interval always reads fresh state without re-mounting
//   const dataRef    = useRef([]);
//   const devicesRef = useRef([]);
//   const tickRef    = useRef(null);

//   /**
//    * schedulerState tracks per-schedule playback state:
//    *   'idle'    → not yet triggered
//    *   'playing' → play command sent successfully
//    *   'stopped' → played once (replay=false), will not re-trigger
//    *   'error'   → last attempt failed, will retry next tick
//    */
//   const schedulerState = useRef({});

//   // Force badge re-render from within the interval
//   const [, forceRender] = useState(0);

//   // Keep refs in sync with state
//   useEffect(() => { dataRef.current    = data;    }, [data]);
//   useEffect(() => { devicesRef.current = devices; }, [devices]);

//   // ── Fetch schedules ─────────────────────────────────────────────────────────
//   // GET https://pasapi.puducherrysmartcity.in/api/schedules
//   // Response already contains: ipAddress, deviceName, isStarted, isCompleted, etc.
//   const fetchSchedules = async () => {
//     setLoading(true); setTableError('');
//     try {
//       const res = await fetch(`${API_URL}/api/schedules`, { headers: authHeaders() });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       const list = Array.isArray(json) ? json : [];
//       setData(list);
//       dataRef.current = list;
//     } catch (err) {
//       setTableError('Failed to load schedules: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Devices for the Add/Edit form dropdown
//   const fetchDevices = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/Device/GetDevicesByType?deviceType=PAS`, { headers: authHeaders() });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const list = await res.json();
//       setDevices(list);
//       devicesRef.current = list;
//     } catch (err) { console.error('[Devices]', err); }
//   };

//   // Contents for the Add/Edit form dropdown
//   const fetchContents = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/DeviceDetail/GetDeviceDetailByDeviceType/PAS`, { headers: authHeaders() });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       setContents(await res.json());
//     } catch (err) { console.error('[Contents]', err); }
//   };

//   useEffect(() => {
//     fetchSchedules();
//     fetchDevices();
//     fetchContents();
//   }, []);

//   // ── Scheduler Tick ──────────────────────────────────────────────────────────
//   // Runs every TICK_MS ms (10 seconds).
//   //
//   // For each active, non-completed schedule whose startDateTime ≤ now AND state === 'idle':
//   //   1. Call PUT  https://paspy.puducherrysmartcity.in/setup   { ip }
//   //   2. Call POST https://paspy.puducherrysmartcity.in/action/play { ip }
//   //
//   // If replay=false → mark 'stopped' after first play (no re-trigger).
//   // If setup/play fails → reset to 'idle' so next tick retries.
//   const runSchedulerTick = async () => {
//     const schedules = dataRef.current;
//     const nowMs     = Date.now();
//     const nowIST    = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
//     setTickLog(`Last tick: ${nowIST} IST`);

//     for (const schedule of schedules) {
//       const sid = schedule.id;

//       // Skip inactive schedules
//       if (!schedule.status) continue;

//       // If server marks completed, sync our local state
//       if (schedule.isCompleted) {
//         if (schedulerState.current[sid] === 'playing') {
//           schedulerState.current[sid] = 'stopped';
//           forceRender((n) => n + 1);
//         }
//         continue;
//       }

//       const startMs = toUTCms(schedule.startDateTime);
//       const state   = schedulerState.current[sid] || 'idle';

//       if (isNaN(startMs)) {
//         console.warn(`[Tick] ⚠️ Invalid startDateTime for "${schedule.name}" (id=${sid})`);
//         continue;
//       }

//       // IP comes directly from the GET /api/schedules response
//       const ip = schedule.ipAddress;
//       if (!ip) {
//         console.warn(`[Tick] ⚠️ No ipAddress for schedule "${schedule.name}" (id=${sid}) — skipping`);
//         continue;
//       }

//       console.log(
//         `[Tick] "${schedule.name}" | state=${state} | ip=${ip}`,
//         `| startIST=${schedule.startDateTime} | due=${nowMs >= startMs}`,
//       );

//       // ── Time to PLAY (only trigger once per schedule unless it errors) ──────
//       if (nowMs >= startMs && (state === 'idle' || state === 'error')) {
//         schedulerState.current[sid] = 'playing';
//         forceRender((n) => n + 1);

//         console.log(`[Scheduler] ▶ Triggering for "${schedule.name}" → IP ${ip}`);

//         try {
//           // Step 1: Register device IP with PAS-py controller
//           console.log(`[Scheduler] 📡 Setup → ${ip}`);
//           await pasSetup(ip);
//           console.log(`[Scheduler] ✅ Setup OK → ${ip}`);

//           // Step 2: Send play command
//           console.log(`[Scheduler] ▶ Play → ${ip}`);
//           await pasPlay(ip);
//           console.log(`[Scheduler] ✅ Play OK → ${ip}`);

//           // Step 3: For non-replay schedules, mark as stopped so we don't re-trigger
//           if (!schedule.replay) {
//             schedulerState.current[sid] = 'stopped';
//             forceRender((n) => n + 1);
//             console.log(`[Scheduler] ⏹ replay=false; marked stopped for "${schedule.name}"`);
//           }
//           // For replay=true the device loops internally; we just leave state='playing'
//         } catch (err) {
//           console.error(`[Scheduler] ❌ Failed for "${schedule.name}" (${ip}):`, err.message);
//           schedulerState.current[sid] = 'error'; // will retry on next tick
//           forceRender((n) => n + 1);
//         }
//       }
//     }
//   };

//   // Bootstrap scheduler once on mount; clean up on unmount
//   useEffect(() => {
//     // 2-second delay to allow initial data fetch to complete
//     const bootstrap = setTimeout(() => {
//       runSchedulerTick();
//       tickRef.current = setInterval(runSchedulerTick, TICK_MS);
//     }, 2000);
//     return () => {
//       clearTimeout(bootstrap);
//       clearInterval(tickRef.current);
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ── Save — POST (add) or PUT (edit) ────────────────────────────────────────
//   // POST https://pasapi.puducherrysmartcity.in/api/schedules
//   // PUT  https://pasapi.puducherrysmartcity.in/api/schedules/{id}
//   //
//   // PUT body must include "id" field (required by the API).
//   const handleSave = async (payload, id) => {
//     const isEdit = Boolean(id);
//     const method = isEdit ? 'PUT' : 'POST';
//     const url    = isEdit
//       ? `${API_URL}/api/schedules/${id}`
//       : `${API_URL}/api/schedules`;

//     const body = isEdit ? { id, ...payload } : payload;

//     const res = await fetch(url, {
//       method,
//       headers: authHeaders(),
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => '');
//       throw new Error(text || `HTTP ${res.status}`);
//     }

//     // Reset scheduler state so it re-evaluates timing for updated schedule
//     if (isEdit) delete schedulerState.current[id];

//     await fetchSchedules();
//   };

//   // ── Delete ─────────────────────────────────────────────────────────────────
//   // DELETE https://pasapi.puducherrysmartcity.in/api/schedules/{id}
//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/schedules/${deleteId}`, {
//         method: 'DELETE',
//         headers: authHeaders(),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       delete schedulerState.current[deleteId];
//       setDeleteDialogOpen(false);
//       setDeleteId(null);
//       await fetchSchedules();
//     } catch (err) {
//       alert('Delete failed: ' + err.message);
//     }
//   };

//   // ── Schedule status badge ─────────────────────────────────────────────────
//   const getScheduleStatus = (row) => {
//     if (!row.status)     return { text: 'Inactive',    color: '#ef4444', bg: '#ef444420' };
//     if (row.isCompleted) return { text: 'Completed',   color: '#6b7280', bg: '#6b728020' };
//     const state   = schedulerState.current[row.id] || 'idle';
//     const nowMs   = Date.now();
//     const startMs = toUTCms(row.startDateTime);
//     if (state === 'playing')                return { text: 'Playing Now', color: '#10b981', bg: '#10b98120' };
//     if (state === 'stopped')                return { text: 'Played',      color: '#6b7280', bg: '#6b728020' };
//     if (state === 'error')                  return { text: 'Retrying…',   color: '#f59e0b', bg: '#f59e0b20' };
//     if (!isNaN(startMs) && nowMs < startMs) return { text: 'Upcoming',    color: '#f59e0b', bg: '#f59e0b20' };
//     return { text: 'Active', color: '#10b981', bg: '#10b98120' };
//   };

//   // ── Sorting ───────────────────────────────────────────────────────────────
//   const handleSort = (col) => {
//     if (sortColumn === col) setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
//     else { setSortColumn(col); setSortDirection('asc'); }
//     setCurrentPage(1);
//   };

//   const getSortValue = (row, col) => {
//     switch (col) {
//       case 'name':          return (row.name || '').toLowerCase();
//       case 'startDateTime': return toUTCms(row.startDateTime);
//       case 'status':        return row.status ? 1 : 0;
//       case 'replay':        return row.replay ? 1 : 0;
//       case 'reDate':        return toUTCms(row.reDate);
//       default: return '';
//     }
//   };

//   // ── Filter + sort + paginate ─────────────────────────────────────────────
//   const filteredRows = data.filter((row) =>
//     [row.name, row.deviceName, row.ipAddress, row.status ? 'active' : 'inactive'].some((f) =>
//       (f || '').toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const sortedRows = [...filteredRows];
//   if (sortColumn) {
//     sortedRows.sort((a, b) => {
//       const va = getSortValue(a, sortColumn), vb = getSortValue(b, sortColumn);
//       if (va < vb) return sortDirection === 'asc' ? -1 : 1;
//       if (va > vb) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

//   // ── Sortable header cell ─────────────────────────────────────────────────
//   const SortableHeader = ({ column, children }) => (
//     <TableCell
//       sx={{
//         fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap',
//         cursor: 'pointer', userSelect: 'none', '&:hover': { backgroundColor: '#e5e9ed' },
//       }}
//       onClick={() => handleSort(column)}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//         {children}
//         <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>
//           {sortColumn === column && (sortDirection === 'asc'
//             ? <ArrowUpwardIcon  sx={{ fontSize: 14, color: C.primary }} />
//             : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />)}
//         </Box>
//       </Box>
//     </TableCell>
//   );

//   // ── Countdown helper ─────────────────────────────────────────────────────
//   const getCountdown = (row) => {
//     const nowMs   = Date.now();
//     const startMs = toUTCms(row.startDateTime);
//     const diff    = startMs - nowMs;
//     if (diff <= 0) return null;
//     const totalSec = Math.floor(diff / 1000);
//     const h = Math.floor(totalSec / 3600);
//     const m = Math.floor((totalSec % 3600) / 60);
//     const s = totalSec % 60;
//     if (h > 0) return `in ${h}h ${m}m`;
//     if (m > 0) return `in ${m}m ${s}s`;
//     return `in ${s}s`;
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div style={styles.root}>

//       {/* Add / Edit modal */}
//       <ScheduleFormModal
//         open={isDialogOpen}
//         onClose={() => { setIsDialogOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//         devices={devices}
//         contents={contents}
//       />

//       {/* Delete confirmation dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle sx={{ fontWeight: 600 }}>Delete this schedule?</DialogTitle>
//         <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
//           <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit">Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Breadcrumb */}
//       <Breadcrumb>
//         <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
//           sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//           Home
//         </Typography>
//         <Typography variant="subtitle2" color="primary">Schedule Content</Typography>
//       </Breadcrumb>

//       {/* Main card */}
//       <div style={styles.mainCard}>
//         <p style={styles.cardTitle}>Schedule Content Management</p>
//         <p style={styles.cardSubtitle}>
//           Schedule content playback for PAS devices — auto-play via PAS-py controller (setup → play) at scheduled IST time
//         </p>

//         {/* Live indicator chips */}
//         <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
//           {/* <Chip
//             label={`⏱ Scheduler active — every ${TICK_MS / 1000}s`}
//             size="small"
//             sx={{ background: '#10b98120', color: '#10b981', fontWeight: 600, fontSize: '12px' }}
//           /> */}
//           {/* <Chip
//             label="🔌 PAS API: pasapi.puducherrysmartcity.in"
//             size="small"
//             sx={{ background: '#2563eb20', color: '#2563eb', fontWeight: 600, fontSize: '12px' }}
//           /> */}
//           {/* <Chip
//             label="🎛 PAS-py: paspy.puducherrysmartcity.in"
//             size="small"
//             sx={{ background: '#8b5cf620', color: '#8b5cf6', fontWeight: 600, fontSize: '12px' }}
//           /> */}
//           {/* <Chip
//             label="🕐 Timezone: IST (UTC+05:30)"
//             size="small"
//             sx={{ background: '#f59e0b20', color: '#f59e0b', fontWeight: 600, fontSize: '12px' }}
//           /> */}
//           {tickLog && (
//             <Typography variant="caption" color="text.secondary">{tickLog}</Typography>
//           )}
//         </Box>

//         <Divider sx={{ mb: 2.5 }} />

//         {/* Toolbar */}
//         <Box sx={{
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           mb: 2.5, flexWrap: 'wrap', gap: 2,
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2">Show</Typography>
//               <Select size="small" value={entries}
//                 onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
//                 sx={{ minWidth: 70 }}>
//                 {[10, 25, 50, 100].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
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
//               Add Schedule
//             </Button>
//             <Paper sx={{
//               display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5,
//               borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb',
//             }}>
//               <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
//                 value={searchQuery}
//                 onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
//             </Paper>
//           </Box>
//         </Box>

//         {tableError && <Alert severity="error" sx={{ mb: 2 }}>{tableError}</Alert>}

//         {/* Table */}
//         <Box sx={{ width: '100%', overflowX: 'auto' }}>
//           <TableContainer component={Paper}
//             sx={{ borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
//             <Table sx={{ minWidth: 1100 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151' }}>S.No</TableCell>
//                   <SortableHeader column="name">Name</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Device / IP</TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Content</TableCell>
//                   <SortableHeader column="startDateTime">Start (IST)</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Countdown</TableCell>
//                   <SortableHeader column="replay">AutoPlay</SortableHeader>
//                   <SortableHeader column="status">Status</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Schedule Status</TableCell>
//                   <SortableHeader column="reDate">Created At</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151' }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
//                       <CircularProgress size={32} />
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedRows.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center"
//                       sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
//                       No records found
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedRows.map((row, idx) => {
//                   const sched     = getScheduleStatus(row);
//                   const countdown = getCountdown(row);
//                   return (
//                     <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>

//                       {/* S.No */}
//                       <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
//                         {idx + 1 + (currentPage - 1) * entries}
//                       </TableCell>

//                       {/* Name */}
//                       <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.name || '—'}</TableCell>

//                       {/* Device name + IP + online status (all from API response) */}
//                       <TableCell sx={{ fontSize: '12px' }}>
//                         <Box>
//                           <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '12px' }}>
//                             {row.deviceName || '—'}
//                           </Typography>
//                           {row.ipAddress && (
//                             <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block' }}>
//                               {row.ipAddress}
//                             </Typography>
//                           )}
//                           {row.deviceStatus && (
//                             <Typography variant="caption" sx={{
//                               color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
//                               fontWeight: 600, fontSize: '10px',
//                             }}>
//                               ● {row.deviceStatus}
//                             </Typography>
//                           )}
//                         </Box>
//                       </TableCell>

//                       {/* Template / Content (from API response) */}
//                       <TableCell sx={{ fontSize: '13px' }}>
//                         {row.templateName || (row.tempId && row.tempId !== 0 ? `ID: ${row.tempId}` : '—')}
//                       </TableCell>

//                       {/* Start DateTime displayed in IST */}
//                       <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap', color: '#374151' }}>
//                         {row.startDateTime
//                           ? new Date(
//                               row.startDateTime.includes('Z') || row.startDateTime.includes('+')
//                                 ? row.startDateTime
//                                 : row.startDateTime + '+05:30'
//                             ).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
//                           : '—'}
//                       </TableCell>

//                       {/* Countdown */}
//                       <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
//                         {countdown
//                           ? <span style={{ color: '#f59e0b', fontWeight: 600 }}>{countdown}</span>
//                           : '—'}
//                       </TableCell>

//                       {/* AutoPlay / Replay */}
//                       <TableCell>
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: '4px',
//                           padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
//                           background: row.replay ? '#8b5cf620' : '#e5e7eb',
//                           color:      row.replay ? '#8b5cf6'   : '#9ca3af',
//                           border: `1px solid ${row.replay ? '#8b5cf640' : '#d1d5db'}`,
//                         }}>
//                           {row.replay ? '🔁 On' : '▶ Off'}
//                         </span>
//                       </TableCell>

//                       {/* Active / Inactive */}
//                       <TableCell>
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: '4px',
//                           padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
//                           background: row.status ? '#10b98120' : '#ef444420',
//                           color:      row.status ? '#10b981'   : '#ef4444',
//                           border: `1px solid ${row.status ? '#10b98140' : '#ef444440'}`,
//                         }}>
//                           ● {row.status ? 'Active' : 'Inactive'}
//                         </span>
//                       </TableCell>

//                       {/* Schedule status badge */}
//                       <TableCell>
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: '4px',
//                           padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
//                           background: sched.bg, color: sched.color,
//                           border: `1px solid ${sched.color}40`,
//                         }}>
//                           {sched.text === 'Playing Now' ? '🔴' : '●'} {sched.text}
//                         </span>
//                       </TableCell>

//                       {/* Created At in IST */}
//                       <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap', color: '#6b7280' }}>
//                         {row.reDate
//                           ? new Date(
//                               row.reDate.includes('Z') || row.reDate.includes('+')
//                                 ? row.reDate
//                                 : row.reDate + '+05:30'
//                             ).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
//                           : '—'}
//                       </TableCell>

//                       {/* Edit / Delete actions */}
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                           <IconButton size="small" title="Edit" sx={{ color: C.primary }}
//                             onClick={() => { setEditData(row); setIsDialogOpen(true); }}>
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" title="Delete" sx={{ color: C.error }}
//                             onClick={() => { setDeleteId(row.id); setDeleteDialogOpen(true); }}>
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Pagination */}
//         <Box sx={{
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           mt: 2.5, flexWrap: 'wrap', gap: 1,
//         }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{' '}
//             {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
//           </Typography>
//           <Stack spacing={2} direction="row">
//             <Pagination
//               count={Math.ceil(sortedRows.length / entries) || 1}
//               page={currentPage}
//               onChange={(_, p) => setCurrentPage(p)}
//               variant="outlined" shape="rounded" size="small" />
//           </Stack>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default ScheduleContent;

//---------------------best code above----------------------------


import React, { useState, useEffect, useRef } from 'react';
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
  Switch, FormControlLabel, Alert, CircularProgress, Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint, FaCalendarAlt } from 'react-icons/fa';
import { API_URL } from "../../../config";

// ─── Constants ─────────────────────────────────────────────────────────────────
const C = {
  primary:   '#2563eb',
  secondary: '#8b5cf6',
  success:   '#10b981',
  error:     '#ef4444',
  info:      '#06b6d4',
  warning:   '#f59e0b',
};

// ─── PAS-py (ESP32 controller) ────────────────────────────────────────────────
const PAS_PY_URL = 'https://paspy.puducherrysmartcity.in';
const TICK_MS    = 10_000; // check every 10 seconds

// ─── Token — read dynamically from cookie / localStorage / sessionStorage ─────
const getToken = () => {
  // 1. Try cookies first
  for (const cookie of document.cookie.split(';')) {
    const parts = cookie.trim().split('=');
    const key   = parts[0];
    const val   = parts.slice(1).join('=');
    if (['authToken', 'token', 'jwt', 'access_token', 'Authorization'].includes(key))
      return decodeURIComponent(val);
  }
  // 2. localStorage
  for (const k of ['authToken', 'token', 'jwt', 'access_token']) {
    const v = localStorage.getItem(k);
    if (v) return v;
  }
  // 3. sessionStorage
  for (const k of ['authToken', 'token', 'jwt', 'access_token']) {
    const v = sessionStorage.getItem(k);
    if (v) return v;
  }
  return '';
};

const authHeaders = () => ({
  accept: '*/*',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// ─── Date helpers ─────────────────────────────────────────────────────────────
/**
 * Parse "YYYY-MM-DDTHH:mm:ss" (IST, no Z) → UTC ms, safe on any machine.
 */
const toUTCms = (str) => {
  if (!str) return NaN;
  if (str.endsWith('Z') || str.includes('+') || /T.*-\d\d:\d\d$/.test(str))
    return new Date(str).getTime();
  return new Date(str + '+05:30').getTime();
};

/**
 * "YYYY-MM-DDTHH:mm:ss" (IST) → datetime-local input value
 */
const istToLocal = (istStr) => {
  if (!istStr) return '';
  const d = new Date(
    istStr.includes('Z') || istStr.includes('+') ? istStr : istStr + '+05:30'
  );
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// ─── PAS-py API helpers ───────────────────────────────────────────────────────
/**
 * PUT https://paspy.puducherrysmartcity.in/setup
 * Tells the PAS-py controller which device IP to target.
 */
const pasSetup = async (ip) => {
  const res = await fetch(`${PAS_PY_URL}/setup`, {
    method: 'PUT',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip }),
  });
  if (!res.ok) throw new Error(`Setup failed: HTTP ${res.status}`);
  return res.json();
};

/**
 * POST https://paspy.puducherrysmartcity.in/action/play
 */
const pasPlay = async (ip) => {
  const res = await fetch(`${PAS_PY_URL}/action/play`, {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip }),
  });
  if (!res.ok) throw new Error(`Play failed: HTTP ${res.status}`);
  return res.json();
};

/**
 * POST https://paspy.puducherrysmartcity.in/action/stop
 */
const pasStop = async (ip) => {
  const res = await fetch(`${PAS_PY_URL}/action/stop`, {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip }),
  });
  if (!res.ok) throw new Error(`Stop failed: HTTP ${res.status}`);
  return res.json();
};

/**
 * Run setup + action on multiple IPs in parallel; collect results.
 */
const runActionOnDevices = async (ips, action /* 'play' | 'stop' */) => {
  const result = { success: [], failed: [] };
  await Promise.allSettled(
    ips.map(async (ip) => {
      try {
        await pasSetup(ip);
        if (action === 'play') await pasPlay(ip);
        else                   await pasStop(ip);
        result.success.push(ip);
        console.log(`[PAS-py] ✅ ${action} → ${ip}`);
      } catch (err) {
        result.failed.push(ip);
        console.error(`[PAS-py] ❌ ${action} failed → ${ip}:`, err.message);
      }
    })
  );
  return result;
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    width: '100%', minHeight: '100%', boxSizing: 'border-box',
    padding: '24px', backgroundColor: '#EEF2F6',
    fontFamily: "'Segoe UI', sans-serif",
  },
  breadcrumbCard: {
    width: '100%', boxSizing: 'border-box', background: '#fff',
    borderRadius: '16px', padding: '14px 24px', marginBottom: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: `4px solid ${C.primary}`,
  },
  mainCard: {
    width: '100%', boxSizing: 'border-box', background: '#fff',
    borderRadius: '16px', padding: '28px 32px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderTop: `4px solid ${C.secondary}`,
  },
  cardTitle: {
    fontSize: '20px', fontWeight: 700,
    background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', margin: '0 0 4px',
  },
  cardSubtitle: { fontSize: '13px', color: '#6b7280', margin: '0 0 20px' },
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const Breadcrumb = ({ children }) => (
  <div style={styles.breadcrumbCard}>
    <Breadcrumbs aria-label="breadcrumb" separator="›">{children}</Breadcrumbs>
  </div>
);

// ─── Export helpers ───────────────────────────────────────────────────────────
const exportToCSV = (data) => {
  if (!data.length) return;
  const H = ['Name', 'Device', 'IP Address', 'Start DateTime (IST)', 'Replay', 'Status', 'Created At'];
  const rows = data.map((r) => [
    r.name || '', r.deviceName || '', r.ipAddress || '',
    r.startDateTime, r.replay ? 'Yes' : 'No',
    r.status ? 'Active' : 'Inactive', r.reDate || '',
  ]);
  const csv = [H, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'PAS_Schedule.csv'; a.click();
};

const exportToExcel = (data) => {
  if (!data.length) return;
  const H = ['Name', 'Device', 'IP Address', 'Start DateTime (IST)', 'Replay', 'Status', 'Created At'];
  const rows = data.map((r) => [
    r.name || '', r.deviceName || '', r.ipAddress || '',
    r.startDateTime, r.replay ? 'Yes' : 'No',
    r.status ? 'Active' : 'Inactive', r.reDate || '',
  ]);
  let tbl = `<table><tr>${H.map((h) => `<th>${h}</th>`).join('')}</tr>`;
  rows.forEach((r) => { tbl += `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`; });
  tbl += '</table>';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([`<html><body>${tbl}</body></html>`], { type: 'application/vnd.ms-excel' }));
  a.download = 'PAS_Schedule.xls'; a.click();
};

const exportToPDF = (data) => {
  if (!data.length) return;
  const H = ['Name', 'Device', 'IP Address', 'Start DateTime', 'Replay', 'Status'];
  const rows = data.map((r) => [
    r.name || '', r.deviceName || '', r.ipAddress || '',
    r.startDateTime, r.replay ? 'Yes' : 'No', r.status ? 'Active' : 'Inactive',
  ]);
  const html = `<html><head><style>body{font-family:sans-serif;font-size:12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 8px}th{background:#c6ccc7}</style></head><body><h2>PAS Schedule</h2><table><thead><tr>${H.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;
  const w = window.open('', '_blank');
  w.document.write(html); w.document.close(); w.print();
};

const ExportButtons = ({ tableData }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    {[
      { label: 'Excel', color: 'success', icon: <FaFileExcel size={14} />, fn: () => exportToExcel(tableData) },
      { label: 'CSV',   color: 'info',    icon: <FaFileCsv   size={14} />, fn: () => exportToCSV(tableData)   },
      // { label: 'PDF',   color: 'error',   icon: <FaFilePdf   size={14} />, fn: () => exportToPDF(tableData)   },
      // { label: 'Print', color: 'inherit', icon: <FaPrint     size={14} />, fn: () => window.print()            },
    ].map(({ label, color, icon, fn }) => (
      <Button key={label} size="small" variant="outlined" color={color}
        startIcon={icon} onClick={fn}
        sx={{
          textTransform: 'none', fontSize: '13px', borderRadius: '6px',
          ...(color === 'inherit' ? { color: '#555', borderColor: '#aaa' } : {}),
        }}>
        {label}
      </Button>
    ))}
  </Box>
);

// ─── Empty form ───────────────────────────────────────────────────────────────
const getEmptyForm = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const start = new Date(now.getTime() + 2 * 60000);
  return { name: '', deviceIds: [], tempId: '', startDateTime: fmt(start), replay: false, status: true };
};

// ─── Schedule Form Modal ──────────────────────────────────────────────────────
const ScheduleFormModal = ({ open, onClose, onSave, editData, devices, contents }) => {
  const [form, setForm]     = useState(getEmptyForm());
  const [error, setError]   = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          name:          editData.name || '',
          // Support both deviceIds array and single deviceId field from API response
          deviceIds:     editData.deviceIds?.length
                           ? editData.deviceIds
                           : editData.deviceId ? [editData.deviceId] : [],
          tempId:        editData.tempId ?? '',
          startDateTime: istToLocal(editData.startDateTime),
          replay:        editData.replay === true,
          status:        editData.status !== undefined ? editData.status : true,
        });
      } else {
        setForm(getEmptyForm());
      }
      setError('');
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeviceChange = (e) => {
    const v = e.target.value;
    setForm((prev) => ({ ...prev, deviceIds: typeof v === 'string' ? v.split(',') : v }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim())                         { alert('Please enter a schedule name.'); return; }
    if (!form.deviceIds.length)                    { alert('Please select at least one device.'); return; }
    if (form.tempId === '' || form.tempId === null) { alert('Please select content.'); return; }
    if (!form.startDateTime)                       { alert('Please set start datetime.'); return; }

    setSaving(true);
    try {
      const payload = {
        name:          form.name,
        deviceIds:     form.deviceIds.map((id) => (typeof id === 'string' ? parseInt(id, 10) : id)),
        tempId:        typeof form.tempId === 'string' ? parseInt(form.tempId, 10) : form.tempId,
        startDateTime: form.startDateTime,  // "YYYY-MM-DDTHH:mm" — IST, no Z
        replay:        form.replay,
        status:        form.status,
      };
      await onSave(payload, editData?.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save schedule');
    } finally {
      setSaving(false);
    }
  };

  const selectedDeviceNames = form.deviceIds
    .map((id) => {
      const d = devices.find((dev) => String(dev.id) === String(id));
      return d ? `${d.deviceCode} – ${d.name}` : id;
    })
    .join(', ');

  const selectedContent = contents.find((c) => String(c.id) === String(form.tempId));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{
        fontWeight: 700, fontSize: '18px', pb: 1,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        {editData ? 'Edit Schedule' : 'Add Schedule'}
        <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}><CloseIcon /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} direction="column">

          {/* Name */}
          <Grid item xs={12}>
            <TextField fullWidth label="Schedule Name" name="name"
              value={form.name} onChange={handleChange} size="small" required
              placeholder="Enter schedule name" />
          </Grid>

          {/* Device multi-select */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Select Device(s)</InputLabel>
              <MuiSelect multiple name="deviceIds" value={form.deviceIds}
                label="Select Device(s)" onChange={handleDeviceChange}
                renderValue={(selected) =>
                  selected.length === 0
                    ? 'Select devices'
                    : selected.map((id) => {
                        const d = devices.find((dev) => String(dev.id) === String(id));
                        return d ? d.deviceCode : id;
                      }).join(', ')
                }>
                {devices.map((dev) => (
                  <MenuItem key={dev.id} value={dev.id}>
                    {dev.deviceCode} — {dev.name}
                    <Typography variant="caption" sx={{ ml: 1, color: '#6b7280' }}>
                      ({dev.ipAddress})
                    </Typography>
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          {form.deviceIds.length > 0 && (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ fontSize: '13px' }}>
                Selected: <strong>{selectedDeviceNames}</strong>
              </Alert>
            </Grid>
          )}

          {/* Content */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Select Content</InputLabel>
              <MuiSelect name="tempId" value={form.tempId} label="Select Content"
                onChange={(e) => setForm((p) => ({ ...p, tempId: e.target.value }))}>
                <MenuItem value="">-- Select Content --</MenuItem>
                {contents.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.deviceData} ({c.deviceCode})
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          {selectedContent && (
            <Grid item xs={12}>
              <Alert severity="success" sx={{ fontSize: '13px' }}>
                Content: <strong>{selectedContent.deviceData}</strong> — {selectedContent.deviceCode}
              </Alert>
            </Grid>
          )}

          {/* Start datetime */}
          <Grid item xs={12}>
            <TextField fullWidth label="Start Datetime (IST)" name="startDateTime"
              value={form.startDateTime} onChange={handleChange}
              size="small" type="datetime-local" required
              InputLabelProps={{ shrink: true }}
              helperText="Scheduler will call PAS-py setup → play at this IST time"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <FaCalendarAlt size={14} color="#6b7280" />
                  </Box>
                ),
              }} />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ fontSize: '13px' }}>{error}</Alert>
            </Grid>
          )}

          {/* AutoPlay (Replay) toggle */}
          <Grid item xs={12}>
            <Box sx={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: '1px solid #e5e7eb', borderRadius: '8px', px: 2, py: 1.5,
              background: form.replay ? '#10b98108' : '#f9fafb',
            }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                  🔁 AutoPlay (Replay)
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  {form.replay
                    ? 'Content will replay continuously after playing'
                    : 'Content will play once at scheduled time'}
                </Typography>
              </Box>
              <Switch
                checked={form.replay === true}
                onChange={(e) => setForm((p) => ({ ...p, replay: e.target.checked }))}
                color="success"
              />
            </Box>
          </Grid>

          {/* Status toggle */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.status === true}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.checked }))}
                  color="success"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Status:{' '}
                  <span style={{ color: form.status ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                    {form.status ? 'Active' : 'Inactive'}
                  </span>
                </Typography>
              }
              labelPlacement="start"
              sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit"
          sx={{ textTransform: 'none' }} disabled={saving}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="info"
          sx={{ textTransform: 'none', fontWeight: 600 }} disabled={saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
          {saving ? 'Saving…' : editData ? 'Update Schedule' : 'Add Schedule'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ScheduleContent = () => {
  const [data, setData]               = useState([]);
  const [devices, setDevices]         = useState([]);
  const [contents, setContents]       = useState([]);
  const [entries, setEntries]         = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen]         = useState(false);
  const [currentPage, setCurrentPage]           = useState(1);
  const [editData, setEditData]                 = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId]                 = useState(null);
  const [loading, setLoading]                   = useState(false);
  const [tableError, setTableError]             = useState('');
  const [tickLog, setTickLog]                   = useState('');

  // Sorting
  const [sortColumn, setSortColumn]       = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Refs so interval always reads fresh state without re-mounting
  const dataRef    = useRef([]);
  const devicesRef = useRef([]);
  const tickRef    = useRef(null);

  /**
   * schedulerState tracks per-schedule playback state:
   *   'idle'    → not yet triggered
   *   'playing' → play command sent successfully
   *   'stopped' → played once (replay=false), will not re-trigger
   *   'error'   → last attempt failed, will retry next tick
   */
  const schedulerState = useRef({});

  // Force badge re-render from within the interval
  const [, forceRender] = useState(0);

  // Keep refs in sync with state
  useEffect(() => { dataRef.current    = data;    }, [data]);
  useEffect(() => { devicesRef.current = devices; }, [devices]);

  // ── Fetch schedules ─────────────────────────────────────────────────────────
  // GET https://pasapi.puducherrysmartcity.in/api/schedules
  // Response already contains: ipAddress, deviceName, isStarted, isCompleted, etc.
  const fetchSchedules = async () => {
    setLoading(true); setTableError('');
    try {
      const res = await fetch(`${API_URL}/api/schedules`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json) ? json : [];

      // ── Pre-mark already-past schedules so the scheduler never re-plays them ──
      // On every mount/refresh, any schedule whose startDateTime < now AND
      // whose state is still 'idle' (not yet tracked) gets marked 'stopped'.
      // This prevents re-playing songs that have already been played in a
      // previous session or before the component mounted.
      const nowMs = Date.now();
      list.forEach((schedule) => {
        const sid     = schedule.id;
        const startMs = toUTCms(schedule.startDateTime);
        const alreadyTracked = schedulerState.current[sid];

        if (
          !alreadyTracked &&          // not yet in our local tracker
          schedule.status &&          // schedule is active
          !schedule.isCompleted &&    // server hasn't marked it completed
          !isNaN(startMs) &&          // valid datetime
          nowMs > startMs             // time has already passed
        ) {
          // Mark as stopped — tick will skip this schedule entirely
          schedulerState.current[sid] = 'stopped';
          console.log(`[Init] ⏭ Skipping past schedule "${schedule.name}" (was due ${schedule.startDateTime} IST)`);
        }
      });

      setData(list);
      dataRef.current = list;
    } catch (err) {
      setTableError('Failed to load schedules: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Devices for the Add/Edit form dropdown
  const fetchDevices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/Device/GetDevicesByType?deviceType=PAS`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      setDevices(list);
      devicesRef.current = list;
    } catch (err) { console.error('[Devices]', err); }
  };

  // Contents for the Add/Edit form dropdown
  const fetchContents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/DeviceDetail/GetDeviceDetailByDeviceType/PAS`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setContents(await res.json());
    } catch (err) { console.error('[Contents]', err); }
  };

  useEffect(() => {
    fetchSchedules();
    fetchDevices();
    fetchContents();
  }, []);

  // ── Scheduler Tick ──────────────────────────────────────────────────────────
  // Runs every TICK_MS ms (10 seconds).
  //
  // For each active, non-completed schedule whose startDateTime ≤ now AND state === 'idle':
  //   1. Call PUT  https://paspy.puducherrysmartcity.in/setup   { ip }
  //   2. Call POST https://paspy.puducherrysmartcity.in/action/play { ip }
  //
  // If replay=false → mark 'stopped' after first play (no re-trigger).
  // If setup/play fails → reset to 'idle' so next tick retries.
  const runSchedulerTick = async () => {
    const schedules = dataRef.current;
    const nowMs     = Date.now();
    const nowIST    = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    setTickLog(`Last tick: ${nowIST} IST`);

    for (const schedule of schedules) {
      const sid = schedule.id;

      // Skip inactive schedules
      if (!schedule.status) continue;

      // If server marks completed, sync our local state
      if (schedule.isCompleted) {
        if (schedulerState.current[sid] === 'playing') {
          schedulerState.current[sid] = 'stopped';
          forceRender((n) => n + 1);
        }
        continue;
      }

      const startMs = toUTCms(schedule.startDateTime);
      const state   = schedulerState.current[sid] || 'idle';

      if (isNaN(startMs)) {
        console.warn(`[Tick] ⚠️ Invalid startDateTime for "${schedule.name}" (id=${sid})`);
        continue;
      }

      // IP comes directly from the GET /api/schedules response
      const ip = schedule.ipAddress;
      if (!ip) {
        console.warn(`[Tick] ⚠️ No ipAddress for schedule "${schedule.name}" (id=${sid}) — skipping`);
        continue;
      }

      console.log(
        `[Tick] "${schedule.name}" | state=${state} | ip=${ip}`,
        `| startIST=${schedule.startDateTime} | due=${nowMs >= startMs}`,
      );

      // ── Time to PLAY (only trigger once per schedule unless it errors) ──────
      if (nowMs >= startMs && (state === 'idle' || state === 'error')) {
        schedulerState.current[sid] = 'playing';
        forceRender((n) => n + 1);

        console.log(`[Scheduler] ▶ Triggering for "${schedule.name}" → IP ${ip}`);

        try {
          // Step 1: Register device IP with PAS-py controller
          console.log(`[Scheduler] 📡 Setup → ${ip}`);
          await pasSetup(ip);
          console.log(`[Scheduler] ✅ Setup OK → ${ip}`);

          // Step 2: Send play command
          console.log(`[Scheduler] ▶ Play → ${ip}`);
          await pasPlay(ip);
          console.log(`[Scheduler] ✅ Play OK → ${ip}`);

          // Step 3: For non-replay schedules, mark as stopped so we don't re-trigger
          if (!schedule.replay) {
            schedulerState.current[sid] = 'stopped';
            forceRender((n) => n + 1);
            console.log(`[Scheduler] ⏹ replay=false; marked stopped for "${schedule.name}"`);
          }
          // For replay=true the device loops internally; we just leave state='playing'
        } catch (err) {
          console.error(`[Scheduler] ❌ Failed for "${schedule.name}" (${ip}):`, err.message);
          schedulerState.current[sid] = 'error'; // will retry on next tick
          forceRender((n) => n + 1);
        }
      }
    }
  };

  // Bootstrap scheduler once on mount; clean up on unmount
  useEffect(() => {
    // 2-second delay to allow initial data fetch to complete
    const bootstrap = setTimeout(() => {
      runSchedulerTick();
      tickRef.current = setInterval(runSchedulerTick, TICK_MS);
    }, 2000);
    return () => {
      clearTimeout(bootstrap);
      clearInterval(tickRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save — POST (add) or PUT (edit) ────────────────────────────────────────
  // POST https://pasapi.puducherrysmartcity.in/api/schedules
  // PUT  https://pasapi.puducherrysmartcity.in/api/schedules/{id}
  //
  // PUT body must include "id" field (required by the API).
  const handleSave = async (payload, id) => {
    const isEdit = Boolean(id);
    const method = isEdit ? 'PUT' : 'POST';
    const url    = isEdit
      ? `${API_URL}/api/schedules/${id}`
      : `${API_URL}/api/schedules`;

    const body = isEdit ? { id, ...payload } : payload;

    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status}`);
    }

    // Reset scheduler state so it re-evaluates timing for updated schedule
    if (isEdit) delete schedulerState.current[id];

    await fetchSchedules();
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  // DELETE https://pasapi.puducherrysmartcity.in/api/schedules/{id}
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/api/schedules/${deleteId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      delete schedulerState.current[deleteId];
      setDeleteDialogOpen(false);
      setDeleteId(null);
      await fetchSchedules();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // ── Schedule status badge ─────────────────────────────────────────────────
  const getScheduleStatus = (row) => {
    if (!row.status)     return { text: 'Inactive',    color: '#ef4444', bg: '#ef444420' };
    if (row.isCompleted) return { text: 'Completed',   color: '#6b7280', bg: '#6b728020' };
    const state   = schedulerState.current[row.id] || 'idle';
    const nowMs   = Date.now();
    const startMs = toUTCms(row.startDateTime);
    if (state === 'playing')                return { text: 'Playing Now', color: '#10b981', bg: '#10b98120' };
    if (state === 'stopped')                return { text: 'Played',      color: '#6b7280', bg: '#6b728020' };
    if (state === 'error')                  return { text: 'Retrying…',   color: '#f59e0b', bg: '#f59e0b20' };
    if (!isNaN(startMs) && nowMs < startMs) return { text: 'Upcoming',    color: '#f59e0b', bg: '#f59e0b20' };
    return { text: 'Active', color: '#10b981', bg: '#10b98120' };
  };

  // ── Sorting ───────────────────────────────────────────────────────────────
  const handleSort = (col) => {
    if (sortColumn === col) setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortColumn(col); setSortDirection('asc'); }
    setCurrentPage(1);
  };

  const getSortValue = (row, col) => {
    switch (col) {
      case 'name':          return (row.name || '').toLowerCase();
      case 'startDateTime': return toUTCms(row.startDateTime);
      case 'status':        return row.status ? 1 : 0;
      case 'replay':        return row.replay ? 1 : 0;
      case 'reDate':        return toUTCms(row.reDate);
      default: return '';
    }
  };

  // ── Filter + sort + paginate ─────────────────────────────────────────────
  const filteredRows = data.filter((row) =>
    [row.name, row.deviceName, row.ipAddress, row.status ? 'active' : 'inactive'].some((f) =>
      (f || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows];
  if (sortColumn) {
    sortedRows.sort((a, b) => {
      const va = getSortValue(a, sortColumn), vb = getSortValue(b, sortColumn);
      if (va < vb) return sortDirection === 'asc' ? -1 : 1;
      if (va > vb) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paginatedRows = sortedRows.slice((currentPage - 1) * entries, currentPage * entries);

  // ── Sortable header cell ─────────────────────────────────────────────────
  const SortableHeader = ({ column, children }) => (
    <TableCell
      sx={{
        fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap',
        cursor: 'pointer', userSelect: 'none', '&:hover': { backgroundColor: '#e5e9ed' },
      }}
      onClick={() => handleSort(column)}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {children}
        <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>
          {sortColumn === column && (sortDirection === 'asc'
            ? <ArrowUpwardIcon  sx={{ fontSize: 14, color: C.primary }} />
            : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />)}
        </Box>
      </Box>
    </TableCell>
  );

  // ── Countdown helper ─────────────────────────────────────────────────────
  const getCountdown = (row) => {
    const nowMs   = Date.now();
    const startMs = toUTCms(row.startDateTime);
    const diff    = startMs - nowMs;
    if (diff <= 0) return null;
    const totalSec = Math.floor(diff / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `in ${h}h ${m}m`;
    if (m > 0) return `in ${m}m ${s}s`;
    return `in ${s}s`;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>

      {/* Add / Edit modal */}
      <ScheduleFormModal
        open={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
        devices={devices}
        contents={contents}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>Delete this schedule?</DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Breadcrumb */}
      <Breadcrumb>
        <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">Schedule Content</Typography>
      </Breadcrumb>

      {/* Main card */}
      <div style={styles.mainCard}>
        <p style={styles.cardTitle}>Schedule Content Management</p>
        <p style={styles.cardSubtitle}>
          Schedule content playback for PAS devices — auto-play via PAS-py controller (setup → play) at scheduled IST time
        </p>

        {/* Live indicator chips */}
        {/* <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`⏱ Scheduler active — every ${TICK_MS / 1000}s`}
            size="small"
            sx={{ background: '#10b98120', color: '#10b981', fontWeight: 600, fontSize: '12px' }}
          />
          <Chip
            label="🔌 PAS API: pasapi.puducherrysmartcity.in"
            size="small"
            sx={{ background: '#2563eb20', color: '#2563eb', fontWeight: 600, fontSize: '12px' }}
          />
          <Chip
            label="🎛 PAS-py: paspy.puducherrysmartcity.in"
            size="small"
            sx={{ background: '#8b5cf620', color: '#8b5cf6', fontWeight: 600, fontSize: '12px' }}
          />
          <Chip
            label="🕐 Timezone: IST (UTC+05:30)"
            size="small"
            sx={{ background: '#f59e0b20', color: '#f59e0b', fontWeight: 600, fontSize: '12px' }}
          />
          {tickLog && (
            <Typography variant="caption" color="text.secondary">{tickLog}</Typography>
          )}
        </Box> */}

        <Divider sx={{ mb: 2.5 }} />

        {/* Toolbar */}
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          mb: 2.5, flexWrap: 'wrap', gap: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Show</Typography>
              <Select size="small" value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                sx={{ minWidth: 70 }}>
                {[10, 25, 50, 100].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
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
              Add Schedule
            </Button>
            <Paper sx={{
              display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5,
              borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb',
            }}>
              <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
            </Paper>
          </Box>
        </Box>

        {tableError && <Alert severity="error" sx={{ mb: 2 }}>{tableError}</Alert>}

        {/* Table */}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer component={Paper}
            sx={{ borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
            <Table sx={{ minWidth: 1100 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151' }}>S.No</TableCell>
                  <SortableHeader column="name">Name</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Device / IP</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Content</TableCell>
                  <SortableHeader column="startDateTime">Start (IST)</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Countdown</TableCell>
                  <SortableHeader column="replay">AutoPlay</SortableHeader>
                  {/* <SortableHeader column="status">Status</SortableHeader> */}
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Schedule Status</TableCell>
                  <SortableHeader column="reDate">Created At</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={32} />
                    </TableCell>
                  </TableRow>
                ) : paginatedRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center"
                      sx={{ color: '#9ca3af', py: 6, fontSize: '14px' }}>
                      No records found
                    </TableCell>
                  </TableRow>
                ) : paginatedRows.map((row, idx) => {
                  const sched     = getScheduleStatus(row);
                  const countdown = getCountdown(row);
                  return (
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>

                      {/* S.No */}
                      <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>
                        {idx + 1 + (currentPage - 1) * entries}
                      </TableCell>

                      {/* Name */}
                      <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>{row.name || '—'}</TableCell>

                      {/* Device name + IP + online status (all from API response) */}
                      <TableCell sx={{ fontSize: '12px' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '12px' }}>
                            {row.deviceName || '—'}
                          </Typography>
                          {row.ipAddress && (
                            <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block' }}>
                              {row.ipAddress}
                            </Typography>
                          )}
                          {row.deviceStatus && (
                            <Typography variant="caption" sx={{
                              color: row.deviceStatus === 'ONLINE' ? '#10b981' : '#ef4444',
                              fontWeight: 600, fontSize: '10px',
                            }}>
                              ● {row.deviceStatus}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>

                      {/* Template / Content (from API response) */}
                      <TableCell sx={{ fontSize: '13px' }}>
                        {row.templateName || (row.tempId && row.tempId !== 0 ? `ID: ${row.tempId}` : '—')}
                      </TableCell>

                      {/* Start DateTime displayed in IST */}
                      <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap', color: '#374151' }}>
                        {row.startDateTime
                          ? new Date(
                              row.startDateTime.includes('Z') || row.startDateTime.includes('+')
                                ? row.startDateTime
                                : row.startDateTime + '+05:30'
                            ).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                          : '—'}
                      </TableCell>

                      {/* Countdown */}
                      <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {countdown
                          ? <span style={{ color: '#f59e0b', fontWeight: 600 }}>{countdown}</span>
                          : '—'}
                      </TableCell>

                      {/* AutoPlay / Replay */}
                      <TableCell>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                          background: row.replay ? '#8b5cf620' : '#e5e7eb',
                          color:      row.replay ? '#8b5cf6'   : '#9ca3af',
                          border: `1px solid ${row.replay ? '#8b5cf640' : '#d1d5db'}`,
                        }}>
                          {row.replay ? '🔁 On' : '▶ Off'}
                        </span>
                      </TableCell>

                      {/* Active / Inactive */}
                      {/* <TableCell>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                          background: row.status ? '#10b98120' : '#ef444420',
                          color:      row.status ? '#10b981'   : '#ef4444',
                          border: `1px solid ${row.status ? '#10b98140' : '#ef444440'}`,
                        }}>
                          ● {row.status ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell> */}

                      {/* Schedule status badge */}
                      <TableCell>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                          background: sched.bg, color: sched.color,
                          border: `1px solid ${sched.color}40`,
                        }}>
                          {sched.text === 'Playing Now' ? '🔴' : '●'} {sched.text}
                        </span>
                      </TableCell>

                      {/* Created At in IST */}
                      <TableCell sx={{ fontSize: '12px', whiteSpace: 'nowrap', color: '#6b7280' }}>
                        {row.reDate
                          ? new Date(
                              row.reDate.includes('Z') || row.reDate.includes('+')
                                ? row.reDate
                                : row.reDate + '+05:30'
                            ).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                          : '—'}
                      </TableCell>

                      {/* Edit / Delete actions */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton size="small" title="Edit" sx={{ color: C.primary }}
                            onClick={() => { setEditData(row); setIsDialogOpen(true); }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Delete" sx={{ color: C.error }}
                            onClick={() => { setDeleteId(row.id); setDeleteDialogOpen(true); }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Pagination */}
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          mt: 2.5, flexWrap: 'wrap', gap: 1,
        }}>
          <Typography variant="body2" color="text.secondary">
            Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{' '}
            {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
          </Typography>
          <Stack spacing={2} direction="row">
            <Pagination
              count={Math.ceil(sortedRows.length / entries) || 1}
              page={currentPage}
              onChange={(_, p) => setCurrentPage(p)}
              variant="outlined" shape="rounded" size="small" />
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default ScheduleContent;