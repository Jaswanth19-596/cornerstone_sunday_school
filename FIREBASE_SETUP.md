# Set up the shared website without a server

The website is static. Firebase stores the shared events, study notes, sign-ups, and private email directory. EmailJS sends the sign-up notification email. Both have free tiers suitable for a small church website.

## 1. Create a Firebase project

1. Open [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In **Project settings → Your apps**, add a **Web** app. Do not select hosting during this step.
3. Copy the web-app configuration values into a new local `.env` file, based on `.env.example`.
4. In **Build → Authentication → Sign-in method**, enable **Email/Password** and **Anonymous** sign-in.
5. In **Authentication → Users**, add the one admin account using the email address and password the church will use to manage the site.
6. In **Build → Firestore Database**, create the default **Standard** database in production mode. Choose a nearby location; `us-east4` is a sensible choice for Hammond, Indiana.

Set `VITE_ADMIN_EMAIL` in `.env` to the admin account email, using lowercase. The website signs in to Firebase with this email and password at `/admin`.

## 2. Protect and publish the database rules

Open `firestore.rules` and replace `REPLACE_WITH_ADMIN_EMAIL` with the same lowercase admin email. Do not leave the placeholder in place.

From this project folder, sign in and deploy the rules. Replace `YOUR_PROJECT_ID` with the Firebase project ID shown in Project settings.

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest deploy --only firestore:rules,firestore:indexes --project YOUR_PROJECT_ID
```

The rules let every website visitor receive an anonymous Firebase identity so they can read the public calendar, notes, and sign-up board. Only the designated Firebase admin can add, edit, or remove events, notes, and directory contacts. A visitor can modify only sign-ups created from their own browser.

## 3. Set up the notification email

1. Create a free [EmailJS](https://www.emailjs.com/) account.
2. Add an email service that can send from the church’s preferred address.
3. Create an email template. Set the template’s recipient field to the admin email **inside EmailJS**; do not make the recipient a form value from the website.
4. Use these template fields in the email subject/body:

   - `{{sunday_date}}`
   - `{{signup_change}}`
   - `{{signup_summary}}`

5. Copy the EmailJS Service ID, Template ID, and Public Key into `.env`.

Example body:

```
New Sunday School sign-up for {{sunday_date}}

Change:
{{signup_change}}

Current list:
{{signup_summary}}
```

The EmailJS values are public browser identifiers, so they may be included in a Vite `VITE_` variable. The EmailJS email-service password and any private email-provider credentials stay in EmailJS and must never be put in `.env`.

## 4. Load the starter events and notes

Run the website locally after saving `.env`:

```bash
npm run dev
```

Visit `/admin`, sign in with the Firebase admin account, then choose **Reset** once in both the Events and Resources tabs. This copies the website’s current starter content into Firebase, making it shared with every visitor. You can then edit it normally.

Add the first sign-up as a test and confirm that the EmailJS notification arrives. Delete the test item afterward if desired.

## 5. Publish the static website

### Netlify

The local `.env` file is ignored by Git, so Netlify does not receive it when building from GitHub. In the Netlify project's environment variables, add the `VITE_FIREBASE_*` values and `VITE_ADMIN_EMAIL` from your local `.env`. Make them available to production builds. Add the `VITE_EMAILJS_*` values if email notifications are configured.

Trigger a new production deploy after saving the variables: Vite embeds these values at build time, so changing settings alone does not update the published site. Keep `.env.example` empty and do not commit `.env`.

The repository's `netlify.toml` configures the build, the `dist` publish directory, and the fallback needed to open routes such as `/signups` directly.

It also sets `SECRETS_SCAN_OMIT_KEYS` for the six public Firebase web-app configuration variables and `VITE_ADMIN_EMAIL`. The admin email is a public login identifier in the current password-only login form, not a password or authorization credential. These identifiers are intentionally embedded in the browser bundle; access to data is controlled by Firebase Authentication and Firestore rules. Secret scanning remains enabled for other values and for the build output. Do not exclude the entire `dist` directory or add private server credentials to this list. Netlify documents scanning exceptions as environment variables, rather than a `[secrets_scanning]` TOML section.

### Firebase Hosting

Build and deploy it from this folder:

```bash
npm run build
npx -y firebase-tools@latest deploy --only hosting --project YOUR_PROJECT_ID
```

Firebase gives you an HTTPS address ending in `web.app`. For a custom domain, add it in **Hosting → Add custom domain** and follow Firebase’s DNS instructions. Then add that domain, without `https://`, to **Authentication → Settings → Authorized domains**.

Every time you change the website code, rebuild and deploy the two commands above. Day-to-day event, note, sign-up, and email-directory changes happen in the website and appear for everyone immediately; they do not need a new deployment.

## Keep the site affordable

Use Firebase’s free Spark plan and keep this site on the standard shared-data features above. The database’s free tier includes 50,000 reads and 20,000 writes per day, which is far beyond ordinary traffic for this use. Do not enable paid Cloud Functions for this setup. You only need a paid plan if your usage grows past Firebase or EmailJS’s free limits.
