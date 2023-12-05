import { FormProvider, useForm } from "react-hook-form";
import gradient from "../../assets/requestPageImage/gradient-img.svg";
import ImageVehicle from "../../assets/requestPageImage/register-vehicle-mobile-image.png";
import { useQueryClient } from "@tanstack/react-query";
import useMutateVehicle from "@/hooks/useMutateVehicle";
import { Button, Input } from "@/components/atoms";
import { VehicleType } from "@/lib/types";

interface RegisterVehicle {
  fullName: string;
  vehicleName: string;
  vehicleType: VehicleType;
  purchasingDate: Date;
  licenseNumber: string;
}
export default function RegisterVehiclePageMobile() {
  const queryClient = useQueryClient();
  const methods = useForm<RegisterVehicle>();

  const { registerVehicle } = useMutateVehicle();

  async function handleRegisterVehicle(data: RegisterVehicle) {
    registerVehicle.mutateAsync({
      ownerName: data.fullName,
      vehicleName: data.vehicleName,
      licenseNumber: data.licenseNumber,
      vehicleType: data.vehicleType,
      purchasingDate: new Date(data.purchasingDate).toISOString(),
      userId: (queryClient.getQueryData(["me"]) as any).userId,
    });
  }

  return (
    <>
      <div className="sm:bg-black sm:bg-opacity-30 ">
        <div className="relative w-full mt-3 flex flex-col justify-center ">
          <img src={ImageVehicle} alt="" className="w-full sm:h-80 sm:-z-10 -z-10" />
          <h1 className="absolute bottom-4 left-5 text-xl text-white font-bold z-10 w-2/3 xs:w-4/5 xs:text-4xl  sm:text-6xl sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center sm:flex sm:items-center ">
            Daftarkan Kendaraan Anda
          </h1>
          <img src={gradient} alt="" className="absolute w-full -bottom-[1px] sm:hidden " />
        </div>
        <div></div>
      </div>

      <div className="w-full mb-2 justify-center flex">
        <div className="w-[90%] mt-5">
          <FormProvider {...methods}>
            <form autoComplete="off" onSubmit={methods.handleSubmit(handleRegisterVehicle)} className="flex-col flex gap-6">
              <Input name="fullName" label="Nama Lengkap" isFill={methods.watch().fullName} placeholder="Input your name" type="text" />
              <Input name="vehicleName" label="Nama Kendaraan" isFill={methods.watch().vehicleName} placeholder="Input your email" type="text" />
              <Input name="vehicleType" label="Jenis Kendaraan" isFill={methods.watch().vehicleType} placeholder="Pilih jenis kendaraan" type="select">
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
              </Input>
              <Input name="purchasingDate" label="Tanggal Pembelian Kendaraan" isFill={methods.watch().purchasingDate?.toString()} placeholder="Input your password" type="date" />
              <Input name="licenseNumber" label="Plat Nomor" isFill={methods.watch().licenseNumber} placeholder="Confirm your password" type="text" />
              <div className="flex flex-col gap-2 mt-7">
                <Button className="py-6 text-lg font-semibold" type="submit" isLoading={registerVehicle.isPending}>
                  Send
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
