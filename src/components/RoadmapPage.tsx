"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight, BookOpen, Code2, Link2, X, ExternalLink, Lock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { AppUser, Page } from "../types";

interface NavProps {
  user: AppUser | null;
  activeNav: string;
  onNavigate: (page: Page, nav?: string) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

interface SubModule {
  id: string;
  title: string;
  type: "reading" | "sandbox" | "challenge";
  completed: boolean;
  link?: string;
}

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: "completed" | "active" | "locked";
  progress: number;
  subModules: SubModule[];
}

const roadmapData: RoadmapNode[] = [
  {
    id: "1",
    title: "Programming Foundations",
    description: "Master core programming concepts, syntax, and problem-solving fundamentals.",
    icon: "⚡",
    color: "#10B981",
    status: "completed",
    progress: 100,
    subModules: [
      { id: "1a", title: "Variables & Data Types", type: "reading", completed: true, link: "#" },
      { id: "1b", title: "Control Flow & Loops", type: "reading", completed: true, link: "#" },
      { id: "1c", title: "Functions & Scope", type: "reading", completed: true, link: "#" },
      { id: "1d", title: "Hello World Challenge", type: "challenge", completed: true },
      { id: "1e", title: "Python Sandbox", type: "sandbox", completed: true },
    ],
  },
  {
    id: "2",
    title: "Data Structures",
    description: "Deep dive into arrays, linked lists, trees, graphs, and hash maps.",
    icon: "🌳",
    color: "#2563EB",
    status: "active",
    progress: 65,
    subModules: [
      { id: "2a", title: "Arrays & Dynamic Arrays", type: "reading", completed: true, link: "#" },
      { id: "2b", title: "Linked Lists", type: "reading", completed: true, link: "#" },
      { id: "2c", title: "Stacks & Queues", type: "reading", completed: false, link: "#" },
      { id: "2d", title: "Trees & Binary Search Trees", type: "reading", completed: false, link: "#" },
      { id: "2e", title: "Hash Maps", type: "reading", completed: false, link: "#" },
      { id: "2f", title: "Data Structures Sandbox", type: "sandbox", completed: true },
      { id: "2g", title: "Linked List Challenge", type: "challenge", completed: false },
    ],
  },
  {
    id: "3",
    title: "Algorithms",
    description: "Sorting, searching, dynamic programming, and algorithmic thinking.",
    icon: "🔢",
    color: "#8B5CF6",
    status: "active",
    progress: 20,
    subModules: [
      { id: "3a", title: "Sorting Algorithms", type: "reading", completed: true, link: "#" },
      { id: "3b", title: "Binary Search", type: "reading", completed: false, link: "#" },
      { id: "3c", title: "Recursion & Backtracking", type: "reading", completed: false, link: "#" },
      { id: "3d", title: "Dynamic Programming", type: "reading", completed: false, link: "#" },
      { id: "3e", title: "Merge Sort Sandbox", type: "sandbox", completed: false },
      { id: "3f", title: "Two Sum Challenge", type: "challenge", completed: false },
    ],
  },
  {
    id: "4",
    title: "Systems Architecture",
    description: "Design scalable, distributed systems with reliability and performance.",
    icon: "🏗️",
    color: "#F59E0B",
    status: "locked",
    progress: 0,
    subModules: [
      { id: "4a", title: "Scalability Principles", type: "reading", completed: false, link: "#" },
      { id: "4b", title: "Load Balancing", type: "reading", completed: false, link: "#" },
      { id: "4c", title: "Databases at Scale", type: "reading", completed: false, link: "#" },
      { id: "4d", title: "Microservices", type: "reading", completed: false, link: "#" },
      { id: "4e", title: "Architecture Sandbox", type: "sandbox", completed: false },
    ],
  },
  {
    id: "5",
    title: "Frontend Engineering",
    description: "Build polished, performant user interfaces with React and modern tooling.",
    icon: "🎨",
    color: "#EC4899",
    status: "locked",
    progress: 0,
    subModules: [
      { id: "5a", title: "HTML & CSS Fundamentals", type: "reading", completed: false, link: "#" },
      { id: "5b", title: "JavaScript Deep Dive", type: "reading", completed: false, link: "#" },
      { id: "5c", title: "React Framework", type: "reading", completed: false, link: "#" },
      { id: "5d", title: "State Management", type: "reading", completed: false, link: "#" },
      { id: "5e", title: "Component Sandbox", type: "sandbox", completed: false },
    ],
  },
];

function SubModuleIcon({ type }: { type: SubModule["type"] }) {
  if (type === "reading") return <BookOpen size={14} />;
  if (type === "sandbox") return <Code2 size={14} />;
  return <Link2 size={14} />;
}

function SubModulePanel({ node, onClose, onToggle }: {
  node: RoadmapNode;
  onClose: () => void;
  onToggle: (nodeId: string, subId: string) => void;
}) {
  const typeLabel = (type: SubModule["type"]) => {
    if (type === "reading") return { label: "Reading", color: "#2563EB" };
    if (type === "sandbox") return { label: "Sandbox", color: "#10B981" };
    return { label: "Challenge", color: "#F59E0B" };
  };

  return (
    <div
      className="fixed right-0 top-14 bottom-0 w-full max-w-md border-l z-40 flex flex-col animate-fade-in overflow-y-auto"
      style={{ backgroundColor: '#161B22', borderColor: '#2D3748' }}
    >
      {/* Panel Header */}
      <div
        className="flex items-start justify-between p-6 border-b sticky top-0"
        style={{ borderColor: '#2D3748', backgroundColor: '#161B22' }}
      >
        <div>
          <div className="text-2xl mb-2">{node.icon}</div>
          <h3
            className="text-lg font-bold font-display"
            style={{ color: '#F8FAFC' }}
          >
            {node.title}
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '13px' }} className="mt-1">
            {node.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-white hover:bg-opacity-10 mt-1 cursor-pointer"
          style={{ color: '#94A3B8', flexShrink: 0 }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: '#94A3B8', fontSize: '13px' }}>Progress</span>
          <span style={{ color: node.color, fontSize: '13px', fontWeight: 600 }}>{node.progress}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${node.progress}%`, backgroundColor: node.color }}
          />
        </div>
      </div>

      {/* Sub Modules */}
      <div className="px-6 pb-6 space-y-2 flex-1 font-sans">
        <h4 className="text-sm font-semibold mb-3" style={{ color: '#94A3B8' }}>
          MODULES ({node.subModules.filter(s => s.completed).length}/{node.subModules.length} completed)
        </h4>
        {node.subModules.map(sub => {
          const { label, color } = typeLabel(sub.type);
          return (
            <div
              key={sub.id}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-opacity-80 cursor-pointer"
              style={{
                backgroundColor: sub.completed ? `${node.color}10` : '#0D1117',
                borderColor: sub.completed ? `${node.color}40` : '#2D3748',
              }}
              onClick={() => {
                if (node.status !== "locked") onToggle(node.id, sub.id);
              }}
            >
              <div style={{ color: sub.completed ? node.color : '#4A5568', flexShrink: 0 }}>
                {sub.completed
                  ? <CheckCircle2 size={18} />
                  : <Circle size={18} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      color: sub.completed ? '#F8FAFC' : '#94A3B8',
                      fontSize: '14px',
                      fontWeight: sub.completed ? 500 : 400,
                    }}
                  >
                    {sub.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span style={{ color, fontSize: '11px' }}>
                    <SubModuleIcon type={sub.type} />
                  </span>
                  <span style={{ color: '#4A5568', fontSize: '11px' }}>{label}</span>
                </div>
              </div>
              {sub.link && (
                <ExternalLink size={14} style={{ color: '#4A5568', flexShrink: 0 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RoadmapPage({ user, activeNav, onNavigate, onLogout, theme, onToggleTheme }: NavProps) {
  const [nodes, setNodes] = useState<RoadmapNode[]>(roadmapData);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const handleNodeClick = (node: RoadmapNode) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null);
    } else {
      setSelectedNode(node);
    }
  };

  const handleToggleSubModule = (nodeId: string, subId: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id !== nodeId) return n;
      const updated = n.subModules.map(s =>
        s.id === subId ? { ...s, completed: !s.completed } : s
      );
      const progress = Math.round((updated.filter(s => s.completed).length / updated.length) * 100);
      return { ...n, subModules: updated, progress };
    }));
    setSelectedNode(prev => {
      if (!prev || prev.id !== nodeId) return prev;
      const updated = prev.subModules.map(s =>
        s.id === subId ? { ...s, completed: !s.completed } : s
      );
      const progress = Math.round((updated.filter(s => s.completed).length / updated.length) * 100);
      return { ...prev, subModules: updated, progress };
    });
  };

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen" style={{ backgroundColor: isDark ? '#101418' : '#F8FAFC', color: isDark ? '#F8FAFC' : '#0F172A', transition: 'background-color 0.2s, color 0.2s' }}>
      <Navbar user={user} activeNav={activeNav} onNavigate={onNavigate} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-14 flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${selectedNode ? 'mr-[400px]' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 border-[#2D3748] bg-[#161B22]"
              >
                <span className="text-[11px] text-slate-400 tracking-wider font-semibold">CS LEARNING PATH</span>
              </div>
              <h1
                className="text-4xl font-bold mb-3 font-display"
                style={{ color: '#F8FAFC' }}
              >
                Computer Science Roadmap
              </h1>
              <p style={{ color: '#94A3B8' }}>
                A sequential curriculum tree from fundamentals to advanced systems. Click any node to explore modules.
              </p>
            </div>

            {/* Roadmap Flow */}
            <div className="relative">
              {nodes.map((node, index) => (
                <div key={node.id} className="relative">
                  {/* Connector Line */}
                  {index < nodes.length - 1 && (
                    <div
                      className="absolute left-9 top-full w-0.5 z-0"
                      style={{
                        height: '40px',
                        backgroundColor: node.status === 'completed' ? node.color : '#2D3748',
                      }}
                    />
                  )}

                  {/* Node Card */}
                  <div
                    className="relative flex items-start gap-5 p-5 rounded-2xl border mb-10 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      backgroundColor: selectedNode?.id === node.id ? `${node.color}10` : '#161B22',
                      borderColor: selectedNode?.id === node.id ? node.color : node.status === 'locked' ? '#1E293B' : '#2D3748',
                      opacity: node.status === 'locked' ? 0.65 : 1,
                    }}
                    onClick={() => handleNodeClick(node)}
                  >
                    {/* Icon Circle */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                      style={{
                        backgroundColor: node.status === 'locked' ? '#1E293B' : `${node.color}20`,
                        border: `2px solid ${node.status === 'locked' ? '#2D3748' : node.color}`,
                      }}
                    >
                      {node.status === 'locked' ? <Lock size={20} style={{ color: '#4A5568' }} /> : node.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className="font-bold text-base font-display"
                          style={{ color: '#F8FAFC' }}
                        >
                          {node.title}
                        </h3>
                        {/* Status Badge */}
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: node.status === 'completed'
                              ? '#10B98120'
                              : node.status === 'active'
                              ? '#2563EB20'
                              : '#2D3748',
                            color: node.status === 'completed'
                              ? '#10B981'
                              : node.status === 'active'
                              ? '#2563EB'
                              : '#4A5568',
                          }}
                        >
                          {node.status === 'completed' ? '✓ Completed' : node.status === 'active' ? 'In Progress' : 'Locked'}
                        </span>
                      </div>
                      <p style={{ color: '#94A3B8', fontSize: '13px font-sans' }} className="mb-3">
                        {node.description}
                      </p>

                      {/* Progress Bar */}
                      {node.status !== 'locked' && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${node.progress}%`, backgroundColor: node.color }}
                            />
                          </div>
                          <span style={{ color: '#94A3B8', fontSize: '12px', flexShrink: 0 }}>
                            {node.subModules.filter(s => s.completed).length}/{node.subModules.length} modules
                          </span>
                        </div>
                      )}
                    </div>

                    <ChevronRight
                      size={18}
                      style={{
                        color: '#4A5568',
                        transform: selectedNode?.id === node.id ? 'rotate(90deg)' : 'none',
                        transition: 'transform 200ms',
                        flexShrink: 0,
                        marginTop: '4px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {selectedNode && (
          <SubModulePanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onToggle={handleToggleSubModule}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
