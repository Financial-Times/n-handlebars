include n.Makefile

export IGNORE_ALLY = true

test: verify
	mocha
