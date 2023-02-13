import React from "react";
import LocationPage from './components/LocationPage/LocationPage';
import AdventurePage from './components/AdventurePage/AdventurePage';
import { Routes as BaseRoutes, Route, Navigate } from "react-router-dom";

const Routes = () => {
    return (
      <BaseRoutes>
        <Route exact path="/" element={<LocationPage />} />
        <Route exact path="/adventurepage" element={<AdventurePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </BaseRoutes>
    );
  };
  
  export default Routes;