.PHONY: start start-all start-test-run clean clean-all

start:
	chmod +x generate-env.sh
	./generate-env.sh
	docker compose up --build

clean:
	docker compose down --remove-orphans

start:
	chmod +x generate-env.sh
	./generate-env.sh
	docker compose up --build link-shortener-db link-shortener-backend nginx

start-test-run:
	chmod +x generate-env.sh
	./generate-env.sh
	docker compose up --build link-shortener-db --abort-on-container-exit --exit-code-from link-shortener-backend-tests link-shortener-backend-tests
	@if [ $$? -eq 0 ]; then \
		echo "Tests passed, removing test container..."; \
		docker compose rm -sf link-shortener-backend-tests; \
		echo "Starting backend and nginx..."; \
		docker compose up --build link-shortener-backend nginx; \
	else \
		echo "Tests failed, shutting down all containers..."; \
		docker compose down; \
		exit 1; \
	fi
