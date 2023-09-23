'use client';

import React from 'react';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import withAuth from '@/lib/withAuth';

const AdminPage = () => {
  return (
    <DashboardLayout>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita.
    </DashboardLayout>
  );
};

export default withAuth(AdminPage);
