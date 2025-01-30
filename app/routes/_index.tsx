import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams, useFetcher } from "@remix-run/react";
import { Grid, Text } from "@radix-ui/themes";
import { styled } from "../../styled-system/jsx";
import { useEffect, useState } from "react";

import { getArticles } from "../services/articles.server";
import { ArticleCard } from "../components/ArticleCard";
import type { Article, ArticlesResponse } from "../types/article";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { FilterSelect } from "../components/FilterSelect";

export interface LoaderData {
  articles: ArticlesResponse;
  offset: number;
  hasMore: boolean;
  totalCount: number;
  limit: number;
}

// 1) Loader
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // Extract search, ordering, offset
  const search = url.searchParams.get("search") || "";
  const ordering = url.searchParams.get("ordering") || "-published_at";
  const offset = Number(url.searchParams.get("offset")) || 0;
  const itemsPerPage = 12;

  try {
    const articles = await getArticles({
      search,
      ordering,
      limit: itemsPerPage,
      offset,
    });

    const hasMore = offset + articles.results.length < articles.count;

    return json<LoaderData>({
      articles,
      offset,
      hasMore,
      totalCount: articles.count,
      limit: itemsPerPage,
    });
  } catch (error) {
    console.error("❌ Error in loader:", error);
    return json<LoaderData>({
      articles: { results: [], count: 0, next: null, previous: null },
      offset: 0,
      hasMore: false,
      totalCount: 0,
      limit: itemsPerPage,
    });
  }
}

// 2) Styling helpers
const Container = styled("div", {
  base: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
});

const HeaderContainer = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    marginBottom: { base: "2rem", md: "0" },
    flexDirection: { base: "column", md: "row" },
    alignItems: { base: "stretch", md: "center" },
    width: { base: "100%", md: "auto" },
  },
});

const SearchContainer = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexDirection: { base: "column", md: "row" },
    alignItems: { base: "center", md: "center" },
    width: "100%",
    justifyContent: { base: "center", md: "space-between" },
  },
});

const SearchAndFilterWrapper = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    flexDirection: "row",
    alignItems: "center",
    width: { base: "80%", md: "auto" },
    maxWidth: { base: "400px", md: "none" },
    flex: { md: "0 0 auto" },
  },
});

const SearchSection = styled("div", {
  base: {
    flex: "1",
    maxWidth: { base: "100%", md: "400px" },
    width: { md: "400px" },
  },
});

const FilterSection = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
});

// 3) Page component
export default function Index() {
  const initialData = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher<typeof loader>();

  // State management
  const [articles, setArticles] = useState<Article[]>(
    initialData.articles.results,
  );
  const [offset, setOffset] = useState(initialData.limit);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || fetcher.state !== "idle") return;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (scrolledToBottom && hasMore) {
        setIsLoading(true);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("offset", offset.toString());

        fetcher.submit(
          { offset: offset.toString() },
          { method: "get", action: `/?index&${newParams.toString()}` },
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, hasMore, isLoading, fetcher.state, searchParams]);

  // Handle fetcher data
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      const newArticles = fetcher.data.articles.results;
      if (newArticles.length > 0) {
        setArticles((prev) => [...prev, ...newArticles]);
        setOffset((prev) => prev + (fetcher.data?.limit || 0));
        setHasMore(fetcher.data?.hasMore || false);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  }, [fetcher.data, fetcher.state]);

  // Reset on search/filter change
  useEffect(() => {
    if (initialData.offset === 0) {
      setArticles(initialData.articles.results);
      setOffset(initialData.limit);
      setHasMore(initialData.hasMore);
      setIsLoading(false);
    }
  }, [initialData]);

  // If user picks a client-only "title" ordering, we manually sort
  const currentOrdering = searchParams.get("ordering") || "-published_at";
  const sortedArticles = [...articles];
  if (currentOrdering === "title") {
    sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentOrdering === "-title") {
    sortedArticles.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Handlers for search/ordering changes
  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.delete("offset");
    setSearchParams(newParams);
  };

  const handleOrderingChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("ordering", value);
    newParams.delete("offset");
    setSearchParams(newParams);
  };

  // Render
  return (
    <Container>
      <SearchContainer>
        <HeaderContainer>
          <Title />
        </HeaderContainer>
        <SearchAndFilterWrapper>
          <SearchSection>
            <SearchBar
              defaultValue={searchParams.get("search") || ""}
              onSearchChange={handleSearchChange}
            />
          </SearchSection>
          <FilterSection>
            <FilterSelect
              currentValue={currentOrdering}
              onOrderingChange={handleOrderingChange}
            />
          </FilterSection>
        </SearchAndFilterWrapper>
      </SearchContainer>

      {/* Articles grid */}
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
        {sortedArticles.map((article) => (
          <div key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </Grid>

      {isLoading && (
        <Text align="center" mt="4" size="2">
          Loading more articles...
        </Text>
      )}

      {!hasMore && articles.length > 0 && (
        <Text align="center" mt="4" size="2" color="gray">
          No more articles to load
        </Text>
      )}

      {articles.length === 0 && (
        <Text align="center" mt="8" size="2" color="gray">
          No articles found. Try adjusting your search.
        </Text>
      )}
    </Container>
  );
}
