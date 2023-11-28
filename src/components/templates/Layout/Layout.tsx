import * as React from "react";
import { Outlet } from "react-router-dom";

import { SideNav, TopBar } from "@/components/organisms";

const Layout: React.FC = () => {
  return (
    <main className="2xl:container h-screen flex px-4">
      <div className="flex w-full h-full gap-4">
        <SideNav />
        <div className="mt-5 w-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
          <TopBar />
          <div className="px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;