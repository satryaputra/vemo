import React from "react";
import IconArrow from "../../assets/notification/Icon-arrow.svg";
import PartVehicleCard from "@/components/molecules/PartVehicleCard";
import { Link, useParams } from "react-router-dom";

import { VEHICLE_DETAILS_PAGE } from "@/lib/constants/routes";
import { Button, Input } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { IParts, IVehicleResponse } from "@/api/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import useMutateVehicle from "@/hooks/useMutateVehicle";
interface RequestMaintenanceVehicle {
  contact: string;
  description: string;
}

export default function VehiclePartsPage(): JSX.Element {
  const { vehicleId } = useParams();

  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const methods = useForm<RequestMaintenanceVehicle>();

  const { data: parts } = useQuery<IParts[], Error>({
    queryKey: ["parts", vehicleId],
    queryFn: async () => await getVehiclePartsConditionFn(vehicleId),
  });

  const handleCheckboxChange = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    const allIds = parts!
      .filter((part) => part.condition <= 60)
      .map((part) => part.partId);
    setCheckedItems(selectAll ? [] : allIds);
    setSelectAll((prev) => !prev);
  };

  const { requestMaintenance } = useMutateVehicle();

  const onSubmitHandler = async (data: RequestMaintenanceVehicle) => {
    await requestMaintenance.mutateAsync({
      ...data,
      vehicleId,
      listPartId: checkedItems,
    });
  };


  React.useEffect(() => {
    requestMaintenance.isSuccess && window.location.reload();
  }, [requestMaintenance.isSuccess]);

  // fetch vehicle by id
  const { data: vehicle, isSuccess: isVehicleSuccess } =
    useQuery<IVehicleResponse>({
      queryKey: ["vehicle", vehicleId],
      queryFn: async () => await getVehicleByIdFn(vehicleId),
    });

  return (
    <div className="w-full relative">
      <div className="pt-5 px-10  w-full mb-5">
        <Link to={VEHICLE_DETAILS_PAGE(vehicleId!)} className=" w-[5rem]">
          <img src={IconArrow} alt="" className="absolute top-6 left-0 lg:left-5 xl:w-[2rem]  md:w-32 xl:h-[2rem] w-[1.4rem] h-[1.5rem] cursor-pointer"/>
        </Link>
        <div className="flex justify-center font-bold md:text-4xl xl:text-4xl text-3xl">
          <h1 className="">Kondisi Part</h1>
        </div>
      </div>
      <div className="relative">
        {isVehicleSuccess && vehicle.status !== "requested" && (
          <button
            className="absolute -right-1 -top-[3.2rem] md:-top-10 lg:-top-16 items-center text-[10px] xs:text-base md:text-lg text-white bg-primary rounded-lg px-2 py-[6px] xs:py-1"
            onClick={handleSelectAll}
          >
            {selectAll ? "Batal" : "Pilih Semua"}
          </button>
        )}
        <div className="flex flex-wrap mx-auto items-center md:w-[70%] lg:w-full lg:justify-evenly pt-5 gap-2">
          {parts?.map((part) => (
            <PartVehicleCard
              key={part.partId}
              data={part}
              checked={checkedItems.includes(part.partId)}
              onCheckboxChange={() => handleCheckboxChange(part.partId)}
              isCheck={vehicle?.status !== "requested"}
            />
          ))}
        </div>
      </div>
      {/* Button */}
      <div className="w-full flex place-items-center pt-7 px-14 xs:px-24 sm:px-20 lg:px-48 mb-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="py-6 text-white rounded-md text-base bg-primary xl:text-lg font-medium w-full"
              disabled={checkedItems.length <= 0 || vehicle?.status === "requested"}
            >
              {vehicle?.status === "requested" ? (
                <p className="text-xs md:text-base">Perawatan kendaraan sedang diproses</p>
              ) : "Request Perawatan"}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-4/5 bg-white">
            <DialogHeader className="flex flex-col items-center justify-center">
              <DialogTitle className="text-2xl font-semibold">
                Form Request Perawatan
              </DialogTitle>
              <DialogDescription className="text-center">
                Silahkan isi form berikut untuk merequest perawatan kendaraan
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex flex-col px-7">
              <FormProvider {...methods}>
                <form
                  autoComplete="off"
                  className="flex flex-col gap-5"
                  onSubmit={methods.handleSubmit(onSubmitHandler)}
                >
                  <Input
                    name="contact"
                    label="Email / Nomor Telepon"
                    isFill={methods.watch().contact}
                    placeholder="Masukan Email / Nomor Telepon"
                    type="text"
                  />
                  <Input
                    name="description"
                    label="Catatan untuk Mekanik"
                    isFill={methods.watch().description}
                    placeholder="Masukan catatan disini..."
                    type="textarea"
                    className="h-24"
                  />
                  <Button
                    type="submit"
                    className="py-6 mt-4 text-lg font-semibold"
                  >
                    Kirim
                  </Button>
                </form>
              </FormProvider>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
