.PHONY: install build clean test

install i:
	bun install

build:
	bun run build

clean:
	bun run clean

test:
	bun run test

test-watch:
	bun run test:watch