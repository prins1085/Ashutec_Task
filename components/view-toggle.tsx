"use client"

import { Grid, List } from "lucide-react"

interface ViewToggleProps {
  currentView: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <button
        className={`flex items-center justify-center p-2 ${
          currentView === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
      >
        <Grid className="h-5 w-5" />
      </button>
      <button
        className={`flex items-center justify-center p-2 ${
          currentView === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onViewChange("list")}
        aria-label="List view"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  )
}
