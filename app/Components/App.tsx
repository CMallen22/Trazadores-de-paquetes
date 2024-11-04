"use client";

import React, { useState, useEffect } from "react";
import LogsCard from "../Cards/LogsCard";
import { Inter } from "next/font/google";
import { FilterIcon } from "@heroicons/react/outline";

const inter = Inter({ subsets: ["latin"] });

type Log = {
  fuente: string;
  destino: string;
  protocolo: string;
  area: string;
  fecha: string;
  riesgo: number;
  advertencia_ia: string;
  recomendacion_ia: string;
};

const RISK_LEVELS = ["Seguro", "Bajo", "Medio", "Alto"];

export default function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [isRiskDropdownOpen, setIsRiskDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isProtocolDropdownOpen, setIsProtocolDropdownOpen] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<string[]>(RISK_LEVELS);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/db/SIEM_Logs");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const logsData = data.Logs as Log[];

        if (Array.isArray(logsData)) {
          setLogs(logsData);
          setFilteredLogs(logsData); 
          
          const uniqueAreas = Array.from(new Set(logsData.map((log) => log.area))) as string[];
          setAreaOptions(uniqueAreas);
          setSelectedAreas(uniqueAreas); 

          const uniqueProtocols = Array.from(new Set(logsData.map((log) => log.protocolo))) as string[];
          setProtocolOptions(uniqueProtocols);
          setSelectedProtocols(uniqueProtocols); 
        } else {
          console.error("Logs data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRiskLabel = (riesgo: number) => {
    if (riesgo >= 0 && riesgo <= 10) return "Seguro";
    if (riesgo >= 11 && riesgo <= 33) return "Bajo";
    if (riesgo >= 34 && riesgo <= 66) return "Medio";
    if (riesgo >= 67 && riesgo <= 100) return "Alto";
    return "Desconocido";
  };

  const handleRiskChange = (risk: string) => {
    const newSelectedRisks = selectedRisks.includes(risk)
      ? selectedRisks.filter((r) => r !== risk)
      : [...selectedRisks, risk];
    setSelectedRisks(newSelectedRisks);
  };

  const handleAreaChange = (area: string) => {
    const newSelectedAreas = selectedAreas.includes(area)
      ? selectedAreas.filter((a) => a !== area)
      : [...selectedAreas, area];
    setSelectedAreas(newSelectedAreas);
  };

  const handleProtocolChange = (protocol: string) => {
    const newSelectedProtocols = selectedProtocols.includes(protocol)
      ? selectedProtocols.filter((p) => p !== protocol)
      : [...selectedProtocols, protocol];
    setSelectedProtocols(newSelectedProtocols);
  };

  useEffect(() => {
    const riskFilteredLogs = logs.filter((log) =>
      selectedRisks.includes(getRiskLabel(log.riesgo))
    );
    const areaFilteredLogs = riskFilteredLogs.filter((log) =>
      selectedAreas.includes(log.area)
    );
    const protocolFilteredLogs = areaFilteredLogs.filter((log) =>
      selectedProtocols.includes(log.protocolo)
    );
    setFilteredLogs(protocolFilteredLogs);
  }, [selectedRisks, selectedAreas, selectedProtocols, logs]);

  return (
    <main className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}>
      <div className="w-full space-y-4">
        <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] gap-4 p-2 font-semibold text-black border-b border-gray-300">
          <span className="text-center"></span>
          <span>Fuente</span>
          <span>Destino</span>
          <span className="flex items-center relative">
            Protocolo
            <FilterIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${isProtocolDropdownOpen ? "text-purple-500" : "text-black"}`}
              onClick={() => setIsProtocolDropdownOpen(!isProtocolDropdownOpen)}/>
            {isProtocolDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {protocolOptions.map((protocol) => (
                  <div key={protocol} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedProtocols.includes(protocol)}
                      onChange={() => handleProtocolChange(protocol)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"/>
                    <label className="ml-2 text-gray-700">{protocol}</label>
                  </div>
                ))}
              </div>
            )}
          </span>
          <span className="flex items-center relative">
            Área
            <FilterIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${isAreaDropdownOpen ? "text-purple-500" : "text-black"}`}
              onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}/>
            {isAreaDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {areaOptions.map((area) => (
                  <div key={area} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaChange(area)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"/>
                    <label className="ml-2 text-gray-700">{area}</label>
                  </div>
                ))}
              </div>
            )}
          </span>
          <span>Fecha</span>
          <span className="flex items-center relative">
            Riesgo
            <FilterIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${isRiskDropdownOpen ? "text-purple-500" : "text-black"}`}
              onClick={() => setIsRiskDropdownOpen(!isRiskDropdownOpen)}/>
            {isRiskDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {RISK_LEVELS.map((risk) => (
                  <div key={risk} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedRisks.includes(risk)}
                      onChange={() => handleRiskChange(risk)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"/>
                    <label className="ml-2">{risk}</label>
                  </div>
                ))}
              </div>
            )}
          </span>
          <span className="text-center"></span>
        </div>

        {filteredLogs.map((log, index) => (
          <LogsCard
            key={index}
            Fuente={log.fuente}
            Destino={log.destino}
            Protocolo={log.protocolo}
            Area={log.area}
            Fecha={log.fecha}
            Riesgo={log.riesgo}
            advertencia_ia={log.advertencia_ia}
            recomendacion_ia={log.recomendacion_ia}/>
        ))}
      </div>
    </main>
  );
}
