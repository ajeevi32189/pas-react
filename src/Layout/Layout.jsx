import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // For mobile

  const hideScrollbarStyle = {
    height: '100%',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }; 

  const hideScrollbarWebkit = `::-webkit-scrollbar { display: none; }`;

  return (
    <div className="flex h-screen w-screen overflow-hidden relative bg-[#FFFFFF]">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 md:static
          transition-all duration-300 ease-in-out
          h-full
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${collapsed ? 'md:w-[64px]' : 'md:w-[260px]'}
          flex flex-col
        `}
        style={{ transitionProperty: 'width, transform' }}
      >
        <div style={hideScrollbarStyle}>
          <style>{hideScrollbarWebkit}</style>
          {/* <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            onMobileMenuClick={() => setShowSidebar(false)} // <-- Important
          /> */}
          <Sidebar
  collapsed={collapsed}
  onMobileMenuClick={() => setShowSidebar(false)}
/>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 z-10 transition-all duration-300 ease-in-out">
        {/* <Header onToggle={() => setShowSidebar(!showSidebar)} /> */}
        <Header
  onToggle={() => {
    if (window.innerWidth < 768) {
      setShowSidebar(!showSidebar); // Mobile
    } else {
      setCollapsed(!collapsed); // Desktop
    }
  }}
/>
        <main className="flex-1 overflow-y-auto rounded-tl-2xl bg-[#EEF2F6] text-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
