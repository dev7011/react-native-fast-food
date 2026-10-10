https://www.nativewind.dev/docs/getting-started/installation

♦️Installation with Expo
  npx rn-new --nativewind
  
  npm install nativewind@4.2.7 react-native-reanimated react-native-safe-area-context
  npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

♦️Setup Tailwind CSS
  npm uninstall tailwindcss
  npm install nativewind@4
  npm install -D tailwindcss@^3.4.17
  npx tailwindcss init 
  
  oder touch tailwind.config.js
  📕 ACHTEN content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],  => content: ["./src/**/*.{js,jsx,ts,tsx}"],

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
    extend: {},
    },
    plugins: [],
    }

♦️ Create metro.config.js  
    📕  { input: './global.css' } anpassen
  
    const { getDefaultConfig } = require("expo/metro-config");
    const { withNativeWind } = require('nativewind/metro');
    
    const config = getDefaultConfig(__dirname)
    
    module.exports = withNativeWind(config, { input: './global.css' })

touch nativewind-env.d.ts
touch metro.config.js

♦️ touch babel.config.js


♦️ ACTUNG Path global.css unter folgenden file anpassen: 
    metro.config.js
    layout
