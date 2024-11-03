import React, { useState } from "react";
import { ShieldExclamationIcon, ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon } from "@heroicons/react/outline";

type Props = {
  Fuente: string;
  Destino: string;
  Protocolo: string;
  Area: string;
  Fecha: string;
  Riesgo: number;
  advertencia_ia: string;
  recomendacion_ia: string;
};

const getAmenazaColor = (riesgo: number) => {
  if (riesgo >= 0 && riesgo <= 10) return { label: "Seguro", color: "bg-green-500", textColor: "text-green-500" };
  if (riesgo >= 11 && riesgo <= 33) return { label: "Bajo", color: "bg-yellow-400", textColor: "text-yellow-400" };
  if (riesgo >= 34 && riesgo <= 66) return { label: "Medio", color: "bg-orange-500", textColor: "text-orange-500" };
  if (riesgo >= 67 && riesgo <= 100) return { label: "Alto", color: "bg-red-600", textColor: "text-red-600" };
  return { label: "Desconocido", color: "bg-gray-500", textColor: "text-gray-500" };
};

const LogsCard = ({ Fuente, Destino, Protocolo, Area, Fecha, Riesgo, recomendacion_ia, advertencia_ia }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { label, color, textColor } = getAmenazaColor(Riesgo);

  return (
    <div className="border-b border-gray-300">
      {/* Fila principal */}
      <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] gap-4 items-center p-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
        <span className="text-black">{Fuente}</span>
        <span className="text-black">{Destino}</span>
        <span className="text-black">{Protocolo}</span>
        <span className="text-black">{Area}</span>
        <span className="text-black">{Fecha}</span>
        <div className="flex items-center">
          <ShieldExclamationIcon className={`h-5 w-5 mr-1 ${textColor}`} />
          <span className={`${textColor} font-semibold`}>{label}</span>
        </div>
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Evita que el clic en el ícono de tres puntos expanda la tarjeta
        >
          <DotsVerticalIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Vista expandida */}
      {isExpanded && (
        <div className="flex justify-between space-x-4 mt-2 bg-gray-100 p-4 rounded-lg">
          {/* Tarjeta de nivel de riesgo */}
          <div className={`p-6 rounded-lg text-center text-white ${color}`} style={{ width: "150px" }}>
            <p className="text-sm">Nivel de Riesgo</p>
            <p className="text-4xl font-bold">{Riesgo}</p>
            <p className="text-sm">de 100</p>
            <p className="mt-2 font-semibold">{label}</p>
          </div>

          {/* Advertencia IA */}
          <div className="flex-1 p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-bold mb-2">Advertencia IA:</h4>
            <p>{advertencia_ia || "Sin advertencias disponibles."}</p>
          </div>

          {/* Recomendación IA */}
          <div className="flex-1 p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-bold mb-2">Recomendación IA:</h4>
            <p>{recomendacion_ia || "Sin recomendaciones disponibles."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsCard;
