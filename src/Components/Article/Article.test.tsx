import { render, screen, cleanup } from "@testing-library/react";
import Article from "./Article";

afterEach(() => {
  cleanup();
});

it("should render article data", async () => {
  const article = {
    title:
      "USC hiring Kliff Kingsbury as senior offensive analyst, per source: What it means for the Trojans - The Athletic",
    category: "Sport",
    author: "Bruce Feldman, Antonio Morales",
    image:
      "https://cdn.theathletic.com/app/uploads/2023/04/10215032/Kingsbury-1024x729.jpg",
    favourite: "*",
  };

  render(
    <Article
      title={article.title}
      category={article.category}
      author={article.author}
      image={article.image}
      favourite={article.favourite}
    />
  );

  expect(screen.queryByTestId("article-title")?.textContent).toContain(
    article.title
  );

  expect(screen.queryByTestId("article-category")?.textContent).toBe(
    article.category
  );

  expect(screen.queryByTestId("article-author")?.textContent).toBe(
    article.author
  );
});
