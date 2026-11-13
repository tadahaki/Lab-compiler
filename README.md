# Lab Compiler

A multi-screen React Native (Expo) app that serves as the final UI requirement and the master compilation app for all laboratory activities. It demonstrates declarative, reusable components, local state with hooks, responsive Flexbox layouts, and global state with React Context (Dark/Light theme and profile name).

## Run the app

```bash
npm install
npx expo install expo-asset expo-constants expo-font expo-keep-awake
npx expo install react-dom react-native-web @expo/metro-runtime
```

Then start it:

```bash
npx expo start --web     # Chrome (http://localhost:8081)
npx expo start           # Phone via Expo Go, or press a / i for emulators
npx expo start --web --clear   # If you see a stale cache or blank page
```

Requires Node.js 18 or newer.

## Project structure

```
lab-compendium/
├── App.js
├── app.json
├── babel.config.js
├── package.json
├── README.md
└── src/
    ├── context/
    │   └── AppContext.js
    ├── theme/
    │   └── colors.js
    ├── data/
    │   └── labs.js
    ├── navigation/
    │   └── RootNavigator.js
    ├── components/
    │   ├── ScreenContainer.js
    │   ├── Card.js
    │   ├── AppButton.js
    │   └── LabTile.js
    └── screens/
        ├── HomeScreen.js
        ├── CounterScreen.js
        └── SettingsScreen.js
```

## What each file does

### Root files

| File | Purpose |
|------|---------|
| `App.js` | App entry point. Wraps everything in `AppProvider` (global state) and renders `RootNavigator`. |
| `app.json` | Expo configuration: app name, slug, version, orientation, and automatic light/dark system style. |
| `babel.config.js` | Babel setup using `babel-preset-expo` so Expo can compile the JSX. |
| `package.json` | Dependencies (Expo, React Native, React Navigation) and the `start`, `android`, `ios`, `web` scripts. |
| `README.md` | This file. |

### `src/context/`

| File | Purpose |
|------|---------|
| `AppContext.js` | **Global state.** Holds the theme `mode` (light or dark) and the profile `name`, and exposes `toggleTheme` and `setName`. Components read it through the `useApp()` hook. Changing a value re-renders every screen that uses it, so Home updates instantly. |

### `src/theme/`

| File | Purpose |
|------|---------|
| `colors.js` | Defines the light and dark color palettes (background, surface, text, muted, border, accent). `AppContext` picks one based on the current mode. |

### `src/data/`

| File | Purpose |
|------|---------|
| `labs.js` | The list of labs (id, title, subtitle, target screen). The Home Dashboard builds its tiles from this array. A lab with `screen: null` shows as "Coming soon" and is disabled. |

### `src/navigation/`

| File | Purpose |
|------|---------|
| `RootNavigator.js` | Multi-screen navigation using a native stack: Home, Counter (Lab 1), and Settings. It also syncs the navigation header and status bar with the current theme. |

### `src/components/` (reusable UI)

| File | Purpose |
|------|---------|
| `ScreenContainer.js` | Standard screen wrapper. A `ScrollView` with padding and a themed background, so content never overflows on small screens. |
| `Card.js` | Rounded, bordered, themed container for grouping content. |
| `AppButton.js` | Custom button with `solid` and `outline` variants, themed and with press feedback. |
| `LabTile.js` | Dashboard menu tile. Uses `flexGrow` and `flexBasis: '45%'` so tiles form a responsive grid. |

### `src/screens/`

| File | Purpose |
|------|---------|
| `HomeScreen.js` | **Home Dashboard.** Shows a greeting with the profile name and current theme, a wrapping grid of lab tiles, and a button to Settings. |
| `CounterScreen.js` | **Lab 1 demo.** Shows local, screen-specific state: `useState` for the count and `useEffect` to update the header title whenever the count changes. |
| `SettingsScreen.js` | **Settings.** A `Switch` toggles Dark/Light theme and a `TextInput` edits the profile name. Both write to global state. |

## Concepts demonstrated

- **Declarative UI and reusable components:** `Card`, `AppButton`, `LabTile`, `ScreenContainer`.
- **Hooks:** `useState` and `useEffect` (`CounterScreen`), `useContext`, `useMemo` (`AppContext`).
- **Responsive Flexbox:** `flex`, `flexDirection`, `flexWrap`, `justifyContent`, `alignItems`, `flexBasis`, `flexGrow`, plus `ScrollView` and `View` containers.
- **Global state:** React Context API. Toggling the theme or editing the name in Settings immediately updates the Home Dashboard.

## Adding a new lab

1. Create `src/screens/YourLabScreen.js`.
2. Register it in `src/navigation/RootNavigator.js`:
   ```jsx
   <Stack.Screen name="YourLab" component={YourLabScreen} options={{ title: 'Lab 2' }} />
   ```
3. Add or edit its entry in `src/data/labs.js`:
   ```js
   { id: 'lab2', title: 'Lab 2', subtitle: 'Your topic', screen: 'YourLab' }
   ```

The new tile appears on the Home Dashboard automatically.
