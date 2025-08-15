import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* Router DevTools - only in development */}
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </>
  ),
});
