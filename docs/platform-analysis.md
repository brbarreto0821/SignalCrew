# Signal Crew — Honest Platform Analysis
## Internal Document · For Founder Eyes Only
### Written April 2026

---

## The one-paragraph truth

Signal Crew is a real problem looking for the right execution. The pain it solves is genuine —
contractors get burned regularly and have no shared intelligence system. The risk is that
the value of the network is directly proportional to how many verified, active members are
in it, and building that to critical mass is hard, slow, and expensive without a specific
go-to-market strategy. This is a winnable bet, but only if you treat the network effect
problem as job one and resist the temptation to over-build the product while the network
is still small.

---

## 1. What this platform actually is

Signal Crew is three products in one shell, and you need to be clear which one you are
building first:

**A. A contractor discovery and vetting tool** (the core)
GCs search for verified subs. They look at structured profiles, credentials, and peer reviews
before reaching out. This is LinkedIn-meets-background-check for the trades.

**B. A property intelligence layer** (the unique moat)
Structured, moderated history of project signals at a property address. No other platform
does this cleanly and legally. This is the feature that has no real competitor.

**C. A project needs board** (the stickiness engine)
GCs post project needs, crews express interest, no pricing involved. Keeps users coming
back weekly instead of monthly.

The order matters. A is table stakes — every contractor directory does some version of it.
B is the moat — the thing that makes Signal Crew genuinely hard to replicate.
C is the retention lever — what keeps people opening the app.

Right now you are building A and B. C is in the prototype. That is the right sequence.

---

## 2. The honest market opportunity

### The good

The addressable market is enormous. There are approximately 3.8 million construction
businesses in the US, and that number does not include AV, IT, HVAC, restoration, and
other field service verticals. Even at $49/month, capturing 10,000 active subscribers
is $5.9 million ARR. Capturing 50,000 is $29 million ARR. These are not fantasy numbers
for a product that delivers real value in a fragmented market.

Non-payment and scope creep cost small contractors an estimated $40–70 billion annually
in the US. That is the problem you are solving. The ROI story sells itself: one avoided
bad client or one good sub hire pays for years of Signal Crew.

The property intelligence feature has no direct competitor at the moment. Yelp, Google,
and Angi are all consumer-facing and do not protect contractor privacy. There is no
private, structured, contractor-to-contractor intelligence product in the market today.

### The bad

**The chicken-and-egg problem is real and severe.**

A network with 50 profiles is worthless. A network with 500 targeted profiles in a
specific region starts to have value. A network with 5,000 verified profiles nationally
is genuinely useful. Getting from 0 to 5,000 verified profiles requires either a large
acquisition budget, a very tight geographic focus, or a community you already have.

Here is the hard math: if you onboard 5 contractors per week through manual outreach,
you will have 260 members after one year. That is not enough to make the search valuable
in most markets. You need 10x that in year one to have a product worth paying for.

**Verification is a bottleneck by design.**

Manual verification was the right call for trust and legal reasons. It is also a growth
ceiling. Every approved contractor requires your time or a hired reviewer's time. At
scale this breaks. You need a path to semi-automated verification — business license
lookups, insurance certificate parsing, SAM.gov API — before you hit 1,000 members.

**Property intelligence has a cold start problem of its own.**

Even if you have 500 verified contractors, getting them to submit property reports
requires a habit change. Most contractors will search before they bid, find nothing,
and conclude the feature is useless — before submitting anything themselves. You need
a seeding strategy: manually reach out to contractors who have publicly documented
non-payment issues (small claims records, contractor forums, Facebook groups) and help
them submit structured retroactive reports.

### The ugly

**Network effects cut both ways.**

The same dynamic that makes Signal Crew valuable at scale makes it fragile at launch.
If early members search and find nothing, they leave and do not come back. You have one
shot at a first impression with each contractor. This means you must not open signups
broadly until you have enough data in a specific geography to deliver a useful search
result on at least 40% of queries.

**Legal exposure is real.**

The structured reporting model significantly reduces risk, but it does not eliminate it.
A contractor with a lawyer can still send a cease-and-desist over a published report
even if it is structured. You need a ToS written by an attorney before you have real
users. You need a dispute resolution process that actually resolves disputes. And you
need clear limits on what the notes field can say, enforced through moderation. One viral
lawsuit story can kill the platform.

**You are competing against inertia, not a product.**

Your biggest competitor is not Procore, not BuildZoom, not Angi. It is the group text
thread, the Facebook contractor group, and the "call Mike, he knows a good sub" system
that already exists. Every contractor already has a network of trusted people. Your job
is to make Signal Crew so much better than that informal system that they pay $49/month
to use it instead. That is a behavioral change, which is harder than a product comparison.

**Churn risk is high if the network does not grow.**

Contractors will cancel if they do not use the platform at least twice a month. If your
network is thin in their geography or trade, they will search, find nothing useful, and
cancel. You need to watch search-with-no-results rate obsessively. When it exceeds 30%,
you have a content problem, not a product problem.

---

## 3. Pricing — what to charge

### The honest answer

You do not know the right price yet. Neither does anyone else. Here is how to find it.

**During early access:** Do not charge. Build the network. Give founding members free access
in exchange for profile submissions and property reports. Every free member who submits
5+ property reports is worth more than a paying member who does not.

**At 500+ verified members in a target market:** Start charging $49/month. Offer a 30-day
free trial. Do not grandfather early access forever — that trains users to wait for
discounts. Give a 6-month discount window, then move to full price.

**At 2,000+ members:** Test $69/month for new signups. Keep existing members at $49.
If conversion rate does not drop more than 15%, $69 is the real price.

**Future tiers to consider:**

| Tier | Price | Who it's for |
|------|-------|--------------|
| Starter | $29/mo | Solo operators, basic search |
| Pro | $59/mo | Active GCs, unlimited everything |
| Teams | $99/mo | Multi-user, analytics, project needs |
| Enterprise | Custom | Large GCs, national subs, gov contractors |

The property intelligence feature alone could be a standalone paid add-on at $15–25/month
for companies that primarily want risk intel, not network access.

### What the market will bear

Based on comparable B2B SaaS products in adjacent markets (Procore, Buildertrend, 
ConstructConnect), contractors and GCs pay:
- $50–200/month for project management tools
- $100–500/month for lead generation
- $200–2,000/month for compliance and verification tools

Signal Crew at $49/month is dramatically underpriced relative to the value delivered if
the network has critical mass. The right long-run price for Pro is probably $79–99/month.
Start low, raise with confidence as the network grows.

---

## 4. Who to market this to — priority order

### Tier 1: The target for months 1–6

**Mid-size GCs with active sub networks**
Companies doing $2M–$20M/year in revenue. They hire 5–15 subs per project. They have
been burned before. They have the budget and the pain. They are the first buyer.

Specifically:
- Commercial GCs in mid-size markets (Tulsa, OKC, Wichita, Kansas City, Dallas suburbs)
- Not the biggest GCs (they have procurement departments), not the smallest (no budget)
- Companies that have had a non-payment issue or a bad sub in the last 24 months

**Where to find them:**
- Local Associated General Contractors (AGC) chapter meetings
- State contractor licensing board directories (public records)
- LinkedIn searches for "General Contractor + [City]" with 10–50 employees
- Local Facebook groups for contractors (join, provide value, don't pitch for 60 days)

### Tier 2: The pull-through market

**Specialty subs who want to be found by GCs**
Once GCs are on the platform, subs will join to be discovered. The marketing to subs is
different: "Get in front of verified GCs looking for your trade." This is a passive pull
once GC density is high enough in a market.

### Tier 3: The expansion market

**Government subcontractors (SAM.gov angle)**
The SAM.gov + military base access feature is a genuine differentiator for government
contractors. Companies like Bowhead, SAIC sub-contractors, and DoD facility maintenance
firms have a real need for verified, accessible subs who are pre-cleared. This market
is smaller but pays more and has fewer competitors.

**AV, IT, HVAC specialties**
Once you prove the model in construction, these verticals follow the same playbook.
They have the same pain (bad subs, non-payment, fake credentials) and the same budget.

### Tier 4: The long-term vision

**Insurance and bonding companies**
Signal Crew data — ClearScore, payment history, scope adherence — is exactly what
insurance companies want for underwriting commercial contractor bonds. A data licensing
play to insurance companies is a multi-million dollar exit path that requires no
changes to the core product.

**Lenders and surety companies**
Same logic. A contractor's ClearScore and payment history is a proxy for creditworthiness.

---

## 5. What this could become

### Conservative path (years 1–3)
Regional niche SaaS. 2,000–5,000 subscribers. $1.2M–$3M ARR. Profitable, owner-operated.
Valuable as a lifestyle business. Sellable to a larger trade platform for 3–5x ARR
($3.6M–$15M exit).

### Moderate path (years 2–5)
National contractor network with 15,000–30,000 subscribers. $10–20M ARR. VC-fundable.
Acquirable by Procore, Autodesk Construction Cloud, or a private equity roll-up of
construction tech platforms. $30M–$100M exit range.

### Aggressive path (years 3–7)
National platform with property intelligence, data licensing to insurers and lenders,
enterprise tier for large GCs, and API integrations with Procore/Buildertrend. 50,000+
subscribers. $30M+ ARR. IPO-eligible or $200M+ acquisition target.

The difference between these paths is almost entirely the network effect problem.
If you crack acquisition in years 1–2, the aggressive path is realistic.
If you struggle with acquisition, the conservative path is still a win.

---

## 6. The three things that will make or break this

**1. Geographic density before opening nationally**

Do not try to be everywhere at once. Pick two or three mid-size markets — Oklahoma,
Kansas, and North Texas make sense given your location and network. Do not open to
California or New York until you have proof of concept. Density beats breadth in
network businesses at every stage.

**2. The property intelligence seeding strategy**

This feature is your moat, but only if it has data. You need to proactively seed
property reports in your launch markets. Partner with local contractor associations.
Offer incentives for early report submission. Run a "non-payment awareness" campaign
that drives contractors to submit their first report as an act of industry solidarity,
not a product sign-up.

**3. Verification quality over quantity**

Do not approve everyone. A network of 500 truly verified, active contractors is worth
more than a network of 5,000 unverified profiles. Every fake or inactive account dilutes
trust. Rejection of applications is a feature, not a bug. Make that clear in your
marketing: "Not everyone gets in."

---

## 7. The founder's honest checklist

Before you spend money on development beyond the prototype:

- [ ] Have you personally called 20 GCs and asked if they would pay $49/month for this?
- [ ] Have you gotten at least 10 "yes, absolutely" responses from people you don't know?
- [ ] Do you have a personal network of 30+ contractors who will be founding members?
- [ ] Do you have a clear plan for how you will get to 500 verified members in your first market?
- [ ] Have you spoken to an attorney about the property intelligence liability?
- [ ] Do you have 12 months of runway to get to revenue without depending on it?

If you answered no to more than two of these, the next step is not more development.
The next step is more conversations with contractors.

---

## 8. Bottom line

This is a good idea in a real market with a genuine pain point. The property intelligence
feature is the most original and defensible part of the product. The contractor network
is table stakes that needs network effects to be valuable.

The risk is not the idea. The risk is execution speed vs. the cold start problem.
You need to solve the chicken-and-egg problem before the market finds you or builds it
without you.

The prototype you have is good enough to show contractors and get real feedback.
Do that before writing one more line of code.

---

*This document was prepared as an internal strategic assessment. It is not financial advice.*
*It represents one honest perspective based on available information.*
