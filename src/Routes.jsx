import React from "react";
import HomePage from "./components/HomePage/HomePage";
import LocationPage from './components/LocationPage/LocationPage';
import AdventurePage from './components/AdventurePage/AdventurePage';
import { Routes as BaseRoutes, Route, Navigate } from "react-router-dom";
import WaypointMap from "./components/AdventurePage/WaypointMap";

const Routes = () => {
    return (
      <BaseRoutes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/go" element={<WaypointMap/>} />
      </BaseRoutes>
    );
  };
  
  export default Routes;