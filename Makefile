install:
	npm ci
	
test:
	npm test

lint:
	npx eslint .

start: serve
 @make -s  client

serve: 
	start-server -s ./frontend/build

client:
	cd frontend; react-scripts start
