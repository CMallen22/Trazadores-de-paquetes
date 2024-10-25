// App.js
"use client";

import React, { useState, useEffect } from 'react';
import ExcelUploader from './ExcelUploader';
import Table from './Table';

const App = () => {
  const [data, setData] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filteredAmenazas, setFilteredAmenazas] = useState(['Seguro', 'Bajo', 'Medio', 'Alto']);
  const [showAmenazaFilterDropdown, setShowAmenazaFilterDropdown] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      const uniqueProtocols = [...new Set(data.map((row) => row.Protocolo))];
      setProtocols(uniqueProtocols.map((protocol) => ({ label: protocol, checked: true })));
    }
  }, [data]);

  const handleProtocolChange = (label) => {
    const newProtocols = protocols.map(protocol =>
      protocol.label === label ? { ...protocol, checked: !protocol.checked } : protocol
    );
    setProtocols(newProtocols);
  };

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const getAmenazaValue = (label) => {
    switch (label) {
      case 'Seguro':
        return 5; 
      case 'Bajo':
        return 22; 
      case 'Medio':
        return 50; 
      case 'Alto':
        return 85; 
      default:
        return 0;
    }
  };

  const onUpdateAmenaza = (index, label) => {
    const value = getAmenazaValue(label);
    console.log(`Updating amenaza for row ${index} to ${label} (value: ${value})`);
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], Amenaza: value };
      return newData;
    });
  };

  return (
    <div>
      <ExcelUploader onDataLoaded={setData} />
      <Table
        data={data}
        onUpdateAmenaza={onUpdateAmenaza}
        filteredProtocols={protocols}
        onFilterClick={handleFilterClick}
        showFilterDropdown={showFilterDropdown}
        handleProtocolChange={handleProtocolChange}
        filteredAmenazas={filteredAmenazas}
        onAmenazaFilterClick={() => setShowAmenazaFilterDropdown(!showAmenazaFilterDropdown)}
        showAmenazaFilterDropdown={showAmenazaFilterDropdown}
        handleAmenazaChange={(label) => setFilteredAmenazas(
          filteredAmenazas.includes(label)
            ? filteredAmenazas.filter((amenaza) => amenaza !== label)
            : [...filteredAmenazas, label]
        )}
      />
    </div>
  );
};

export default App;
