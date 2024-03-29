import {
  getMaintenancesByUserIdFn,
  getMaintenancesVehiclesByVehicleIdFn,
  getVehicleByIdFn,
  getVehiclePartsConditionFn,
} from "@/api/services/vehicle";
import {
  IConditionParts,
  IMaintenanceVehicle,
  IMaintenanceVehicleResponse,
  IUserResponse,
  IVehicleResponse,
} from "@/api/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconAutomaticGearbox, IconBike, IconCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Tooltip, VehicleIcon } from "@/components/atoms";
import {
  VEHICLE_PARTS_PAGE,
  VEHICLE_SERVICES_DETAILS_PAGE,
} from "@/lib/constants/routes";
import DetailVehicleCard from "@/components/molecules/DetailVehicleCard";
import { ChevronsDown } from "lucide-react";
import { IconTicket } from "@tabler/icons-react";
import { IconClipboard } from "@tabler/icons-react";
import React from "react";
import { IconManualGearbox } from "@tabler/icons-react";

export default function VehicleDetailsPage() {
  const [isSuccessPaste, setIsSuccessPaste] = React.useState(false);
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const validVehicleId = vehicleId || "";

  const { data: user } = useQuery({ queryKey: ["me"] });

  React.useEffect(() => {
    isSuccessPaste && setTimeout(() => setIsSuccessPaste(false), 500);
  }, [isSuccessPaste, setIsSuccessPaste]);

  const { data: maintenanceVehicle } = useQuery<
    IMaintenanceVehicleResponse,
    Error
  >({
    queryKey: ["maintenanceVehicle", vehicleId],
    queryFn: async () => await getMaintenancesVehiclesByVehicleIdFn(vehicleId),
  });

  const handlePasteClick = () => {
    const ticketValue = maintenanceVehicle?.maintenanceVehicle.ticket || "";
    navigator.clipboard.writeText(ticketValue.toUpperCase());
    setIsSuccessPaste(true);
  };

  const { data: vehicle, isSuccess: isVehicleSuccess } = useQuery<
    IVehicleResponse,
    Error
  >({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => await getVehicleByIdFn(vehicleId),
  });

  const { data: conditionArray, isSuccess: isConditionSuccess } = useQuery<
    IConditionParts[],
    Error
  >({
    queryKey: ["parts", validVehicleId],
    queryFn: async () => await getVehiclePartsConditionFn(validVehicleId),
  });

  const { data: historyServices, isSuccess: isHistorySuccess } = useQuery({
    queryKey: ["historyServices"],
    queryFn: async (): Promise<IMaintenanceVehicle[]> =>
      await getMaintenancesByUserIdFn((user as IUserResponse).userId),
  });

  console.log();

  return (
    <>
      <div className="w-full md:w-[480px] md:mx-auto lg:w-full flex gap-5 flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-[#F7F8F9] rounded-xl py-5 px-5">
          <div className="w-full flex flex-col justify-center items-center">
            <VehicleIcon
              type={
                isVehicleSuccess
                  ? (vehicle as IVehicleResponse).vehicleType
                  : "matic"
              }
            />
            <h1 className="font-semibold text-xl lg:text-2xl mt-4 devide mb-5">
              {isVehicleSuccess && (vehicle as IVehicleResponse).vehicleName}
            </h1>
          </div>
          <div className="mb-6">
            <Tabs
              defaultValue="information"
              className="w-full flex flex-col justify-center static"
            >
              <TabsList className="w-full h-11 text-dark bg-gray-200">
                <TabsTrigger
                  value="information"
                  className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white"
                >
                  Informasi
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="w-full h-full data-[state=active]:bg-primary/80 data-[state=active]:text-white"
                >
                  Riwayat Service
                </TabsTrigger>
              </TabsList>
              <div className="pl-4">
                <TabsContent value="information">
                  <div className="text-start mt-5 sm:text-2xl flex flex-col gap-6">
                    <h1 className="font-semibold text-xl sm:text-2xl">
                      <a href="#parts">Informasi Kendaraan</a>
                    </h1>
                    {maintenanceVehicle?.maintenanceVehicle.status && (
                      <div className="flex gap-5">
                        <IconTicket size={30} />
                        <div>
                          <h1 className="font-medium text-xl text-gray-500">
                            Tiket Perawatan
                          </h1>
                          <span className="flex gap-2 items-center">
                            <p className="text-base text-dark font-semibold uppercase">
                              {maintenanceVehicle?.maintenanceVehicle.ticket}
                            </p>
                            <Tooltip
                              text={"Berhasil menyalin"}
                              open={isSuccessPaste}
                            >
                              {isSuccessPaste ? (
                                <IconCheck
                                  size={20}
                                  className="text-gray-600 cursor-pointer"
                                />
                              ) : (
                                <IconClipboard
                                  size={20}
                                  className="text-gray-600 cursor-pointer"
                                  onClick={handlePasteClick}
                                />
                              )}
                            </Tooltip>
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-5">
                        <IconBike size={30} />
                        <div>
                          <h1 className="font-medium text-xl text-gray-500">
                            Nama Pengguna :
                          </h1>
                          <p className="text-base text-dark font-semibold">
                            {isVehicleSuccess &&
                              (vehicle as IVehicleResponse).ownerName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-5">
                        <IconBike size={30} />
                        <div>
                          <h1 className="font-medium text-xl text-gray-500">
                            Nama Kendaraan
                          </h1>
                          <p className="text-base text-dark font-semibold">
                            {(vehicle as IVehicleResponse)?.vehicleName}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        {(vehicle as IVehicleResponse)?.vehicleType ===
                        "matic" ? (
                          <IconAutomaticGearbox size={30} />
                        ) : (
                          <IconManualGearbox size={30} />
                        )}
                        <div>
                          <h1 className="font-medium text-xl text-gray-500">
                            Tipe Kendaraan
                          </h1>
                          <p className="text-base text-dark font-semibold capitalize">
                            {(vehicle as IVehicleResponse)?.vehicleType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <IconBike size={30} />
                      <div>
                        <h1 className="font-medium text-xl text-gray-500">
                          Tanggal Kendaraan Dibeli :
                        </h1>
                        <p className="text-base text-dark font-semibold">
                          {isVehicleSuccess &&
                            format(
                              new Date(
                                (vehicle as IVehicleResponse).purchasingDate
                              ),
                              "dd MMMM yyyy",
                              { locale: id }
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="text-start pl-6 mt-5">
                    <div className="flex flex-col w-full">
                      <h1 className="list-disc text-xl pt-5 p font-bold sm:text-2xl">
                        Riwayat Service
                      </h1>
                      <ul className="list-disc text-base pt-5 px-2 font-light sm:text-lg">
                        {isHistorySuccess &&
                        historyServices.filter((x) => x.vehicleId === vehicleId)
                          .length > 0 ? (
                          historyServices
                            .filter((x) => x.vehicleId === vehicleId)
                            .map((history) => (
                              <li
                                key={history.id}
                                className="border-b-2 w-[90%] sm:w-[60%]"
                              >
                                {format(
                                  new Date(history.createdAt),
                                  "dd MMMM yyyy",
                                  {
                                    locale: id,
                                  }
                                )}{" "}
                                -{" "}
                                <span
                                  className="text-primary cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      VEHICLE_SERVICES_DETAILS_PAGE(
                                        vehicleId,
                                        history.id
                                      )
                                    )
                                  }
                                >
                                  Lihat Detail
                                </span>
                              </li>
                            ))
                        ) : (
                          <p className="font-medium text-primary text-xl text-center mt-14">
                            Belum ada data
                          </p>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            <a
              href="#parts"
              className="w-full flex justify-center mt-10 text-primary lg:hidden"
            >
              <ChevronsDown size={40} className="animate-bounce" />
            </a>
          </div>
        </div>
        <div
          className="lg:w-1/2 lg:bg-[#F7F8F9] rounded-xl py-5 px-5 h-full"
          id="parts"
        >
          <h1 className="text-[#898989] py-2 px-4 text-lg">Kondisi Part :</h1>
          <div className="w-full px-2 flex mt-7 mb-10 flex-col gap-5 justify-center h-[24rem] overflow-y-auto">
            <div className="gap-4 mt-[30rem] lg:mt-[45rem] lg:gap-2 px-4">
              {isConditionSuccess &&
                conditionArray.map((part, index) => (
                  <DetailVehicleCard
                    key={index}
                    title={part.partName}
                    condition={part.condition}
                    image={part.partName}
                  />
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center mb-10 ">
            <Button onClick={() => navigate(VEHICLE_PARTS_PAGE(vehicleId))}>
              Detail Komponen
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
