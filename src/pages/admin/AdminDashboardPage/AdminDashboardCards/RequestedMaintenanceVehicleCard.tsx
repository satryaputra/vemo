import { Card, CardContent } from "@/components/ui/card";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useCountVehiclesQuery } from "../../../../hooks/queries/useCountVehiclesQuery";
import { ICountVehiclesResponse } from "@/api/types";

const COLORS = ["#F4B400", "#94a3b8"];

export default function RequestedMaintenanceVehicleCard() {
  const { countVehiclesQuery } = useCountVehiclesQuery();
  const { data: queryData, isSuccess } = countVehiclesQuery;

  const data = [
    {
      name: "Total Kendaraan",
      value: isSuccess ? (queryData as ICountVehiclesResponse).vehicles : 0,
      color: "#F4B400",
    },
    {
      name: "Permintaan Perawatan",
      value: isSuccess ? (queryData as ICountVehiclesResponse).requested : 0,
      color: "#94a3b8",
    },
  ];
  return (
    <Card className="h-full">
      <h1 className="text-xl font-semibold text-center mt-8">
        Requsted Maintenance
      </h1>
      <CardContent>
        <div className="w-full">
          <PieChart width={250} height={200}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              cx={125}
              cy={140}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex justify-center gap-8 text-sm">
          {data.map((item) => (
            <div className="flex flex-col gap-2 items-center" key={item.name}>
              <div className="flex gap-4 items-center">
                <div
                  className={"w-2.5 h-2.5 rounded-full"}
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[.65rem]">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
