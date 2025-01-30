import { Heading } from "@radix-ui/themes";
import { css } from "../../styled-system/css";

export function Title() {
  return (
    <Heading
      size={{ initial: "8", sm: "6" }}
      className={css({
        textAlign: { base: "center", md: "left" },
        marginBottom: { base: "6", md: "0" },
        flex: { lg: "0 0 auto" },
      })}
    >
      Spaceflight News
    </Heading>
  );
}
