import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
