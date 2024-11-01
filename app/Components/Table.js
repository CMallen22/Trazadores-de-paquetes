import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import FilterDropdown from './FilterDropdown';
import ProtocolDropdown from './ProtocolDropdown';

const getAmenazaLabel = (value) => {
  if (value >= 0 && value <= 10) return { label: 'Seguro', color: 'text-green-500', iconColor: 'text-green-500' };
  if (value >= 11 && value <= 33) return { label: 'Bajo', color: 'text-yellow-400', iconColor: 'text-yellow-400' };
  if (value >= 34 && value <= 66) return { label: 'Medio', color: 'text-orange-500', iconColor: 'text-orange-500' };
  if (value >= 67 && value <= 100) return { label: 'Alto', color: 'text-red-600', iconColor: 'text-red-600' };
  return { label: 'Desconocido', color: 'text-gray-500', iconColor: 'text-gray-500' };
};

const Table = ({ data, onUpdateAmenaza }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [filteredProtocols, setFilteredProtocols] = useState([]);
  const [filteredAmenazas, setFilteredAmenazas] = useState(['Seguro', 'Bajo', 'Medio', 'Alto']); 
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAmenazaFilterDropdown, setShowAmenazaFilterDropdown] = useState(false);


  useEffect(() => {
    const uniqueProtocols = Array.from(new Set(data.map((row) => row.Protocolo))).map((protocol) => ({
      label: protocol,
      checked: true,
    }));
    setFilteredProtocols(uniqueProtocols);
  }, [data]);

  const handleDropdownClick = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleOptionClick = (index, value) => {
    onUpdateAmenaza(index, value);
    setDropdownIndex(null);
  };

  const handleProtocolChange = (label) => {
    setFilteredProtocols((prev) =>
      prev.map((protocol) =>
        protocol.label === label ? { ...protocol, checked: !protocol.checked } : protocol
      )
    );
  };

  const handleAmenazaChange = (label) => {
    setFilteredAmenazas((prev) =>
      prev.includes(label) ? prev.filter((amenaza) => amenaza !== label) : [...prev, label]
    );
  };

  const protocolOptions = filteredProtocols;
  const amenazaOptions = [
    { label: 'Seguro', color: 'text-green-500', iconColor: 'text-green-500' },
    { label: 'Bajo', color: 'text-yellow-400', iconColor: 'text-yellow-400' },
    { label: 'Medio', color: 'text-orange-500', iconColor: 'text-orange-500' },
    { label: 'Alto', color: 'text-red-600', iconColor: 'text-red-600' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-4 px-1 border-b text-left"></th>
            <th className="py-4 px-4 border-b text-left">Fuente</th>
            <th className="py-4 px-4 border-b text-left">Destino</th>
            <th className="py-4 px-4 border-b text-left flex items-center relative">
              Protocolo
              <ProtocolDropdown
                options={protocolOptions}
                showDropdown={showFilterDropdown}
                onFilterClick={() => setShowFilterDropdown(!showFilterDropdown)}
                handleOptionChange={handleProtocolChange}
              />
            </th>
            <th className="py-4 px-4 border-b text-left">Fecha</th>
            <th className="py-4 px-4 border-b text-left flex items-center relative">
              Riesgo
              <FilterDropdown
                options={amenazaOptions.map((option) => ({
                  ...option,
                  checked: filteredAmenazas.includes(option.label),
                }))}
                showDropdown={showAmenazaFilterDropdown}
                onFilterClick={() => setShowAmenazaFilterDropdown(!showAmenazaFilterDropdown)}
                handleOptionChange={handleAmenazaChange}
              />
            </th>
            <th className="py-4 px-1 border-b text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) =>
              filteredProtocols.find((protocol) => protocol.label === row.Protocolo && protocol.checked)
            )
            .filter((row) => filteredAmenazas.includes(getAmenazaLabel(row.Amenaza).label))
            .map((row, index) => (
              <TableRow
                key={index}
                row={row}
                index={index}
                dropdownIndex={dropdownIndex}
                handleDropdownClick={handleDropdownClick}
                handleOptionClick={handleOptionClick}
                options={amenazaOptions}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
