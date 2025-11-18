// context/TeamNameProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie, hasCookie } from "cookies-next";

const TeamNameContext = createContext();

export function TeamNameProvider({ children }) {
  const [teamName, setTeamName] = useState("");

  // Load from cookie on mount
  useEffect(() => {
    if (hasCookie("team_name")) {
      const saved = getCookie("team_name");
      if (typeof saved === "string") setTeamName(saved);
    }
  }, []);

  const saveTeamName = (name) => {
    const clean = String(name || "").trim().slice(0, 64);
    setTeamName(clean);
    setCookie("team_name", clean, { maxAge: 60 * 60 * 24 * 180 }); // 180 days
  };

  const clearTeamName = () => {
    deleteCookie("team_name");
    setTeamName("");
  };

  return (
    <TeamNameContext.Provider value={{ teamName, saveTeamName, clearTeamName }}>
      {children}
    </TeamNameContext.Provider>
  );
}

export function useTeamName() {
  const ctx = useContext(TeamNameContext);
  if (!ctx) throw new Error("useTeamName must be used within TeamNameProvider");
  return ctx;
}
