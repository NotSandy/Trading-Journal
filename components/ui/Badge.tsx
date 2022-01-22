import { NextPage } from "next";
import { classNames } from "../../utils/shared/Utils";

interface IBadgeProps {
  value: string;
}

export const StatusBadge: NextPage<IBadgeProps> = ({ value }: { value: string }) => {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("win") ? "bg-success-500 text-neutral-100" : null,
        status.startsWith("open") ? "bg-warning-500 text-neutral-100" : null,
        status.startsWith("lost") ? "bg-danger-500 text-neutral-100" : null
      )}
    >
      {status}
    </span>
  );
};
