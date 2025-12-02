# Design Document - React Native Analog Clock App

## Overview

A React Native app displaying a real-time analog clock with 400+ timezone support. Built with Expo SDK 54, featuring offline-first architecture and GPU-accelerated rendering.

---

## Architecture Decisions

### 1. Layered Architecture
```
UI (Components) → Business Logic (Hooks) → Services → Data (API/SQLite/MMKV)
```
**Why**: Clear separation of concerns, easier testing and maintenance.

### 2. React Native Skia for Clock Rendering
**Decision**: Use Skia instead of React Native Views or SVG.

**Rationale**:
- GPU-accelerated (60 FPS guaranteed)
- Perfect precision for circles and angled lines
- Handles real-time updates smoothly

**Trade-off**: Adds ~15MB to bundle, but essential for smooth clock animation.

### 3. New Architecture Enabled
**Decision**: Enable Fabric + TurboModules.

**Rationale**:
- Future-proof (required for RN 0.74+)
- Better performance
- Required by modern libraries (MMKV, Skia)

**Trade-off**: More complex setup, but necessary long-term.

### 4. Modular Component Structure
**Decision**: Split components into small, focused files.

**Pattern**:
```
components/TimezoneSelector/
├── index.tsx        # Main component
├── Item.tsx         # List item
├── LoadingState.tsx # Loading UI
├── ErrorState.tsx   # Error UI
├── EmptyState.tsx   # Empty UI
├── styles.ts        # Styles (separated)
└── types.ts         # Types (separated)
```

**Rationale**: Better reusability, easier testing, cleaner code (<150 lines per file).

---

## Offline Caching Approach

### Cache-First Strategy

```typescript
async function loadTimezones() {
  // 1. Try cache first (SQLite)
  let timezones = await loadFromDatabase();
  
  // 2. If empty, fetch from API
  if (!timezones.length) {
    timezones = await fetchFromAPI();
    await saveToDatabase(timezones);
  }
  
  return timezones;
}
```

### Implementation

**SQLite for Timezone Cache**:
- Stores 425 timezones (~25KB)
- Load time: ~10-20ms
- Bulk insert: ~50-100ms (20-50x faster than individual inserts)
- No expiration (timezone data is static)

**MMKV for User Preferences**:
- Stores last selected timezone (~1KB)
- Access time: <1ms (100x faster than AsyncStorage)
- Synchronous API (better UX)

### Performance Impact

| Scenario | Time | Notes |
|----------|------|-------|
| First launch | ~3-5s | Network fetch + save |
| Subsequent launches | <100ms | From cache |
| Offline (after first launch) | <100ms | Fully functional |

### Cache Invalidation

**Current**: Manual only (clear app data)

**Rationale**: Timezone data rarely changes, automatic refresh unnecessary.

**Future**: Could add pull-to-refresh or TTL-based invalidation.

---

## Assumptions & Trade-offs

### Assumptions

1. **Timezone data is static** - No frequent updates needed
2. **Single user per device** - No multi-user support required
3. **Internet on first launch** - Acceptable requirement for offline-first approach
4. **API key in app** - Acceptable for free tier public data

### Key Trade-offs

#### Bundle Size vs Performance
- **Decision**: Include Skia (~15MB) and native modules
- **Result**: 123MB Android APK, 30MB iOS app
- **Verdict**: Performance worth the size

#### SQLite vs AsyncStorage
- **Decision**: SQLite for 400+ timezones
- **Result**: 10-20ms queries vs 100-200ms with AsyncStorage
- **Verdict**: Necessary for performance

#### Direct API vs Backend
- **Decision**: Direct API calls from app
- **Result**: Simpler architecture, but API key exposed
- **Verdict**: Acceptable for MVP, consider backend for production

#### New Architecture
- **Decision**: Enable New Architecture
- **Result**: More complex setup, but future-proof
- **Verdict**: Required for modern libraries

### Known Limitations

1. First launch requires internet connection
2. API key exposed in app bundle (mitigated by caching)
3. No automatic cache refresh (manual only)
4. Large app size due to native modules

---

## Technical Stack

**Core**: React Native 0.81.5, Expo SDK 54, TypeScript 5.9.2, Hermes

**Key Libraries**:
- React Native Skia 2.4.6 (GPU rendering)
- Expo SQLite 16.0.9 (caching)
- MMKV 4.0.1 (preferences)
- Axios 1.13.2 (HTTP)

---

## Project Structure

```
app/              # Screens (Expo Router)
screens/          # Screen implementations + hooks
components/       # Reusable UI (modular, <150 lines each)
services/         # Business logic
  ├── apis/       # TimeZoneDB integration
  ├── database/   # SQLite operations (bulk insert)
  ├── storage/    # MMKV operations
  └── config/     # Environment variables
```

---

*Version 1.0 | December 2, 2025 | Yaniv Nizry*
