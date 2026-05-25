# Song Jeho Table Tennis Academy

## Stack
- Next.js App Router
- Supabase Auth
- Supabase Storage
- TailwindCSS
- TipTap WYSIWYG Editor

---

## Completed Features

### Auth / Access
- Supabase login/logout
- `/admin` works as main login page
- `/members/login` removed
- Member role application page (`/members/register`)
- User dashboard (`/members/profile`)
- Edit profile
- Avatar upload
- Hidden Admin Login from public menu
- Hidden Apply Access from public menu

### Roles / Permissions
Current roles:
- Admin
- Site Manager
- Sponsor
- Coach
- Association Representative

Rules:
- Admin assigned directly by database/admin
- Site Manager requires Admin approval
- Sponsor requires Admin approval
- Coach requires Admin approval
- Association Representative requires Admin approval
- Role approval system completed

---

### Admin
- Admin dashboard
- Account role management
- Member approval system
- Role editing system
- Admin access validation
- Rating management page
- Contact message management page
- News management page

Admin Pages:
```text
/admin
/admin/rating
/admin/messages
/admin/gallery
/admin/news