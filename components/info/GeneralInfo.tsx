import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { useUserStore } from "@/store/useUserStore";

export const GeneralInfo = () => {
  const { otherInfo } = useUserStore();

  return (
    <section className="grid gap-y-3">
      <h2>Общая статистика</h2>
      <table className="w-full table-auto border-collapse text-[0.6rem]">
        <thead>
          <tr>
            <th className="th">Имя</th>
            <th className="border-1 bg-gray-500 p-2">Очки</th>
          </tr>
        </thead>
        <tbody>
          {otherInfo.map((item, index) => (
            <tr key={index}>
              <td className="w-full max-w-35 truncate border-1 bg-gray-600 p-2">
                {item.name}
              </td>
              <td className="border-1 bg-gray-600 p-2 text-center">
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
