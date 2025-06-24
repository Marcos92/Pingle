import { useState, useEffect } from "react";
import { UserStats } from "../types/userStats";

export function useUserStats() {
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("stats") ?? "null");
      return UserStats.from(raw ?? {});
    } catch {
      return new UserStats();
    }
  });

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(userStats));
  }, [userStats]);

  function updateUserStats(updatedStats: typeof userStats) {
    setUserStats(updatedStats);
  }

  return { userStats, updateUserStats, setUserStats };
}