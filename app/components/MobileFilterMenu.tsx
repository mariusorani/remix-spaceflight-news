import { IconButton } from "@radix-ui/themes";
import { css } from "../../styled-system/css";
import {
  HamburgerMenuIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { FilterSelectProps } from "./FilterSelect";

export function MobileFilterMenu({ onOrderingChange }: FilterSelectProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton
          variant="ghost"
          color="gray"
          size="3"
          className={css({
            transform: "translateY(3px)",
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "2px",
            })}
          >
            <ChevronUpIcon width="14" height="14" />
            <HamburgerMenuIcon
              data-testid="hamburger-icon"
              width="16"
              height="16"
            />
            <ChevronDownIcon width="14" height="14" />
          </div>
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={css({
            minWidth: "180px",
            backgroundColor: "white",
            borderRadius: "md",
            padding: "5px",
            boxShadow: "md",
          })}
        >
          <DropdownMenu.Label
            className={css({
              padding: "8px 12px",
              fontSize: "sm",
              color: "gray.600",
            })}
          >
            Sort by Date
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({
              padding: "8px 12px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "gray.100" },
              borderRadius: "sm",
            })}
            onClick={() => onOrderingChange("-published_at")}
          >
            Newest First
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={css({
              padding: "8px 12px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "gray.100" },
              borderRadius: "sm",
            })}
            onClick={() => onOrderingChange("published_at")}
          >
            Oldest First
          </DropdownMenu.Item>

          <DropdownMenu.Separator
            className={css({
              height: "1px",
              backgroundColor: "gray.200",
              margin: "5px",
            })}
          />

          <DropdownMenu.Label
            className={css({
              padding: "8px 12px",
              fontSize: "sm",
              color: "gray.600",
            })}
          >
            Sort by Title
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({
              padding: "8px 12px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "gray.100" },
              borderRadius: "sm",
            })}
            onClick={() => onOrderingChange("title")}
          >
            A–Z
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={css({
              padding: "8px 12px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "gray.100" },
              borderRadius: "sm",
            })}
            onClick={() => onOrderingChange("-title")}
          >
            Z–A
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
