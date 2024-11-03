"use client";

import React, { useState, useEffect } from "react";
import LogsCard from "../Cards/LogsCard";
import { Inter } from "next/font/google";

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

export default function App() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/db/SIEM_Logs");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data.Logs)) {
          setLogs(data.Logs);
        } else {
          console.error("Logs data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}>
      <div className="w-full max-w-7xl mx-auto space-y-4">
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,auto] gap-4 p-2 bg-gray-200 font-semibold text-black border-b border-gray-300">
          <span className="text-center"> {/* Espacio para el ícono de expansión */}</span>
          <span>Fuente</span>
          <span>Destino</span>
          <span>Protocolo</span>
          <span>Área</span>
          <span>Fecha</span>
          <span>Riesgo</span>
          <span className="text-center"> {/* Espacio para el ícono de opciones */}</span>
        </div>

        {/* Cuerpo de la tabla */}
        {logs.map((log, index) => (
          <LogsCard
            key={index}
            Fuente={log.fuente}
            Destino={log.destino}
            Protocolo={log.protocolo}
            Area={log.area}
            Fecha={log.fecha}
            Riesgo={log.riesgo}
            advertencia_ia={log.advertencia_ia}
            recomendacion_ia={log.recomendacion_ia}
          />
        ))}
      </div>
    </main>
  );
}
