REPORTER = list

test:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) --timeout 4000

coverage:
	jscoverage lib lib-cov
	LIB_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test

