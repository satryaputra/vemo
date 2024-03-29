import { Link, useNavigate } from "react-router-dom";
import {
  IconLock,
  IconLogout2,
  IconMailFilled,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";
import {
  CHANGE_PASSWORD_PAGE,
  DASHBOARD_PAGE,
  FORGOT_PASSWORD_REQUEST_PAGE,
  VERIFY_PASSWORD_PAGE,
} from "@/lib/constants/routes";
import useLogoutUser from "@/hooks/mutations/useLogoutUser";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KeyRound } from "lucide-react";

export default function ProfilePageMobile(): JSX.Element {
  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });
  const { handleLogoutUser } = useLogoutUser();
  const navigate = useNavigate()

  return (
    <div className="md:w-[480px] mx-auto">
      
      <div className="flex flex-col items-center gap-4 text-center relative sm:mt-4 ">
      <img
            src={"/Icon-arrow.svg"}
            alt=""
            className="absolute top-3 left-4 w-5 lg:w-7 cursor-pointer"
            onClick={() => navigate(DASHBOARD_PAGE)}
          />
        <h1 className=" -z-50 text-[1.5rem] font-semibold tracking-wide sm:text-5xl xs:text-[2.3rem] xs:">
          Profile
        </h1>
        <Avatar className="w-28 h-28 my-4">
          <AvatarImage src={`/PhotoProfile/${user?.photo}`} />
          <AvatarFallback>
            <img src="/user-profile-icon.svg" alt="" />
          </AvatarFallback>
        </Avatar>
        <Link
          to={VERIFY_PASSWORD_PAGE}
          className="flex text-[#0586BE] text-sm items-center cursor-pointer hover:underline gap-1"
        >
          <IconPencil size={20} />
          <p className="sm:text-xl">Update Profile</p>
        </Link>
      </div>
      <div className="px-4 pt-5 sm:mt-8 flex-col flex sm:text-start relative">
        <div className="mb-6 pb-3 border-b-2">
          <h1 className="text-2xl font-semibold xs:text-3xl sm:text-[2.5rem]">
            Informasi Saya
          </h1>
        </div>
        <div className="mb-4">
          <div className="flex flex-col font-normal">
            <h1 className="font-semibold pt-2 pb-3 sm:text-3xl">Biodata</h1>
            <div className="flex items-center gap-2 sm:mt-5">
              <IconUser size={20} />
              <h3 className="sm:text-2xl">Nama</h3>
            </div>
            <p className="font-medium sm:text-lg mt-1">
              {(user as IUserResponse).name}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex gap-2 items-center">
            <IconMailFilled size={20} />
            <h3 className="sm:text-2xl">Email</h3>
          </div>
          <p className="font-medium sm:text-lg mt-1">
            {(user as IUserResponse).email}
          </p>
        </div>
        <div className="md:absolute bottom-5 md:bottom-10">
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
          <Link
            to={FORGOT_PASSWORD_REQUEST_PAGE}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <KeyRound size={20} className="cursor-pointer" />
            <p className="text-[#0586BE] text-sm sm:text-lg">Lupa Password</p>
          </Link>
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={handleLogoutUser}
          >
            <IconLogout2 size={20} className="cursor-pointer" />
            <p className="text-sm sm:text-lg">Keluar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
