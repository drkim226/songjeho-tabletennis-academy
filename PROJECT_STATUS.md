# Song Jeho Table Tennis Academy

## Stack
- Next.js App Router
- Supabase Auth
- Supabase Storage
- TailwindCSS

---

## Completed Features

### Auth
- Member registration
- Login/logout
- Profile page
- Edit profile
- Avatar upload

### Admin
- Admin dashboard
- Member approval system
- Skill verification system

### Gallery
- gallery_images table
- gallery_albums table
- Multi-image upload
- Storage bucket: gallery-images

---

## DB Tables

### members
- id
- created_at
- auth_user_id
- full_name
- email
- phone
- membership_type
- role_approved
- skill_level
- skill_level_verified
- avatar_url

### admin_users
- id
- auth_user_id
- email
- created_at

### gallery_albums
- id
- created_at
- title
- slug
- category
- description
- cover_image
- sort_order
- active

### gallery_images
- id
- created_at
- category
- title
- src
- description
- sort_order
- active
- album_id
- uploaded_by
- approved
- visibility

---

## Current Work

Working on:
- Tournament gallery album system
- Member-upload gallery system

---

## Important Paths

app/admin/gallery/page.tsx
app/gallery/history/page.tsx
app/members/profile/page.tsx