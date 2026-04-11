# Request Interest Feature — Strategic Analysis
## Signal Crew · Internal Product Document

---

## 1. Executive summary

The Request Interest feature allows companies to post a high-level project need and let
qualified, verified crews express interest — without any pricing, bidding, or race-to-the-bottom
dynamics. The company then reviews interested crews using their Signal Crew profiles,
qualifications, and peer reviews before deciding who to engage further.

**Recommendation: Include in Phase 1, not Phase 2.**

Reason: this feature directly increases platform retention and gives companies a reason to
return to Signal Crew regularly, not just when they remember to search. It also creates a
pull mechanism that brings new subs onto the platform without paid acquisition.

---

## 2. What this is — and what it is not

### What it IS
- A way for companies to signal a project need to relevant, verified crews in their area
- A structured way for crews to raise their hand and say they are interested and available
- A profile-first discovery tool — companies review full Signal Crew profiles before deciding
- A demand signal that keeps GCs coming back to the platform between active searches

### What it is NOT
- Not a bidding platform
- Not a reverse auction
- Not a pricing tool
- Not an RFP system
- Not a public job board
- Not accessible to unverified users

This distinction is critical. The moment pricing enters the loop, the platform becomes a
race-to-the-bottom marketplace. This feature deliberately stops before that point.

---

## 3. Recommended Phase placement

### Phase 1 — Include it now

Arguments for Phase 1:
- Simple to build (post form + interest form + list view)
- Creates a second reason to open the app beyond searching profiles
- Drives sub-to-platform acquisition: a GC requiring subs to be on Signal Crew brings them in
- Differentiates Signal Crew from a static directory on day one
- Gives the platform "live content" — open needs feel like activity, even with few users
- Early feedback on this feature shapes Phase 2 enhancements cheaply

Arguments against (and rebuttals):
- "Needs a network to work" → Yes, but even 20 crews and 5 GCs can generate real signal
- "Could become a job board" → Controlled by product rules: no pricing field, no bids, no open responses

### Phase 2 enhancements
- Crew-to-need matching score (based on trade, location, certifications)
- Notification when a relevant need is posted near you
- Need analytics for GCs (how many crews viewed, how many expressed interest)
- Saved search + alert for recurring need types

---

## 4. Does this justify additional pricing?

Yes — this is a meaningful upsell lever.

### Option A: Feature included in Pro ($49/month)
- Keeps the Pro plan compelling
- Makes it easier to sell: "You can search for crews AND post project needs"
- Recommended for launch

### Option B: Add a "Teams" tier at $89–99/month
- Post unlimited project needs
- See full interest detail (who expressed interest + their profile snapshot)
- Priority placement in crew search results for your project needs
- Analytics on your posts
- Multi-user access

At scale, this is the right path. A single GC posting 5 project needs per year and finding
2 good crews from each is worth thousands of dollars in time savings — $89/month is noise.

### Recommendation
Launch with the feature included in Pro ($49). Once you have 50+ Pro users, introduce a
Teams tier at $89–99 with enhanced need analytics and multi-user posting. The Teams tier
is your first true upsell with real value justification.

---

## 5. Data model for the feature

### project_needs table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| posted_by_company_id | uuid | FK to companies |
| trade | text | From standard trade list |
| location_city | text | |
| location_state | text | |
| scope | text | 1000 char max, no pricing language |
| timeline | text | e.g. "May 2026" |
| value_range | text | Rough range only — not a price |
| req_licensed | boolean | |
| req_insured | boolean | |
| req_bonded | boolean | |
| req_sam_gov | boolean | |
| req_military | boolean | |
| status | enum | open / filled / expired / cancelled |
| expires_at | timestamptz | Auto-expire after 60 days |
| created_at | timestamptz | |

### project_interest table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| need_id | uuid | FK to project_needs |
| company_id | uuid | The crew expressing interest |
| available | text | yes / possibly / no |
| qualified | text | yes / partially / no |
| note | text | 200 char max, moderated |
| status | enum | pending / reviewed / contacted / declined |
| created_at | timestamptz | |

---

## 6. UX flow

### GC posts a need (5 fields, 2 minutes)
1. Click "Post a project need" from dashboard or nav
2. Select trade, location (city + state)
3. Write scope description — plain language, no pricing
4. Select timeline + rough value range
5. Check any required credentials (licensed, insured, bonded, SAM.gov, military)
6. Post — immediately visible to verified crews in that trade + state

### Crew expresses interest (30 seconds)
1. See relevant needs in "Project needs" tab (filtered to their trade + state by default)
2. Click a need to see full detail and the posting company
3. Answer: Available for this timeline? (yes / possibly / no)
4. Answer: Do you meet the requirements? (yes / partially / no)
5. Optional 200-char note
6. Submit — the GC sees their full Signal Crew profile automatically

### GC reviews interested crews
1. Go to their posted need
2. See list of crews who expressed interest — each with their ClearScore, trade badges, credentials
3. Click any crew to see full Signal Crew profile with reviews and history
4. Decide who to engage — send a connection request inside Signal Crew, or reach out outside
5. Mark need as "filled" when done

---

## 7. Anti-spam and quality controls

### Problem: low-quality or spray-and-pray responses
Any open "express interest" system risks crews spamming every listing regardless of fit.

### Solutions

**1. Verified-only participation**
Only verified, approved companies can post or respond. This alone eliminates most noise.

**2. Trade-gated visibility**
Crews only see needs that match their verified trades. An electrician does not see a
concrete need. Reduces off-topic responses significantly.

**3. Qualification self-attestation**
The interest form asks if they meet the listed requirements. Crews who answer "no" to
qualification are ranked lower in the interest list. Self-filtering works better than
you'd expect when there's no benefit to gaming it.

**4. One interest per need per company**
Enforced at the database level. No duplicate submissions.

**5. ClearScore weighting in interest list**
GCs see interested crews sorted by ClearScore descending by default. Higher-quality crews
surface first naturally.

**6. Rate limiting**
Free tier: 3 interest submissions per month. Pro tier: unlimited. This keeps free accounts
from spamming.

**7. Abuse reporting**
GCs can flag an interest submission as spam. Three flags from different GCs = automatic
review of the submitting account.

---

## 8. How this increases retention and revenue

### For GCs
- Gives them a reason to come back weekly, not just when they remember to search
- Makes Signal Crew a workflow tool, not just a directory
- Creates urgency: open needs expire, so there's a reason to act

### For subs
- Passive discovery: relevant opportunities surface without manually checking the platform
- The "expressed interest" history on their profile shows activity to GCs browsing later
- Incentivizes keeping their profile current and credentials up-to-date

### For the platform
- More frequent logins = more profile views = more connection requests = more retention
- "Live" project needs make the platform feel active even at early network size
- Teams upsell (Phase 2) is a natural next step once GCs see the value

---

## 9. What to watch for

### Risk 1: Feature creep toward marketplace
If you add a "submit your price" field, you've built a marketplace. Do not do this.
The value is in the profile-first, quality-first model. Pricing happens outside the platform.

### Risk 2: Needs going stale
If posted needs sit open with no responses, the platform feels dead.
Mitigation: auto-expire needs after 60 days. Show "X days remaining" on each need.
If a need gets zero responses in 14 days, notify the GC and suggest broadening criteria.

### Risk 3: GCs not closing the loop
If GCs never mark needs as filled, the history is messy.
Mitigation: auto-prompt after 30 days: "Did you fill this need?" — one-click close.

---

## 10. Summary recommendation

Build the feature. Include it in Phase 1. Keep it simple.

The three screens needed: post form, browse list, detail + interest form.
Total build time estimate: 3–5 days for a developer who already has the platform running.

This is the feature that turns Signal Crew from a directory into a workflow tool.
That is the difference between a product people use once and a product people pay for
every month without thinking about it.
