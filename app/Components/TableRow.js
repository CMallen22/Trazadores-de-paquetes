import React from 'react';
import { ChevronDownIcon, DotsVerticalIcon, ShieldExclamationIcon } from '@heroicons/react/outline';

const getAmenazaLabel = (value) => {
  if (value >= 0 && value <= 10) return { label: 'Seguro', color: 'text-green-500', iconColor: 'text-green-500' };
  if (value >= 11 && value <= 33) return { label: 'Bajo', color: 'text-yellow-400', iconColor: 'text-yellow-400' };
  if (value >= 34 && value <= 66) return { label: 'Medio', color: 'text-orange-500', iconColor: 'text-orange-500' };
  if (value >= 67 && value <= 100) return { label: 'Alto', color: 'text-red-600', iconColor: 'text-red-600' };
  return { label: 'Desconocido', color: 'text-gray-500', iconColor: 'text-gray-500' };
};

const TableRow = ({ row, index, dropdownIndex, handleDropdownClick, handleOptionClick, options }) => {
  const { label, color, iconColor } = getAmenazaLabel(row.Amenaza);

  return (
    <tr key={index}>
      <td className="py-4 px-1 border-b">
        <ChevronDownIcon className="h-6 w-6 text-black cursor-pointer" />
      </td>
      <td className="py-4 px-4 border-b">{row.Fuente}</td>
      <td className="py-4 px-4 border-b">{row.Destino}</td>
      <td className="py-4 px-4 border-b">{row.Protocolo}</td>
      <td className="py-4 px-4 border-b">{row.Fecha}</td>
      <td className={`py-4 px-4 border-b flex items-center ${color}`}>
        <ShieldExclamationIcon className={`h-6 w-6 mr-2 ${iconColor}`} />
        {label}
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
                  onClick={() => {
                    console.log(`Updating amenaza for row ${index} to ${option.label}`);
                    handleOptionClick(index, option.label);
                  }}
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
  );
};

export default TableRow;
