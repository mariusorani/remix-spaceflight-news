import type { Article, ArticlesResponse } from "../types/article";

const API_BASE_URL = "https://api.spaceflightnewsapi.net/v4/articles";

type OrderingType =
  | "-published_at"
  | "published_at"
  | "-updated_at"
  | "updated_at";

export async function getArticles(params: {
  search?: string;
  ordering?: string;
  limit?: number;
  offset?: number;
}): Promise<ArticlesResponse> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.append("search", params.search);
  }

  // Only use server-side ordering for dates
  if (
    params.ordering &&
    (params.ordering.includes("published_at") ||
      params.ordering.includes("updated_at"))
  ) {
    searchParams.append("ordering", params.ordering as OrderingType);
  } else {
    // Default to newest first
    searchParams.append("ordering", "-published_at");
  }

  // Always include limit and offset for proper pagination
  searchParams.append("limit", (params.limit || 12).toString());
  searchParams.append("offset", (params.offset || 0).toString());

  try {
    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticle(id: number): Promise<Article> {
  try {
    const url = `${API_BASE_URL}/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}
