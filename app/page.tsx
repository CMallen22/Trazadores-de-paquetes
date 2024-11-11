"use client";

import { useState, useEffect } from "react";
import Navbar from "../app/Components/Navbar";
import App from "./Components/App";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} />
      <div className="text-left text-4xl font-bold ml-20 mt-2">
        Espacio de trabajo
      </div>
      <App searchQuery={searchQuery} />
    </div>
  );
}
