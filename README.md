# Starter Monorepo with Nx and React Native + React Library

## Usage

1. Install dependencies: run `yarn` in the root.
2. Ensure `nx` (NxTools for Monorepos) is installed globally: `yarn global add nx`.
3. Install dependencies for ios/android React Native projects, see React Native documentation for details on this:
    - for iOS run `pod install` in `/apps/<react-native-project>/ios/`
4. To run for dev, run from the root: `nx <react-native-project>:ios-start`.

## Projects

- `apps/countdowner`: this is a `react-native` project
- `libs/store`: this is a `mobx-state-tree` library for a `react-native` or `react` project

Thank you, thank you @nrwl team for the `@nrwl/react-native` package - very happy it's here!
