.PHONY: test

install:
	obt install --verbose

test:
	mocha
