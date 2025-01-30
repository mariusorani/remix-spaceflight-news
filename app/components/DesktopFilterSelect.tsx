import { css } from "../../styled-system/css";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { FilterSelectProps } from "./FilterSelect";

export function DesktopFilterSelect({
  currentValue,
  onOrderingChange,
}: FilterSelectProps) {
  return (
    <Select.Root value={currentValue} onValueChange={onOrderingChange}>
      <Select.Trigger
        data-testid="sort-select"
        className={css({
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4.5px 12px",
          borderRadius: "sm",
          backgroundColor: "white",
          border: "1px solid",
          borderColor: "gray.300",
          width: "180px",
          fontSize: "sm",
          cursor: "pointer",
          "&:focus": {
            outline: "none",
            borderColor: "blue.500",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
          },
        })}
      >
        <Select.Value placeholder="Sort by..." />
        <Select.Icon>
          <ChevronDownIcon width="16" height="16" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={css({
            overflow: "hidden",
            backgroundColor: "white",
            borderRadius: "md",
            boxShadow: "md",
            minWidth: "180px",
          })}
        >
          <Select.ScrollUpButton />
          <Select.Viewport className={css({ padding: "5px" })}>
            <Select.Group>
              <Select.Label
                className={css({
                  padding: "8px 12px",
                  fontSize: "sm",
                  color: "gray.600",
                })}
              >
                Sort by Date
              </Select.Label>
              <Select.Item
                value="-published_at"
                data-testid="sort-newest"
                className={css({
                  padding: "8px 12px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "gray.100" },
                  borderRadius: "sm",
                  outline: "none",
                })}
              >
                <Select.ItemText>Newest First</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="published_at"
                className={css({
                  padding: "8px 12px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "gray.100" },
                  borderRadius: "sm",
                  outline: "none",
                })}
              >
                <Select.ItemText>Oldest First</Select.ItemText>
              </Select.Item>
            </Select.Group>

            <Select.Separator
              className={css({
                height: "1px",
                backgroundColor: "gray.200",
                margin: "5px",
              })}
            />

            <Select.Group>
              <Select.Label
                className={css({
                  padding: "8px 12px",
                  fontSize: "sm",
                  color: "gray.600",
                })}
              >
                Sort by Title
              </Select.Label>
              <Select.Item
                value="title"
                data-testid="sort-title-az"
                className={css({
                  padding: "8px 12px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "gray.100" },
                  borderRadius: "sm",
                  outline: "none",
                })}
              >
                <Select.ItemText>A–Z</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="-title"
                className={css({
                  padding: "8px 12px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "gray.100" },
                  borderRadius: "sm",
                  outline: "none",
                })}
              >
                <Select.ItemText>Z–A</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
