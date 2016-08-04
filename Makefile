include n.Makefile

.PHONY: test

clean:
	git clean -fxd

install:
	obt install --verbose

test:
	mocha
