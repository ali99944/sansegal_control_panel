# 🧩 Frontend Feature Implementation Tracker

> A structured overview of all frontend features, including their pages, sub-functionalities, API implementations, and current development/test status.

---

## 🔐 Feature: Authentication

| Page / Item | Sub-Item | Description | Status | Error | Notes |
|-------------|----------|-------------|--------|-------|-------|
| Login Page  | UI Layout | Form layout, fields, buttons | ✅ Implemented | - | Fully responsive |
|             | Auth API | Call `/auth/login` | ✅ Implemented | - | Token handled |
|             | Error Handling | Display server & validation errors | 🚧 Under Work | Wrong 500 message | Needs better UX |
| Register Page | UI Layout | Form fields + checkbox | ✅ Implemented | - | - |
|               | Register API | Call `/auth/register` | ✅ Implemented | - | - |
|               | Password Strength | Validate client-side strength | ❌ Not Started | - | - |

---

## 🎵 Feature: Songs

| Page / Item     | Sub-Item         | Description                         | Status | Error         | Notes                    |
|------------------|------------------|-------------------------------------|--------|---------------|--------------------------|
| Songs Page       | UI Grid          | Display list of songs               | ✅ Implemented | -           | Responsive & paginated  |
|                  | Songs API        | Call `/songs` to fetch list         | ✅ Implemented | -           | Uses caching            |
| Songs Detail     | Song Info UI     | Display name, artist, duration      | ✅ Implemented | -           | -                        |
|                  | Like Button      | Like song logic + API `/like`       | 🚧 Under Work | 500 on retry | Retry not handled yet    |
|                  | Playback Preview | 30s preview playback                | ✅ Implemented | -           | Uses HTML5 audio         |
|                  | Comments Section | List + add comment                  | ❌ Not Started | -           | Backend not ready        |

---

## 📂 Feature: Playlist Management

| Page / Item       | Sub-Item            | Description                        | Status | Error       | Notes                |
|-------------------|---------------------|------------------------------------|--------|-------------|----------------------|
| Playlist Page     | Create Playlist     | Form + API `/playlists/create`     | ✅ Implemented | -         | -                    |
|                   | Delete Playlist     | Button + API `/playlists/delete`   | ✅ Implemented | -         | Confirm dialog added |
| Playlist Detail   | Add Song to Playlist| Dropdown + API `/playlist/add`     | 🚧 Under Work | UI flickers | Fix loading state     |
|                   | Remove Song         | Remove song logic                  | ❌ Not Started | -         | Waiting on design     |
|                   | Share Playlist      | Generate public link               | ❌ Not Started | -         | Planned v2 feature    |

---

## 📌 Legend

- ✅ Implemented
- 🚧 Under Work
- ❌ Not Started
- `Error`: Any known issue (message, bug, edge case)
- `Notes`: Additional dev notes, blockers, decisions

---

## 🧮 Summary

| Feature              | Items | ✅ | 🚧 | ❌ |
|----------------------|-------|----|-----|----|
| Authentication       | 6     | 4  | 1   | 1  |
| Songs                | 6     | 4  | 1   | 1  |
| Playlist Management  | 5     | 2  | 1   | 2  |

---

## 🚀 Next Actions

- [ ] Complete error handling for login
- [ ] Build `Comments Section` for song detail
- [ ] Finalize playlist sharing feature for v2

