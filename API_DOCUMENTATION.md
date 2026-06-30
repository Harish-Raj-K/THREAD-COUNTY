# ThreadCounty — API Documentation

This document describes the backend API surface required by the spec. The
current build ships as a frontend-only demo (Next.js + mock data, with an
optional Supabase Auth integration). The endpoints below are the contract a
Python backend (FastAPI/Flask recommended) should implement to make the app
fully production-ready, matching the routes already wired into the UI.

All endpoints are prefixed with `/api`. All authenticated endpoints expect a
`Authorization: Bearer <supabase_jwt>` header, validated via Supabase Auth
middleware.

## Authentication API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create a new user (delegates to Supabase Auth `signUp`). Triggers email verification. |
| POST | `/api/auth/login` | Authenticate a user and return a session/JWT. |
| POST | `/api/auth/logout` | Invalidate the current session. |
| POST | `/api/auth/forgot-password` | Send a password reset email. |
| POST | `/api/auth/reset-password` | Set a new password using a reset token. |
| GET | `/api/auth/me` | Return the currently authenticated user's profile. |

## User API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get the current user's profile (name, email, plan, avatar). |
| PUT | `/api/users/profile` | Update profile fields (name, avatar). |
| PUT | `/api/users/password` | Change password (requires current password). |
| DELETE | `/api/users/account` | Soft-delete the account (14-day grace period before purge). |

## Upload API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/uploads` | Upload a fabric image (multipart/form-data). Validates type (JPG/PNG/JPEG) and size (≤10MB), stores the file in Supabase Storage, creates an `uploads` row. |
| GET | `/api/uploads` | List the current user's uploads (paginated). |
| DELETE | `/api/uploads/{upload_id}` | Delete an uploaded image and its storage object. |

## Report API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reports/analyze` | Trigger AI analysis for a given `upload_id`. Returns a `report_id` once processing completes (sync or async with polling). |
| GET | `/api/reports/{report_id}` | Get a single analysis report (thread density, warp/weft counts, fabric type, confidence score, AI suggestions). |
| GET | `/api/reports` | List/search/filter the current user's reports (`?q=`, `?fabric_type=`). |
| DELETE | `/api/reports/{report_id}` | Delete a report. |
| GET | `/api/reports/{report_id}/download` | Download the report as a PDF. |

## Dashboard API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/summary` | Returns total uploads, recent reports, storage usage, and current plan for the dashboard cards. |
| GET | `/api/dashboard/activity` | Returns the user's recent activity timeline. |

## Admin API
*(requires an admin role check in middleware)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | List all users with plan, upload count, and status. |
| PATCH | `/api/admin/users/{user_id}/status` | Suspend or reactivate a user. |
| GET | `/api/admin/uploads` | List all uploaded images across the platform. |
| DELETE | `/api/admin/reports/{report_id}` | Delete any user's report. |
| GET | `/api/admin/analytics` | Platform-wide statistics (total users, uploads, plan distribution). |
| PUT | `/api/admin/plans/{plan_id}` | Update pricing plan details. |

## Contact API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit the public contact form (name, email, subject, message). Inserts into `contact_messages` and optionally sends an email notification to the team. |

## Error Handling Conventions

All endpoints return errors in a consistent shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "File size exceeds the 10MB limit.",
    "field": "file"
  }
}
```

Standard HTTP status codes are used: `400` validation errors, `401`
unauthenticated, `403` unauthorized (e.g. non-admin hitting an admin route),
`404` not found, `429` rate limited, `500` server error.

## Middleware

- **Authentication middleware**: verifies the Supabase JWT on every protected
  route and attaches the user object to the request context.
- **Authorization middleware**: checks role/plan claims for admin-only and
  plan-gated routes (e.g. blocking uploads once a Free-plan user hits their
  monthly limit).
- **Input validation**: request bodies validated against schemas (e.g.
  Pydantic models in FastAPI) before touching the database.
- **Logging**: structured request logging (method, route, user id, status
  code, latency) for observability; errors logged with stack traces.
