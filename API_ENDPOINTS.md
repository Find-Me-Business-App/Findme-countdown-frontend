# FindMe API Endpoints Reference

This document provides a clean, structured, and detailed reference for all API endpoints required by the FindMe frontend modals and registration flows.

---

## 🌐 Global Configuration
- **Base URL**: Defined by `NEXT_PUBLIC_API_BASE_URL` env variable.
- **Content-Type**: `application/json` (except for file uploads).
- **Shared Field**: `section` (Values: `"home"`, `"business"`, `"festival"`) - Critical for routing logic.

---

## 📧 1. Lead Generation & Contact 
Used for simple data capture from home, business, and festival sections.

### 📝 Contact Form
Submit a message to the support team.
- **Endpoint**: `POST /lists/contact`
- **Fields**:
  - `name`: (string) User's full name.
  - `email`: (string) User's email address.
  - `message`: (string) Detailed message.
  - `section`: (string) Origin context (`"home"`, `"business"`, `"festival"`).

### ⏳ Waitlist Form
Join the product launch waitlist.
- **Endpoint**: `POST /lists/wait-list`
- **Fields**:
  - `email`: (string) User's email address.
  - `section`: (string) Origin context.

---

## 👤 2. User Authentication & Registration 
The "Top of Funnel" for all user types. 

### 🚀 Initial Account Creation
- **Endpoint**: `POST /lists/user`
- **Fields**:
  - `name`: (string)
  - `email`: (string) 
  - `phone`: (string)
  - `password`: (string)
  - `role`: (string) Options: `"Sponsor"`, `"Guest"`, `"Artist"`, `"Festival Artisan"`, `"Business"`, `"Volunteer"`.
  - `referralCode`: (string, optional)
  - `section`: (string)

---

## 🏢 3. Business & Festival Participation 
Secondary steps for users who register as a **Business** or **Festival Artisan**.

### 🛠️ Profile Enrichment
Update the user with AI-generated data or account preferences.
- **Endpoint**: `PATCH /lists/user/{userId}`
- **Fields**:
  - `accountType`: (string) `"business"` or `"listing"`.
  - `aiPrompt`: (string) The prompt entered during the registration AI step.

### 📊 Business Profile Details
Captured in the `BusinessAccountInfo.tsx` and `FestivalCategorySelection.tsx` steps.
- **Endpoint**: `POST /lists/business`
- **Fields**:
  - `businessName`: (string)
  - `category`: (string) *Business*: "Ride hailing", etc. | *Festival*: "Dean", "Dentist", etc.
  - `ownershipType`: (string) `"Self owned"`, `"Partnership"`, `"Franchise"`, `"LLC"`, etc.
  - `industry`: (string)
  - `subCategory`: (string)
  - `about`: (string[]) List of tags like `"Factory"`, `"Museum"`.

---

## 🛡️ 4. Verification & Compliance
Final stage for business/festival validation.

### ✅ Submission of Documents
- **Endpoint**: `POST /lists/verify`
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `personalID`: (file) Image/PDF upload of ID card.
  - `registrationCode`: (string, optional) Business BN number.
  - `section`: (string)

---

## 🚦 5. Conditional Registration Flow (Festival)
The frontend uses the `role` field to branch the user journey.

### 🎭 Path A: General Participation (Sponsor, Guest, Artist, etc.)
1.  **Step**: Initial Sign-up (`POST /lists/user`)
2.  **Outcome**: Immediate Success. No further API calls required.

### 💼 Path B: Festival Business
1.  **Step 1**: Initial Sign-up (`POST /lists/user`) with `role: "Business"`.
2.  **Step 2**: Business Identity (`POST /lists/business`).
3.  **Step 3**: Verification (`POST /lists/verify`).
4.  **Outcome**: Final Success Modal.

---

## 📜 Example Request Body (Registration)
```json
{
  "name": "Francis Watson",
  "email": "francis@example.com",
  "phone": "+2348000000000",
  "password": "********",
  "role": "Business",
  "section": "festival"
}
```
