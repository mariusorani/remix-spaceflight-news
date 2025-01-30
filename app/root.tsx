import "@radix-ui/themes/styles.css";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Theme } from "@radix-ui/themes";
import { styled } from "../styled-system/jsx";

import styles from "./index.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    // Google Fonts
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    },
    // Global styles (includes Panda CSS)
  ];
};

export const meta: MetaFunction = () => [
  {
    title: "Spaceflight News",
    description: "Latest news about spaceflights",
  },
];

const Container = styled("div", {
  base: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme appearance="light" accentColor="blue" radius="medium">
          <Container>
            <Outlet />
          </Container>
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
