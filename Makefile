include n.Makefile

export IGNORE_A11Y = true

test: verify
	mocha
