// TableRow.js
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ShieldExclamationIcon, DotsVerticalIcon } from '@heroicons/react/outline';

const getAmenazaLabel = (value) => {
  if (value >= 0 && value <= 10) return { label: 'Seguro', color: 'bg-green-500', textColor: 'text-green-500' };
  if (value >= 11 && value <= 33) return { label: 'Bajo', color: 'bg-yellow-400', textColor: 'text-yellow-400' };
  if (value >= 34 && value <= 66) return { label: 'Medio', color: 'bg-orange-500', textColor: 'text-orange-500' };
  if (value >= 67 && value <= 100) return { label: 'Alto', color: 'bg-red-600', textColor: 'text-red-600' };
  return { label: 'Desconocido', color: 'bg-gray-500', textColor: 'text-gray-500' };
};

const TableRow = ({ row, index, dropdownIndex, handleDropdownClick, handleOptionClick, options }) => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const { label, color, textColor } = getAmenazaLabel(row.Amenaza);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); 
  };

  return (
    <>
      <tr key={index}>
        <td className="py-4 px-1 border-b">
          {isExpanded ? (
            <ChevronUpIcon className="h-6 w-6 text-black cursor-pointer" onClick={toggleExpand} />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-black cursor-pointer" onClick={toggleExpand} />
          )}
        </td>
        <td className="py-4 px-4 border-b">{row.Fuente}</td>
        <td className="py-4 px-4 border-b">{row.Destino}</td>
        <td className="py-4 px-4 border-b">{row.Protocolo}</td>
        <td className="py-4 px-4 border-b">{row.Area}</td>
        <td className="py-4 px-4 border-b">{row.Fecha}</td>
        <td className={`py-4 px-4 border-b flex items-center`}>
          <ShieldExclamationIcon className={`h-6 w-6 mr-2 ${textColor}`} />
          <span className={`${textColor}`}>{label}</span>
        </td>
        <td className="py-4 px-1 border-b relative">
          <DotsVerticalIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => handleDropdownClick(index)}
          />
          {dropdownIndex === index && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul>
                {options.map((option, i) => (
                  <li
                    key={i}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${option.color}`}
                    onClick={() => handleOptionClick(index, option.label)}
                  >
                    <ShieldExclamationIcon className={`h-6 w-6 mr-2 ${option.iconColor}`} />
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={8} className="py-4 px-4 border-b bg-gray-50">
            <div className="flex justify-between space-x-4">
              <div className={`p-6 rounded-lg text-center text-white ${color}`} style={{ width: '150px' }}>
                <p className="text-sm">Nivel de Riesgo</p>
                <p className="text-4xl font-bold">{row.Amenaza}</p>
                <p className="text-sm">de 100</p>
                <p className="mt-2 font-semibold">{label}</p>
              </div>

              <div className="flex-1 p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-bold mb-2">Advertencia IA:</h4>
                <p>{row.AdvertenciaIA || 'Sin advertencias disponibles.'}</p>
              </div>

              <div className="flex-1 p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-bold mb-2">Recomendación IA:</h4>
                <p>{row.RecomendacionIA || 'Sin recomendaciones disponibles.'}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
