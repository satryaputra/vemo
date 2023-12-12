import React from "react";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { useNavigate } from "react-router-dom";

import { REQUEST_MAINTENANCE_VEHICLE_PAGE } from "@/lib/constants/routes";
import { componentsData } from "@/lib/data";
import { Button, Input } from "@/components/atoms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "@/api/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
interface RequestMaintenanceVehicle {
  emailAndPhoneNumber: string;
  distanceVehicle: string;
  notesMechanic: string;
}

export default function VehiclePartsPage(): JSX.Element {
  const methods = useForm<RequestMaintenanceVehicle>();

  const onSubmitHandler: SubmitHandler<RequestMaintenanceVehicle> = async (data) => {
    console.log("Form Data", data);

    const selectedCheckboxes = checkboxStates.map((checked, index) => ({
      name: componentsData[index]?.name,
      checked: checked,
    }));

    console.log("Selected Checkboxes:", selectedCheckboxes);
  };

  const { data: user } = useQuery<IUserResponse>({ queryKey: ["me"] });

  const navigate = useNavigate();

  const [checkboxStates, setCheckboxStates] = React.useState(componentsData.map(() => false));
  const [selectAllText, setSelectAllText] = React.useState("Select All");

  const handleClickSelectAll = () => {
    setCheckboxStates((prevCheckboxStates) => {
      const allSelected = prevCheckboxStates.every((state) => state);
      const newCheckboxStates = prevCheckboxStates.map(() => !allSelected, {
        /* ? false : componentsData[index]?.condition < 60 */
      });
      setSelectAllText(allSelected ? "Select All" : "Unselect All");
      return newCheckboxStates;
    });
  };

  const handleCheckboxChange = (index: number) => {
    setCheckboxStates((prevCheckboxStates) => {
      const newCheckboxStates = [...prevCheckboxStates];
      newCheckboxStates[index] = !newCheckboxStates[index];
      setSelectAllText("Select All");
      return newCheckboxStates;
    });
  };

  return (
    <div className="w-full relative">
      <div className="pt-5 px-10  w-full mb-5">
        <div className=" w-[5rem]">
          <img src={IconArrow} alt="" className="absolute top-6 left-0 lg:left-5 xl:w-[2rem]  md:w-32 xl:h-[2rem] w-[1.4rem] h-[1.5rem] cursor-pointer" onClick={() => navigate(REQUEST_MAINTENANCE_VEHICLE_PAGE)} />
        </div>
        <div className="flex justify-center font-bold md:text-4xl xl:text-4xl text-3xl">
          <h1 className="">Conditional</h1>
        </div>
      </div>
      <div className="relative">
        <button className="absolute -right-1 -top-[3.2rem] md:-top-10 lg:-top-16 items-center text-xs xs:text-base md:text-lg text-white bg-primary rounded-lg px-2 py-1" onClick={handleClickSelectAll}>
          {selectAllText}
        </button>
        <div className="flex w-full">
          <div className="w-full flex flex-wrap lg:justify-evenly pt-5 gap-2">
            {componentsData.map((component, index) => (
              <PartVehicleCard key={index} title={component?.name} condition={component?.condition} image={component?.name} checked={checkboxStates[index]} onCheckboxChange={() => handleCheckboxChange(index)} />
            ))}
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="w-full flex place-items-center pt-7 px-14 xs:px-24 sm:px-20 lg:px-48 mb-10">
        <Dialog>
          <DialogTrigger asChild>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="py-3 text-white rounded-md text-base bg-primary xl:text-lg font-medium w-full">
                  Request Perawatan
                </button>
              </DialogTrigger>
              <DialogContent className="sm:w-[500px] sm:h-[500px] bg-white">
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle className="text-2xl font-semibold">Form Request Perawatan</DialogTitle>
                  <DialogDescription className="text-center">Silahkan isi form berikut untuk merequest perawatan kendaraan</DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col px-7">
                  <FormProvider {...methods}>
                    <form autoComplete="off" className="flex flex-col gap-5" onSubmit={methods.handleSubmit(onSubmitHandler)}>
                      <Input defaultValue={(user as IUserResponse).email} name="emailAndPhoneNumber" label="Email/Phone Number" isFill={methods.watch().emailAndPhoneNumber} placeholder="Enter Email/Phone Number" type="text" />
                      <Input name="distanceVehicle" label="Distance Vehicle / km" isFill={methods.watch().distanceVehicle} placeholder="Enter Distance Vehicle" type="number" min={0} />
                      <Input name="notesMechanic" label="Notes for Mechanic" isFill={methods.watch().notesMechanic} placeholder="Enter Notes for Mechanic" type="text" />
                      <Button type="submit" className="py-6 mt-4 text-lg font-semibold">
                        Enter
                      </Button>
                    </form>
                  </FormProvider>
                </div>
              </DialogContent>
            </Dialog>
          </DialogTrigger>
          <DialogContent className="sm:w-[500px] sm:h-[500px] bg-white">
            <DialogHeader className="flex flex-col items-center justify-center">
              <DialogTitle className="text-2xl font-semibold">Form Request Perawatan</DialogTitle>
              <DialogDescription className="text-center">Silahkan isi form berikut untuk merequest perawatan kendaraan</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}