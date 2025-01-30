import { TextField, TextFieldInput } from "@radix-ui/themes";
import { Form } from "@remix-run/react";
import { css } from "../../styled-system/css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SearchBarProps {
  defaultValue: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ defaultValue, onSearchChange }: SearchBarProps) {
  return (
    <Form
      className={css({
        flex: { base: "1", sm: "1" },
        width: { base: "100%", sm: "400px" },
        display: "flex",
      })}
    >
      <TextField.Root className={css({ width: "100%" })}>
        <TextFieldInput
          data-testid="search-input"
          name="search"
          placeholder="Search articles..."
          defaultValue={defaultValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon
            width="16"
            height="16"
            className={css({
              color: "gray.500",
            })}
          />
        </TextField.Slot>
      </TextField.Root>
    </Form>
  );
}
