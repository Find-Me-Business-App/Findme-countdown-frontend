# AME Registration Flow (9-Step Conversational Sequence)

This document maps out the total lifecycle of the AME (AI) Registration Flow, detailing what comes first, what comes last, and what components are used sequentially. 

The state is orchestrated by the `<AmeFlow />` parent component.

## 1. Initial Prompt (Selection)
- **Component:** `SelectionView.tsx`
- **What it does:** Displays the animated 3D AI Orb and asks the user what they want to build via a text area.
- **State Name:** `selection`

## 2. Location Confirmation (Reply)
- **Component:** `ReplyView.tsx`
- **What it does:** AME replies: *"If I got you correctly, you want to open your Restaurant business at two locations... Should I lock in on those locations?"*
- **State Name:** `reply`

## 3. Business Name Input
- **Component:** `BusinessNameView.tsx`
- **What it does:** AME says: *"Awesome. To get started, what is the name of your business?"*
- **State Name:** `business_name`

## 4. Business Offer Type (Followup)
- **Component:** `FollowupView.tsx`
- **What it does:** AME says: *"Okay Locking in on those location, what do your business offer:"* and lists **Product / Service / Both** as a left-aligned bulleted list.
- **State Name:** `followup`

## 5. Business Category Selection
- **Component:** `CategoryView.tsx`
- **What it does:** AME asks *"What category does your business fall under"* and provides an **interactive Dropdown Menu** for predefined categories (Tech & IT, Logistics, Services, etc), while preserving the text area for custom input.
- **State Name:** `category`

## 6. Product Nature (Followup2)
- **Component:** `Followup2View.tsx`
- **What it does:** AME asks *"The product your business is selling is it ;"* and lists **Digital / Physical**.
- **State Name:** `followup2`

## 7. Staff Count (Followup3)
- **Component:** `Followup3View.tsx`
- **What it does:** AME asks *"Alright you have a great business setup so far . Lets finish it up. How many staff are working in your business?"*
- **State Name:** `followup3`

## 8. Ownership Structure
- **Component:** `OwnershipView.tsx`
- **What it does:** AME says: *"Almost done! What is your ownership structure?"* and lists **Sole Proprietorship / Partnership / Company/LLC**.
- **State Name:** `ownership`

## 9. Final Tracker Information (UserInfo)
- **Component:** `UserInfoView.tsx`
- **What it does:** A sleek, compact form requesting the user's `Name`, `Email`, `Password`, `Phone`, and `Referral Code`.
- **State Name:** `user_info`

---

## What Happens When User Finishes AME?
Once the user clicks **Submit** on Step 9 (`UserInfoView`), the function `handleFinalSubmit()` fires the `onNext` callback back in `RegistrationModal.tsx`. 

Depending on how `RegistrationModal` is configured, it will either:
- Send the user straight to the **Success** screen.
- Dump the user back into the old manual flow forms (`account_type`, `category`, etc).
