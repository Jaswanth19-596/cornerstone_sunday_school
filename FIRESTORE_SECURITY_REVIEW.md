# Firestore security review

## Data model and access pattern

| Path | Who reads | Who writes |
| --- | --- | --- |
| `events/{eventId}` | Any visitor with anonymous Firebase authentication | The single configured admin email |
| `resources/{resourceId}` | Any visitor with anonymous Firebase authentication | The single configured admin email |
| `contacts/{contactId}` | The configured admin only | The configured admin only |
| `eventParticipants/{eventId}/items/{participantId}` | The configured admin only | The configured admin only |
| `weeklySignups/{week}/items/{itemId}` | Any visitor with anonymous Firebase authentication | The anonymous/Firebase user who created that item |

The application only uses unfiltered collection listeners, so no composite Firestore indexes are required.

## Rule checks performed

| Attack considered | Result in the prototype rules |
| --- | --- |
| Unauthenticated database read | Denied. The website first creates an anonymous Firebase session. |
| Visitor editing an event, resource, or contact | Denied unless the Firebase token email equals the configured admin email. |
| Visitor changing another person’s sign-up | Denied because the stored owner UID must match the requesting UID. |
| Visitor changing a sign-up owner UID | Denied by the update rule. |
| Invalid/missing fields or unexpected fields | Denied by the per-document validators for events, resources, contacts, and sign-ups. |
| Oversized text or lists | Denied by text-size and participant-list limits. |
| Creating a custom sign-up with a forged owner UID | Denied because the submitted owner UID must equal the current Firebase UID. |
| Directly reading the private email directory | Denied unless the requesting user is the configured admin. |
| Directly reading event invitees’ email addresses | Denied unless the requesting user is the configured admin. |

## Remaining limits

This is a prototype. Firebase anonymous identities are intentionally used so visitors can read public website content and manage their own sign-up from the same browser. Clearing site data or changing devices loses that identity and the ability to edit that sign-up.

EmailJS is called from the browser by design. Its public key is expected to be visible, so configure the template recipient as a fixed admin email and enable EmailJS’s available abuse protection/rate limiting in its dashboard. A serverless email provider cannot provide the same delivery audit trail or authoritative abuse prevention as a private server-side email key.
