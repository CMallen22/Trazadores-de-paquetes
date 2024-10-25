// ExcelUploader.js
"use client";
import React from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onDataLoaded }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const formattedData = jsonData.map((row) => ({
        Fuente: row.Fuente,
        Destino: row.Destino,
        Protocolo: row.Protocolo,
        Area: row.Area,
        Fecha: row.Fecha,
        Amenaza: row.Amenaza,
        AdvertenciaIA: row.AdvertenciaIA,
        RecomendacionIA: row.RecomendacionIA,
      }));
      onDataLoaded(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} className="mb-4" />
    </div>
  );
};

export default ExcelUploader;
