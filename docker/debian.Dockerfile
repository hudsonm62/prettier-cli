FROM oven/bun:1.1.4-debian AS deps

# Install dependencies here, so Docker can cache them.
WORKDIR /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN bun install --frozen-lockfile --production

# Copy files for Build
FROM deps AS build
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /temp/dev/node_modules node_modules
COPY . .

RUN bun run build-bun && \
    chmod +x /app/dist/bun-prettier.js && \
    mv /app/dist/bun-prettier.js /prettier.js

# Start the Container
FROM oven/bun:1.1.4-debian as run

USER bun
WORKDIR /lint
COPY --from=build /prettier.js /usr/prettier.js

ENTRYPOINT [ "bun", "run", "/usr/prettier.js" ]
CMD [ "--check ." ]

LABEL org.opencontainers.image.title="Prettier CLI"
LABEL org.opencontainers.image.source="https://github.com/hudsonm62/prettier-cli"
LABEL org.opencontainers.image.license="MIT"
