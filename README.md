# Spaceflight News Remix

A modern web application built with Remix, showcasing spaceflight news with a beautiful UI using Radix UI and Panda CSS.

## Tech Stack

- **Framework**: [Remix](https://remix.run/) - Full stack web framework
- **Styling**: 
  - [Panda CSS](https://panda-css.com/) - CSS-in-JS with great DX
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
  - [Radix Themes](https://www.radix-ui.com/themes) - Beautiful, consistent theming
- **Testing**:
  - [Jest](https://jestjs.io/) - Unit testing
  - [Playwright](https://playwright.dev/) - End-to-end testing
  - [Testing Library](https://testing-library.com/) - React component testing
- **DevOps**:
  - [Docker](https://www.docker.com/) - Containerization
  - [GitHub Actions](https://github.com/features/actions) - CI/CD

- **Code Quality**:
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [ESLint](https://eslint.org/) - Linting
  - [Prettier](https://prettier.io/) - Code formatting
  - [Husky](https://typicode.github.io/husky/) - Git hooks

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 9 or later
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spaceflight-news-remix.git
cd spaceflight-news-remix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Docker

To run the app using Docker:

```bash
# Build the image
docker build -t spaceflight-news .

# Run the container
docker run -p 3010:3000 spaceflight-news
```

Or using Docker Compose:

```bash
docker-compose up --build
```

## Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Remix Documentation](https://remix.run/docs/en/main)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Panda CSS Documentation](https://panda-css.com/docs/overview/getting-started)
