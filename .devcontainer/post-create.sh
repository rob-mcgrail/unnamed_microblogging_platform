docker_build() {
  docker compose build
  docker compose run --rm --no-deps web echo "Dependencies installed!"
}

docker_build