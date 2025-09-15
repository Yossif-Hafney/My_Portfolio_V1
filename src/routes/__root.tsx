import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components";

function RootComponent() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  if (isDashboard) {
    return (
      <>
        <main className="min-h-screen">
          <Outlet />
        </main>
        {/* Router DevTools - only in development */}
        {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      {/* Router DevTools - only in development */}
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
