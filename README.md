# Gigz
Connect artists with venues to organize the best gigs !

## Overview
This repository is a mono-repository hosting the front-end and back-end project. The goal of this mono-repository is to more easily collaborate and work and all the areas of the project.

## Project installation 📥

#### Requirements
- nodejs ([nodenv](https://github.com/nodenv/nodenv) installation recommended)
- [make](https://www.tutorialspoint.com/unix_commands/make.htm)
- [just](https://github.com/casey/just)

#### Commit linter, code linter and formatter installation

Once the repository is cloned, run the command:
```bash
npm run setup
```

Once the setup is finished, you should be able to run the commands:
```bash
npm run lint
```
```bash
npm run format
```

To locally launch ESLinter or Prettier on both projects when needed.

#### Setup Ionic (front) project

1. Go to `/front` directory
2. Run command `npm install` or `yarn install`

#### Setup Express (back) project

1. Go to `/back` directory
2. Run command `npm install` or `yarn install`
3. Create a `.env` with the following variables :
    - `DATABASE_URL`
4. Run the following commands:
    - `just up -d`
    - `just migrate`
    - `just populate`

## Test the app on your phone or emulator 📱

#### Ionic app export

First, make sure your are in the `/front` directory of the project.

##### Android 

1. Plug your android phone or launch your emulator
2. Setup phone & Install adb: [Guide here](https://www.xda-developers.com/install-adb-windows-macos-linux/)
3. Build the app
    1. Run command `npm run build` or `npx ionic build`
    2. Run command `npx ionic cap add android`
4. Transfer the built app on your phone or emulator
    - `npx ionic cap run android`
5. Accept the installation on your phone or emulator
6. Launch your super app 🤩

## How to contribute 🤝

#### Committing your code

When you want to commit your changes with the command:
```bash
git commit -m "<your_conventional_message>"
```

Those hooks will be triggered over the staged files:
1. ESLinter will perform the linting and the commit will fail if it returns an error.
2. Prettier will automatically format the code inside the files.

The commit linter follows the [conventionnal commit convention](https://www.conventionalcommits.org/en/v1.0.0/).

#### Pull requests

After developing your feature, you will have to push your branch and create a pull request. For the pull request to be accepted and merged to the master branch, those conditions should be fulfilled:

- All the workflows should succeed
    - Dependencies vulnerabilities checker
    - Code vulnerabilities checker
- At least one reviewer should approve the pull request
