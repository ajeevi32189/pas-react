// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useNavigate } from 'react-router-dom';
// // import axiosInstance from '../Utils/axiosInstance';

// // ─── Icons (inline SVG to avoid extra deps) ───────────────────────────────────
// const IconDeviceHub = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"/>
//   </svg>
// );
// const IconWifi = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
//   </svg>
// );
// const IconWifiOff = () => (
//   <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//     <path d="M24 .99L4.27 20.73 3 22l1.41 1.41L6 21.82V22h2v-.18l2-2V22h2v-2.18l8.6-8.6c.87.28 1.71.64 2.49 1.08L24.99 9.99C23.13 8.76 21.1 7.84 18.96 7.3L22 4.27 24 .99zM12 3c2.81 0 5.46.74 7.75 2.03l-2.14 2.14A14.5 14.5 0 0 0 12 5c-3.3 0-6.33 1.09-8.75 2.9L1 5.74C3.98 3.97 7.37 3 12 3zM3.27 9.26l2.04 2.04A9.42 9.42 0 0 1 12 9c1.9 0 3.65.56 5.12 1.52l-1.88 1.88A7.21 7.21 0 0 0 12 11c-1.37 0-2.65.38-3.74 1.04L3.27 9.26zM12 19l3-3c-.97-.97-2.3-1.56-3.73-1.56-1.18 0-2.27.42-3.11 1.11L12 19z"/>
//   </svg>
// );
// const IconRefresh = () => (
//   <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
//     <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
//   </svg>
// );

// // ─── Color palette ─────────────────────────────────────────────────────────────
// const C = {
//   primary:   '#2563eb',
//   secondary: '#8b5cf6',
//   success:   '#10b981',
//   error:     '#ef4444',
//   info:      '#06b6d4',
//   darkBlue:  '#1e40af',
//   purple:    '#a855f7',
// };

// // ─── Leaflet icons ─────────────────────────────────────────────────────────────
// const greenIcon = L.icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
// });
// const redIcon = L.icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
// });

// // ─── Styles ────────────────────────────────────────────────────────────────────
// const styles = {
//   // Root wrapper: takes full space given by Layout
//   root: {
//     width: '100%',
//     minHeight: '100%',
//     boxSizing: 'border-box',
//     padding: '24px',
//     backgroundColor: '#EEF2F6',
//     fontFamily: "'Segoe UI', sans-serif",
//   },

//   // ── Header card ──────────────────────────────────────────────────────────────
//   headerCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '28px 32px',
//     marginBottom: '24px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     gap: '16px',
//     borderTop: `4px solid ${C.primary}`,
//   },
//   headerTitle: {
//     margin: 0,
//     fontSize: '28px',
//     fontWeight: 800,
//     background: `linear-gradient(135deg, ${C.primary}, ${C.secondary}, ${C.purple})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     letterSpacing: '-0.5px',
//   },
//   headerSubtitle: {
//     margin: '6px 0 0',
//     fontSize: '14px',
//     color: '#6b7280',
//     fontWeight: 400,
//   },
//   headerRight: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     gap: '12px',
//   },
//   lastUpdatedLabel: {
//     fontSize: '12px',
//     color: '#9ca3af',
//     margin: 0,
//   },
//   lastUpdatedTime: {
//     fontSize: '16px',
//     fontWeight: 700,
//     color: '#111827',
//     margin: 0,
//   },
//   refreshBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     padding: '10px 20px',
//     borderRadius: '10px',
//     border: 'none',
//     cursor: 'pointer',
//     fontWeight: 600,
//     fontSize: '14px',
//     color: '#fff',
//     background: `linear-gradient(135deg, ${C.info}, ${C.primary})`,
//     boxShadow: `0 4px 14px rgba(6,182,212,0.3)`,
//     transition: 'all 0.25s ease',
//   },

//   // ── Stat cards row ────────────────────────────────────────────────────────────
//   statsRow: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '20px',
//     width: '100%',
//     boxSizing: 'border-box',
//     marginBottom: '24px',
//   },
//   statCard: (color) => ({
//     background: '#fff',
//     borderRadius: '14px',
//     padding: '24px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     cursor: 'pointer',
//     position: 'relative',
//     overflow: 'hidden',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     borderTop: `4px solid ${color}`,
//     display: 'flex',
//     alignItems: 'center',
//     gap: '20px',
//   }),
//   statIconWrap: (color) => ({
//     width: '56px',
//     height: '56px',
//     borderRadius: '14px',
//     background: `linear-gradient(135deg, ${color}, ${color}cc)`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: '#fff',
//     flexShrink: 0,
//     boxShadow: `0 4px 12px ${color}44`,
//   }),
//   statNumber: (color) => ({
//     fontSize: '40px',
//     fontWeight: 800,
//     color: color,
//     lineHeight: 1,
//     margin: 0,
//   }),
//   statLabel: {
//     fontSize: '14px',
//     fontWeight: 600,
//     color: '#374151',
//     margin: '4px 0 0',
//   },
//   statFooter: {
//     fontSize: '12px',
//     color: '#9ca3af',
//     margin: '4px 0 0',
//   },

//   // ── Map card ──────────────────────────────────────────────────────────────────
//   mapCard: {
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     borderRadius: '16px',
//     padding: '28px 32px',
//     marginBottom: '24px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
//     borderTop: `4px solid ${C.secondary}`,
//   },
//   mapHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     flexWrap: 'wrap',
//     gap: '12px',
//     marginBottom: '20px',
//   },
//   mapTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     margin: 0,
//   },
//   mapSubtitle: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '4px 0 0',
//   },
//   legendRow: {
//     display: 'flex',
//     gap: '20px',
//     alignItems: 'center',
//   },
//   legendItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//     fontSize: '13px',
//     fontWeight: 600,
//     color: '#374151',
//   },
//   legendDot: (color) => ({
//     width: '12px',
//     height: '12px',
//     borderRadius: '50%',
//     background: color,
//     boxShadow: `0 2px 6px ${color}66`,
//   }),
//   mapContainer: {
//     borderRadius: '12px',
//     overflow: 'hidden',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//   },

//   // ── Status chip ───────────────────────────────────────────────────────────────
//   chip: (online) => ({
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '4px',
//     padding: '2px 10px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: 700,
//     background: online ? '#10b98120' : '#ef444420',
//     color: online ? C.success : C.error,
//     border: `1px solid ${online ? '#10b98140' : '#ef444440'}`,
//   }),

//   // ── Loading spinner ───────────────────────────────────────────────────────────
//   loadingBox: {
//     height: '450px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     gap: '16px',
//     background: '#f9fafb',
//     borderRadius: '12px',
//     color: '#6b7280',
//     fontSize: '15px',
//   },
//   spinner: {
//     width: '48px',
//     height: '48px',
//     border: `4px solid ${C.primary}30`,
//     borderTop: `4px solid ${C.primary}`,
//     borderRadius: '50%',
//     animation: 'spin 0.8s linear infinite',
//   },
// };

// // ─── Tooltip popup inside map ──────────────────────────────────────────────────
// const DeviceTooltip = ({ device }) => (
//   <div style={{ minWidth: '200px', padding: '4px' }}>
//     <p style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 6px' }}>{device.name}</p>
//     <span style={styles.chip(device.deviceStatus === 'ONLINE')}>
//       {device.deviceStatus === 'ONLINE' ? '● Online' : '● Offline'}
//     </span>
//     <p style={{ fontSize: '13px', margin: '8px 0 2px', fontWeight: 600 }}>
//       📍 {device.address}, {device.city}
//     </p>
//     <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px' }}>
//       {device.state} — {device.pinCode}
//     </p>
//     {device.lastUpdate && (
//       <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
//         Last update: {new Date(device.lastUpdate).toLocaleString()}
//       </p>
//     )}
//   </div>
// );
// // in this ClassicDashboard and perfect adjustment of content but AddPASDevice dont have right adjustment in the code i want perfect content adjustment in addpasdevice like classicdashboard
// // ─── Main Dashboard ────────────────────────────────────────────────────────────
// const Dashboard = () => {
//   const [apiData, setApiData] = useState({
//     totalCount: 0, activeCount: 0, inactiveCount: 0, devices: [],
//   });
//   const [loading,     setLoading]     = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/api/Dashboard/GetDevicesByType?deviceType=VMD');
//       const data = response.data;
//       setApiData({
//         totalCount:    data.totalCount,
//         activeCount:   data.activeCount,
//         inactiveCount: data.inactiveCount,
//         devices:       data.devices || [],
//       });
//       setLastUpdated(new Date());
//     } catch (err) {
//       console.error('Dashboard API Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const validDevices = apiData.devices.filter(
//     (d) => d.latitude !== 0 && d.longitude !== 0
//   );

//   const statCards = [
//     {
//       label: 'Total Devices',
//       value: apiData.totalCount,
//       footer: 'All connected PAS devices',
//       color: C.primary,
//       Icon: IconDeviceHub,
//       // route: '/total-sensor',
//     },
//     {
//       label: 'Active Devices',
//       value: apiData.activeCount,
//       footer: 'Currently online and operational',
//       color: C.success,
//       Icon: IconWifi,
//       // route: '/active-sensor',
//     },
//     {
//       label: 'Inactive Devices',
//       value: apiData.inactiveCount,
//       footer: 'Requires attention',
//       color: C.error,
//       Icon: IconWifiOff,
//       // route: '/inactive-sensor',
//     },
//   ];

//   return (
//     <>
//       {/* Inject keyframes for spinner */}
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//       <div style={styles.root}>

//         {/* ── Header ─────────────────────────────────────────────────────────── */}
//         <div style={styles.headerCard}>
//           <div>
//             <h1 style={styles.headerTitle}>Public Addressing System</h1>
//             <p style={styles.headerSubtitle}>
//               Enterprise-grade device management and real-time analytics
//             </p>
//           </div>
//           <div style={styles.headerRight}>
//             <div style={{ textAlign: 'right' }}>
//               <p style={styles.lastUpdatedLabel}>Last updated</p>
//               <p style={styles.lastUpdatedTime}>
//                 {lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}
//               </p>
//             </div>
//             <button
//               style={styles.refreshBtn}
//               onClick={fetchData}
//               disabled={loading}
//               onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
//               onMouseOut={(e)  => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'none'; }}
//             >
//               <IconRefresh /> Refresh Data
//             </button>
//           </div>
//         </div>

//         {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
//         <div style={styles.statsRow}>
//           {statCards.map((card) => (
//             <div
//               key={card.label}
//               style={styles.statCard(card.color)}
//               onClick={() => navigate(card.route)}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}22`;
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'none';
//                 e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
//               }}
//             >
//               <div style={styles.statIconWrap(card.color)}>
//                 <card.Icon />
//               </div>
//               <div>
//                 <p style={styles.statNumber(card.color)}>
//                   {loading ? '—' : card.value}
//                 </p>
//                 <p style={styles.statLabel}>{card.label}</p>
//                 <p style={styles.statFooter}>{card.footer}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Map ────────────────────────────────────────────────────────────── */}
//         <div style={styles.mapCard}>
//           <div style={styles.mapHeader}>
//             <div>
//               <p style={styles.mapTitle}>Device Geographic Distribution</p>
//               <p style={styles.mapSubtitle}>
//                 Real-time location tracking and status monitoring across all devices
//               </p>
//             </div>
//             <div style={styles.legendRow}>
//               <div style={styles.legendItem}>
//                 <div style={styles.legendDot(C.success)} />
//                 Online
//               </div>
//               <div style={styles.legendItem}>
//                 <div style={styles.legendDot(C.error)} />
//                 Offline
//               </div>
//             </div>
//           </div>

//           <div style={styles.mapContainer}>
//             {loading ? (
//               <div style={styles.loadingBox}>
//                 <div style={styles.spinner} />
//                 Loading device locations…
//               </div>
//             ) : (
//               <MapContainer
//                 center={
//                   validDevices.length > 0
//                     ? [validDevices[0].latitude, validDevices[0].longitude]
//                     : [11.9139, 79.8145]
//                 }
//                 zoom={10}
//                 scrollWheelZoom
//                 style={{ height: '450px', width: '100%' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                 />
//                 {validDevices.map((device, i) => (
//                   <Marker
//                     key={i}
//                     position={[device.latitude, device.longitude]}
//                     icon={device.deviceStatus === 'ONLINE' ? greenIcon : redIcon}
//                   >
//                     <Tooltip direction="top" offset={[0, -10]} opacity={1}>
//                       <DeviceTooltip device={device} />
//                     </Tooltip>
//                   </Marker>
//                 ))}
//               </MapContainer>
//             )}
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Dashboard;


//--------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../../../../config';

// ─── Icons (inline SVG to avoid extra deps) ───────────────────────────────────
const IconDeviceHub = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"/>
  </svg>
);
const IconWifi = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
  </svg>
);
const IconWifiOff = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M24 .99L4.27 20.73 3 22l1.41 1.41L6 21.82V22h2v-.18l2-2V22h2v-2.18l8.6-8.6c.87.28 1.71.64 2.49 1.08L24.99 9.99C23.13 8.76 21.1 7.84 18.96 7.3L22 4.27 24 .99zM12 3c2.81 0 5.46.74 7.75 2.03l-2.14 2.14A14.5 14.5 0 0 0 12 5c-3.3 0-6.33 1.09-8.75 2.9L1 5.74C3.98 3.97 7.37 3 12 3zM3.27 9.26l2.04 2.04A9.42 9.42 0 0 1 12 9c1.9 0 3.65.56 5.12 1.52l-1.88 1.88A7.21 7.21 0 0 0 12 11c-1.37 0-2.65.38-3.74 1.04L3.27 9.26zM12 19l3-3c-.97-.97-2.3-1.56-3.73-1.56-1.18 0-2.27.42-3.11 1.11L12 19z"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);

// ─── Color palette ─────────────────────────────────────────────────────────────
const C = {
  primary:   '#2563eb',
  secondary: '#8b5cf6',
  success:   '#10b981',
  error:     '#ef4444',
  info:      '#06b6d4',
  darkBlue:  '#1e40af',
  purple:    '#a855f7',
};

// ─── Leaflet icons ─────────────────────────────────────────────────────────────
const greenIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  // Root wrapper: takes full space given by Layout
  root: {
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    padding: '24px',
    backgroundColor: '#EEF2F6',
    fontFamily: "'Segoe UI', sans-serif",
  },

  // ── Header card ──────────────────────────────────────────────────────────────
  headerCard: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    marginBottom: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    borderTop: `4px solid ${C.primary}`,
  },
  headerTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 800,
    background: `linear-gradient(135deg, ${C.primary}, ${C.secondary}, ${C.purple})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.5px',
  },
  headerSubtitle: {
    margin: '6px 0 0',
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 400,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px',
  },
  lastUpdatedLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  lastUpdatedTime: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    color: '#fff',
    background: `linear-gradient(135deg, ${C.info}, ${C.primary})`,
    boxShadow: `0 4px 14px rgba(6,182,212,0.3)`,
    transition: 'all 0.25s ease',
  },

  // ── Stat cards row ────────────────────────────────────────────────────────────
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '24px',
  },
  statCard: (color) => ({
    background: '#fff',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderTop: `4px solid ${color}`,
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  }),
  statIconWrap: (color) => ({
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
    boxShadow: `0 4px 12px ${color}44`,
  }),
  statNumber: (color) => ({
    fontSize: '40px',
    fontWeight: 800,
    color: color,
    lineHeight: 1,
    margin: 0,
  }),
  statLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    margin: '4px 0 0',
  },
  statFooter: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '4px 0 0',
  },

  // ── Map card ──────────────────────────────────────────────────────────────────
  mapCard: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    marginBottom: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    borderTop: `4px solid ${C.secondary}`,
  },
  mapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
  },
  mapTitle: {
    fontSize: '20px',
    fontWeight: 700,
    background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  mapSubtitle: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '4px 0 0',
  },
  legendRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
  },
  legendDot: (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 2px 6px ${color}66`,
  }),
  mapContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },

  // ── Status chip ───────────────────────────────────────────────────────────────
  chip: (online) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
    background: online ? '#10b98120' : '#ef444420',
    color: online ? C.success : C.error,
    border: `1px solid ${online ? '#10b98140' : '#ef444440'}`,
  }),

  // ── Loading spinner ───────────────────────────────────────────────────────────
  loadingBox: {
    height: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px',
    background: '#f9fafb',
    borderRadius: '12px',
    color: '#6b7280',
    fontSize: '15px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: `4px solid ${C.primary}30`,
    borderTop: `4px solid ${C.primary}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

// ─── Tooltip popup inside map ──────────────────────────────────────────────────
const DeviceTooltip = ({ device }) => (
  <div style={{ minWidth: '200px', padding: '4px' }}>
    <p style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 6px' }}>{device.name}</p>
    <span style={styles.chip(device.deviceStatus === 'ONLINE')}>
      {device.deviceStatus === 'ONLINE' ? '● Online' : '● Offline'}
    </span>
    <p style={{ fontSize: '13px', margin: '8px 0 2px', fontWeight: 600 }}>
      📍 {device.address}, {device.city}
    </p>
    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px' }}>
      {device.state} — {device.pinCode}
    </p>
    {device.lastUpdate && (
      <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
        Last update: {new Date(device.lastUpdate).toLocaleString()}
      </p>
    )}
  </div>
);

// ─── API Helper Function ───────────────────────────────────────────────────────
const fetchDevicesByType = async (deviceType) => {
  try {
    const token = Cookies.get('authToken') || Cookies.get('token');
    
    if (!token) {
      console.error('No authentication token found in cookies');
      return null;
    }

    const response = await fetch(
      `${API_URL}/api/Dashboard/GetDevicesByType?deviceType=${deviceType}`,
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [apiData, setApiData] = useState({
    totalCount: 0, 
    activeCount: 0, 
    inactiveCount: 0, 
    devices: [],
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchDevicesByType('PAS');
      
      if (data) {
        setApiData({
          totalCount: data.totalCount || 0,
          activeCount: data.activeCount || 0,
          inactiveCount: data.inactiveCount || 0,
          devices: data.devices || [],
        });
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch device data');
      }
    } catch (err) {
      console.error('Dashboard API Error:', err);
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const validDevices = apiData.devices.filter(
    (d) => d.latitude !== 0 && d.longitude !== 0
  );

  const statCards = [
    {
      label: 'Total Devices',
      value: apiData.totalCount,
      footer: 'All connected PAS devices',
      color: C.primary,
      Icon: IconDeviceHub,
      // route: '/total-sensor',
    },
    {
      label: 'Active Devices',
      value: apiData.activeCount,
      footer: 'Currently online and operational',
      color: C.success,
      Icon: IconWifi,
      // route: '/active-sensor',
    },
    {
      label: 'Inactive Devices',
      value: apiData.inactiveCount,
      footer: 'Requires attention',
      color: C.error,
      Icon: IconWifiOff,
      // route: '/inactive-sensor',
    },
  ];

  return (
    <>
      {/* Inject keyframes for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={styles.root}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={styles.headerCard}>
          <div>
            <h1 style={styles.headerTitle}>Public Addressing System</h1>
            <p style={styles.headerSubtitle}>
              Enterprise-grade device management and real-time analytics
            </p>
          </div>
          <div style={styles.headerRight}>
            <div style={{ textAlign: 'right' }}>
              <p style={styles.lastUpdatedLabel}>Last updated</p>
              <p style={styles.lastUpdatedTime}>
                {lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}
              </p>
            </div>
            <button
              style={styles.refreshBtn}
              onClick={fetchData}
              disabled={loading}
              onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={(e)  => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'none'; }}
            >
              <IconRefresh /> Refresh Data
            </button>
          </div>
        </div>

        {/* ── Error Message ─────────────────────────────────────────────────────── */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: `1px solid ${C.error}`,
            borderRadius: '12px',
            padding: '12px 20px',
            marginBottom: '20px',
            color: C.error,
            fontWeight: 500,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
        <div style={styles.statsRow}>
          {statCards.map((card) => (
            <div
              key={card.label}
              style={styles.statCard(card.color)}
              onClick={() => navigate(card.route)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}22`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
              }}
            >
              <div style={styles.statIconWrap(card.color)}>
                <card.Icon />
              </div>
              <div>
                <p style={styles.statNumber(card.color)}>
                  {loading ? '—' : card.value}
                </p>
                <p style={styles.statLabel}>{card.label}</p>
                <p style={styles.statFooter}>{card.footer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Map ────────────────────────────────────────────────────────────── */}
        <div style={styles.mapCard}>
          <div style={styles.mapHeader}>
            <div>
              <p style={styles.mapTitle}>Device Geographic Distribution</p>
              <p style={styles.mapSubtitle}>
                Real-time location tracking and status monitoring across all devices
              </p>
            </div>
            <div style={styles.legendRow}>
              <div style={styles.legendItem}>
                <div style={styles.legendDot(C.success)} />
                Online
              </div>
              <div style={styles.legendItem}>
                <div style={styles.legendDot(C.error)} />
                Offline
              </div>
            </div>
          </div>

          <div style={styles.mapContainer}>
            {loading ? (
              <div style={styles.loadingBox}>
                <div style={styles.spinner} />
                Loading device locations…
              </div>
            ) : validDevices.length === 0 ? (
              <div style={styles.loadingBox}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📍</div>
                <div>No devices with valid coordinates available</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>
                  Total devices: {apiData.totalCount} | Active: {apiData.activeCount} | Inactive: {apiData.inactiveCount}
              </div>
              </div>
            ) : (
              <MapContainer
                center={
                  validDevices.length > 0
                    ? [validDevices[0].latitude, validDevices[0].longitude]
                    : [11.9139, 79.8145]
                }
                zoom={10}
                scrollWheelZoom
                style={{ height: '450px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {validDevices.map((device, i) => (
                  <Marker
                    key={i}
                    position={[device.latitude, device.longitude]}
                    icon={device.deviceStatus === 'ONLINE' ? greenIcon : redIcon}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <DeviceTooltip device={device} />
                    </Tooltip>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;