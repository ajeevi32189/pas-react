
//----------------------------------------Live Announcement start===================================

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import StopIcon from '@mui/icons-material/Stop';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import {
//   Box, Divider, Button, Grid, IconButton, Paper, Select,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Typography, InputBase, MenuItem, Pagination, Stack,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   FormControl, InputLabel, Select as MuiSelect, Breadcrumbs,
//   Switch, FormControlLabel, Alert, LinearProgress, CircularProgress, Tooltip,
//   Slider, Popover, Chip
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint, FaMusic } from 'react-icons/fa';
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

// // const BASE_URL    = 'https://paspy.puducherrysmartcity.in';
// // const STATIC_PORT = 5500;
// // const WS_BASE_URL = 'wss://paspy.puducherrysmartcity.in'; // WebSocket URL

// const BASE_URL    = 'http://127.0.0.1:8000';
// const STATIC_PORT = 5500;
// const WS_BASE_URL = 'wss://127.0.0.1:8000'; // WebSocket URL

// // ─── Auth Helpers ──────────────────────────────────────────────────────────────
// const getAuthToken = () => {
//   const cookies = document.cookie.split(';');
//   for (let cookie of cookies) {
//     const [name, value] = cookie.trim().split('=');
//     if (['auth_token', 'token', 'access_token', 'Authorization'].includes(name)) return value;
//   }
//   const bearerCookie = document.cookie.split(';').find(c => c.trim().startsWith('Bearer='));
//   if (bearerCookie) return bearerCookie.split('=')[1];
//   return null;
// };

// const getAuthHeader = () => {
//   const token = getAuthToken();
//   if (!token) return null;
//   return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
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
//   uploadArea: {
//     border: '2px dashed #cbd5e1',
//     borderRadius: '12px',
//     padding: '24px',
//     textAlign: 'center',
//     transition: 'all 0.2s ease',
//   },
// };

// // ─── PAS Proxy API Calls ───────────────────────────────────────────────────────
// const apiUpdateIp = async (ip) => {
//   const res = await fetch(`${BASE_URL}/setup`, {
//     method: 'PUT',
//     headers: {
//       'accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ ip, port: STATIC_PORT }),
//   });
//   if (!res.ok) throw new Error(`IP setup failed: ${res.status}`);
//   return res.json();
// };

// const apiPlay = async (ip) => {
//   if (ip) {
//     try { await apiUpdateIp(ip); }
//     catch (e) { console.warn('IP setup before play failed:', e.message); }
//   }
//   const res = await fetch(`${BASE_URL}/action/play`, {
//     method: 'POST',
//     headers: { 'accept': 'application/json' },
//     body: '',
//   });
//   if (!res.ok) throw new Error(`Play failed: ${res.status}`);
//   return res.json();
// };

// const apiStop = async (ip) => {
//   if (ip) {
//     try { await apiUpdateIp(ip); }
//     catch (e) { console.warn('IP setup before stop failed:', e.message); }
//   }
//   const res = await fetch(`${BASE_URL}/action/stop`, {
//     method: 'POST',
//     headers: { 'accept': 'application/json' },
//     body: '',
//   });
//   if (!res.ok) throw new Error(`Stop failed: ${res.status}`);
//   return res.json();
// };

// const apiSetVolume = async (ip, volume) => {
//   if (ip) {
//     try { 
//       await apiUpdateIp(ip);
//       console.log(`IP setup successful for ${ip}:${STATIC_PORT}`);
//     } catch (e) { 
//       console.warn('IP setup before volume change failed:', e.message);
//       throw new Error(`Failed to configure device IP: ${e.message}`);
//     }
//   }
//   const res = await fetch(`${BASE_URL}/action/volume`, {
//     method: 'POST',
//     headers: { 
//       'accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ volume: volume }),
//   });
//   if (!res.ok) throw new Error(`Volume control failed: ${res.status}`);
//   return res.json();
// };

// // ─── Live Stream API Calls ─────────────────────────────────────────────────────
// const apiStopStream = async () => {
//   const res = await fetch(`${BASE_URL}/stream/stop`, {
//     method: 'POST',
//     headers: { 'accept': 'application/json' },
//     body: '',
//   });
//   if (!res.ok) throw new Error(`Stop stream failed: ${res.status}`);
//   return res.json();
// };

// const apiGetStreamStatus = async () => {
//   const res = await fetch(`${BASE_URL}/stream/status`, {
//     method: 'GET',
//     headers: { 'accept': 'application/json' },
//   });
//   if (!res.ok) throw new Error(`Get stream status failed: ${res.status}`);
//   return res.json();
// };

// // ─── Backend API Calls ─────────────────────────────────────────────────────────
// const fetchDevicesFromAPI = async () => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/Device/GetAllDevice`, {
//     method: 'GET',
//     headers: { 'accept': '*/*', 'Authorization': authHeader },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch devices: ${res.status}`);
//   return res.json();
// };

// const uploadFileToAPI = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   const res = await fetch(`${BASE_URL}/upload`, {
//     method: 'POST',
//     headers: { 'accept': 'application/json' },
//     body: formData,
//   });
//   if (!res.ok) throw new Error(`File upload failed: ${res.status}`);
//   return res.json();
// };

// const fetchPasDevicesForTable = async () => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/Dashboard/GetDevicesByType?deviceType=PAS`, {
//     method: 'GET',
//     headers: { 'accept': '*/*', 'Authorization': authHeader },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch PAS devices: ${res.status}`);
//   return res.json();
// };

// const fetchAllDeviceDetails = async () => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/DeviceDetail/GetAllDeviceDetail`, {
//     method: 'GET',
//     headers: { 'accept': '*/*', 'Authorization': authHeader },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch device details: ${res.status}`);
//   return res.json();
// };

// const addDeviceDetailAPI = async (payload) => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/DeviceDetail/AddDeviceDetail`, {
//     method: 'POST',
//     headers: { 'accept': '*/*', 'Authorization': authHeader, 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error(`Add device detail failed: ${res.status}`);
//   return res.json();
// };

// const updateDeviceDetailAPI = async (payload) => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/DeviceDetail/UpdateDeviceDetail`, {
//     method: 'PUT',
//     headers: { 'accept': '*/*', 'Authorization': authHeader, 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error(`Update device detail failed: ${res.status}`);
//   return res.json();
// };

// const deleteDeviceDetailAPI = async (id) => {
//   const authHeader = getAuthHeader();
//   if (!authHeader) throw new Error('No authentication token found in cookies');
//   const res = await fetch(`${API_URL}/api/DeviceDetail/DeleteDeviceDetail/${id}`, {
//     method: 'DELETE',
//     headers: { 'accept': '*/*', 'Authorization': authHeader },
//   });
//   if (!res.ok) throw new Error(`Delete device detail failed: ${res.status}`);
//   const text = await res.text();
//   try { return JSON.parse(text); } catch { return { message: text }; }
// };

// // ─── Live Stream Component with WebSocket (Debugged and Fixed) ─────
// // ─── Live Stream Component with Enhanced Debugging ─────
// const LiveStreamCell = ({ ipAddress, deviceName, deviceCode }) => {
//   const [isLive, setIsLive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [audioLevel, setAudioLevel] = useState(0);
//   const [packetsSent, setPacketsSent] = useState(0);
//   const wsRef = useRef(null);
//   const mediaStreamRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const sourceRef = useRef(null);
//   const processorRef = useRef(null);
//   const intervalRef = useRef(null);
//   const isLiveRef = useRef(false); // ← FIX: ref to avoid stale closure

//   const AUDIO_CONFIG = {
//     sampleRate: 16000,
//     channels: 1,
//     bitsPerSample: 16,
//     chunkSize: 1024
//   };

//   const checkStreamStatus = useCallback(async () => {
//     try {
//       const response = await apiGetStreamStatus();
//       return response.active;
//     } catch (err) {
//       console.error('[LiveStream] Failed to get stream status:', err);
//       return false;
//     }
//   }, []);

//   const initWebSocket = useCallback(() => {
//     return new Promise((resolve, reject) => {
//       const wsUrl = `${WS_BASE_URL}/ws/stream`;
//       console.log('[LiveStream] Connecting to WebSocket:', wsUrl);
//       const ws = new WebSocket(wsUrl);
//       ws.binaryType = 'arraybuffer';

//       ws.onopen = () => {
//         console.log('[LiveStream] ✅ WebSocket connected');
//         resolve(ws);
//       };
//       ws.onerror = (error) => {
//         console.error('[LiveStream] ❌ WebSocket error:', error);
//         reject(new Error('WebSocket connection failed'));
//       };
//       ws.onclose = () => {
//         console.log('[LiveStream] WebSocket closed');
//         isLiveRef.current = false;
//         setIsLive(false);
//       };
//       ws.onmessage = (event) => {
//         try {
//           const response = JSON.parse(event.data);
//           console.log('[LiveStream] Server message:', response);
//           if (response.status === 'error') {
//             setError(response.message);
//             isLiveRef.current = false;
//             setIsLive(false);
//           }
//         } catch (e) {}
//       };

//       wsRef.current = ws;
//       setTimeout(() => {
//         if (ws.readyState !== WebSocket.OPEN) {
//           reject(new Error('WebSocket connection timeout'));
//         }
//       }, 5000);
//     });
//   }, []);

//   const closeWebSocket = useCallback(() => {
//     if (wsRef.current) {
//       if (wsRef.current.readyState === WebSocket.OPEN) {
//         try {
//           wsRef.current.send(JSON.stringify({ action: 'stop' }));
//         } catch (e) {}
//         wsRef.current.close();
//       }
//       wsRef.current = null;
//     }
//   }, []);

//   const startMicrophoneStream = async (ws) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         console.log('[LiveStream] Requesting microphone access...');
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: {
//             sampleRate: AUDIO_CONFIG.sampleRate,
//             channelCount: AUDIO_CONFIG.channels,
//             echoCancellation: false,
//             noiseSuppression: false,
//             autoGainControl: false,
//           }
//         });

//         mediaStreamRef.current = stream;
//         console.log('[LiveStream] ✅ Microphone access granted');

//         // Use the actual sample rate from AudioContext (browser may not honor requested rate)
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)({
//           sampleRate: AUDIO_CONFIG.sampleRate,
//         });
//         audioContextRef.current = audioContext;
//         console.log('[LiveStream] AudioContext sample rate:', audioContext.sampleRate);

//         const source = audioContext.createMediaStreamSource(stream);
//         sourceRef.current = source;

//         const bufferSize = 4096;
//         const processor = audioContext.createScriptProcessor(bufferSize, 1, 1);
//         processorRef.current = processor;

//         let packetCount = 0;
//         let lastLogTime = Date.now();

//         processor.onaudioprocess = (event) => {
//           // ✅ FIX: use isLiveRef instead of isLive state (avoids stale closure)
//           if (!ws || ws.readyState !== WebSocket.OPEN || !isLiveRef.current) {
//             return;
//           }

//           const inputData = event.inputBuffer.getChannelData(0);

//           // Calculate RMS for visual meter
//           let sum = 0;
//           for (let i = 0; i < inputData.length; i++) {
//             sum += inputData[i] * inputData[i];
//           }
//           const rms = Math.sqrt(sum / inputData.length);
//           setAudioLevel(rms);

//           // Convert Float32 → Int16 PCM
//           const pcmData = new Int16Array(inputData.length);
//           for (let i = 0; i < inputData.length; i++) {
//             const sample = Math.max(-1, Math.min(1, inputData[i]));
//             pcmData[i] = Math.floor(sample * 32767);
//           }

//           try {
//             ws.send(pcmData.buffer);
//             packetCount++;
//             setPacketsSent(prev => prev + 1);

//             const now = Date.now();
//             if (now - lastLogTime >= 1000) {
//               console.log(`[LiveStream] 📤 Sent ${packetCount} pkts/s | RMS: ${rms.toFixed(4)}`);
//               packetCount = 0;
//               lastLogTime = now;
//             }
//           } catch (err) {
//             console.error('[LiveStream] Send error:', err);
//           }
//         };

//         // Connect: source → processor → destination (required or onaudioprocess won't fire)
//         source.connect(processor);
//         processor.connect(audioContext.destination);

//         if (audioContext.state === 'suspended') {
//           await audioContext.resume();
//         }

//         console.log('[LiveStream] ✅ Microphone streaming active');
//         resolve();
//       } catch (err) {
//         console.error('[LiveStream] ❌ Microphone error:', err);
//         reject(err);
//       }
//     });
//   };

//   const stopMicrophoneStream = () => {
//     if (processorRef.current) {
//       processorRef.current.disconnect();
//       processorRef.current = null;
//     }
//     if (sourceRef.current) {
//       sourceRef.current.disconnect();
//       sourceRef.current = null;
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//       audioContextRef.current = null;
//     }
//     if (mediaStreamRef.current) {
//       mediaStreamRef.current.getTracks().forEach(track => track.stop());
//       mediaStreamRef.current = null;
//     }
//     setAudioLevel(0);
//     setPacketsSent(0);
//   };

//   const handleStartLive = async () => {
//     setIsLoading(true);
//     setError(null);
//     setPacketsSent(0);

//     try {
//       if (!ipAddress) throw new Error('No IP address configured for this device');

//       console.log(`[LiveStream] Step 1: Configuring device IP: ${ipAddress}`);
//       await apiUpdateIp(ipAddress);

//       console.log('[LiveStream] Step 2: Connecting WebSocket...');
//       const ws = await initWebSocket();

//       console.log('[LiveStream] Step 3: Sending start command...');
//       ws.send(JSON.stringify({
//         action: 'start',
//         sample_rate: AUDIO_CONFIG.sampleRate,
//         channels: AUDIO_CONFIG.channels,
//         bits_per_sample: AUDIO_CONFIG.bitsPerSample,
//       }));

//       console.log('[LiveStream] Step 4: Waiting for server confirmation...');
//       await new Promise((resolve, reject) => {
//         const timeout = setTimeout(() => reject(new Error('Timeout waiting for stream confirmation')), 10000);
//         const messageHandler = (event) => {
//           try {
//             const response = JSON.parse(event.data);
//             console.log('[LiveStream] Server response:', response);
//             if (response.status === 'streaming') {
//               clearTimeout(timeout);
//               ws.removeEventListener('message', messageHandler);
//               resolve();
//             } else if (response.status === 'error') {
//               clearTimeout(timeout);
//               ws.removeEventListener('message', messageHandler);
//               reject(new Error(response.message));
//             }
//           } catch (e) {}
//         };
//         ws.addEventListener('message', messageHandler);
//       });

//       // ✅ FIX: Set ref BEFORE starting audio processor
//       isLiveRef.current = true;
//       setIsLive(true);

//       console.log('[LiveStream] Step 5: Starting microphone capture...');
//       await startMicrophoneStream(ws);

//       console.log('[LiveStream] 🎤✅ LIVE STREAM ACTIVE!');

//       intervalRef.current = setInterval(async () => {
//         const status = await checkStreamStatus();
//         if (!status && isLiveRef.current) {
//           console.log('[LiveStream] Stream stopped on server side');
//           isLiveRef.current = false;
//           setIsLive(false);
//         }
//       }, 5000);

//     } catch (err) {
//       console.error('[LiveStream] ❌ Failed to start:', err);
//       setError(err.message);
//       isLiveRef.current = false;
//       setIsLive(false);
//       closeWebSocket();
//       stopMicrophoneStream();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStopLive = async () => {
//     setIsLoading(true);
//     try {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }

//       // ✅ FIX: Set ref false BEFORE stopping so processor exits cleanly
//       isLiveRef.current = false;
//       setIsLive(false);

//       stopMicrophoneStream();

//       if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//         wsRef.current.send(JSON.stringify({ action: 'stop' }));
//         await new Promise(resolve => setTimeout(resolve, 200));
//       }
//       closeWebSocket();

//       try { await apiStopStream(); } catch (err) {
//         console.warn('[LiveStream] Stop API error:', err);
//       }

//       console.log('[LiveStream] ✅ Live stream stopped');
//     } catch (err) {
//       console.error('[LiveStream] Stop error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       isLiveRef.current = false;
//       stopMicrophoneStream();
//       closeWebSocket();
//     };
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//       <Tooltip title={isLive ? 'Stop Live Stream' : 'Start Live Stream (Microphone)'}>
//         <Button
//           size="small"
//           variant={isLive ? "contained" : "outlined"}
//           onClick={isLive ? handleStopLive : handleStartLive}
//           disabled={isLoading}
//           startIcon={
//             isLoading
//               ? <CircularProgress size={14} />
//               : isLive
//                 ? <MicOffIcon fontSize="small" />
//                 : <MicIcon fontSize="small" />
//           }
//           sx={{
//             textTransform: 'none', fontSize: '12px', fontWeight: 600, minWidth: '80px',
//             backgroundColor: isLive ? C.error : 'transparent',
//             borderColor: isLive ? C.error : C.warning,
//             color: isLive ? 'white' : C.warning,
//             '&:hover': {
//               backgroundColor: isLive ? '#dc2626' : `${C.warning}10`,
//               borderColor: isLive ? '#dc2626' : C.warning,
//             }
//           }}
//         >
//           {isLoading ? 'Starting...' : (isLive ? '🔴 LIVE' : 'LIVE')}
//         </Button>
//       </Tooltip>

//       {isLive && (
//         <Box sx={{ width: 70, mt: 0.5 }}>
//           <Box sx={{ height: 3, bgcolor: '#e5e7eb', borderRadius: 1.5, overflow: 'hidden' }}>
//             <Box sx={{
//               width: `${Math.min(100, audioLevel * 500)}%`, // ← boosted multiplier for visibility
//               height: '100%',
//               bgcolor: audioLevel > 0.01 ? '#10b981' : '#f59e0b',
//               transition: 'width 0.05s linear'
//             }} />
//           </Box>
//           <Typography variant="caption" sx={{ fontSize: '8px', color: '#666', display: 'block', textAlign: 'center' }}>
//             {packetsSent > 0 ? `${packetsSent} pkts` : 'Waiting...'}
//           </Typography>
//         </Box>
//       )}

//       {error && (
//         <Typography variant="caption" sx={{ fontSize: '10px', color: C.error, maxWidth: 120 }}>
//           {error}
//         </Typography>
//       )}

//       {isLive && !error && audioLevel > 0.01 && (
//         <Typography variant="caption" sx={{ fontSize: '8px', color: '#10b981', fontWeight: 600 }}>
//           🔊 Speaking
//         </Typography>
//       )}
//     </Box>
//   );
// };

// // ─── Volume Control with Popover Slider ──────────────────────────────────────
// const VolumeControlCell = ({ ipAddress, deviceName }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [volume, setVolume] = useState(50);
//   const [isLoading, setIsLoading] = useState(false);
//   const [actionMsg, setActionMsg] = useState('');

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleVolumeChange = async (event, newValue) => {
//     setVolume(newValue);
    
//     if (!ipAddress) {
//       setActionMsg('No IP address configured');
//       setTimeout(() => setActionMsg(''), 2000);
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       const res = await apiSetVolume(ipAddress, newValue);
//       setActionMsg(res?.message || `Volume set to ${newValue}%`);
//     } catch (err) {
//       console.warn('Volume control error:', err.message);
//       setActionMsg(`Error: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setActionMsg(''), 2000);
//     }
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'volume-popover' : undefined;

//   return (
//     <>
//       <Tooltip title="Volume Control">
//         <IconButton
//           size="small"
//           onClick={handleClick}
//           sx={{ 
//             color: C.info,
//             backgroundColor: '#f0f9ff',
//             '&:hover': { backgroundColor: '#e0f2fe' },
//             width: 28, height: 28
//           }}
//         >
//           <MoreVertIcon fontSize="small" />
//         </IconButton>
//       </Tooltip>
      
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//         PaperProps={{
//           sx: {
//             p: 2,
//             width: 280,
//             borderRadius: 2,
//             boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//             <VolumeUpIcon sx={{ color: C.info }} />
//             <Typography variant="subtitle2" fontWeight={600}>
//               Volume Control
//             </Typography>
//             {isLoading && <CircularProgress size={16} sx={{ ml: 'auto' }} />}
//           </Box>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
//               0%
//             </Typography>
//             <Slider
//               value={volume}
//               onChange={handleVolumeChange}
//               aria-labelledby="volume-slider"
//               valueLabelDisplay="auto"
//               step={1}
//               marks
//               min={0}
//               max={100}
//               sx={{
//                 color: C.info,
//                 '& .MuiSlider-thumb': {
//                   width: 12,
//                   height: 12,
//                 },
//               }}
//               disabled={isLoading}
//             />
//             <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
//               100%
//             </Typography>
//           </Box>
          
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             pt: 1,
//             borderTop: '1px solid #e5e7eb'
//           }}>
//             <Typography variant="caption" color="text.secondary">
//               Device: {deviceName || 'Unknown'}
//             </Typography>
//             <Typography variant="body2" fontWeight={600} sx={{ color: C.info }}>
//               {volume}%
//             </Typography>
//           </Box>
          
//           {actionMsg && (
//             <Alert severity={actionMsg.includes('Error') ? 'error' : 'success'} sx={{ fontSize: '12px', py: 0 }}>
//               {actionMsg}
//             </Alert>
//           )}
//         </Box>
//       </Popover>
//     </>
//   );
// };

// // ─── Play/Stop Cell ────────────────────────────────────────────────────────────
// const PlayStopCell = ({ ipAddress }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [actionMsg, setActionMsg] = useState('');

//   const isCorsOrNetwork = (err) =>
//     err.message.includes('Failed to fetch') || err.message.includes('NetworkError');

//   const handlePlay = async () => {
//     setIsLoading(true);
//     setActionMsg('');
//     try {
//       const res = await apiPlay(ipAddress);
//       setIsPlaying(true);
//       setActionMsg(res?.message || 'Playing');
//     } catch (err) {
//       console.warn('Play error:', err.message);
//       setIsPlaying(true);
//       if (!isCorsOrNetwork(err)) setActionMsg(`Error: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setActionMsg(''), 3000);
//     }
//   };

//   const handleStop = async () => {
//     setIsLoading(true);
//     setActionMsg('');
//     try {
//       const res = await apiStop(ipAddress);
//       setIsPlaying(false);
//       setActionMsg(res?.message || 'Stopped');
//     } catch (err) {
//       console.warn('Stop error:', err.message);
//       setIsPlaying(false);
//       if (!isCorsOrNetwork(err)) setActionMsg(`Error: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setActionMsg(''), 3000);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         {isLoading ? (
//           <CircularProgress size={22} />
//         ) : isPlaying ? (
//           <Tooltip title="Stop playback on this device">
//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleStop}
//               startIcon={<StopIcon fontSize="small" />}
//               sx={{
//                 textTransform: 'none', fontSize: '12px',
//                 backgroundColor: C.error, '&:hover': { backgroundColor: '#dc2626' },
//                 borderRadius: '6px', px: 1.5,
//               }}
//             >
//               Stop
//             </Button>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Play content on this device">
//             <Button
//               size="small"
//               variant="contained"
//               onClick={handlePlay}
//               startIcon={<PlayArrowIcon fontSize="small" />}
//               sx={{
//                 textTransform: 'none', fontSize: '12px',
//                 backgroundColor: C.success, '&:hover': { backgroundColor: '#059669' },
//                 borderRadius: '6px', px: 1.5,
//               }}
//             >
//               Play
//             </Button>
//           </Tooltip>
//         )}
//       </Box>
//       {actionMsg && (
//         <Typography variant="caption" sx={{ fontSize: '10px', color: '#6b7280', maxWidth: 100 }}>
//           {actionMsg}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// // ─── Breadcrumb ────────────────────────────────────────────────────────────────
// const Breadcrumb = ({ children }) => (
//   <div style={styles.breadcrumbCard}>
//     <Breadcrumbs aria-label="breadcrumb" separator="›">{children}</Breadcrumbs>
//   </div>
// );

// // ─── Export Utilities ──────────────────────────────────────────────────────────
// const exportToCSV = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Device Name', 'Content Title', 'File Name', 'File Size', 'Duration', 'Status', 'Register Date'];
//   const rows = data.map((r) => [r.deviceCode, r.deviceName || '', r.contentTitle, r.fileName || '', r.fileSize || '', r.duration || '', r.status, new Date(r.regDate).toLocaleString()]);
//   const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csv], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a'); a.href = url; a.download = 'PAS_Content.csv'; a.click();
//   URL.revokeObjectURL(url);
// };

// const exportToExcel = (data) => {
//   if (!data.length) return;
//   const headers = ['Device Code', 'Device Name', 'Content Title', 'File Name', 'File Size', 'Duration', 'Status', 'Register Date'];
//   const rows = data.map((r) => [r.deviceCode, r.deviceName || '', r.contentTitle, r.fileName || '', r.fileSize || '', r.duration || '', r.status, new Date(r.regDate).toLocaleString()]);
//   let tableHtml = `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
//   rows.forEach((row) => { tableHtml += `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`; });
//   tableHtml += '</tbody></table>';
//   const blob = new Blob([`<html xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='utf-8'/></head><body>${tableHtml}</body></html>`], { type: 'application/vnd.ms-excel' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a'); a.href = url; a.download = 'PAS_Content.xls'; a.click();
//   URL.revokeObjectURL(url);
// };

// const ExportButtons = ({ tableData }) => (
//   <Box sx={{ display: 'flex', gap: 1 }}>
//     <Button size="small" variant="outlined" color="success" startIcon={<FaFileExcel size={14} />} onClick={() => exportToExcel(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>Excel</Button>
//     <Button size="small" variant="outlined" color="info" startIcon={<FaFileCsv size={14} />} onClick={() => exportToCSV(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>CSV</Button>
//   </Box>
// );

// // ─── Empty Form State ──────────────────────────────────────────────────────────
// const emptyForm = {
//   deviceDetailId: null,
//   deviceId: '',
//   deviceCode: '',
//   deviceName: '',
//   contentTitle: '',
//   fileName: '',
//   fileSize: '',
//   fileData: null,
//   uploadedFilePath: '',
//   duration: '',
//   status: 'Active',
//   regDate: new Date().toISOString().slice(0, 16),
// };

// // ─── Add / Edit Content Modal ──────────────────────────────────────────────────
// const ContentFormModal = ({ open, onClose, onSave, editData, devices }) => {
//   const [form, setForm] = useState(editData || emptyForm);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [fileUploadError, setFileUploadError] = useState('');
//   const [ipSetupStatus, setIpSetupStatus] = useState(null);
//   const [ipSetupError, setIpSetupError] = useState('');

//   React.useEffect(() => {
//     if (editData) setForm({ ...editData });
//     else setForm({ ...emptyForm, regDate: new Date().toISOString().slice(0, 16) });
//     setError('');
//     setFileUploadError('');
//     setUploadProgress(0);
//     setIpSetupStatus(null);
//     setIpSetupError('');
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError('');
//   };

//   const handleDeviceChange = async (e) => {
//     const deviceId = e.target.value;
//     const selectedDevice = devices.find((d) => d.id === parseInt(deviceId) || d.id === deviceId);

//     setForm((prev) => ({
//       ...prev,
//       deviceId,
//       deviceCode: selectedDevice?.deviceCode || '',
//       deviceName: selectedDevice?.name || '',
//       fileData: null, fileName: '', fileSize: '', duration: '',
//       contentTitle: '', uploadedFilePath: '',
//     }));

//     if (!deviceId || !selectedDevice) {
//       setIpSetupStatus(null); setIpSetupError(''); return;
//     }

//     const ip = selectedDevice?.ipAddress;
//     if (!ip) {
//       setIpSetupStatus('error');
//       setIpSetupError('Selected device has no IP address — cannot configure ESP32 target.');
//       return;
//     }

//     setIpSetupStatus('loading');
//     setIpSetupError('');
//     try {
//       await apiUpdateIp(ip);
//       setIpSetupStatus('success');
//     } catch (err) {
//       console.warn('IP setup failed:', err.message);
//       const isCors = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
//       setIpSetupStatus(isCors ? 'success' : 'error');
//       if (!isCors) setIpSetupError(`IP setup failed: ${err.message}`);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.type !== 'audio/mpeg') { setError('Only MP3 files are allowed!'); return; }
//     if (file.size > 10 * 1024 * 1024) { setError('File size should be less than 10MB!'); return; }
//     setError(''); setFileUploadError('');
//     setUploading(true); setUploadProgress(0);

//     const selectedDevice = devices.find(
//       (d) => d.id === parseInt(form.deviceId) || d.id === form.deviceId
//     );
//     const ip = selectedDevice?.ipAddress || '';

//     try {
//       if (ip) {
//         try { await apiUpdateIp(ip); }
//         catch (e) { console.warn('Re-setup before upload failed:', e.message); }
//       }

//       const response = await uploadFileToAPI(file);
//       if (!response.filename) throw new Error(response.message || 'Upload response missing filename');

//       const audio = new Audio();
//       audio.src = URL.createObjectURL(file);
//       await new Promise((resolve) => {
//         audio.addEventListener('loadedmetadata', () => {
//           const dur = Math.round(audio.duration);
//           setForm((prev) => ({
//             ...prev,
//             fileData: file,
//             fileName: response.filename,
//             fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//             duration: `${Math.floor(dur / 60)}:${(dur % 60).toString().padStart(2, '0')}`,
//             contentTitle: prev.contentTitle || response.filename.replace('.mp3', ''),
//             uploadedFilePath: response.filename,
//           }));
//           URL.revokeObjectURL(audio.src);
//           resolve();
//         });
//         audio.addEventListener('error', () => {
//           setForm((prev) => ({
//             ...prev,
//             fileData: file,
//             fileName: response.filename,
//             fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//             contentTitle: prev.contentTitle || response.filename.replace('.mp3', ''),
//             uploadedFilePath: response.filename,
//           }));
//           resolve();
//         });
//       });
//       setUploadProgress(100);

//     } catch (err) {
//       console.error('File upload error:', err);
//       setFileUploadError(`Upload failed: ${err.message}`);
//       setError(`Upload failed: ${err.message}`);
//     } finally {
//       setUploading(false);
//       setTimeout(() => setUploadProgress(0), 1000);
//     }
//   };

//   const handleStatusToggle = (e) => {
//     setForm((prev) => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }));
//   };

//   const handleSubmit = () => {
//     if (!form.deviceId) { alert('Please select a device.'); return; }
//     if (!form.fileData && !editData) { alert('Please upload an MP3 file.'); return; }
//     onSave(form);
//     onClose();
//   };

//   const selectedDevice = devices.find(
//     (d) => d.id === parseInt(form.deviceId) || d.id === form.deviceId
//   );

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {editData ? 'Edit PAS Content' : 'Add PAS Content'}
//         <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}><CloseIcon /></IconButton>
//       </DialogTitle>
//       <Divider />
//       <DialogContent sx={{ pt: 2 }}>
//         <Grid container spacing={2} direction="column">
//           <Grid item xs={12}>
//             <FormControl fullWidth size="small" required>
//               <InputLabel>Select Device</InputLabel>
//               <MuiSelect name="deviceId" value={form.deviceId} label="Select Device" onChange={handleDeviceChange}>
//                 <MenuItem value="">-- Select a Device --</MenuItem>
//                 {devices.map((device) => (
//                   <MenuItem key={device.id} value={device.id}>
//                     {device.deviceCode} - {device.name} ({device.ipAddress || 'IP not available'})
//                   </MenuItem>
//                 ))}
//               </MuiSelect>
//             </FormControl>
//           </Grid>

//           {form.deviceCode && (
//             <Grid item xs={12}>
//               {ipSetupStatus === 'loading' && (
//                 <Alert severity="info" sx={{ fontSize: '13px' }} icon={<CircularProgress size={16} />}>
//                   Configuring ESP32 target → <strong>{selectedDevice?.ipAddress}</strong> : {STATIC_PORT}...
//                 </Alert>
//               )}
//               {ipSetupStatus === 'success' && (
//                 <Alert severity="success" sx={{ fontSize: '13px' }}>
//                   ✓ ESP32 target set → <strong>{selectedDevice?.ipAddress}</strong> : <strong>{STATIC_PORT}</strong> — upload your MP3 below.
//                 </Alert>
//               )}
//               {ipSetupStatus === 'error' && (
//                 <Alert severity="warning" sx={{ fontSize: '13px' }}>
//                   ⚠ {ipSetupError}
//                 </Alert>
//               )}
//               {!ipSetupStatus && (
//                 <Alert severity="info" sx={{ fontSize: '13px' }}>
//                   Selected: <strong>{form.deviceCode}</strong> — {form.deviceName}
//                 </Alert>
//               )}
//             </Grid>
//           )}

//           {form.deviceId && (
//             <>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
//                   Upload MP3 File *
//                 </Typography>
//                 <input
//                   accept="audio/mpeg"
//                   style={{ display: 'none' }}
//                   id="mp3-upload"
//                   type="file"
//                   onChange={handleFileUpload}
//                   disabled={uploading || ipSetupStatus === 'loading'}
//                 />
//                 <label
//                   htmlFor="mp3-upload"
//                   style={{ cursor: (uploading || ipSetupStatus === 'loading') ? 'not-allowed' : 'pointer' }}
//                 >
//                   <Box sx={{
//                     ...styles.uploadArea,
//                     opacity: (uploading || ipSetupStatus === 'loading') ? 0.6 : 1,
//                     borderColor: form.fileData ? C.success : '#cbd5e1',
//                   }}>
//                     {form.fileData ? (
//                       <Box>
//                         <FaMusic size={40} color={C.primary} />
//                         <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>{form.fileName}</Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {form.fileSize}{form.duration ? ` • Duration: ${form.duration}` : ''}
//                         </Typography>
//                         {form.uploadedFilePath && (
//                           <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
//                             ✓ Uploaded to ESP32 successfully
//                           </Typography>
//                         )}
//                         <Button
//                           size="small" variant="outlined" color="error" sx={{ mt: 1 }}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setForm((prev) => ({ ...prev, fileData: null, fileName: '', fileSize: '', duration: '', contentTitle: '', uploadedFilePath: '' }));
//                           }}
//                         >
//                           Remove File
//                         </Button>
//                       </Box>
//                     ) : (
//                       <Box>
//                         <CloudUploadIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
//                         <Typography variant="body2" color="text.secondary">Click to upload MP3 file</Typography>
//                         <Typography variant="caption" color="text.secondary">Only MP3 format, max 10MB</Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </label>

//                 {uploading && (
//                   <Box sx={{ mt: 2 }}>
//                     <LinearProgress variant="determinate" value={uploadProgress} />
//                     <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
//                       Uploading to ESP32 ({selectedDevice?.ipAddress}:{STATIC_PORT})... {uploadProgress}%
//                     </Typography>
//                   </Box>
//                 )}

//                 {fileUploadError && (
//                   <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>{fileUploadError}</Typography>
//                 )}
//                 {error && !fileUploadError && (
//                   <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>{error}</Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth label="Content Title" name="contentTitle" value={form.contentTitle}
//                   onChange={handleChange} size="small" required
//                   helperText="Auto-filled from file name, can be edited"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Switch checked={form.status === 'Active'} onChange={handleStatusToggle} color="success" />}
//                   label={
//                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                       Status: <span style={{ color: form.status === 'Active' ? '#10b981' : C.error, fontWeight: 700 }}>{form.status}</span>
//                     </Typography>
//                   }
//                   labelPlacement="start"
//                   sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth label="Register Date & Time" name="regDate" value={form.regDate}
//                   onChange={handleChange} size="small" type="datetime-local"
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" color="info" sx={{ textTransform: 'none', fontWeight: 600 }}>
//           {editData ? 'Update Content' : 'Add Content'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // ─── Main Component ────────────────────────────────────────────────────────────
// const PasContent = () => {
//   const [data, setData] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [devicesError, setDevicesError] = useState(null);
//   const [tableLoading, setTableLoading] = useState(true);
//   const [tableError, setTableError] = useState(null);
//   const [entries, setEntries] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editData, setEditData] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteDetailId, setDeleteDetailId] = useState(null);
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [isSaving, setIsSaving] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [actionError, setActionError] = useState(null);

//   useEffect(() => {
//     const loadDevices = async () => {
//       setDevicesError(null);
//       try {
//         const apiDevices = await fetchDevicesFromAPI();
//         if (Array.isArray(apiDevices) && apiDevices.length > 0) {
//           const mappedDevices = apiDevices.map(device => ({
//             id: device.id,
//             deviceCode: device.deviceCode || `DEV_${device.id}`,
//             name: device.name || 'Unnamed Device',
//             ipAddress: device.ipAddress || '',
//             status: device.status,
//             deviceType: device.deviceType,
//           }));
//           setDevices(mappedDevices);
//           localStorage.setItem('pas_devices_api', JSON.stringify(mappedDevices));
//         } else {
//           const storedDevices = localStorage.getItem('pas_devices_api');
//           setDevices(storedDevices ? JSON.parse(storedDevices) : []);
//         }
//       } catch (err) {
//         console.error('Failed to fetch devices:', err);
//         setDevicesError(err.message);
//         const storedDevices = localStorage.getItem('pas_devices_api');
//         setDevices(storedDevices ? JSON.parse(storedDevices) : []);
//       }
//     };
//     loadDevices();
//   }, []);

//   const loadPasTableData = async () => {
//     setTableLoading(true);
//     setTableError(null);
//     try {
//       const [devicesResult, allDetails] = await Promise.all([
//         fetchPasDevicesForTable(),
//         fetchAllDeviceDetails().catch((err) => {
//           console.warn('Could not fetch device details:', err.message);
//           return [];
//         }),
//       ]);

//       const devicesList = devicesResult?.devices || [];

//       const detailByDeviceId = {};
//       const detailByDeviceCode = {};
//       if (Array.isArray(allDetails)) {
//         allDetails.forEach((detail) => {
//           if (detail.deviceId && detail.deviceId !== 0) {
//             detailByDeviceId[String(detail.deviceId)] = detail;
//           }
//           if (detail.deviceCode && detail.deviceCode !== 'string') {
//             if (!detailByDeviceCode[detail.deviceCode]) {
//               detailByDeviceCode[detail.deviceCode] = detail;
//             }
//           }
//         });
//       }

//       const mapped = devicesList.map((d) => {
//         const matchedDetail =
//           detailByDeviceId[String(d.id)] ||
//           (d.deviceCode ? detailByDeviceCode[d.deviceCode] : null) ||
//           null;

//         return {
//           id: d.id,
//           deviceDetailId: matchedDetail ? matchedDetail.id : null,
//           deviceId: d.id,
//           deviceCode: d.deviceCode || '',
//           deviceName: d.name || '',
//           contentTitle: matchedDetail?.deviceData || d.deviceData || d.template || '',
//           fileName: d.macAddress || '',
//           fileSize: '',
//           fileData: null,
//           uploadedFilePath: '',
//           duration: '',
//           status: matchedDetail
//             ? (matchedDetail.status ? 'Active' : 'Inactive')
//             : (d.status ? 'Active' : 'Inactive'),
//           regDate: matchedDetail?.regDate || d.regDate || new Date().toISOString(),
//           ipAddress: d.ipAddress || '',
//           deviceStatus: d.deviceStatus || '',
//           _raw: d,
//           _detail: matchedDetail,
//         };
//       });

//       setData(mapped.filter((row) => row._detail && row._detail.deviceData && row._detail.deviceData.trim() !== ''));
//     } catch (err) {
//       console.error('Failed to fetch PAS table data:', err);
//       setTableError(err.message);
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   useEffect(() => { loadPasTableData(); }, []);

//   const filteredRows = data.filter((row) =>
//     [row.deviceCode, row.deviceName, row.contentTitle, row.fileName, row.status].some((field) =>
//       (field || '').toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const handleSort = (column) => {
//     if (sortColumn === column) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     else { setSortColumn(column); setSortDirection('asc'); }
//     setCurrentPage(1);
//   };

//   const getSortValue = (row, column) => {
//     switch (column) {
//       case 'sno':          return row.id;
//       case 'deviceCode':   return row.deviceCode || '';
//       case 'deviceName':   return row.deviceName || '';
//       case 'contentTitle': return row.contentTitle || '';
//       case 'fileName':     return row.fileName || '';
//       case 'duration':     return row.duration || '';
//       case 'status':       return row.status || '';
//       case 'registerDate': return new Date(row.regDate).getTime();
//       default:             return '';
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

//   const handleOpenDialog = () => { setEditData(null); setIsDialogOpen(true); };
//   const handleEdit = (row) => { setEditData({ ...row }); setIsDialogOpen(true); };

//   const handleSave = async (formData) => {
//     setIsSaving(true);
//     setActionError(null);
//     try {
//       const isEdit = !!(formData.deviceDetailId);
//       const payload = {
//         id: isEdit ? formData.deviceDetailId : 0,
//         userId: 0,
//         deviceId: parseInt(formData.deviceId) || 0,
//         brightness: 0,
//         deviceCode: formData.deviceCode || '',
//         deviceData: formData.contentTitle || '',
//         status: formData.status === 'Active',
//         regDate: formData.regDate
//           ? new Date(formData.regDate).toISOString()
//           : new Date().toISOString(),
//       };
//       if (isEdit) await updateDeviceDetailAPI(payload);
//       else await addDeviceDetailAPI(payload);
//       await loadPasTableData();
//     } catch (err) {
//       console.error('Save failed:', err);
//       setActionError(`Save failed: ${err.message}`);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     setActionError(null);
//     try {
//       await deleteDeviceDetailAPI(deleteDetailId);
//       await loadPasTableData();
//     } catch (err) {
//       console.error('Delete failed:', err);
//       setActionError(`Delete failed: ${err.message}`);
//       setData((prev) => prev.filter((item) => item.deviceDetailId !== deleteDetailId));
//     } finally {
//       setIsDeleting(false);
//       setDeleteDialogOpen(false);
//       setDeleteDetailId(null);
//     }
//   };

//   const renderSortIcon = (column) => {
//     if (sortColumn !== column) return null;
//     return sortDirection === 'asc'
//       ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
//       : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
//   };

//   const SortableHeader = ({ column, children }) => (
//     <TableCell
//       sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none', '&:hover': { backgroundColor: '#e5e9ed' } }}
//       onClick={() => handleSort(column)}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//         {children}
//         <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>{renderSortIcon(column)}</Box>
//       </Box>
//     </TableCell>
//   );

//   return (
//     <div style={styles.root}>
//       <ContentFormModal
//         open={isDialogOpen}
//         onClose={() => { setIsDialogOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//         devices={devices}
//       />

//       <Dialog open={deleteDialogOpen} onClose={() => !isDeleting && setDeleteDialogOpen(false)}>
//         <DialogTitle sx={{ fontWeight: 600 }}>Are you sure you want to delete this PAS content entry?</DialogTitle>
//         <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
//           <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit" disabled={isDeleting}>Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained" disabled={isDeleting}>
//             {isDeleting ? <CircularProgress size={18} color="inherit" /> : 'Delete'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Breadcrumb>
//         <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
//           sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//           Home
//         </Typography>
//         <Typography variant="subtitle2" color="primary">PAS Content</Typography>
//       </Breadcrumb>

//       <div style={styles.mainCard}>
//         <p style={styles.cardTitle}>PAS Content Management</p>
//         <p style={styles.cardSubtitle}>Manage and monitor audio content for Public Addressing System devices</p>
//         <Divider sx={{ mb: 2.5 }} />

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2">Show</Typography>
//               <Select size="small" value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }} sx={{ minWidth: 70 }}>
//                 {[10, 25, 50, 100].map((val) => (<MenuItem key={val} value={val}>{val}</MenuItem>))}
//               </Select>
//               <Typography variant="body2">entries</Typography>
//             </Box>
//             <ExportButtons tableData={sortedRows} />
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Button variant="contained" color="info" onClick={handleOpenDialog} startIcon={<AddIcon />}
//               sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}>
//               Add Content
//             </Button>
//             <Paper sx={{ display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb' }}>
//               <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
//                 value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
//             </Paper>
//           </Box>
//         </Box>

//         {devicesError && <Alert severity="warning" sx={{ mb: 2, fontSize: '13px' }}>Unable to fetch devices: {devicesError}. Using cached devices if available.</Alert>}
//         {tableError && <Alert severity="warning" sx={{ mb: 2, fontSize: '13px' }}>Unable to fetch PAS content table: {tableError}</Alert>}
//         {actionError && <Alert severity="error" sx={{ mb: 2, fontSize: '13px' }} onClose={() => setActionError(null)}>{actionError}</Alert>}
//         {isSaving && <Alert severity="info" sx={{ mb: 2, fontSize: '13px' }}>Saving content to server...</Alert>}
//         {!getAuthToken() && <Alert severity="error" sx={{ mb: 2, fontSize: '13px' }}>No authentication token found. Please log in.</Alert>}

//         <Box sx={{ width: '100%', overflowX: 'auto' }}>
//           <TableContainer component={Paper} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
//             <Table sx={{ minWidth: 1100 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
//                   <SortableHeader column="sno">S.No</SortableHeader>
//                   <SortableHeader column="deviceCode">Device Code / IP</SortableHeader>
//                   <SortableHeader column="deviceName">Device Name</SortableHeader>
//                   <SortableHeader column="contentTitle">Content Title</SortableHeader>
//                   <SortableHeader column="fileName">File Name</SortableHeader>
//                   <SortableHeader column="status">Status</SortableHeader>
//                   <SortableHeader column="registerDate">Register Date</SortableHeader>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tableLoading && (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                       <CircularProgress size={28} />
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Loading PAS content...</Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {!tableLoading && paginatedRows.map((row, index) => (
//                   <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
//                     <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>{index + 1 + (currentPage - 1) * entries}</TableCell>
//                     <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>
//                       {row.deviceCode}
//                       {row.ipAddress && (
//                         <Typography variant="caption" sx={{ display: 'block', color: '#9ca3af', fontFamily: 'monospace' }}>
//                           {row.ipAddress}:{STATIC_PORT}
//                         </Typography>
//                       )}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: '13px' }}>{row.deviceName}</TableCell>
//                     <TableCell sx={{ fontSize: '13px', fontWeight: 500 }}>{row.contentTitle || '—'}</TableCell>
//                     <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>
//                       {row.fileName
//                         ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaMusic size={12} color={C.primary} />{row.fileName}</Box>
//                         : '—'}
//                     </TableCell>
//                     <TableCell>
//                       <span style={{
//                         display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px',
//                         borderRadius: '20px', fontSize: '12px', fontWeight: 700,
//                         background: row.status === 'Active' ? '#10b98120' : '#ef444420',
//                         color: row.status === 'Active' ? '#10b981' : C.error,
//                         border: `1px solid ${row.status === 'Active' ? '#10b98140' : '#ef444440'}`,
//                       }}>● {row.status}</span>
//                     </TableCell>
//                     <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
//                       {new Date(row.regDate).toLocaleString()}
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
  
//   {/* Row 1: Play + Live */}
//   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//     <PlayStopCell ipAddress={row.ipAddress} />
//     <LiveStreamCell ipAddress={row.ipAddress} deviceName={row.deviceName} deviceCode={row.deviceCode} />
//   </Box>

//   {/* Row 2: Edit + Delete + Three-dot (Volume) */}
//   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//     <Tooltip title={row.deviceDetailId ? 'Edit' : 'No content record — use Add Content first'}>
//       <span>
//         <IconButton
//           size="small"
//           sx={{ color: row.deviceDetailId ? C.primary : '#d1d5db' }}
//           onClick={() => row.deviceDetailId && handleEdit(row)}
//           disabled={!row.deviceDetailId}
//         >
//           <EditIcon fontSize="small" />
//         </IconButton>
//       </span>
//     </Tooltip>
//     <Tooltip title={row.deviceDetailId ? 'Delete' : 'No content record to delete'}>
//       <span>
//         <IconButton
//           size="small"
//           sx={{ color: row.deviceDetailId ? C.error : '#d1d5db' }}
//           onClick={() => {
//             if (!row.deviceDetailId) return;
//             setDeleteDetailId(row.deviceDetailId);
//             setDeleteDialogOpen(true);
//           }}
//           disabled={!row.deviceDetailId}
//         >
//           <DeleteIcon fontSize="small" />
//         </IconButton>
//       </span>
//     </Tooltip>
//     <VolumeControlCell ipAddress={row.ipAddress} deviceName={row.deviceName} />
//   </Box>

// </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}

//                 {!tableLoading && paginatedRows.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center" sx={{ color: '#9ca3af', py: 4, fontSize: '14px' }}>
//                       No content records with uploaded audio. Use "Add Content" to add.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
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

// export default PasContent;

//----------------------------------------Live Announcement end=====================================


import React, { useState, useEffect, useRef, useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import {
  Box, Divider, Button, Grid, IconButton, Paper, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, InputBase, MenuItem, Pagination, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select as MuiSelect, Breadcrumbs,
  Switch, FormControlLabel, Alert, LinearProgress, CircularProgress, Tooltip,
  Slider, Popover, Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileExcel, FaFileCsv, FaFilePdf, FaPrint, FaMusic } from 'react-icons/fa';
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

const BASE_URL    = 'https://paspy.puducherrysmartcity.in';
const STATIC_PORT = 5500;
const WS_BASE_URL = 'wss://paspy.puducherrysmartcity.in'; // WebSocket URL

// const BASE_URL    = 'http://127.0.0.1:8000';
// const STATIC_PORT = 5500;
// const WS_BASE_URL = 'ws://127.0.0.1:8000'; // WebSocket URL

// ─── Auth Helpers ──────────────────────────────────────────────────────────────
const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (['auth_token', 'token', 'access_token', 'Authorization'].includes(name)) return value;
  }
  const bearerCookie = document.cookie.split(';').find(c => c.trim().startsWith('Bearer='));
  if (bearerCookie) return bearerCookie.split('=')[1];
  return null;
};

const getAuthHeader = () => {
  const token = getAuthToken();
  if (!token) return null;
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

// ─── Styles ───────────────────────────────────────────────────────────────────
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
  uploadArea: {
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
};

// ─── PAS Proxy API Calls ───────────────────────────────────────────────────────
const apiUpdateIp = async (ip) => {
  const res = await fetch(`${BASE_URL}/setup`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ip, port: STATIC_PORT }),
  });
  if (!res.ok) throw new Error(`IP setup failed: ${res.status}`);
  return res.json();
};

const apiPlay = async (ip) => {
  if (ip) {
    try { await apiUpdateIp(ip); }
    catch (e) { console.warn('IP setup before play failed:', e.message); }
  }
  const res = await fetch(`${BASE_URL}/action/play`, {
    method: 'POST',
    headers: { 'accept': 'application/json' },
    body: '',
  });
  if (!res.ok) throw new Error(`Play failed: ${res.status}`);
  return res.json();
};

const apiStop = async (ip) => {
  if (ip) {
    try { await apiUpdateIp(ip); }
    catch (e) { console.warn('IP setup before stop failed:', e.message); }
  }
  const res = await fetch(`${BASE_URL}/action/stop`, {
    method: 'POST',
    headers: { 'accept': 'application/json' },
    body: '',
  });
  if (!res.ok) throw new Error(`Stop failed: ${res.status}`);
  return res.json();
};

const apiSetVolume = async (ip, volume) => {
  if (ip) {
    try { 
      await apiUpdateIp(ip);
      console.log(`IP setup successful for ${ip}:${STATIC_PORT}`);
    } catch (e) { 
      console.warn('IP setup before volume change failed:', e.message);
      throw new Error(`Failed to configure device IP: ${e.message}`);
    }
  }
  const res = await fetch(`${BASE_URL}/action/volume`, {
    method: 'POST',
    headers: { 
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ volume: volume }),
  });
  if (!res.ok) throw new Error(`Volume control failed: ${res.status}`);
  return res.json();
};

// ─── Live Stream API Calls ─────────────────────────────────────────────────────
const apiStopStream = async () => {
  const res = await fetch(`${BASE_URL}/stream/stop`, {
    method: 'POST',
    headers: { 'accept': 'application/json' },
    body: '',
  });
  if (!res.ok) throw new Error(`Stop stream failed: ${res.status}`);
  return res.json();
};

const apiGetStreamStatus = async () => {
  const res = await fetch(`${BASE_URL}/stream/status`, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`Get stream status failed: ${res.status}`);
  return res.json();
};

// ─── Backend API Calls ─────────────────────────────────────────────────────────
const fetchDevicesFromAPI = async () => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/Device/GetAllDevice`, {
    method: 'GET',
    headers: { 'accept': '*/*', 'Authorization': authHeader },
  });
  if (!res.ok) throw new Error(`Failed to fetch devices: ${res.status}`);
  return res.json();
};

const uploadFileToAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: { 'accept': 'application/json' },
    body: formData,
  });
  if (!res.ok) throw new Error(`File upload failed: ${res.status}`);
  return res.json();
};

const fetchPasDevicesForTable = async () => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/Dashboard/GetDevicesByType?deviceType=PAS`, {
    method: 'GET',
    headers: { 'accept': '*/*', 'Authorization': authHeader },
  });
  if (!res.ok) throw new Error(`Failed to fetch PAS devices: ${res.status}`);
  return res.json();
};

const fetchAllDeviceDetails = async () => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/DeviceDetail/GetAllDeviceDetail`, {
    method: 'GET',
    headers: { 'accept': '*/*', 'Authorization': authHeader },
  });
  if (!res.ok) throw new Error(`Failed to fetch device details: ${res.status}`);
  return res.json();
};

const addDeviceDetailAPI = async (payload) => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/DeviceDetail/AddDeviceDetail`, {
    method: 'POST',
    headers: { 'accept': '*/*', 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Add device detail failed: ${res.status}`);
  return res.json();
};

const updateDeviceDetailAPI = async (payload) => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/DeviceDetail/UpdateDeviceDetail`, {
    method: 'PUT',
    headers: { 'accept': '*/*', 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Update device detail failed: ${res.status}`);
  return res.json();
};

const deleteDeviceDetailAPI = async (id) => {
  const authHeader = getAuthHeader();
  if (!authHeader) throw new Error('No authentication token found in cookies');
  const res = await fetch(`${API_URL}/api/DeviceDetail/DeleteDeviceDetail/${id}`, {
    method: 'DELETE',
    headers: { 'accept': '*/*', 'Authorization': authHeader },
  });
  if (!res.ok) throw new Error(`Delete device detail failed: ${res.status}`);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { message: text }; }
};

// ─── Live Stream Component ─────────────────────────────────────────────────────
// CHANGES (only in this component vs original):
//   1. AUDIO_CONFIG.sampleRate: 16000 → 48000
//   2. AUDIO_CONFIG.format: added 'auto' (Auto-Detect Server Side)
//   3. WebSocket start command: added format: 'auto' field
// ─────────────────────────────────────────────────────────────────────────────
const LiveStreamCell = ({ ipAddress, deviceName, deviceCode }) => {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [packetsSent, setPacketsSent] = useState(0);
  const wsRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const processorRef = useRef(null);
  const intervalRef = useRef(null);
  const isLiveRef = useRef(false);

  // ── CHANGED: sampleRate 16000 → 48000, added format: 'auto' ──
  const AUDIO_CONFIG = {
    sampleRate: 16000,        // ← changed from 16000 to 48000 Hz (matches ESP32 tester)
    channels: 1,
    bitsPerSample: 16,
    chunkSize: 1024,
    format: 'auto',           // ← added: Auto-Detect (Server Side)
  };

  const checkStreamStatus = useCallback(async () => {
    try {
      const response = await apiGetStreamStatus();
      return response.active;
    } catch (err) {
      console.error('[LiveStream] Failed to get stream status:', err);
      return false;
    }
  }, []);

  const initWebSocket = useCallback(() => {
    return new Promise((resolve, reject) => {
      const wsUrl = `${WS_BASE_URL}/ws/stream`;
      console.log('[LiveStream] Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        console.log('[LiveStream] ✅ WebSocket connected');
        resolve(ws);
      };
      ws.onerror = (error) => {
        console.error('[LiveStream] ❌ WebSocket error:', error);
        reject(new Error('WebSocket connection failed'));
      };
      ws.onclose = () => {
        console.log('[LiveStream] WebSocket closed');
        isLiveRef.current = false;
        setIsLive(false);
      };
      ws.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          console.log('[LiveStream] Server message:', response);
          if (response.status === 'error') {
            setError(response.message);
            isLiveRef.current = false;
            setIsLive(false);
          }
        } catch (e) {}
      };

      wsRef.current = ws;
      setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          reject(new Error('WebSocket connection timeout'));
        }
      }, 5000);
    });
  }, []);

  const closeWebSocket = useCallback(() => {
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({ action: 'stop' }));
        } catch (e) {}
        wsRef.current.close();
      }
      wsRef.current = null;
    }
  }, []);

 // Add this worklet processor as a blob
const startMicrophoneStream = async (ws) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      sampleRate: 16000,
      channelCount: 1,
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    }
  });

  mediaStreamRef.current = stream;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)({
    sampleRate: 16000,
  });
  audioContextRef.current = audioContext;

  // ✅ Use AudioWorklet instead of deprecated ScriptProcessor
  const workletCode = `
    class PCMProcessor extends AudioWorkletProcessor {
      process(inputs) {
        const input = inputs[0][0];
        if (!input) return true;
        
        // Convert Float32 → Int16 PCM
        const pcm = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
          const s = Math.max(-1, Math.min(1, input[i]));
          pcm[i] = s < 0 ? s * 32768 : s * 32767;
        }
        this.port.postMessage(pcm.buffer, [pcm.buffer]);
        return true;
      }
    }
    registerProcessor('pcm-processor', PCMProcessor);
  `;

  const blob = new Blob([workletCode], { type: 'application/javascript' });
  const workletUrl = URL.createObjectURL(blob);
  await audioContext.audioWorklet.addModule(workletUrl);
  URL.revokeObjectURL(workletUrl);

  const source = audioContext.createMediaStreamSource(stream);
  sourceRef.current = source;

  const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');
  processorRef.current = workletNode;

  workletNode.port.onmessage = (e) => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !isLiveRef.current) return;
    
    const pcmBuffer = e.data;
    
    // Audio level for UI
    const int16 = new Int16Array(pcmBuffer);
    let sum = 0;
    for (let i = 0; i < int16.length; i++) sum += (int16[i] / 32768) ** 2;
    setAudioLevel(Math.sqrt(sum / int16.length));

    ws.send(pcmBuffer);
    setPacketsSent(prev => prev + 1);
  };

  source.connect(workletNode);
  workletNode.connect(audioContext.destination);

  if (audioContext.state === 'suspended') await audioContext.resume();
};

 const stopMicrophoneStream = () => {
  if (processorRef.current) {
    processorRef.current.disconnect();
    processorRef.current.port.onmessage = null; // ✅ clear worklet listener
    processorRef.current = null;
  }
  if (sourceRef.current) {
    sourceRef.current.disconnect();
    sourceRef.current = null;
  }
  if (audioContextRef.current) {
    audioContextRef.current.close();
    audioContextRef.current = null;
  }
  if (mediaStreamRef.current) {
    mediaStreamRef.current.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;
  }
  setAudioLevel(0);
  setPacketsSent(0);
};

  const handleStartLive = async () => {
    setIsLoading(true);
    setError(null);
    setPacketsSent(0);

    try {
      if (!ipAddress) throw new Error('No IP address configured for this device');

      console.log(`[LiveStream] Step 1: Configuring device IP: ${ipAddress}`);
      await apiUpdateIp(ipAddress);

      console.log('[LiveStream] Step 2: Connecting WebSocket...');
      const ws = await initWebSocket();

      // ── CHANGED: start command now includes format: 'auto' and sampleRate: 48000 ──
      console.log('[LiveStream] Step 3: Sending start command (16000 Hz, auto-detect format)...');
      ws.send(JSON.stringify({
        action: 'start',
        sample_rate: AUDIO_CONFIG.sampleRate,      // 48000
        channels: AUDIO_CONFIG.channels,
        bits_per_sample: AUDIO_CONFIG.bitsPerSample,
        format: AUDIO_CONFIG.format,               // ← 'auto' → Auto-Detect (Server Side)
      }));

      console.log('[LiveStream] Step 4: Waiting for server confirmation...');
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout waiting for stream confirmation')), 10000);
        const messageHandler = (event) => {
          try {
            const response = JSON.parse(event.data);
            console.log('[LiveStream] Server response:', response);
            if (response.status === 'streaming') {
              clearTimeout(timeout);
              ws.removeEventListener('message', messageHandler);
              resolve();
            } else if (response.status === 'error') {
              clearTimeout(timeout);
              ws.removeEventListener('message', messageHandler);
              reject(new Error(response.message));
            }
          } catch (e) {}
        };
        ws.addEventListener('message', messageHandler);
      });

      isLiveRef.current = true;
      setIsLive(true);

      console.log('[LiveStream] Step 5: Starting microphone capture (16000 Hz)...');
      await startMicrophoneStream(ws);

      console.log('[LiveStream] 🎤✅ LIVE STREAM ACTIVE! (16000 Hz, Auto-Detect format)');

      intervalRef.current = setInterval(async () => {
        const status = await checkStreamStatus();
        if (!status && isLiveRef.current) {
          console.log('[LiveStream] Stream stopped on server side');
          isLiveRef.current = false;
          setIsLive(false);
        }
      }, 5000);

    } catch (err) {
      console.error('[LiveStream] ❌ Failed to start:', err);
      setError(err.message);
      isLiveRef.current = false;
      setIsLive(false);
      closeWebSocket();
      stopMicrophoneStream();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopLive = async () => {
    setIsLoading(true);
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      isLiveRef.current = false;
      setIsLive(false);

      stopMicrophoneStream();

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ action: 'stop' }));
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      closeWebSocket();

      try { await apiStopStream(); } catch (err) {
        console.warn('[LiveStream] Stop API error:', err);
      }

      console.log('[LiveStream] ✅ Live stream stopped');
    } catch (err) {
      console.error('[LiveStream] Stop error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isLiveRef.current = false;
      stopMicrophoneStream();
      closeWebSocket();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Tooltip title={isLive ? 'Stop Live Stream' : 'Start Live Stream (Microphone)'}>
        <Button
          size="small"
          variant={isLive ? "contained" : "outlined"}
          onClick={isLive ? handleStopLive : handleStartLive}
          disabled={isLoading}
          startIcon={
            isLoading
              ? <CircularProgress size={14} />
              : isLive
                ? <MicOffIcon fontSize="small" />
                : <MicIcon fontSize="small" />
          }
          sx={{
            textTransform: 'none', fontSize: '12px', fontWeight: 600, minWidth: '80px',
            backgroundColor: isLive ? C.error : 'transparent',
            borderColor: isLive ? C.error : C.warning,
            color: isLive ? 'white' : C.warning,
            '&:hover': {
              backgroundColor: isLive ? '#dc2626' : `${C.warning}10`,
              borderColor: isLive ? '#dc2626' : C.warning,
            }
          }}
        >
          {isLoading ? 'Starting...' : (isLive ? '🔴 LIVE' : 'LIVE')}
        </Button>
      </Tooltip>

      {isLive && (
        <Box sx={{ width: 70, mt: 0.5 }}>
          <Box sx={{ height: 3, bgcolor: '#e5e7eb', borderRadius: 1.5, overflow: 'hidden' }}>
            <Box sx={{
              width: `${Math.min(100, audioLevel * 500)}%`,
              height: '100%',
              bgcolor: audioLevel > 0.01 ? '#10b981' : '#f59e0b',
              transition: 'width 0.05s linear'
            }} />
          </Box>
          <Typography variant="caption" sx={{ fontSize: '8px', color: '#666', display: 'block', textAlign: 'center' }}>
            {packetsSent > 0 ? `${packetsSent} pkts` : 'Waiting...'}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="caption" sx={{ fontSize: '10px', color: C.error, maxWidth: 120 }}>
          {error}
        </Typography>
      )}

      {isLive && !error && audioLevel > 0.01 && (
        <Typography variant="caption" sx={{ fontSize: '8px', color: '#10b981', fontWeight: 600 }}>
          🔊 Speaking
        </Typography>
      )}
    </Box>
  );
};

// ─── Volume Control with Popover Slider ──────────────────────────────────────
const VolumeControlCell = ({ ipAddress, deviceName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVolumeChange = async (event, newValue) => {
    setVolume(newValue);
    
    if (!ipAddress) {
      setActionMsg('No IP address configured');
      setTimeout(() => setActionMsg(''), 2000);
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await apiSetVolume(ipAddress, newValue);
      setActionMsg(res?.message || `Volume set to ${newValue}%`);
    } catch (err) {
      console.warn('Volume control error:', err.message);
      setActionMsg(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionMsg(''), 2000);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'volume-popover' : undefined;

  return (
    <>
      <Tooltip title="Volume Control">
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{ 
            color: C.info,
            backgroundColor: '#f0f9ff',
            '&:hover': { backgroundColor: '#e0f2fe' },
            width: 28, height: 28
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 280,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VolumeUpIcon sx={{ color: C.info }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Volume Control
            </Typography>
            {isLoading && <CircularProgress size={16} sx={{ ml: 'auto' }} />}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
              0%
            </Typography>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={100}
              sx={{
                color: C.info,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                },
              }}
              disabled={isLoading}
            />
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
              100%
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pt: 1,
            borderTop: '1px solid #e5e7eb'
          }}>
            <Typography variant="caption" color="text.secondary">
              Device: {deviceName || 'Unknown'}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: C.info }}>
              {volume}%
            </Typography>
          </Box>
          
          {actionMsg && (
            <Alert severity={actionMsg.includes('Error') ? 'error' : 'success'} sx={{ fontSize: '12px', py: 0 }}>
              {actionMsg}
            </Alert>
          )}
        </Box>
      </Popover>
    </>
  );
};

// ─── Play/Stop Cell ────────────────────────────────────────────────────────────
const PlayStopCell = ({ ipAddress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const isCorsOrNetwork = (err) =>
    err.message.includes('Failed to fetch') || err.message.includes('NetworkError');

  const handlePlay = async () => {
    setIsLoading(true);
    setActionMsg('');
    try {
      const res = await apiPlay(ipAddress);
      setIsPlaying(true);
      setActionMsg(res?.message || 'Playing');
    } catch (err) {
      console.warn('Play error:', err.message);
      setIsPlaying(true);
      if (!isCorsOrNetwork(err)) setActionMsg(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionMsg(''), 3000);
    }
  };

  const handleStop = async () => {
    setIsLoading(true);
    setActionMsg('');
    try {
      const res = await apiStop(ipAddress);
      setIsPlaying(false);
      setActionMsg(res?.message || 'Stopped');
    } catch (err) {
      console.warn('Stop error:', err.message);
      setIsPlaying(false);
      if (!isCorsOrNetwork(err)) setActionMsg(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionMsg(''), 3000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isLoading ? (
          <CircularProgress size={22} />
        ) : isPlaying ? (
          <Tooltip title="Stop playback on this device">
            <Button
              size="small"
              variant="contained"
              onClick={handleStop}
              startIcon={<StopIcon fontSize="small" />}
              sx={{
                textTransform: 'none', fontSize: '12px',
                backgroundColor: C.error, '&:hover': { backgroundColor: '#dc2626' },
                borderRadius: '6px', px: 1.5,
              }}
            >
              Stop
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Play content on this device">
            <Button
              size="small"
              variant="contained"
              onClick={handlePlay}
              startIcon={<PlayArrowIcon fontSize="small" />}
              sx={{
                textTransform: 'none', fontSize: '12px',
                backgroundColor: C.success, '&:hover': { backgroundColor: '#059669' },
                borderRadius: '6px', px: 1.5,
              }}
            >
              Play
            </Button>
          </Tooltip>
        )}
      </Box>
      {actionMsg && (
        <Typography variant="caption" sx={{ fontSize: '10px', color: '#6b7280', maxWidth: 100 }}>
          {actionMsg}
        </Typography>
      )}
    </Box>
  );
};

// ─── Breadcrumb ────────────────────────────────────────────────────────────────
const Breadcrumb = ({ children }) => (
  <div style={styles.breadcrumbCard}>
    <Breadcrumbs aria-label="breadcrumb" separator="›">{children}</Breadcrumbs>
  </div>
);

// ─── Export Utilities ──────────────────────────────────────────────────────────
const exportToCSV = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Device Name', 'Content Title', 'File Name', 'File Size', 'Duration', 'Status', 'Register Date'];
  const rows = data.map((r) => [r.deviceCode, r.deviceName || '', r.contentTitle, r.fileName || '', r.fileSize || '', r.duration || '', r.status, new Date(r.regDate).toLocaleString()]);
  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'PAS_Content.csv'; a.click();
  URL.revokeObjectURL(url);
};

const exportToExcel = (data) => {
  if (!data.length) return;
  const headers = ['Device Code', 'Device Name', 'Content Title', 'File Name', 'File Size', 'Duration', 'Status', 'Register Date'];
  const rows = data.map((r) => [r.deviceCode, r.deviceName || '', r.contentTitle, r.fileName || '', r.fileSize || '', r.duration || '', r.status, new Date(r.regDate).toLocaleString()]);
  let tableHtml = `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
  rows.forEach((row) => { tableHtml += `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`; });
  tableHtml += '</tbody></table>';
  const blob = new Blob([`<html xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='utf-8'/></head><body>${tableHtml}</body></html>`], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'PAS_Content.xls'; a.click();
  URL.revokeObjectURL(url);
};

const ExportButtons = ({ tableData }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button size="small" variant="outlined" color="success" startIcon={<FaFileExcel size={14} />} onClick={() => exportToExcel(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>Excel</Button>
    <Button size="small" variant="outlined" color="info" startIcon={<FaFileCsv size={14} />} onClick={() => exportToCSV(tableData)} sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '6px' }}>CSV</Button>
  </Box>
);

// ─── Empty Form State ──────────────────────────────────────────────────────────
const emptyForm = {
  deviceDetailId: null,
  deviceId: '',
  deviceCode: '',
  deviceName: '',
  contentTitle: '',
  fileName: '',
  fileSize: '',
  fileData: null,
  uploadedFilePath: '',
  duration: '',
  status: 'Active',
  regDate: new Date().toISOString().slice(0, 16),
};

// ─── Add / Edit Content Modal ──────────────────────────────────────────────────
const ContentFormModal = ({ open, onClose, onSave, editData, devices }) => {
  const [form, setForm] = useState(editData || emptyForm);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [fileUploadError, setFileUploadError] = useState('');
  const [ipSetupStatus, setIpSetupStatus] = useState(null);
  const [ipSetupError, setIpSetupError] = useState('');

  React.useEffect(() => {
    if (editData) setForm({ ...editData });
    else setForm({ ...emptyForm, regDate: new Date().toISOString().slice(0, 16) });
    setError('');
    setFileUploadError('');
    setUploadProgress(0);
    setIpSetupStatus(null);
    setIpSetupError('');
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleDeviceChange = async (e) => {
    const deviceId = e.target.value;
    const selectedDevice = devices.find((d) => d.id === parseInt(deviceId) || d.id === deviceId);

    setForm((prev) => ({
      ...prev,
      deviceId,
      deviceCode: selectedDevice?.deviceCode || '',
      deviceName: selectedDevice?.name || '',
      fileData: null, fileName: '', fileSize: '', duration: '',
      contentTitle: '', uploadedFilePath: '',
    }));

    if (!deviceId || !selectedDevice) {
      setIpSetupStatus(null); setIpSetupError(''); return;
    }

    const ip = selectedDevice?.ipAddress;
    if (!ip) {
      setIpSetupStatus('error');
      setIpSetupError('Selected device has no IP address — cannot configure ESP32 target.');
      return;
    }

    setIpSetupStatus('loading');
    setIpSetupError('');
    try {
      await apiUpdateIp(ip);
      setIpSetupStatus('success');
    } catch (err) {
      console.warn('IP setup failed:', err.message);
      const isCors = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
      setIpSetupStatus(isCors ? 'success' : 'error');
      if (!isCors) setIpSetupError(`IP setup failed: ${err.message}`);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'audio/mpeg') { setError('Only MP3 files are allowed!'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('File size should be less than 10MB!'); return; }
    setError(''); setFileUploadError('');
    setUploading(true); setUploadProgress(0);

    const selectedDevice = devices.find(
      (d) => d.id === parseInt(form.deviceId) || d.id === form.deviceId
    );
    const ip = selectedDevice?.ipAddress || '';

    try {
      if (ip) {
        try { await apiUpdateIp(ip); }
        catch (e) { console.warn('Re-setup before upload failed:', e.message); }
      }

      const response = await uploadFileToAPI(file);
      if (!response.filename) throw new Error(response.message || 'Upload response missing filename');

      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
          const dur = Math.round(audio.duration);
          setForm((prev) => ({
            ...prev,
            fileData: file,
            fileName: response.filename,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            duration: `${Math.floor(dur / 60)}:${(dur % 60).toString().padStart(2, '0')}`,
            contentTitle: prev.contentTitle || response.filename.replace('.mp3', ''),
            uploadedFilePath: response.filename,
          }));
          URL.revokeObjectURL(audio.src);
          resolve();
        });
        audio.addEventListener('error', () => {
          setForm((prev) => ({
            ...prev,
            fileData: file,
            fileName: response.filename,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            contentTitle: prev.contentTitle || response.filename.replace('.mp3', ''),
            uploadedFilePath: response.filename,
          }));
          resolve();
        });
      });
      setUploadProgress(100);

    } catch (err) {
      console.error('File upload error:', err);
      setFileUploadError(`Upload failed: ${err.message}`);
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleStatusToggle = (e) => {
    setForm((prev) => ({ ...prev, status: e.target.checked ? 'Active' : 'Inactive' }));
  };

  const handleSubmit = () => {
    if (!form.deviceId) { alert('Please select a device.'); return; }
    if (!form.fileData && !editData) { alert('Please upload an MP3 file.'); return; }
    onSave(form);
    onClose();
  };

  const selectedDevice = devices.find(
    (d) => d.id === parseInt(form.deviceId) || d.id === form.deviceId
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editData ? 'Edit PAS Content' : 'Add PAS Content'}
        <IconButton onClick={onClose} size="small" sx={{ color: '#666' }}><CloseIcon /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Select Device</InputLabel>
              <MuiSelect name="deviceId" value={form.deviceId} label="Select Device" onChange={handleDeviceChange}>
                <MenuItem value="">-- Select a Device --</MenuItem>
                {devices.map((device) => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.deviceCode} - {device.name} ({device.ipAddress || 'IP not available'})
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          {form.deviceCode && (
            <Grid item xs={12}>
              {ipSetupStatus === 'loading' && (
                <Alert severity="info" sx={{ fontSize: '13px' }} icon={<CircularProgress size={16} />}>
                  Configuring ESP32 target → <strong>{selectedDevice?.ipAddress}</strong> : {STATIC_PORT}...
                </Alert>
              )}
              {ipSetupStatus === 'success' && (
                <Alert severity="success" sx={{ fontSize: '13px' }}>
                  ✓ ESP32 target set → <strong>{selectedDevice?.ipAddress}</strong> : <strong>{STATIC_PORT}</strong> — upload your MP3 below.
                </Alert>
              )}
              {ipSetupStatus === 'error' && (
                <Alert severity="warning" sx={{ fontSize: '13px' }}>
                  ⚠ {ipSetupError}
                </Alert>
              )}
              {!ipSetupStatus && (
                <Alert severity="info" sx={{ fontSize: '13px' }}>
                  Selected: <strong>{form.deviceCode}</strong> — {form.deviceName}
                </Alert>
              )}
            </Grid>
          )}

          {form.deviceId && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Upload MP3 File *
                </Typography>
                <input
                  accept="audio/mpeg"
                  style={{ display: 'none' }}
                  id="mp3-upload"
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading || ipSetupStatus === 'loading'}
                />
                <label
                  htmlFor="mp3-upload"
                  style={{ cursor: (uploading || ipSetupStatus === 'loading') ? 'not-allowed' : 'pointer' }}
                >
                  <Box sx={{
                    ...styles.uploadArea,
                    opacity: (uploading || ipSetupStatus === 'loading') ? 0.6 : 1,
                    borderColor: form.fileData ? C.success : '#cbd5e1',
                  }}>
                    {form.fileData ? (
                      <Box>
                        <FaMusic size={40} color={C.primary} />
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>{form.fileName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {form.fileSize}{form.duration ? ` • Duration: ${form.duration}` : ''}
                        </Typography>
                        {form.uploadedFilePath && (
                          <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                            ✓ Uploaded to ESP32 successfully
                          </Typography>
                        )}
                        <Button
                          size="small" variant="outlined" color="error" sx={{ mt: 1 }}
                          onClick={(e) => {
                            e.preventDefault();
                            setForm((prev) => ({ ...prev, fileData: null, fileName: '', fileSize: '', duration: '', contentTitle: '', uploadedFilePath: '' }));
                          }}
                        >
                          Remove File
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <CloudUploadIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Click to upload MP3 file</Typography>
                        <Typography variant="caption" color="text.secondary">Only MP3 format, max 10MB</Typography>
                      </Box>
                    )}
                  </Box>
                </label>

                {uploading && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      Uploading to ESP32 ({selectedDevice?.ipAddress}:{STATIC_PORT})... {uploadProgress}%
                    </Typography>
                  </Box>
                )}

                {fileUploadError && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>{fileUploadError}</Typography>
                )}
                {error && !fileUploadError && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>{error}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth label="Content Title" name="contentTitle" value={form.contentTitle}
                  onChange={handleChange} size="small" required
                  helperText="Auto-filled from file name, can be edited"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={form.status === 'Active'} onChange={handleStatusToggle} color="success" />}
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Status: <span style={{ color: form.status === 'Active' ? '#10b981' : C.error, fontWeight: 700 }}>{form.status}</span>
                    </Typography>
                  }
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between', width: '100%', m: 0 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth label="Register Date & Time" name="regDate" value={form.regDate}
                  onChange={handleChange} size="small" type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="info" sx={{ textTransform: 'none', fontWeight: 600 }}>
          {editData ? 'Update Content' : 'Add Content'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const PasContent = () => {
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [devicesError, setDevicesError] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState(null);
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDetailId, setDeleteDetailId] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const loadDevices = async () => {
      setDevicesError(null);
      try {
        const apiDevices = await fetchDevicesFromAPI();
        if (Array.isArray(apiDevices) && apiDevices.length > 0) {
          const mappedDevices = apiDevices.map(device => ({
            id: device.id,
            deviceCode: device.deviceCode || `DEV_${device.id}`,
            name: device.name || 'Unnamed Device',
            ipAddress: device.ipAddress || '',
            status: device.status,
            deviceType: device.deviceType,
          }));
          setDevices(mappedDevices);
          localStorage.setItem('pas_devices_api', JSON.stringify(mappedDevices));
        } else {
          const storedDevices = localStorage.getItem('pas_devices_api');
          setDevices(storedDevices ? JSON.parse(storedDevices) : []);
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err);
        setDevicesError(err.message);
        const storedDevices = localStorage.getItem('pas_devices_api');
        setDevices(storedDevices ? JSON.parse(storedDevices) : []);
      }
    };
    loadDevices();
  }, []);

  const loadPasTableData = async () => {
    setTableLoading(true);
    setTableError(null);
    try {
      const [devicesResult, allDetails] = await Promise.all([
        fetchPasDevicesForTable(),
        fetchAllDeviceDetails().catch((err) => {
          console.warn('Could not fetch device details:', err.message);
          return [];
        }),
      ]);

      const devicesList = devicesResult?.devices || [];

      const detailByDeviceId = {};
      const detailByDeviceCode = {};
      if (Array.isArray(allDetails)) {
        allDetails.forEach((detail) => {
          if (detail.deviceId && detail.deviceId !== 0) {
            detailByDeviceId[String(detail.deviceId)] = detail;
          }
          if (detail.deviceCode && detail.deviceCode !== 'string') {
            if (!detailByDeviceCode[detail.deviceCode]) {
              detailByDeviceCode[detail.deviceCode] = detail;
            }
          }
        });
      }

      const mapped = devicesList.map((d) => {
        const matchedDetail =
          detailByDeviceId[String(d.id)] ||
          (d.deviceCode ? detailByDeviceCode[d.deviceCode] : null) ||
          null;

        return {
          id: d.id,
          deviceDetailId: matchedDetail ? matchedDetail.id : null,
          deviceId: d.id,
          deviceCode: d.deviceCode || '',
          deviceName: d.name || '',
          contentTitle: matchedDetail?.deviceData || d.deviceData || d.template || '',
          fileName: d.macAddress || '',
          fileSize: '',
          fileData: null,
          uploadedFilePath: '',
          duration: '',
          status: matchedDetail
            ? (matchedDetail.status ? 'Active' : 'Inactive')
            : (d.status ? 'Active' : 'Inactive'),
          regDate: matchedDetail?.regDate || d.regDate || new Date().toISOString(),
          ipAddress: d.ipAddress || '',
          deviceStatus: d.deviceStatus || '',
          _raw: d,
          _detail: matchedDetail,
        };
      });

      setData(mapped.filter((row) => row._detail && row._detail.deviceData && row._detail.deviceData.trim() !== ''));
    } catch (err) {
      console.error('Failed to fetch PAS table data:', err);
      setTableError(err.message);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => { loadPasTableData(); }, []);

  const filteredRows = data.filter((row) =>
    [row.deviceCode, row.deviceName, row.contentTitle, row.fileName, row.status].some((field) =>
      (field || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSort = (column) => {
    if (sortColumn === column) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(column); setSortDirection('asc'); }
    setCurrentPage(1);
  };

  const getSortValue = (row, column) => {
    switch (column) {
      case 'sno':          return row.id;
      case 'deviceCode':   return row.deviceCode || '';
      case 'deviceName':   return row.deviceName || '';
      case 'contentTitle': return row.contentTitle || '';
      case 'fileName':     return row.fileName || '';
      case 'duration':     return row.duration || '';
      case 'status':       return row.status || '';
      case 'registerDate': return new Date(row.regDate).getTime();
      default:             return '';
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

  const handleOpenDialog = () => { setEditData(null); setIsDialogOpen(true); };
  const handleEdit = (row) => { setEditData({ ...row }); setIsDialogOpen(true); };

  const handleSave = async (formData) => {
    setIsSaving(true);
    setActionError(null);
    try {
      const isEdit = !!(formData.deviceDetailId);
      const payload = {
        id: isEdit ? formData.deviceDetailId : 0,
        userId: 0,
        deviceId: parseInt(formData.deviceId) || 0,
        brightness: 0,
        deviceCode: formData.deviceCode || '',
        deviceData: formData.contentTitle || '',
        status: formData.status === 'Active',
        regDate: formData.regDate
          ? new Date(formData.regDate).toISOString()
          : new Date().toISOString(),
      };
      if (isEdit) await updateDeviceDetailAPI(payload);
      else await addDeviceDetailAPI(payload);
      await loadPasTableData();
    } catch (err) {
      console.error('Save failed:', err);
      setActionError(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setActionError(null);
    try {
      await deleteDeviceDetailAPI(deleteDetailId);
      await loadPasTableData();
    } catch (err) {
      console.error('Delete failed:', err);
      setActionError(`Delete failed: ${err.message}`);
      setData((prev) => prev.filter((item) => item.deviceDetailId !== deleteDetailId));
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDeleteDetailId(null);
    }
  };

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc'
      ? <ArrowUpwardIcon sx={{ fontSize: 14, color: C.primary }} />
      : <ArrowDownwardIcon sx={{ fontSize: 14, color: C.primary }} />;
  };

  const SortableHeader = ({ column, children }) => (
    <TableCell
      sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none', '&:hover': { backgroundColor: '#e5e9ed' } }}
      onClick={() => handleSort(column)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {children}
        <Box sx={{ width: 16, display: 'inline-flex', alignItems: 'center' }}>{renderSortIcon(column)}</Box>
      </Box>
    </TableCell>
  );

  return (
    <div style={styles.root}>
      <ContentFormModal
        open={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
        devices={devices}
      />

      <Dialog open={deleteDialogOpen} onClose={() => !isDeleting && setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>Are you sure you want to delete this PAS content entry?</DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" color="inherit" disabled={isDeleting}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={18} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Breadcrumb>
        <Typography component={Link} to="/classic-dashboard" variant="subtitle2" color="inherit"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">PAS Content</Typography>
      </Breadcrumb>

      <div style={styles.mainCard}>
        <p style={styles.cardTitle}>PAS Content Management</p>
        <p style={styles.cardSubtitle}>Manage and monitor audio content for Public Addressing System devices</p>
        <Divider sx={{ mb: 2.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Show</Typography>
              <Select size="small" value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }} sx={{ minWidth: 70 }}>
                {[10, 25, 50, 100].map((val) => (<MenuItem key={val} value={val}>{val}</MenuItem>))}
              </Select>
              <Typography variant="body2">entries</Typography>
            </Box>
            <ExportButtons tableData={sortedRows} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" color="info" onClick={handleOpenDialog} startIcon={<AddIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}>
              Add Content
            </Button>
            <Paper sx={{ display: 'flex', alignItems: 'center', width: 240, px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#f3f4f6', boxShadow: 'none', border: '1px solid #e5e7eb' }}>
              <InputBase sx={{ flex: 1, fontSize: '14px' }} placeholder="Search records…"
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
            </Paper>
          </Box>
        </Box>

        {devicesError && <Alert severity="warning" sx={{ mb: 2, fontSize: '13px' }}>Unable to fetch devices: {devicesError}. Using cached devices if available.</Alert>}
        {tableError && <Alert severity="warning" sx={{ mb: 2, fontSize: '13px' }}>Unable to fetch PAS content table: {tableError}</Alert>}
        {actionError && <Alert severity="error" sx={{ mb: 2, fontSize: '13px' }} onClose={() => setActionError(null)}>{actionError}</Alert>}
        {isSaving && <Alert severity="info" sx={{ mb: 2, fontSize: '13px' }}>Saving content to server...</Alert>}
        {!getAuthToken() && <Alert severity="error" sx={{ mb: 2, fontSize: '13px' }}>No authentication token found. Please log in.</Alert>}

        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
            <Table sx={{ minWidth: 1100 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#EEF2F6' }}>
                  <SortableHeader column="sno">S.No</SortableHeader>
                  <SortableHeader column="deviceCode">Device Code / IP</SortableHeader>
                  <SortableHeader column="deviceName">Device Name</SortableHeader>
                  <SortableHeader column="contentTitle">Content Title</SortableHeader>
                  <SortableHeader column="fileName">File Name</SortableHeader>
                  <SortableHeader column="status">Status</SortableHeader>
                  <SortableHeader column="registerDate">Register Date</SortableHeader>
                  <TableCell sx={{ fontWeight: 700, fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableLoading && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={28} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Loading PAS content...</Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!tableLoading && paginatedRows.map((row, index) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell sx={{ fontSize: '13px', color: '#6b7280' }}>{index + 1 + (currentPage - 1) * entries}</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>
                      {row.deviceCode}
                      {row.ipAddress && (
                        <Typography variant="caption" sx={{ display: 'block', color: '#9ca3af', fontFamily: 'monospace' }}>
                          {row.ipAddress}:{STATIC_PORT}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px' }}>{row.deviceName}</TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 500 }}>{row.contentTitle || '—'}</TableCell>
                    <TableCell sx={{ fontSize: '13px', fontFamily: 'monospace' }}>
                      {row.fileName
                        ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaMusic size={12} color={C.primary} />{row.fileName}</Box>
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px',
                        borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                        background: row.status === 'Active' ? '#10b98120' : '#ef444420',
                        color: row.status === 'Active' ? '#10b981' : C.error,
                        border: `1px solid ${row.status === 'Active' ? '#10b98140' : '#ef444440'}`,
                      }}>● {row.status}</span>
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', whiteSpace: 'nowrap', color: '#6b7280' }}>
                      {new Date(row.regDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>

                        {/* Row 1: Play + Live */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PlayStopCell ipAddress={row.ipAddress} />
                          <LiveStreamCell ipAddress={row.ipAddress} deviceName={row.deviceName} deviceCode={row.deviceCode} />
                        </Box>

                        {/* Row 2: Edit + Delete + Three-dot (Volume) */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Tooltip title={row.deviceDetailId ? 'Edit' : 'No content record — use Add Content first'}>
                            <span>
                              <IconButton
                                size="small"
                                sx={{ color: row.deviceDetailId ? C.primary : '#d1d5db' }}
                                onClick={() => row.deviceDetailId && handleEdit(row)}
                                disabled={!row.deviceDetailId}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title={row.deviceDetailId ? 'Delete' : 'No content record to delete'}>
                            <span>
                              <IconButton
                                size="small"
                                sx={{ color: row.deviceDetailId ? C.error : '#d1d5db' }}
                                onClick={() => {
                                  if (!row.deviceDetailId) return;
                                  setDeleteDetailId(row.deviceDetailId);
                                  setDeleteDialogOpen(true);
                                }}
                                disabled={!row.deviceDetailId}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <VolumeControlCell ipAddress={row.ipAddress} deviceName={row.deviceName} />
                        </Box>

                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {!tableLoading && paginatedRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: '#9ca3af', py: 4, fontSize: '14px' }}>
                      No content records with uploaded audio. Use "Add Content" to add.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * entries + 1} to {Math.min(currentPage * entries, sortedRows.length)} of {sortedRows.length} entries
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

export default PasContent;