import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AddUser from './components/AddUser';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import AddInventory from './components/AddInventory';
import EditInventory from './components/EditInventory';
import Admin from './components/Admin';
import ModuleManager from './components/ModuleManager';
import InventoryManager from './components/InventoryManager';
import RoleManager from './components/RoleManager';
import UserManager from './components/UserManager';
import EditUser from './components/EditUser';
import AddModule from './components/AddModule';
import AddRole from './components/AddRole';
import EditRole from './components/EditRole';
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';
import ProcessSteps from './components/ProcessSteps';
import AddProcessSteps from './components/AddProcessSteps';
import EditProcessSteps from './components/EditProcessSteps';
import Parts from './components/Parts';
import AddPart from './components/AddPart';
import EditPart from './components/EditPart';
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';
import EditJob from './components/EditJob';
import Container from './components/Container';
import AddContainer from './components/AddContainer';
import EditContainer from './components/EditContainer';
import Warehouse from './components/Warehouse';
import AddWarehouse from './components/AddWarehouse';
import EditWarehouse from './components/EditWarehouse';
import Shipping from './components/Shipping';
import Packing from './components/Packing';
import ShippingLabels from './components/ShippingLabels';
import Tracking from './components/Tracking';
import AddTracking from './components/AddTracking';
import Production from './components/Production';
import ShiftManager from './components/ShiftManager';
import AddShift from './components/AddShift';
import EditShift from './components/EditShift';
import PackOrder from './components/PackOrder';
import ProductionHistory from './components/ProductionHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/edit-inventory/:id" element={<EditInventory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/module-manager" element={<ModuleManager />} />
        <Route path="/user-manager" element={<UserManager />} />
        <Route path="/add-module" element={<AddModule />} />
        <Route path="/role-manager" element={<RoleManager />} />
        <Route path="/inventory-manager" element={<InventoryManager />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/edit-role/:roleId" element={<EditRole />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/edit-order/:orderId" element={<EditOrder />} />
        <Route path="/process-steps" element={<ProcessSteps />} />
        <Route path="/add-process-steps" element={<AddProcessSteps />} />
        <Route path="/edit-process-steps/:id" element={<EditProcessSteps />} /> 
        <Route path="/parts" element={<Parts />} />
        <Route path="/add-part" element={<AddPart />} />
        <Route path="/edit-part/:id" element={<EditPart />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
        <Route path="/container" element={<Container />} />
        <Route path="/add-container" element={<AddContainer />} />
        <Route path="/edit-container/:id" element={<EditContainer />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/add-warehouse" element={<AddWarehouse />} />
        <Route path="/edit-warehouse/:id" element={<EditWarehouse />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/packing" element={<Packing />} />
        <Route path="/shipping-labels" element={<ShippingLabels />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/add-tracking" element={<AddTracking />} />
        <Route path="/production" element={<Production />} />
        <Route path="/shift-manager" element={<ShiftManager />} />
        <Route path="/add-shift" element={<AddShift />} />
        <Route path="/edit-shift/:id" element={<EditShift />} />
        <Route path="/packorder" element={<PackOrder />} />
        <Route path="/production-history" element={<ProductionHistory />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
