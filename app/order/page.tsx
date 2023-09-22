'use client';
import React from 'react';

import BiodataStep from '@/components/order/BiodataStep';
import CompletedStep from '@/components/order/CompletedStep';
import PaymentStep from '@/components/order/PaymentStep';

const OrderPage = () => {
  const [step, setStep] = React.useState<number>(1);
  return (
    <div>
      {step == 1 ? <BiodataStep setStep={setStep} /> : null}
      {step == 2 ? <PaymentStep setStep={setStep} /> : null}
      {step == 3 ? <CompletedStep /> : null}
    </div>
  );
};

export default OrderPage;
