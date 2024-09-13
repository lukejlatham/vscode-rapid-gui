import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
// import Home from '../pages/Home/Home';
// import Templates from '../pages/Templates/Templates';
// import Projects from '../pages/Projects/Projects';
// import Deleted from '../pages/Deleted/Deleted';
import EditingInterface from '../pages/EditingInterface/EditingInterface';
import { Theme } from '@fluentui/react-components';

const AppRoutes: React.FC<{
}> = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<EditingInterface/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
