// import { useState, useEffect } from "react";
// import { useProjects } from "./useProjects";

// interface DashboardStats {
//   totalProjects: number;
//   totalViews: number;
//   totalContacts: number;
//   activeProjects: number;
//   completedProjects: number;
//   monthlyViews: number;
// }

// export function useDashboardStats() {
//   const { projects, loading, error } = useProjects();
//   const [stats, setStats] = useState<DashboardStats>({
//     totalProjects: 0,
//     totalViews: 0,
//     totalContacts: 0,
//     activeProjects: 0,
//     completedProjects: 0,
//     monthlyViews: 0,
//   });

//   useEffect(() => {
//     if (projects.length > 0) {
//       // Calculate real stats
//       const totalProjects = projects.length;
//       const activeProjects = Math.floor(totalProjects * 0.3); // 30% active
//       const completedProjects = totalProjects - activeProjects;

//       // Simulate analytics (in production, these would come from real analytics)
//       const totalViews = Math.floor(Math.random() * 10000) + 2000;
//       const monthlyViews = Math.floor(totalViews * 0.15);
//       const totalContacts = Math.floor(Math.random() * 200) + 50;

//       setStats({
//         totalProjects,
//         totalViews,
//         totalContacts,
//         activeProjects,
//         completedProjects,
//         monthlyViews,
//       });
//     }
//   }, [projects]);

//   return {
//     stats,
//     loading,
//     error,
//     refreshStats: () => {
//       // Force re-calculation
//       if (projects.length > 0) {
//         const totalViews = Math.floor(Math.random() * 10000) + 2000;
//         const monthlyViews = Math.floor(totalViews * 0.15);
//         const totalContacts = Math.floor(Math.random() * 200) + 50;

//         setStats((prev) => ({
//           ...prev,
//           totalViews,
//           monthlyViews,
//           totalContacts,
//         }));
//       }
//     },
//   };
// }
