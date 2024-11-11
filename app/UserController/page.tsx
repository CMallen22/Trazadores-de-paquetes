"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import UsersCard from "../Cards/UsersCard";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

type User = {
    id_user: number
    username: string;
};
export default function UserController() {
const [users, setUsers] = useState<User[]>(
    []
  );;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://trazadores-de-paquetes-p1zkk7llj-chalkys-projects-ed90ac4e.vercel.app/db/getUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data.Logs)) {
          setUsers(data.Logs);
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
    <div>
        <Navbar />
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        
  <div className="flex flex-col space-y-2"> {/* Stack each LogsCard vertically with space between rows */}
    {users.map((user, index) => (
      <div key={index} className="flex flex-row space-x-4 p-2 border-b border-gray-300">
        <UsersCard
          id_user={user.id_user}
          username={user.username}
        />
      </div>
    ))}
  </div>
</main>
      </div>
    
  );
}