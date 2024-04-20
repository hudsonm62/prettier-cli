## hudsonm62/prettier-cli
FROM oven/bun:1.1.4-alpine AS deps

# Install dependencies here, so Docker can cache them.
WORKDIR /temp/deps
COPY package.json bun.lockb /temp/deps/
RUN bun install --frozen-lockfile --production

# Copy files for Build
FROM deps AS build
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /temp/deps/node_modules node_modules
COPY . .

RUN bun run package && \
    chmod +x /app/dist/bin/prettier && \
    mv /app/dist/bin/prettier /prettier

# Start the Container
FROM frolvlad/alpine-glibc:alpine-3.19 as run

USER guest
WORKDIR /lint
COPY --from=build /prettier /usr/local/bin/prettier

ENTRYPOINT [ "prettier" ]
CMD [ "--check ." ]

LABEL org.opencontainers.image.title="Prettier CLI"
LABEL org.opencontainers.image.source="https://github.com/hudsonm62/prettier-cli"
LABEL org.opencontainers.image.license="MIT"
