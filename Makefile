# Text customizations
BBLUE=\033[1;34m

# Enhances commands
ECHO=@echo "${BBLUE} -->"

commitlint-setup:
	${ECHO} Commit linter setup
	@ npm i
	@ npx husky install
	@ npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
	${ECHO} Commit linter has been set up
