import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../App/App';
import NewInvoice from '../../components/NewInvoice/NewInvoice';

export default function Dashboard() {
  const { getUserData } = useContext(MainContext);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <NewInvoice />
    </>
  );
}
