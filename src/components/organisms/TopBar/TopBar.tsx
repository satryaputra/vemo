import { NotificationIcon } from "@/components/atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cog, History, Info, Loader2, Menu, Wrench } from "lucide-react";
import {
  IconLayoutDashboard,
  IconSquareRoundedChevronLeftFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import IconVemo from "../../../assets/iconVemo.svg";
import { cn } from "@/lib/utils/style";
import { IconLogout2 } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  ABOUT_US_PAGE,
  ADMIN_DASHBOARD_PAGE,
  DASHBOARD_PAGE,
  PROFILE_PAGE,
  SERVICES_PAGE,
  VEHICLE_LIST_PAGE,
} from "@/lib/constants/routes";
import useLogoutUser from "@/hooks/mutations/useLogoutUser";
import useWindowPathname from "@/hooks/useWindowPathname";
import { IconMotorbike } from "@tabler/icons-react";
import useVehicleList from "@/hooks/store/useVehicleList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountUnreadNotificationFn } from "@/api/services/notification";
import { IUserResponse } from "@/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const ADMIN_PAGE = "/admin";
  const { data: user } = useQuery({ queryKey: ["me"] });

  const queryClient = useQueryClient();

  const { data: notificationCount, isSuccess } = useQuery({
    queryKey: ["notificationUnreadCount"],
    queryFn: async () => await getCountUnreadNotificationFn(),
    enabled: true,
  });

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notificationUnreadCount"] });
  }, [location]);

  const handleIconClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  const { handleLogoutUser, isLogoutLoading } = useLogoutUser();

  const isWindow = useWindowPathname();

  const { isVehicleListEnabled } = useVehicleList();

  const sideBarItem = [
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard size={35} />,
      path: DASHBOARD_PAGE,
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "Services",
      icon: <History size={35} />,
      path: SERVICES_PAGE,
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "Profile",
      icon: <IconUserSquareRounded size={35} />,
      path: PROFILE_PAGE,
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "About Us",
      icon: <Info size={35} />,
      path: ABOUT_US_PAGE,
      show: user && (user as IUserResponse).role === "customer",
    },
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard size={35} />,
      path: `${ADMIN_PAGE}/dashboard`,
      show: user && (user as IUserResponse).role === "admin",
    },
    {
      title: "Vehicles",
      icon: <IconMotorbike size={35} />,
      path: `${ADMIN_PAGE}/vehicles/pending`,
      show: user && (user as IUserResponse).role === "admin",
    },
    {
      title: "Approve Maintenance",
      icon: <Wrench size={35} />,
      path: `${ADMIN_PAGE}/maintenances`,
      show: user && (user as IUserResponse).role === "admin",
    },
    {
      title: "Part Maintenance",
      icon: <Cog size={35} />,
      path: `${ADMIN_PAGE}/part`,
      show: user && (user as IUserResponse).role === "admin",
    },
  ];

  if (isVehicleListEnabled) {
    sideBarItem.splice(2, 0, {
      title: "List kendaraan",
      icon: <IconMotorbike size={35} />,
      path: VEHICLE_LIST_PAGE,
      show: user && (user as IUserResponse).role === "customer",
    });
  }

  function getTitle() {
    switch (window.location.pathname) {
      case "/profile":
        return "Profile";
      case "/about/vemo":
        return "About Vemo";
      case "/admin/dashboard":
        return "Admin Dashboard";
      case "/admin/vehicles/pending":
        return "Pending Vehicles";
      case "/admin/maintenances":
        return "Requested Maintenance";
      case "/admin/part":
        return "Part Maintenance";
      default:
        return "Dashboard";
    }
  }

  return (
    <header className="bg-white w-full h-20 sticky top-0 flex justify-between items-center px-6 md:px-10 z-50 lg:z-40">
      <span className="flex justify-center items-center">
        <Sheet open={isOpen}>
          <SheetTrigger asChild>
            <Menu
              className="text-slate-900 lg:hidden mr-4 xs:scale-125 lg:scale-150"
              onClick={handleIconClick}
            />
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader className="flex flex-row font-semibold italic items-center justify-between">
              <img
                src={IconVemo}
                alt="vemo-icon"
                className="w-[20%] cursor-pointer"
              />
              <SheetTitle className="text-2xl text-[#F4B400] pr-20 cursor-pointer">
                VEMO
              </SheetTitle>
              <SheetClose>
                <IconSquareRoundedChevronLeftFilled
                  size={35}
                  style={{ color: "#898989" }}
                  onClick={handleCloseSheet}
                />
              </SheetClose>
            </SheetHeader>
            <div className="w-full h-[0.05rem] mt-7 bg-[#898989]" />
            <div className="flex flex-col mt-10 gap-7 text-[#898989]">
              {sideBarItem.map(
                (item, index) =>
                  item.show !== false && (
                    <Link
                      to={item.path}
                      key={index}
                      className={cn(
                        "flex cursor-pointer font-medium text-lg items-center",
                        !isOpen && "hidden"
                      )}
                      onClick={() => handleClick(item.path)}
                    >
                      {item.icon}
                      <span className="ml-5">{item.title}</span>
                    </Link>
                  )
              )}
            </div>
            <div className="w-full h-[0.05rem] bg-[#898989] mt-10" />
            <div
              className="absolute bottom-20 lg:fixed  flex mt-7 flex-row text-[#898989] cursor-pointer font-medium text-lg items-center"
              onClick={handleLogoutUser}
            >
              {isLogoutLoading ? (
                <Loader2 size={35} className="animate-spin" />
              ) : (
                <IconLogout2 size={35} />
              )}
              <span className="ml-5">Log Out</span>
            </div>
          </SheetContent>
        </Sheet>
        {isWindow ? (
          <div>
            <h1 className="font-bold text-[#F4B400] text-xl xs:text-2xl lg:text-3xl italic">
              {getTitle()}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="font-bold text-[#F4B400] text-xl xs:text-2xl lg:text-3xl italic">
              {getTitle()}
            </h1>
          </div>
        )}
      </span>
      <div className="flex items-center justify-center gap-4">
        <div className="hidden sm:flex">
          <div className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`/PhotoProfile/${(user as IUserResponse)?.photo}`}/>
              <AvatarFallback>
                <img src="/user-profile-icon.svg" alt="" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <span className="font-medium text-sm">{(user as IUserResponse)?.name}</span>
            </div>
          </div>
        </div>
        {window.location.pathname !== ADMIN_DASHBOARD_PAGE &&
          (user as IUserResponse)?.role === "customer" && (
            <NotificationIcon
              notificationCount={isSuccess ? notificationCount : 0}
            />
          )}
      </div>
    </header>
  );
}
