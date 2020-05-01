.PHONY: start
start:
	@docker-compose -f docker-compose.yml stop;
	@docker-compose -f docker-compose.yml up --build -d;

.PHONY: stop
stop:
	@docker-compose -f docker-compose.yml stop;
