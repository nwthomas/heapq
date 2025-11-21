.PHONY: install build clean test

build:
	bun run build

changeset:
	bun run changeset

clean:
	bun run clean

install i:
	bun install

test:
	bun run test

test-watch:
	bun run test:watch