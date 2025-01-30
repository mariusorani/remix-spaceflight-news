import { css } from "../../styled-system/css";
import { MobileFilterMenu } from "./MobileFilterMenu";
import { DesktopFilterSelect } from "./DesktopFilterSelect";

export interface FilterSelectProps {
  currentValue: string;
  onOrderingChange: (value: string) => void;
}

export function FilterSelect({
  currentValue,
  onOrderingChange,
}: FilterSelectProps) {
  return (
    <div
      className={css({
        flex: { base: "1", md: "0 0 auto" },
        width: { base: "auto", md: "auto" },
        minWidth: { md: "120px" },
      })}
    >
      <div className={css({ display: { base: "block", md: "none" } })}>
        <MobileFilterMenu
          currentValue={currentValue}
          onOrderingChange={onOrderingChange}
        />
      </div>
      <div className={css({ display: { base: "none", md: "block" } })}>
        <DesktopFilterSelect
          currentValue={currentValue}
          onOrderingChange={onOrderingChange}
        />
      </div>
    </div>
  );
}
