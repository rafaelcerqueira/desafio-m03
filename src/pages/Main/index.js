import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import TransactionList from '../../components/Header/TransactionsList';
import ModalStorageTransactions from '../../components/ModalStorageTransactions';
import Summary from '../../components/Summary';
import './styles.css';


function Main() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    handleLoadTransactions();
  }, [reload]);

  useEffect(() => {
    if (currentTransaction) return setOpen(true);

  }, [currentTransaction]);

  useEffect(() => {
    if (!open) handleLoadTransactions();

    if (!open && currentTransaction) setCurrentTransaction(false);

  }, [open]);

  async function handleLoadTransactions (){
    const response = await fetch('http://localhost:3334/transactions', {
      method: 'GET'
    });

    const data = await response.json();
    setTransactions(data);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <TransactionList 
          transactions={transactions}
          setCurrentTransaction={setCurrentTransaction}
          reload={reload}
          setReload={setReload}
        />
        <div>
          <Summary 
            transactions={transactions}
          />
          <button 
            className='btn-add-register'
            onClick={() => setOpen(true)}
          >
            Adicionar Registro
          </button>
        </div>
      </main>
       
      <ModalStorageTransactions 
        open={open}
        setOpen={setOpen}
        currentTransaction={currentTransaction}
      />
      
    </div>
  );
}

export default Main;
