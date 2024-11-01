"use client";

import React, {useState, useEffect } from 'react';
import LogsCard from '../Cards/LogsCard';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Log = {
  fuente: string;
  destino: string;
  protocolo: string;
  area: string;
  fecha: string;
  riesgo: number;

};

export default function  App () {
  const [logs, setLogs] = useState<Log[]>(
    []
  );;

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
    <>
    

    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
  <div className="flex flex-col space-y-2"> {/* Stack each LogsCard vertically with space between rows */}
    {logs.map((log, index) => (
      <div key={index} className="flex flex-row space-x-4 p-2 border-b border-gray-300">
        <LogsCard
          Fuente={log.fuente}
          Destino={log.destino}
          Protocolo={log.protocolo}
          Area={log.area}
          Fecha={log.fecha}
          Riesgo={log.riesgo}
        />
      </div>
    ))}
  </div>
</main>

  </>
);
};
