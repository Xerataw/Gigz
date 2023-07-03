# Gigz front project

Ionic + React app

## Setup Ionic (front) project

See installation steps on the [frontend README](https://github.com/Xerataw/Gigz/blob/main/front/README.md)

1. Go to `/front` directory
2. Run command `npm install` or `yarn install`

## Test the app on your phone or emulator 📱

### Ionic app export

First, make sure your are in the `/front` directory of the project.

#### Android

1. Plug your android phone or launch your emulator
2. Setup phone & Install adb: [Guide here](https://www.xda-developers.com/install-adb-windows-macos-linux/)
3. Build the app
   1. Run command `npm run build` or `npx ionic build`
   2. Run command `npx ionic cap add android`
   3. Create a `local.properties` and add your Android Sdk path
      a. Windows: `sdk.dir=sdk.dir=C:\\Users\\{YourUsername}\\AppData\\Local\\Android\\Sdk`
4. Transfer the built app on your phone or emulator
   - `npx ionic cap run android`
5. Accept the installation on your phone or emulator
6. Launch your super app 🤩
