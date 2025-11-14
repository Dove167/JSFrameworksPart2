export async function GET() {
  const projects = [
    {
      title: "Conway's Game of Life",
      description: "Interactive cellular automaton visualizer exploring emergent behavior.",
      image: "/images/game-of-life.png",
      link: "https://example.com/game-of-life",
      keywords: ["algorithms", "simulation", "canvas"],
    },
    {
      title: "Weather Dashboard",
      description: "Responsive dashboard that displays real-time weather for multiple cities.",
      image: "/images/weather-dashboard.png",
      link: "https://example.com/weather-dashboard",
      keywords: ["api", "dashboard", "charts"],
    },
    {
      title: "Task Manager Pro",
      description: "Kanban-style task manager with drag-and-drop and filters.",
      image: "/images/task-manager.png",
      link: "https://example.com/task-manager",
      keywords: ["productivity", "drag-and-drop", "ui"],
    },
  ];

  return Response.json({ projects });
}