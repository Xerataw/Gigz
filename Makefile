# Text customizations
COLOR_RESET=\033[0m
BBLUE=\033[1;34m

# Enhanced commands
ECHO=@ echo "${BBLUE} -->"

# PATHS
GIGZ_FRONT_PATH=./GIGZ-FRONT/

setup:
	${ECHO} Install commit linter, code linter and formatter dependencies
	@ npm i
	${ECHO} Commit linter, code linter and formatter dependencies installed
	${ECHO} Set up commit linter "$(COLOR_RESET)"
	@ npx husky install
	@ npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
	${ECHO} Commit linter set up "$(COLOR_RESET)"
	${ECHO} Set up code linter and formatter "$(COLOR_RESET)"
	@ npx husky add .husky/pre-commit  'npx lint-staged'
	${ECHO} Code linter and formatter set up

lint:
	${ECHO} Launch linter on gigz-front "$(COLOR_RESET)"
	@- npx eslint $(GIGZ_FRONT_PATH)
	${ECHO} gigz-front project linted

format:
	${ECHO} Launch Prettier formatting "$(COLOR_RESET)"
	@ npx prettier --write .
	${ECHO} Code fromatted
