// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   PlusOutlined,
//   UnorderedListOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   FolderOpenOutlined,
//   VideoCameraOutlined,
//   FileTextOutlined,
//   FilePdfOutlined,
//   PictureOutlined,
//   SoundOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Button } from "antd";
// import Logo from "../assets/logo.png";

// const { Sider } = Layout;

// const Sidebar = ({ collapsed, onToggleCollapse, onMobileMenuClick }) => {
//   const location = useLocation();

//   const selectedKey = (() => {
//     const path = location.pathname;
//     if (path.includes("/blog/create")) return "write-blog";
//     if (path.includes("/blog/list")) return "blog-list";
//     if (path.includes("/case-study/create")) return "write-case-study";
//     if (path.includes("/case-study/list")) return "case-study-list";
//     if (path.includes("/category")) return "category";
//     if (path.includes("/video/create")) return "add-video";
//     if (path.includes("/video/list")) return "get-video";
//     if (path.includes("/brochure/create")) return "add-brochure";
//     if (path.includes("/brochure/list")) return "get-brochure";
//     if (path.includes("/datasheet/create")) return "add-datasheet";
//     if (path.includes("/datasheet/list")) return "get-datasheet";
//     if (path.includes("/podcast/create")) return "add-podcast";
//     if (path.includes("/podcast/list")) return "get-podcast";
//     if (path.includes("/gallery/create")) return "add-gallery";
//     if (path.includes("/gallery/list")) return "get-gallery";
//     if (path.includes("/product/create")) return "add-product";
//     if (path.includes("/feature/create")) return "add-feature";
//     if (path.includes("/sub-feature/create")) return "add-sub-feature";
//     if (path.includes("/sub-sub-feature/create")) return "add-sub-sub-feature";
//     if (path.includes("/product-datasheet/create"))
//       return "add-product-datasheet";
//     if (path.includes("/product/list")) return "get-product";
//     if (path.includes("/order/list")) return "order-list";
//     return "";
//   })();

//   const iconStyle = { color: "#522EA8", fontSize: "16px" };
//   const menuItemStyle = { fontSize: "14px", fontWeight: 500, color: "#333" };

//   const menuItems = [
//     {
//       key: "blog",
//       icon: <UnorderedListOutlined style={iconStyle} />,
//       label: "📝 Blog",
//       children: [
//         {
//           key: "write-blog",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/blog/create">✍️ Write Blog</Link>,
//         },
//         {
//           key: "blog-list",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/blog/list">📚 All Blogs</Link>,
//         },
//       ],
//     },
//     {
//       key: "offering",
//       icon: <FolderOpenOutlined style={iconStyle} />,
//       label: <Link to="/offering">📂 Offerings</Link>,
//     },
//     {
//       key: "case-study",
//       icon: <FolderOpenOutlined style={iconStyle} />,
//       label: "📘 Case Study",
//       children: [
//         {
//           key: "write-case-study",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/case-study/create">✍️ Write Case Study</Link>,
//         },
//         {
//           key: "case-study-list",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/case-study/list">📚 All Case Studies</Link>,
//         },
//       ],
//     },
//     {
//       key: "video",
//       icon: <VideoCameraOutlined style={iconStyle} />,
//       label: "🎥 Video",
//       children: [
//         {
//           key: "add-video",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/video/create">➕ Add Video</Link>,
//         },
//         {
//           key: "get-video",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/video/list">📺 All Videos</Link>,
//         },
//       ],
//     },
//     {
//       key: "podcast",
//       icon: <SoundOutlined style={iconStyle} />,
//       label: "🎧 Podcasts",
//       children: [
//         {
//           key: "add-podcast",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/podcast/create">🎙️ Upload Podcast</Link>,
//         },
//         {
//           key: "get-podcast",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/podcast/list">🔊 All Podcasts</Link>,
//         },
//       ],
//     },
//     {
//       key: "brochure",
//       icon: <FileTextOutlined style={iconStyle} />,
//       label: "📄 Brochure",
//       children: [
//         {
//           key: "add-brochure",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/brochure/create">📤 Upload Brochure</Link>,
//         },
//         {
//           key: "get-brochure",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/brochure/list">📚 View Brochures</Link>,
//         },
//       ],
//     },
//     {
//       key: "datasheet",
//       icon: <FilePdfOutlined style={iconStyle} />,
//       label: "📑 Datasheet",
//       children: [
//         {
//           key: "add-datasheet",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/datasheet/create">🆕 Add Datasheet</Link>,
//         },
//         {
//           key: "get-datasheet",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/datasheet/list">📁 All Datasheets</Link>,
//         },
//       ],
//     },

//     {
//       key: "gallery",
//       icon: <PictureOutlined style={iconStyle} />,
//       label: "🖼️ Gallery",
//       children: [
//         {
//           key: "add-gallery",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/gallery/create">📷 Add Gallery</Link>,
//         },
//         {
//           key: "get-gallery",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/gallery/list">🖼️ All Galleries</Link>,
//         },
//       ],
//     },
//     {
//       key: "Order",
//       icon: <PictureOutlined style={iconStyle} />,
//       label: "Order List",
//       children: [
//         {
//           key: "order-list",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/order/list">Order</Link>,
//         },
//       ],
//     },

//     {
//       key: "product",
//       icon: <PictureOutlined style={iconStyle} />,
//       label: "🛍️ Product",
//       children: [
//         {
//           key: "add-product",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/product/list">Product</Link>,
//         },
//         {
//           key: "add-product-datasheet",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/datasheet"> Datasheet </Link>,
//         },
//         {
//           key: "add-feature",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/feature/list">Feature</Link>,
//         },
//         {
//           key: "add-sub-feature",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/sub-feature/create"> Add Sub Feature</Link>,
//         },
//         {
//           key: "add-sub-sub-feature",
//           icon: <PlusOutlined style={iconStyle} />,
//           label: <Link to="/sub-sub-feature/create"> Add Sub Sub Feature</Link>,
//         },
//       ],
//     },

//     {
//       key: "trail",
//       icon: <PictureOutlined style={iconStyle} />,
//       label: "🛍️ BBC",
//       children: [
//         {
//           key: "add-product11",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/contentdata">New Post</Link>,
//         },
//         {
//           key: "add-product12",
//           icon: <UnorderedListOutlined style={iconStyle} />,
//           label: <Link to="/content-data-list">All New Post</Link>,
//         },
//         // {
//         //   key: "add-product",
//         //   icon: <UnorderedListOutlined style={iconStyle} />,
//         //   label: <Link to="/blog1/list">Blogs</Link>,
//         // },
//         // {
//         //   key: "add-product-datasheet",
//         //   icon: <UnorderedListOutlined style={iconStyle} />,
//         //   label: <Link to="/brochure1/list"> Brochures </Link>,
//         // },
//         // {
//         //   key: "add-feature",
//         //   icon: <UnorderedListOutlined style={iconStyle} />,
//         //   label: <Link to="/cases1/list">Case-Studies</Link>,
//         // },
//       ],
//     },
//   ];

//   return (
//     <Sider
//       trigger={null}
//       collapsible
//       collapsed={collapsed}
//       width={260}
//       style={{
//         height: "100vh",
//         background: "#ffff",
//         padding: "20px 16px 10px",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         transition: "width 0.3s",
//         boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
//         overflow: "hidden",
//       }}
//     >
//       {/* Logo & Collapse Toggle */}
//       <div className="flex items-center justify-between mb-6">
//         {!collapsed && (
//           <div className="flex items-center gap-2">
//             <img
//               src={Logo}
//               alt="Logo"
//               className="h-13 w-13 rounded-full object-cover"
//             />
//             <span className="font-bold text-blue-500 text-xl tracking-wide">
//               Public Address
//             </span>
//           </div>
//         )}
//         {/* <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggleCollapse}
//           className="text-[#522EA8] text-lg"
//         /> */}
//       </div>

//       {/* Scrollable Menu */}
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           maxHeight: "calc(100vh - 100px)", // Adjust if you add footer
//         }}
//         className="scrollbar"
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[selectedKey]}
//           defaultOpenKeys={collapsed ? [] : [selectedKey.split("-")[0]]}
//           forceSubMenuRender
//           style={{
//             background: "transparent",
//             ...menuItemStyle,
//           }}
//           items={menuItems}
//           onClick={() => {
//             if (window.innerWidth < 768 && onMobileMenuClick) {
//               onMobileMenuClick();
//             }
//           }}
//         />
//       </div>
//     </Sider>
//   );
// };

// export default Sidebar;



import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PlusOutlined,
  UnorderedListOutlined,
  FolderOpenOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PictureOutlined,
  SoundOutlined,
  DashboardOutlined,
  ScheduleOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Logo from "../assets/logo.png";
import Cookies from 'js-cookie';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onToggleCollapse, onMobileMenuClick }) => {
  const location = useLocation();

  // Helper function to determine selected key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    
    // Dashboard
    if (path.includes("/classic-dashboard")) return "dashboard";
    
    // PAS Devices
    if (path.includes("/pas-devices")) return "vmd";
    
    // PAS Content 
    if (path.includes("/pascontent")) return "vmdcontent";
    
    // Schedule Content
    if (path.includes("/schedule")) return "schedule3";
    
    // Content Report
    if (path.includes("/content-report")) return "schedule1";
    
    // Device Report
    if (path.includes("/device-report")) return "schedule2";
    
    // Ticket - Register Ticket
    if (path.includes("/complaints")) return "register-ticket";
    
    // Logs Report
    if (path.includes("/logs")) return "logs";
    if (path.includes("/content-logs")) return "content";
    if (path.includes("/user-logs")) return "user";
    if (path.includes("/activity-logs")) return "activity";
    
    // User Management
    // if (path.includes("/add-user")) return "add-user";
    if (path.includes("/device-permission")) return "device-permission";
    
    return "";
  };

  const selectedKey = getSelectedKey();

  const iconStyle = { color: "#522EA8", fontSize: "16px" };
  const menuItemStyle = { fontSize: "14px", fontWeight: 500, color: "#333" };

  // Get user role from cookies
  const role = Cookies.get('Role')?.toUpperCase() || 'GUEST';

  // Define menu items - all items directly without Pages grouping
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={iconStyle} />,
      label: <Link to="/classic-dashboard">📊 Dashboard</Link>,
    },
    {
      key: "vmd",
      icon: <DesktopOutlined style={iconStyle} />,
      label: <Link to="/pas-devices">📱 PAS</Link>,
    },
    {
      key: "vmdcontent",
      icon: <VideoCameraOutlined style={iconStyle} />,
      label: <Link to="/pascontent">📺 PAS Content</Link>,
    },
    {
      key: "schedule3",
      icon: <ScheduleOutlined style={iconStyle} />,
      label: <Link to="/schedule">⏰ Schedule Content</Link>,
    },
    // {
    //   key: "schedule1",
    //   icon: <FilePdfOutlined style={iconStyle} />,
    //   label: <Link to="/content-report">📊 Content Report</Link>,
    // },
    // {
    //   key: "schedule2",
    //   icon: <PictureOutlined style={iconStyle} />,
    //   label: <Link to="/device-report">🖥️ Device Report</Link>,
    // },
    // {
    //   key: "ticket",
    //   icon: <FolderOpenOutlined style={iconStyle} />,
    //   label: "🎫 Ticket",
    //   children: [
    //     {
    //       key: "register-ticket",
    //       icon: <PlusOutlined style={iconStyle} />,
    //       label: <Link to="/complaints">📝 Register Ticket</Link>,
    //     },
    //     {
    //       key: "track-ticket",
    //       icon: <UnorderedListOutlined style={iconStyle} />,
    //       label: (
    //         <a href="https://ccp.puducherrysmartcity.in/login" target="_blank" rel="noopener noreferrer">
    //           🔍 Track Ticket
    //         </a>
    //       ),
    //     },
    //   ],
    // },

    {
      key: "logs-report",
      icon: <FolderOpenOutlined style={iconStyle} />,
      label: "📋 Logs Report",
      children: (() => {
        const children = [
          // {
          //   key: "logs",
          //   icon: <FileTextOutlined style={iconStyle} />,
          //   label: <Link to="/logs">📄 Status Logs</Link>,
          // },
          // {
          //   key: "content",
          //   icon: <FilePdfOutlined style={iconStyle} />,
          //   label: <Link to="/content-logs">📑 Content Logs</Link>,
          // },
          {
            key: "user",
            icon: <PictureOutlined style={iconStyle} />,
            label: <Link to="/user-logs">👥 User Logs</Link>,
          },
        ];
        
        // Add Activity Logs only for MASTER role
        // if (role === 'MASTER') {
        //   children.push({
        //     key: "activity",
        //     icon: <SoundOutlined style={iconStyle} />,
        //     label: <Link to="/activity-logs">📊 Activity Logs</Link>,
        //   });
        // }
          
        return children;
      })(),
    },
  ];

    
  // Add User Management menu only for MASTER role
  if (role === 'MASTER') {
    menuItems.push({
      key: "Usermanagement",
      icon: <FolderOpenOutlined style={iconStyle} />,
      label: "👥 User Management",
      children: [
        {
          key: "user-management",
          icon: <PlusOutlined style={iconStyle} />,
          label: <Link to="/user-management">➕ Add User</Link>,
        },
        {
          key: "device-permission",
          icon: <VideoCameraOutlined style={iconStyle} />,
          label: <Link to="/device-permission">🔐 Device Permission</Link>,
        },
      ],
    });
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      style={{
        height: "100vh",
        background: "#ffff",
        padding: "20px 16px 10px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Logo & Collapse Toggle */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-13 w-13 rounded-full object-cover"
            />
            <span className="font-bold text-blue-500 text-xl tracking-wide">
              Public Address
            </span>
          </div>
        )}
      </div>

      {/* Scrollable Menu */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "calc(100vh - 100px)",
        }}
        className="scrollbar"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={collapsed ? [] : ["ticket", "logs-report"]}
          forceSubMenuRender
          style={{
            background: "transparent",
            ...menuItemStyle,
          }}
          items={menuItems}
          onClick={() => {
            if (window.innerWidth < 768 && onMobileMenuClick) {
              onMobileMenuClick();
            }
          }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;