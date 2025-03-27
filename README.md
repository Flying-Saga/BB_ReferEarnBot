# [Refer&Earn Bot](https://t.me/BB_ReferEarnBot)

## Introduction

Refer&Earn Bot (@BB_ReferEarnBot) is a Telegram bot developed for a competition organized by Bots.Business. It allows users to earn money by referring friends, manage their balance, withdraw earnings, and access various features. The bot meets all criteria set by Bots.Business and includes additional enhancements for better user experience and administration. Also, This bot is fully configurable via both the bot inline interface and a web-based admin panel.

## 👤 Core Users Features:

- **[Registration and Authorization](#1-registration-and-authorization)** – Users must join mandatory channels before accessing the bot.
- **[Balance Management](#2-balance-management)** – Users can check, add, and deduct balance with transaction history.
- **[Withdrawals](#3-withdrawals)** – Users can request withdrawals, which require admin approval.
- **[Referral System](#4-referral-system)** – Users receive unique referral links and earn rewards.
- **[Bonus System](#5-bonus-system)** – Users can claim periodic bonuses.
- **[Statistics](#6-statistics)** – Tracks total users, referrals, and earnings.
- **[Support System](#7-support-system)** – Users can contact support, and admins can respond.

## ⚙️ Advanced Admin Features

- **[User Management](#1-user-management)** – Admin can ban/unban users and modify balances.
- **[Channel Management](#2-channel-management)** – Admin can manage mandatory channels and announcement channels settings.
- **[Withdrawal Management](#3-withdrawal-management)** – Admin review and approve/decline withdrawals.
- **[Messaging Features](#4-messaging-features)** – Admin can broadcast or message users directly.
- **[Advanced Settings & Configurability](#5-advanced-settings--configurability)** – Admins can configure bot settings from the bot or website.

## 🔗 Setup and Visuals:

- **[Setup Instructions](#setup-instructions)** – Step-by-step installation and configuration guide.
- **[Screenshots](#screenshots)** – Placeholder images of admin panel, bot responses, and settings.

## Development Standards
- Clean, Modular Code: Easily maintainable with well-structured logic.
- User-Friendly Interface: Clear buttons and concise messages for easy navigation.
- Fully Configurable: All key settings can be adjusted via the bot panel or website admin-panel.

---

## User Features

### 1. 🔐 Registration and Authorization
- Users must join mandatory channels before accessing the bot.
- The bot verifies user subscriptions before allowing access.

### 2. 💰 Balance Management
- Users can check their balance at any time.
- Funds can be added or deducted manually by an admin.
- Transaction history stores the 10 most recent transactions.

### 3. 📤 Withdrawals
- Users can request withdrawals by entering an amount.
- System checks:
  - Minimum and maximum withdrawal limits.
  - Sufficient balance availability.
  - Wallet confirmation (users must set their wallet before requesting a withdrawal).
- Withdrawal requests are sent to an private log channel or admin for approval.
- Users receive notifications about withdrawal request status (accept/reject) by admin.
- Approved withdrawals are publicly logged in a configurable public log channel.

### 4. 👫 Referral System
- Each user receives a unique referral link.
- Bonuses are credited for each referred user once referral user joined all required channels.
- System tracks and displays statistics (number of referrals, earned rewards, per refer amount).
- Users can also view their last 10 referred users.

### 5. 🎁 Bonus System
- Users can claim a bonus by clicking a button at a configurable time interval (default: every 24 hours).
- Bonus can be also publicly logged in a configurable public log channel if checked by admin in panel.

### 6. 📊 Statistics
- The bot tracks total users, total referrals count, and total withdrawals.

### 7. 📞 Support System
- Users can send support any type support message to admin.
- The bot can also provides list of frequently asked questions (FAQ).
- Admins receive all support messages and can reply directly to users with any type message.
- Support system supports all message types (text, images, videos, documents, video-note, audio, etc).

---

## Administrator Features

### 1. User Management
- Ban/unban users.
- Modify user balances.

### 2. Channel Management
- Add/remove mandatory join channels.
- Verify user subscriptions.
- Set up an private log channel for withdrawal requests.
- Configure the public channel for withdrawal and bonus announcements.

### 3. Withdrawal Management
- Approve/decline withdrawal requests via the admin channel or via admin-self.
- Notify users about withdrawal decisions with balance manage.
- Publish approved withdrawals in the public channel.

### 4. Messaging Features
- Admins can send broadcast any type messages to all users.
- Admins can send messages directly to a user by ID (supports all message types: text, images, videos, documents, etc).

### 5. Advanced Settings & Configurability
**Admin can edit bot settings directly from the bot or from the web based admin-panel.**
- Configurable settings:
  - Referral bonus amount
  - Bot currency
  - Minimum and maximum withdrawal limits
  - Bonus amount and interval
  - Public and private log channels
  
- Management settings (only available in the bot panel):
  - Ban/unban users
  - Add/remove mandatory channels
  - Broadcast messages
  - Modify user balances
  - Directly message users

---

## 📌 Setup Instructions

### How to Set Up  

1. **Clone the Bot**
   - If bot is available on BB Store then, **clone from the Bot Store**.
   - Alternatively, clone from **GitHub** using this repo link.
2. **Set Admin**
   - Start your bot by /start command.
   - Bot will automically set you as admin and you get "⚙️ Admin Panel" button in bot to manage. If you want to change admin id you can do from web based admin-panel.

3. **Done!** 🎉
   Now this bot is **ready to use** with full functionality.

---

## Screenshots
- **Admin Panel Settings (Website)**: [Screenshot Placeholder]
- **Admin Panel Settings (Bot)**: [Screenshot Placeholder]
- **Bot Menu Buttons**: [Screenshot Placeholder]
- **Some Bot Responses**: [Screenshot Placeholder]

---

## 💬 Contact

Have questions or want to collaborate? Reach out via Telegram:

👉 [Contact Developer](https://t.me/mrhazex)

---

## ⭐ Credits

- Developed By: **Hazex**
- Contest Hosted By: [Bots.Business](https://t.me/botsbus)
- Bot Link: [@HazexBB_Bot](https://t.me/BB_ReferEarnBot)

---
