import { IconInfoCircleFilled } from "@tabler/icons-react";
import { Button, VehicleCondition, VehicleIcon } from "@/components/atoms";
import { VehicleData } from "@/lib/types";

interface Props {
  vehicleData: VehicleData;
}

export default function VehicleCard({ vehicleData }: Props): JSX.Element {
  return (
    <div className="flex bg-white w-full rounded-xl px-4 gap-6 xl:gap-10 xl:px-12 py-2 shadow-[0px_3px_7px_5px_#00000040]">
      <div className="self-center">
        <VehicleIcon type={vehicleData.type} />
      </div>
      <div className="pt-4 pb-3 w-full">
        <h1 className="font-semibold xl:text-2xl tracking-wide mb-1">
          {vehicleData.name}
        </h1>
        <h3 className="font-semibold text-sm xl:text-2xl pb-3 text-[#898989]">
          {vehicleData.licenseNumber}
        </h3>
        <div className="w-full flex justify-between items-center gap-2">
          <VehicleCondition condition={vehicleData.condition} />
          <div className="mr-7">
            <Button size="sm">
              <IconInfoCircleFilled size={18} className="mr-1" />
              Detail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
