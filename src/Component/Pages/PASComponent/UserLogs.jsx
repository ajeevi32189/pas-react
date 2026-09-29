import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import Cookies from 'js-cookie';

// Simple date formatter
const formatDate = (date) => {
  if (!date) return "Invalid date";

  let dateString = String(date).trim();

  // Backend UTC date is coming without Z
  // Example: 2026-09-10T06:48:55
  if (
    !dateString.endsWith("Z") &&
    !dateString.includes("+") &&
    !/[+-]\d{2}:\d{2}$/.test(dateString)
  ) {
    dateString += "Z";
  }

  const d = new Date(dateString);

  if (isNaN(d.getTime())) return "Invalid date";

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};


// const formatDate = (date) => {
//   if (!date) return "Invalid date";
//   const d = new Date(date);
//   if (isNaN(d.getTime())) return "Invalid date";
  
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const month = months[d.getMonth()];
//   const day = String(d.getDate()).padStart(2, "0");
//   const year = d.getFullYear();
//   const hours = String(d.getHours()).padStart(2, "0");
//   const minutes = String(d.getMinutes()).padStart(2, "0");
//   const seconds = String(d.getSeconds()).padStart(2, "0");
  
//   return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
// };

// Helper function to get status chip
const getStatusChip = (loginStatus, failureReason) => {
  if (loginStatus === true) {
    return (
      <Chip
        icon={<SuccessIcon />}
        label="Success"
        color="success"
        size="small"
        variant="outlined"
      />
    );
  } else {
    return (
      <Chip
        icon={<ErrorIcon />}
        label={failureReason || "Failed"}
        color="error"
        size="small"
        variant="outlined"
      />
    );
  }
};

// API Configuration
const API_BASE_URL = 'https://pasapi.puducherrysmartcity.in/api';
const API_ENDPOINT = `${API_BASE_URL}/activity-logs/user-logs`;

const UserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0, username: '' });

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "success", label: "Success" },
    { value: "failed", label: "Failed" },
  ];

  useEffect(() => {
    fetchLogs();
  }, [page, rowsPerPage]);

  // Get the auth token from cookies
  const getAuthToken = () => {
    // Try multiple possible cookie names
    const token = Cookies.get('token')
    
    if (!token) {
      console.warn('No authentication token found in cookies');
      return null;
    }
    
    return token;
  };

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      
      // Build query parameters
      const params = new URLSearchParams({
        pageNumber: page + 1, // API uses 1-based indexing
        pageSize: rowsPerPage,
      });
      
      const url = `${API_ENDPOINT}?${params.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid - clear cookies
          Cookies.remove('token');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API response to match the required fields
      const transformedLogs = data.data.map((log, index) => ({
        id: log.id || index,
        serialNo: (page * rowsPerPage) + index + 1,
        username: log.username || 'Unknown User',
        loginStatus: log.loginStatus || false,
        failureReason: log.failureReason || null,
        ipAddress: log.ipAddress || '',
        latitude: log.latitude || null,
        longitude: log.longitude || null,
        loginTime: log.loginTime || new Date(),
        logoutTime: log.logoutTime || null,
        userAgent: log.userAgent || '',
        url: log.url || '',
        method: log.method || '',
        referrer: log.referrer || '',
        location: log.latitude && log.longitude ? `${log.latitude}, ${log.longitude}` : 'N/A',
        hasLocation: log.latitude && log.longitude && log.latitude !== '0' && log.longitude !== '0',
      }));

      setLogs(transformedLogs);
      setTotalRecords(data.totalRecords || 0);
      setTotalPages(data.totalPages || 0);
      
    } catch (err) {
      setError(`Failed to fetch user logs: ${err.message}`);
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLogs();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
    fetchLogs();
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedLog(null);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleOpenMap = (log) => {
    if (log.latitude && log.longitude && log.latitude !== '0' && log.longitude !== '0') {
      setMapLocation({
        lat: parseFloat(log.latitude),
        lng: parseFloat(log.longitude),
        username: log.username
      });
      setMapDialogOpen(true);
    }
  };

  const handleCloseMap = () => {
    setMapDialogOpen(false);
  };

  // Apply client-side filtering
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress?.includes(searchTerm);
    
    let matchesStatus = true;
    if (statusFilter !== "all") {
      if (statusFilter === "success") {
        matchesStatus = log.loginStatus === true;
      } else if (statusFilter === "failed") {
        matchesStatus = log.loginStatus === false;
      }
    }
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.loginStatus === true).length,
    failed: logs.filter((l) => l.loginStatus === false).length,
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h2">
          User Logs
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {
              // Export as CSV
              const headers = ["S.No", "Username", "Status", "IP Address", "Location", "Login Time"];
              const csvData = logs.map(log => [
                log.serialNo,
                log.username,
                log.loginStatus ? "Success" : (log.failureReason || "Failed"),
                log.ipAddress,
                log.location,
                formatDate(log.loginTime)
              ]);
              
              const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n");
              const blob = new Blob([csvContent], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `user_logs_${new Date().toISOString().split("T")[0]}.csv`;
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search by username or IP..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPage(0);
            fetchLogs();
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>IP Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Login Time</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Alert severity="error">{error}</Alert>
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography color="textSecondary">
                      No user logs found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.serialNo}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                          {log.username?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="body2" fontWeight="bold">
                          {log.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{getStatusChip(log.loginStatus, log.failureReason)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {log.ipAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {log.hasLocation ? (
                        <Tooltip title="Click to view on map">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenMap(log)}
                          >
                            <LocationIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(log.loginTime)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(log)}
                          color="primary"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalRecords || filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        {selectedLog && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Login Details</Typography>
                <IconButton onClick={handleCloseDetails}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
                      {selectedLog.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedLog.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        User Login
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  {getStatusChip(selectedLog.loginStatus, selectedLog.failureReason)}
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    S.No
                  </Typography>
                  <Typography variant="body2">{selectedLog.serialNo}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    IP Address
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {selectedLog.ipAddress}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Location
                  </Typography>
                  {selectedLog.hasLocation ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        {selectedLog.location}
                      </Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenMap(selectedLog)}
                      >
                        <LocationIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      N/A
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Login Time
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(selectedLog.loginTime)}
                  </Typography>
                </Grid>

                {selectedLog.logoutTime && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Logout Time
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(selectedLog.logoutTime)}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    User Agent
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {selectedLog.userAgent}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    URL
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {selectedLog.url}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Method
                  </Typography>
                  <Typography variant="body2">
                    {selectedLog.method}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Referrer
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {selectedLog.referrer || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Map Dialog */}
      <Dialog 
        open={mapDialogOpen} 
        onClose={handleCloseMap} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">
              Location Map - {mapLocation.username}
            </Typography>
            <IconButton onClick={handleCloseMap}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, overflow: 'hidden' }}>
          <Box sx={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLocation.lng - 0.01}%2C${mapLocation.lat - 0.01}%2C${mapLocation.lng + 0.01}%2C${mapLocation.lat + 0.01}&layer=mapnik&marker=${mapLocation.lat}%2C${mapLocation.lng}`}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'white',
                px: 2,
                py: 1,
                borderRadius: 1,
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LocationIcon color="primary" />
              <Typography variant="body2">
                {mapLocation.lat.toFixed(6)}, {mapLocation.lng.toFixed(6)}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              window.open(
                `https://www.openstreetmap.org/?mlat=${mapLocation.lat}&mlon=${mapLocation.lng}&zoom=15`,
                '_blank'
              );
            }}
          >
            Open in New Tab
          </Button>
          <Button onClick={handleCloseMap}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserLogs;  


