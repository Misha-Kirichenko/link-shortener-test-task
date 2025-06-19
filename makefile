.PHONY: start clean clean-all

start:
	chmod +x generate-env.sh
	./generate-env.sh
	docker compose up --build

clean:
	docker compose down --remove-orphans

clean-all:
	docker container prune -f
	docker volume prune -f
	docker image prune -a -f
