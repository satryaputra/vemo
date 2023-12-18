import { Link } from "react-router-dom";
import { IconLock, IconLogout2, IconMailFilled, IconPencil, IconUser } from "@tabler/icons-react";
import { CHANGE_PASSWORD_PAGE, DASHBOARD_PAGE, VERIFY_PASSWORD_PAGE } from "@/lib/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";
import useLogoutUser from "@/hooks/useLogoutUser";
import arrow from "../../assets/notification/Icon-arrow.svg";
import UserProfileIcon from "../../assets/profile/user-profile-icon.svg";

export default function ProfilePageMobile(): JSX.Element {
  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { handleLogoutUser } = useLogoutUser();
  
  return (
    <div className="md:w-[480px] mx-auto">
      <div className="relative">
        <div className="pl-5 ">
          <Link to={DASHBOARD_PAGE}>
            <img src={arrow} alt="" className="z-40 absolute left-0 top-0 w-4 xs:w-6 sm:w-8" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 mt-5 text-center relative sm:mt-4 ">
          <h1 className=" -z-50 text-[1.5rem] font-semibold tracking-wide sm:text-5xl xs:text-[2.3rem] xs:">Profile</h1>
          <img src={UserProfileIcon} alt="" className="inset-0 m-auto w-24 sm:w-32 xs:w-[6rem] " />
          <Link to={VERIFY_PASSWORD_PAGE} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconPencil size={25} /> <p className="text-[#0586BE] sm:text-xl">Perbaharui Profile</p>
          </Link>
        </div>
      </div>
      <div className="px-4   pt-5 mt-8 sm:mt-8 flex-col flex sm:text-start ">
        <div className="mb-6 pb-3 border-b-2">
          <h1 className="text-2xl font-semibold xs:text-3xl sm:text-[2.5rem]">Informasi Saya</h1>
        </div>
        <div className="mb-4">
          <div className="flex flex-col font-normal">
            <h1 className="font-semibold pt-2 pb-3 sm:text-3xl">Biodata</h1>
            <div className="flex items-center gap-2 sm:mt-5">
              <IconUser size={20} />
              <h3 className="sm:text-2xl">Nama</h3>
            </div>
            <p className="font-medium sm:text-lg mt-1">{(user as IUserResponse).name}</p>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex gap-2 items-center">
            <IconMailFilled size={20} />
            <h3 className="sm:text-2xl">Email</h3>
          </div>
          <p className="font-medium sm:text-lg mt-1">{(user as IUserResponse).email}</p>
        </div>
        <div className="absolute bottom-10">
          <Link
            to={CHANGE_PASSWORD_PAGE}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <IconLock size={20} className="cursor-pointer" />
            <p className="text-[#0586BE] text-sm sm:text-lg">Ubah Password</p>
          </Link>
          <button type="button" className="flex gap-2 items-center" onClick={handleLogoutUser}>
            <IconLogout2 size={20} className="cursor-pointer" />
            <p className="text-sm sm:text-lg">Keluar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
