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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newArea, setNewArea] = useState(Area);
  const [newRisk, setNewRisk] = useState(Riesgo);

  const { label, color, textColor } = getAmenazaColor(Riesgo);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea(e.target.value);
  };

  const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setNewRisk(value);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRisk(Number(e.target.value));
  };

  const handleAccept = () => {
    // Lógica para guardar cambios
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="border-b border-gray-300 relative">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent z-10"
          onClick={closeMenu}
        ></div>
      )}
      <div
        className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] gap-4 items-center p-2 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <ChevronUpIcon className="h-6 w-6 text-purple-500" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-black" />
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
        <div className="relative">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={toggleMenu}
          >
            <DotsVerticalIcon className={`h-6 w-6 ${isMenuOpen ? "text-purple-500" : "text-black"}`} />
          </div>
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20 w-64"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Cambiar Área:</label>
                <input
                  type="text"
                  value={newArea}
                  onChange={handleAreaChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Escribe el área"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Cambiar Nivel de Riesgo:</label>
                <input
                  type="number"
                  value={newRisk}
                  onChange={handleRiskChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  min="0"
                  max="100"
                />
                <input
                  type="range"
                  value={newRisk}
                  onChange={handleSliderChange}
                  className="w-full text-purple-600"
                  min="0"
                  max="100"
                  style={{
                    accentColor: "#7c3aed", // Purple 600
                  }}
                />
              </div>
              <button
                onClick={handleAccept}
                className="w-full p-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700"
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="flex justify-between space-x-4 mt-2 bg-gray-100 p-4 rounded-lg">
          <div className={`p-6 rounded-lg text-center text-white ${color}`} style={{ width: "150px" }}>
            <p className="text-sm">Nivel de Riesgo</p>
            <p className="text-4xl font-bold">{Riesgo}</p>
            <p className="text-sm">de 100</p>
            <p className="mt-2 font-semibold">{label}</p>
          </div>

          <div className="flex-1 p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-bold mb-2">Advertencia IA:</h4>
            <p>{advertencia_ia || "Sin advertencias disponibles."}</p>
          </div>

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
