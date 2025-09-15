// import { useNavigate } from "@tanstack/react-router";
// import { useToast } from "./useToast";

// export function useDashboardActions() {
//   const navigate = useNavigate();
//   const { showSuccess, showInfo, showWarning, showError } = useToast();

//   const goHome = () => {
//     navigate({ to: "/" });
//   };

//   const goToProjects = () => {
//     navigate({ to: "/projects" });
//   };

//   const viewProject = (projectId: string | number) => {
//     navigate({
//       to: "/projects/$projectid",
//       params: { projectid: projectId.toString() },
//     });
//   };

//   const addProject = async () => {
//     showInfo("Opening project creation form...");
//     // Simulate async action
//     setTimeout(() => {
//       showSuccess("Project creation feature will be available soon!");
//     }, 1000);
//   };

//   const editProject = async (projectId: string | number) => {
//     showInfo(`Loading project ${projectId} for editing...`);
//     setTimeout(() => {
//       showSuccess(`Edit mode for project ${projectId} coming soon!`);
//     }, 800);
//   };

//   const deleteProject = async (_projectId: string | number, projectTitle: string) => {
//     showWarning(`Are you sure you want to delete "${projectTitle}"?`);
//     // In a real app, this would show a confirmation modal
//     setTimeout(() => {
//       showError("Delete functionality coming soon!");
//     }, 1000);
//   };

//   const viewAnalytics = () => {
//     showInfo("Loading analytics dashboard...");
//     setTimeout(() => {
//       showSuccess("Advanced analytics dashboard coming soon!");
//     }, 1200);
//   };

//   const manageContacts = () => {
//     showInfo("Opening contact management...");
//     setTimeout(() => {
//       showSuccess("Contact management system coming soon!");
//     }, 900);
//   };

//   const openSettings = () => {
//     showInfo("Loading settings panel...");
//     setTimeout(() => {
//       showSuccess("Settings configuration coming soon!");
//     }, 700);
//   };

//   const exportData = () => {
//     showInfo("Preparing data export...");
//     setTimeout(() => {
//       showSuccess("Data export feature coming soon!");
//     }, 1500);
//   };

//   const importData = () => {
//     showInfo("Opening import wizard...");
//     setTimeout(() => {
//       showSuccess("Data import feature coming soon!");
//     }, 1100);
//   };

//   return {
//     // Navigation
//     goHome,
//     goToProjects,
//     viewProject,

//     // Project actions
//     addProject,
//     editProject,
//     deleteProject,

//     // Feature actions
//     viewAnalytics,
//     manageContacts,
//     openSettings,
//     exportData,
//     importData,
//   };
// }
