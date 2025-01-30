# base node image
FROM node:21-bullseye-slim as base
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps
WORKDIR /myapp
# Copy package files and panda config first
COPY package*.json panda.config.ts ./
# Install dependencies but skip prepare script for now
RUN npm ci --include=dev --ignore-scripts

# Setup production node_modules
FROM base as production-deps
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
COPY package*.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
# Copy all source files
COPY . .
# Now run panda codegen explicitly
RUN npx @pandacss/dev codegen
# Then build the app
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
WORKDIR /myapp
COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/styled-system /myapp/styled-system
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]