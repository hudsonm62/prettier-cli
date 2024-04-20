# 🔨 hudsonm62/prettier-cli

[![Checks status][checks status]][checks url]
[![Dependabot status][dependabot status]][dependabot url]
[![License][license badge]][license url]
[![Code style][code style]][code style url]

🔥 Native, Fast statically linked `prettier` CLI for your favorite Shell, Docker and Github Actions.
It allows you to run `prettier` CLI commands without having to install Node.js and any dependencies.

> Note: This project is NOT affiliated with [Prettier](https://prettier.io/).
>
> ~Originally forked from [`actionsx/prettier`](https://github.com/actionsx/prettier).

## Usage

- `path/to/prettier <args>`

### GitHub Actions

```yaml
- uses: actions/checkout@v4
- uses: hudsonm62/prettier-cli@v1
  with:
    args: --check .
```

| Input  | Default     | Description            |
| ------ | ----------- | ---------------------- |
| `args` | `--check .` | Prettier CLI Arguments |

### Docker

All the provided Docker images can be used 'ad-hoc', this is especially handy in environments without a JavaScript interpreter.

The binary is located at `/usr/local/bin/prettier` (except for the [`bun-` tags](#tags), which use a [`Bun.Build`](https://bun.sh/docs/bundler) bundle).

|  USER   | WORKDIR |     CMD     |
| :-----: | :-----: | :---------: |
| `guest` | `/lint` | `--check .` |

#### With `docker run`

```sh
docker run --rm -v path/to/repo:/lint hudsonm62/prettier-cli:latest
```

#### With a `Dockerfile`

```Dockerfile
FROM hudsonm62/prettier-cli:latest
WORKDIR /lint
COPY . .
CMD [ "--check", "." ]
```

## Plugins

Plugins _somewhat_ work! You'll typically have them available in `node_modules` on your `cwd`, or globally somewhere on `$PATH`. Please report any issues - this is still lacking in solid testing and could definitely be improved.

#### Tags

There are two versions of the Docker image available: "main" and "bun". The "main" tags provide the standard Prettier CLI, while the "bun" tags utilize the Bun runtime, which might be preferred in certain situations. Additionally, the "bun" images come in two distributions - Alpine and Debian:

- Main Binary Tags:

  - [latest][docker-main]
  - [1.0.0][1.0.0-docker-main]
  - [1.0][1.0.0-docker-main]
  - [v1][1.0.0-docker-main]

- Bun Bundle Tags:
  - Alpine:
    - [bun-alpine-latest][docker-alpine]
    - [bun-alpine-1.0.0][1.0.0-docker-alpine]
    - [bun-alpine-1.0][1.0.0-docker-alpine]
    - [bun-alpine-v1][1.0.0-docker-alpine]
  - Debian:
    - [bun-debian-latest][docker-debian]
    - [bun-debian-1.0.0][1.0.0-docker-debian]
    - [bun-debian-1.0][1.0.0-docker-debian]
    - [bun-debian-v1][1.0.0-docker-debian]

## Contributing

This project uses [Bun](https://bun.sh). You'll either need to install it, or you can use the provided [`devcontainer.json`](.devcontainer/devcontainer.json).

> See the [Contributing Guidelines](/.github/CONTRIBUTING).

## License

This project is licensed under the [MIT License][license url].

<!-- Links -->

[checks status]: https://github.com/hudsonm62/prettier-cli/actions/workflows/ci.yml/badge.svg
[dependabot status]: https://img.shields.io/badge/dependabot-enabled-025e8c?logo=Dependabot
[license badge]: https://img.shields.io/github/license/hudsonm62/prettier-cli
[code style]: https://img.shields.io/badge/code%20style-prettier-F7B93E?logo=Prettier
[checks url]: https://github.com/hudsonm62/prettier-cli/actions?query=workflow%3ACI+branch%3Amaster
[dependabot url]: /.github/dependabot.yml
[code style url]: /.prettierrc
[license url]: /LICENSE

<!-- Dockerfile links -->

[docker-alpine]: ./docker/alpine.Dockerfile
[docker-debian]: ./docker/debian.Dockerfile
[docker-main]: ./docker/main.Dockerfile
[1.0.0-docker-main]: https://github.com/hudsonm62/prettier-cli/blob/v1.0.0/Dockerfile
[1.0.0-docker-alpine]: https://github.com/hudsonm62/prettier-cli/blob/v1.0.0/docker/alpine.Dockerfile
[1.0.0-docker-debian]: https://github.com/hudsonm62/prettier-cli/blob/v1.0.0/debian/debian.Dockerfile
