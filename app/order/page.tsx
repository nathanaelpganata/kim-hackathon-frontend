'use client';
import React from 'react';

import CategoryStep from '@/components/order/CategoryStep';
import UserStep from '@/components/order/UserStep';
import ItemStep from '@/components/order/ItemStep';
import Layout from '@/components/layouts/Layout';

const OrderPage = () => {
  const [step, setStep] = React.useState<number>(1);
  return (
    <Layout>
      {step == 1 ? <CategoryStep setStep={setStep} /> : null}
      {step == 2 ? <UserStep setStep={setStep} /> : null}
      {step == 3 ? <ItemStep /> : null}
    </Layout>
  );
};

export default OrderPage;
