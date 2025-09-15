// import { useState } from "react";
// import { useNavigate } from "@tanstack/react-router";
// import {
//   Home,
//   FolderOpen,
//   BarChart3,
//   Users,
//   Activity,
//   Plus,
//   Settings,
// } from "lucide-react";
// import { useDashboardStats } from "../hooks/useDashboardStats";
// import { useToast } from "../hooks/useToast";
// import { useDashboardActions } from "../hooks/useDashboardActions";
// import { useProjectManagement } from "../hooks/useProjectManagement";
// import StatCard from "../components/dashboard/StatCard";
// import ActionButton from "../components/dashboard/ActionButton";
// import ProjectCard from "../components/dashboard/ProjectCard";
// import EnhancedToast from "../components/dashboard/EnhancedToast";
// import AddProjectModal from "../components/dashboard/AddProjectModal";
// import { useProjects } from "../hooks";
// import { Loading, ErrorState } from "../components";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [showAddModal, setShowAddModal] = useState(false);

//   const { projects, loading, error } = useProjects();
//   const {
//     stats,
//     loading: statsLoading,
//     error: statsError,
//     refreshStats,
//   } = useDashboardStats();
//   const { toast, showInfo, hideToast } = useToast();
//   const { addProject: createProject } = useProjectManagement();
//   const {
//     goHome,
//     viewAnalytics,
//     manageContacts,
//     openSettings,
//     viewProject,
//     editProject,
//     deleteProject,
//   } = useDashboardActions();

//   const handleAddProject = () => {
//     setShowAddModal(true);
//   };

//   const handleCreateProject = async (
//     projectData: import("../components/dashboard/AddProjectModal").NewProject
//   ) => {
//     const success = await createProject(projectData);
//     if (success) {
//       setShowAddModal(false);
//     }
//   };

//   if (loading || statsLoading) {
//     return <Loading label="Loading dashboard..." fullscreen />;
//   }

//   if (error || statsError) {
//     return (
//       <ErrorState
//         title="Dashboard Error"
//         message={error || statsError || "Unknown error occurred"}
//         actionLabel="Go Home"
//         onAction={() => goHome()}
//         fullscreen
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">
//       <EnhancedToast
//         message={toast.message}
//         show={toast.show}
//         type={toast.type}
//         onClose={hideToast}
//       />

//       {/* Header with Home Button */}
//       <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-6 shadow-xl">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div>
//             <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
//               Dashboard
//             </h1>
//             <p className="text-slate-400 text-sm font-medium mt-1">
//               Portfolio Management Center
//             </p>
//           </div>
//           <button
//             onClick={() => goHome()}
//             className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl"
//           >
//             <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
//             <span className="tracking-wide">Go Home</span>
//           </button>
//         </div>
//       </div>

//       {/* Dashboard Content */}
//       <div className="p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Welcome Section */}
//           <div className="mb-12">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
//                   Welcome back! 👋
//                 </h2>
//                 <p className="text-slate-300 text-lg font-medium leading-relaxed">
//                   Manage your portfolio, track analytics, and configure settings
//                   from your central hub.
//                 </p>
//               </div>
//               <button
//                 onClick={refreshStats}
//                 className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
//               >
//                 <BarChart3 className="w-4 h-4" />
//                 Refresh Stats
//               </button>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             <StatCard
//               icon={FolderOpen}
//               label="Total Projects"
//               value={stats.totalProjects.toString()}
//               color="blue"
//               onClick={() => navigate({ to: "/projects" })}
//             />
//             <StatCard
//               icon={BarChart3}
//               label="Total Views"
//               value={stats.totalViews.toLocaleString()}
//               color="emerald"
//               onClick={() => viewAnalytics()}
//             />
//             <StatCard
//               icon={Users}
//               label="Total Contacts"
//               value={stats.totalContacts.toLocaleString()}
//               color="purple"
//               onClick={() => manageContacts()}
//             />
//             <StatCard
//               icon={Activity}
//               label="Monthly Views"
//               value={stats.monthlyViews.toLocaleString()}
//               color="amber"
//               onClick={() => showInfo(`Monthly views: ${stats.monthlyViews}`)}
//             />
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-gradient-to-r from-slate-800/40 via-slate-800/60 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-12">
//             <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
//               Quick Actions
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <ActionButton
//                 title="Add Project"
//                 icon={<Plus className="w-5 h-5" />}
//                 color="blue"
//                 onClick={handleAddProject}
//               />
//               <ActionButton
//                 title="View Reports"
//                 icon={<Activity className="w-5 h-5" />}
//                 color="emerald"
//                 onClick={() => viewAnalytics()}
//               />
//               <ActionButton
//                 title="Contacts"
//                 icon={<Users className="w-5 h-5" />}
//                 color="purple"
//                 onClick={() => manageContacts()}
//               />
//               <ActionButton
//                 title="Configure"
//                 icon={<Settings className="w-5 h-5" />}
//                 color="amber"
//                 onClick={() => openSettings()}
//               />
//             </div>
//           </div>

//           {/* Recent Projects */}
//           <div className="bg-gradient-to-r from-slate-800/40 via-slate-800/60 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-white tracking-tight">
//                 Recent Projects
//               </h3>
//               <button
//                 onClick={() => navigate({ to: "/projects" })}
//                 className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
//               >
//                 View All
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {projects.slice(0, 6).map((project) => (
//                 <ProjectCard
//                   key={project.id}
//                   project={project}
//                   onView={(id) => viewProject(id)}
//                   onEdit={(id) => editProject(id)}
//                   onDelete={(id, title) => deleteProject(id, title)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Project Modal */}
//       <AddProjectModal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={handleCreateProject}
//       />
//     </div>
//   );
// }
