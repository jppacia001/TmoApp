import React, { createContext, useState, useContext } from 'react';

const RecordsContext = createContext();

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  const setAllRecords = (fetchedRecords) => {
    setRecords(fetchedRecords);
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord, setAllRecords }}>
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => useContext(RecordsContext);
