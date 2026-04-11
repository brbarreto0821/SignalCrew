# How to activate real waitlist email submissions
## Signal Crew — Setup Guide

The waitlist form on /home is ready. It just needs a free Formspree account to send
submissions to your email inbox. Takes about 5 minutes.

---

## Step 1 — Create a free Formspree account

Go to https://formspree.io and create a free account.
The free tier allows 50 submissions per month. That is more than enough for early access.

---

## Step 2 — Create a new form

1. Click "New Form"
2. Name it: Signal Crew Waitlist
3. Formspree will give you a form ID that looks like: xpwzdabc

---

## Step 3 — Add your email

In your Formspree dashboard:
- Go to your new form
- Under "Email Notifications" — add your email address
- Every submission will be emailed to you immediately

---

## Step 4 — Update the code

Open this file in VS Code:
  src/app/(marketing)/home/page.tsx

Find this line near the top (around line 55):
  const FORMSPREE_ID = 'YOUR_FORM_ID'

Replace YOUR_FORM_ID with your actual ID from Formspree. For example:
  const FORMSPREE_ID = 'xpwzdabc'

Save the file. That is it.

---

## What you will receive in each email

Every waitlist submission will email you:

  Subject: New Signal Crew waitlist signup — [Name] ([Company])

  name: Jake Duncan
  email: jake@duncancontracting.com
  company: Duncan Construction LLC
  role: General Contractor / Prime
  state: OK
  interested_in: Finding reliable subs, Vetting subs before I hire, Property intelligence

---

## What the form collects

- Full name
- Company name
- Work email
- State
- Role (GC, Sub, Both, Government, Other)
- What interests them most (multi-select from 7 options)

This gives you:
- A qualified lead list sorted by role
- Which features people care about most
- Geographic concentration data
- Enough info to have a real conversation when you follow up

---

## Notes

- While FORMSPREE_ID is still 'YOUR_FORM_ID', the form simulates a success state
  without sending real data. It is safe for demo use.
- Once you add your real ID and deploy to Vercel, all submissions go live.
- Formspree stores submissions in their dashboard too, so you have a backup list
  even if an email goes to spam.
- Free plan: 50 submissions/month. If you exceed that, upgrade to $10/month for unlimited.
