import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Will be created in a later batch
import appRoutes from './router';

function App() {
  return (
    <Layout>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
