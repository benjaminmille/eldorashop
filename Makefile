# Variables
FRONT_DIR=frontend
BACK_DIR=backend
DOCKER_COMPOSE=docker-compose
PHP_CONTAINER=php
NODE_CONTAINER=node

# Commandes

up:
	$(DOCKER_COMPOSE) up -d --build

down:
	$(DOCKER_COMPOSE) down

install-back:
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) composer install

install-front:
	$(DOCKER_COMPOSE) exec $(NODE_CONTAINER) npm install

build-front:
	$(DOCKER_COMPOSE) exec $(NODE_CONTAINER) npm run build

init-db:
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) bin/console doctrine:database:create --if-not-exists
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) bin/console doctrine:migrations:migrate --no-interaction

fixtures:
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) bin/console doctrine:fixtures:load --no-interaction

index-elastic:
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) bin/console app:elasticsearch:init

reset:
	$(MAKE) down
	$(MAKE) up
	$(MAKE) install-back
	$(MAKE) install-front
	$(MAKE) build-front
	$(MAKE) init-db
	$(MAKE) fixtures
	$(MAKE) index-elastic

