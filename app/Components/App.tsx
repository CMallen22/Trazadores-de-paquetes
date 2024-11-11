"use client";

import React, { useState, useEffect, useRef } from "react";
import LogsCard from "../Cards/LogsCard";
import { Inter } from "next/font/google";
import { FilterIcon, ShieldExclamationIcon, SortAscendingIcon, ChatAltIcon } from "@heroicons/react/outline";

const inter = Inter({ subsets: ["latin"] });

type Log = {
  source_ip: string;
  host_ip: string;
  protocolo: string;
  area: string;
  fecha: string;
  riesgo: number;
  descripcion: string;
  respuesta: string;
};

const RISK_LEVELS = [
  { label: "Seguro", min: 0, max: 10, color: "text-green-500" },
  { label: "Bajo", min: 11, max: 33, color: "text-yellow-400" },
  { label: "Medio", min: 34, max: 66, color: "text-orange-500" },
  { label: "Alto", min: 67, max: 100, color: "text-red-600" },
];

interface AppProps {
  searchQuery: string;
}

export default function App({ searchQuery }: AppProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [isRiskDropdownOpen, setIsRiskDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isProtocolDropdownOpen, setIsProtocolDropdownOpen] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<string[]>(RISK_LEVELS.map((risk) => risk.label));
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<'fecha' | 'riesgo'>('fecha'); 

  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [chatMessages, setChatMessages] = useState<string[]>([]); 
  const [userMessage, setUserMessage] = useState<string>("");

  const chatIconRef = useRef<HTMLSpanElement>(null); 

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
    for (const level of RISK_LEVELS) {
      if (riesgo >= level.min && riesgo <= level.max) return level.label;
    }
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

  const toggleDropdown = (dropdown: string) => {
    if (dropdown === "risk") {
      setIsRiskDropdownOpen(!isRiskDropdownOpen);
    } else if (dropdown === "area") {
      setIsAreaDropdownOpen(!isAreaDropdownOpen);
    } else if (dropdown === "protocol") {
      setIsProtocolDropdownOpen(!isProtocolDropdownOpen);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatMessages([...chatMessages, userMessage]);
      setUserMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userMessage.trim() !== "") {
      sendMessage();
    }
  };

  useEffect(() => {
    let filtered = logs.filter((log) =>
      selectedRisks.includes(getRiskLabel(log.riesgo))
    );
    filtered = filtered.filter((log) =>
      selectedAreas.includes(log.area)
    );
    filtered = filtered.filter((log) =>
      selectedProtocols.includes(log.protocolo)
    );

    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.source_ip.includes(searchQuery) || log.host_ip.includes(searchQuery)
      );
    }

    setFilteredLogs(filtered);
  }, [selectedRisks, selectedAreas, selectedProtocols, logs, searchQuery]);

  const handleSortToggle = () => {
    setSortBy((prevSort) => (prevSort === 'fecha' ? 'riesgo' : 'fecha'));
  };

  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sortBy === 'fecha') {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    } else {
      return b.riesgo - a.riesgo;
    }
  });

  const chatPosition = chatIconRef.current
    ? { 
        top: chatIconRef.current.offsetTop + 150, 
        left: chatIconRef.current.offsetLeft + 40 
      }
    : { top: 0, left: 0 };

  return (
    <main className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}>
      <div className="w-full space-y-4">
        <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] gap-4 p-2 font-semibold text-black border-b border-gray-300 sticky top-0 bg-white z-10">
          <span ref={chatIconRef} className="text-center">
            <ChatAltIcon
              className={`h-6 w-6 cursor-pointer ${isChatOpen ? "text-purple-500" : "text-black"}`}
              onClick={toggleChat}
            />
          </span>
          <span>Fuente</span>
          <span>Destino</span>
          <span className="flex items-center relative">
            Protocolo
            <FilterIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${isProtocolDropdownOpen ? "text-purple-500" : "text-black"}`}
              onClick={() => toggleDropdown("protocol")}
            />
            {isProtocolDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {protocolOptions.map((protocol) => (
                  <div key={protocol} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedProtocols.includes(protocol)}
                      onChange={() => handleProtocolChange(protocol)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"
                    />
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
              onClick={() => toggleDropdown("area")}
            />
            {isAreaDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {areaOptions.map((area) => (
                  <div key={area} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaChange(area)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"
                    />
                    <label className="ml-2 text-gray-700">{area}</label>
                  </div>
                ))}
              </div>
            )}
          </span>
          <span className="flex items-center relative">Fecha</span>
          <span className="flex items-center relative">
            Riesgo
            <FilterIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${isRiskDropdownOpen ? "text-purple-500" : "text-black"}`}
              onClick={() => toggleDropdown("risk")}
            />
            {isRiskDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                {RISK_LEVELS.map(({ label, color }) => (
                  <div key={label} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedRisks.includes(label)}
                      onChange={() => handleRiskChange(label)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500"
                    />
                    <ShieldExclamationIcon className={`h-5 w-5 ml-2 ${color}`} />
                    <label className={`ml-2 ${color}`}>{label}</label>
                  </div>
                ))}
              </div>
            )}
          </span>
          <span className="text-center">
            <SortAscendingIcon
              className={`h-6 w-6 ml-1 cursor-pointer ${sortBy === 'fecha' ? "text-black" : "text-purple-500"}`}
              onClick={handleSortToggle}
            />
          </span>
        </div>

        {isChatOpen && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4 w-96"
            style={{ top: chatPosition.top, left: chatPosition.left }}
          >
            <div className="h-64 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <p className={`text-gray-700 ${index % 2 === 0 ? "bg-gray-200 p-2 rounded-lg" : "bg-purple-100 p-2 rounded-lg text-purple-700"}`}>
                    {msg}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-500 text-white p-2 rounded-r-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        <div className="overflow-y-auto max-h-[calc(100vh-160px)]"> 
          {sortedLogs.map((log, index) => (
            <LogsCard
              key={index}
              Fuente={log.source_ip}
              Destino={log.host_ip}
              Protocolo={log.protocolo}
              Area={log.area}
              Fecha={log.fecha}
              Riesgo={log.riesgo}
              advertencia_ia={log.descripcion}
              recomendacion_ia={log.respuesta}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
