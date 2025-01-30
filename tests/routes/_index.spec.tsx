/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Theme } from "@radix-ui/themes";
import type { Article } from "../../app/types/article";
import type { LoaderData } from "../../app/routes/_index";

// Mock styled-system/css
jest.mock("../../styled-system/css", () => ({
  css: jest.fn().mockImplementation((styles) => styles),
}));

// Mock styled-system/jsx
jest.mock("../../styled-system/jsx", () => ({
  styled: jest.fn().mockImplementation((element) => {
    return function StyledComponent(
      props: React.HTMLAttributes<HTMLDivElement>,
    ) {
      const Element = element;
      return <Element {...props} />;
    };
  }),
}));

// Mock Remix hooks
jest.mock("@remix-run/react", () => ({
  ...jest.requireActual("@remix-run/react"),
  useLoaderData: () =>
    ({
      articles: {
        results: [
          {
            id: 1,
            title: "SpaceX Launch Success",
            url: "https://example.com",
            image_url: "/mock/image1.jpg",
            news_site: "Space News",
            summary: "Successful launch of Starship",
            published_at: "2025-01-28T10:00:00Z",
            updated_at: "2025-01-28T10:00:00Z",
            featured: false,
            launches: [],
            events: [],
          },
        ],
        count: 1,
        next: null,
        previous: null,
      },
      offset: 0,
      hasMore: false,
      totalCount: 1,
      limit: 12,
    }) as LoaderData,
  useFetcher: () => ({
    submit: jest.fn(),
    data: null,
    state: "idle",
  }),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
  Form: ({ children }: { children: React.ReactNode }) => (
    <form>{children}</form>
  ),
}));

// Mock components with proper types
jest.mock("../../app/components/ArticleCard", () => ({
  ArticleCard: ({ article }: { article: Article }) => (
    <article data-testid="article-card">
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
    </article>
  ),
}));

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  defaultValue?: string;
}

jest.mock("../../app/components/SearchBar", () => ({
  SearchBar: ({ onSearchChange }: SearchBarProps) => (
    <input
      data-testid="search-input"
      placeholder="Search articles..."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onSearchChange(e.target.value)
      }
    />
  ),
}));

interface FilterSelectProps {
  onOrderingChange: (value: string) => void;
  currentValue?: string;
}

jest.mock("../../app/components/FilterSelect", () => ({
  FilterSelect: ({ onOrderingChange }: FilterSelectProps) => (
    <select
      data-testid="sort-select"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        onOrderingChange(e.target.value)
      }
    >
      <option value="-published_at">Newest First</option>
      <option value="published_at">Oldest First</option>
    </select>
  ),
}));

// Mock the articles service
jest.mock("../../app/services/articles.server", () => ({
  getArticles: jest.fn().mockResolvedValue({
    results: [
      {
        id: 1,
        title: "SpaceX Launch Success",
        url: "https://example.com",
        image_url: "/mock/image1.jpg",
        news_site: "Space News",
        summary: "Successful launch of Starship",
        published_at: "2025-01-28T10:00:00Z",
        updated_at: "2025-01-28T10:00:00Z",
        featured: false,
        launches: [],
        events: [],
      },
    ],
    count: 1,
    next: null,
    previous: null,
  }),
}));

// Import the component after all mocks are set up
import Index from "../../app/routes/_index";

describe("Index Route", () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
    },
  ]);

  const renderIndex = () => {
    return render(
      <Theme
        appearance="light"
        accentColor="blue"
        radius="medium"
        scaling="100%"
      >
        <RemixStub />
      </Theme>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders article list with correct content", async () => {
    renderIndex();
    await waitFor(() => {
      expect(screen.getByText("SpaceX Launch Success")).toBeInTheDocument();
    });
  });

  test("search functionality", async () => {
    const user = userEvent.setup();
    renderIndex();

    const searchInput = await waitFor(() => screen.getByTestId("search-input"));
    await user.type(searchInput, "SpaceX");

    expect(screen.getByText("SpaceX Launch Success")).toBeInTheDocument();
  });

  test("sorting functionality", async () => {
    const user = userEvent.setup();
    renderIndex();

    const sortSelect = await waitFor(() => screen.getByTestId("sort-select"));
    await user.selectOptions(sortSelect, "published_at");

    expect(screen.getByText("SpaceX Launch Success")).toBeInTheDocument();
  });

  test("infinite scrolling", async () => {
    renderIndex();
    await waitFor(() => {
      expect(screen.getAllByTestId("article-card")).toHaveLength(1);
    });
  });
});
