.PHONY: install build clean test

build:
	bun run build

changeset:
	bun run changeset

clean:
	bun run clean

format:
	bun run format

format-check:
	bun run format:check

install i:
	bun install

test:
	bun run test

test-watch:
	bun run test:watch