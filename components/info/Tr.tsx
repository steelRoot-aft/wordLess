import { InfoTrProps } from "@/types/other";

export const Tr = ({
  label,
  value,
  icon,
  onClick,
  setIsEdit,
  isEdit,
  inputName,
  setInputName,
}: InfoTrProps) => {
  return (
    <tr className="border-1">
      <th className="th">{label}</th>
      <td className="td">
        {isEdit ? (
          <input
            type="text"
            value={inputName || ""}
            onChange={(e) => setInputName?.(e.target.value)}
          />
        ) : (
          value
        )}
      </td>
      {icon && (
        <td>
          <button
            onClick={() => {
              onClick?.();
              setIsEdit?.(!isEdit);
            }}
            className="bg-black-900 p-1 duration-300 hover:bg-gray-400"
          >
            {icon}
          </button>
        </td>
      )}
    </tr>
  );
};
