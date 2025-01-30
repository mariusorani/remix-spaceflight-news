import { Link } from "@radix-ui/themes";
import type { Article } from "../types/article";
import { formatDate } from "../utils/date";
import { css } from "../../styled-system/css";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <div
      role="article"
      data-testid="article-card"
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "4",
        height: "auto",
        width: "100%",
      })}
    >
      <Link href={article.url} target="_blank" rel="noopener noreferrer">
        <div
          className={css({
            position: "relative",
            width: "100%",
            height: "200px",
            overflow: "hidden",
          })}
        >
          <img
            className={css({
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.2s ease-in-out",
              _hover: {
                transform: "scale(1.05)",
              },
            })}
            src={article.image_url}
            alt={article.title}
            loading="lazy"
          />
        </div>
      </Link>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "3",
          px: "2",
          pb: "4",
        })}
      >
        <div>
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            <h3
              data-testid="article-title"
              className={css({
                fontSize: "lg",
                fontWeight: "bold",
                lineHeight: "tight",
                mb: "2",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                overflow: "hidden",
                color: "black",
              })}
            >
              {article.title}
            </h3>
          </Link>
          <p
            data-testid="article-summary"
            className={css({
              fontSize: "md",
              color: "black",
              lineHeight: "relaxed",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              overflow: "hidden",
            })}
          >
            {article.summary}
          </p>
        </div>

        <div
          data-testid="article-metadata"
          className={css({
            display: "flex",
            gap: "2",
            alignItems: "center",
            mt: "auto",
            pt: "3",
            fontSize: "xs",
            color: "black",
          })}
        >
          <span>{article.news_site}</span>
          <span>|</span>
          <time dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
        </div>
      </div>
    </div>
  );
}
