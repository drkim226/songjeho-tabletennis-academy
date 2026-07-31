# Song Jeho Table Tennis Academy

Last Updated:
2026-07-31

--------------------------------------------------
Current Stack
--------------------------------------------------

- Next.js App Router
- TypeScript
- TailwindCSS
- Supabase Auth
- Supabase Database
- Supabase Storage
- TipTap Editor
- GitHub
- Vercel
- Custom Domain (GoDaddy)

Production Site

https://songjehotta.com

--------------------------------------------------
Current Development Policy
--------------------------------------------------

IMPORTANT

From now on ALL development is performed on the LIVE production website.

Development workflow:

VS Code
↓
Git Commit
↓
Git Push
↓
Vercel Auto Deploy
↓
Verify on

https://songjehotta.com

Every new feature should be verified directly on the production domain.

--------------------------------------------------
Completed
--------------------------------------------------

### Domain

Completed

- Purchased domain
- Connected GoDaddy → Vercel
- Production domain working

Current Production

https://songjehotta.com

--------------------------------------------------
Authentication
--------------------------------------------------

Completed

- Supabase Auth
- Login
- Logout
- Session handling
- Admin Login

Current Login URL

/admin

--------------------------------------------------
Member System
--------------------------------------------------

Completed

- Register
- Profile
- Edit Profile
- Avatar Upload
- Apply for Role

Current Roles

- Admin
- Site Manager
- Coach
- Sponsor
- Association Representative

Approval system completed.

--------------------------------------------------
Workspace
--------------------------------------------------

Completed

New page

/workspace

Purpose

Single management portal for all administrators.

Current menu

- News
- Partners
- Coaches
- Gallery
- Messages
- Rating
- Members

Current implementation

app/workspace/page.tsx

Current status

Workspace page is deployed and accessible.

--------------------------------------------------
Admin Pages
--------------------------------------------------

Currently available

/admin
/admin/news
/admin/gallery
/admin/messages
/admin/rating

Not yet implemented

/admin/coaches
/admin/sponsors

Current issue

Workspace currently links to

/admin/coaches

and

/admin/sponsors

but these pages do not yet exist.

Result

404

This is expected.

--------------------------------------------------
Public Pages
--------------------------------------------------

Completed

/
About
Gallery
Coaches
News
Sponsors
Contact

Coach pages currently use

app/coaches

NOT

/admin/coaches

--------------------------------------------------
Coach System
--------------------------------------------------

Current

Coach pages load dynamically from Supabase.

Coach detail pages working.

Fallback image supported.

--------------------------------------------------
Gallery
--------------------------------------------------

Completed

Latest gallery image automatically becomes Hero background.

Fallback gradient supported.

--------------------------------------------------
Supabase
--------------------------------------------------

Using

- Auth
- Database
- Storage

Current Auth status

Working

Current Site URL

https://songjehotta.com

Redirect URLs configured.

--------------------------------------------------
Git / Deployment
--------------------------------------------------

Today completed

Installed

Homebrew

Installed

GitHub CLI

Git authentication repaired.

Git Push working again.

Deployment

Git Push

↓

Vercel

↓

Production

--------------------------------------------------
Known Issues
--------------------------------------------------

1.

Workspace links

/admin/coaches

404

Needs implementation.

2.

Workspace links

/admin/sponsors

404

Needs implementation.

--------------------------------------------------
Next Development Priority
--------------------------------------------------

NEXT SESSION START HERE

Highest Priority

Convert Coach Management into full database management.

Goal

Current coach pages become fully managed from Supabase.

Need

Create

/admin/coaches

Functions

- Coach list
- Create coach
- Edit coach
- Delete coach
- Upload coach photo
- Sort display order
- Active / Hidden
- Rich text biography
- Save directly into Supabase

Public page

/coaches

should automatically read data from database.

--------------------------------------------------
Future Tasks
--------------------------------------------------

1.

Coach Management (DB)

2.

Sponsor Management

3.

Workspace role-based permissions

4.

Member Management

5.

News Management improvements

6.

Gallery improvements

7.

Session timeout

24 hour inactivity auto logout

--------------------------------------------------
Important Notes
--------------------------------------------------

Always verify new features on

https://songjehotta.com

Do NOT rely only on localhost.

Current production domain is now the primary development target.
