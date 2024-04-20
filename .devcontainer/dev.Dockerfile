# Provided for convenience
## Feel free to make a PR with any improvements
FROM oven/bun:1.1.4-alpine

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

COPY --from=hadolint/hadolint:latest /bin/hadolint /usr/bin/hadolint

# Update packages
RUN apk update && \
    apk add --no-cache git \
    && rm -rf /var/cache/apk/*

RUN bun -v
