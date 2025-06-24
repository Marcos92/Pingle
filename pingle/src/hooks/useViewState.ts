import { useState } from "react";

export type ViewState = "game" | "help" | "stats";

export function useViewState(initial: ViewState = "game") {
  const [view, setView] = useState<ViewState>(initial);

  const showGame = view === "game";
  const showHelp = view === "help";
  const showStats = view === "stats";

  function toggleHelp(): void {
    setView((prev) => (prev === "help" ? "game" : "help"));
  }
  function toggleStats(): void {
    setView((prev) => (prev === "stats" ? "game" : "stats"));
  }

  return { view, setView, showGame, showHelp, showStats, toggleHelp, toggleStats };
}