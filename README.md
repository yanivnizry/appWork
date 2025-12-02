# React Native Analog Clock App

A React Native app that displays an analog clock with timezone support.


## Setup

1. Install dependencies:
```bash
yarn install
```

2. Configure API key:
   - Get a free API key from [TimeZoneDB](https://timezonedb.com/api)
   - Copy `.env.example` to `.env` and add your API key:
   ```
   EXPO_PUBLIC_TIMEZONEDB_API_KEY=your_api_key_here
   ```

3. Run the app:
```bash
yarn start
```

Press `i` for iOS or `a` for Android.

## Tech Stack

- React Native with Expo
- React Native Skia for clock rendering
- Expo SQLite for timezone caching
- MMKV for fast storage
- Axios for API calls
