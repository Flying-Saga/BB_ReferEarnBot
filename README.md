# 🤖 [Refer&Earn Bot](https://t.me/BB_ReferEarnBot)

## Introduction

**Refer&Earn Bot (@BB_ReferEarnBot)** is a **Telegram Bot** developed for a competition organized by *Bots.Business*. It allows users to earn money by **referring friends, manage their balance, withdraw earnings, and access various features**.
The bot meets all criteria set by *Bots.Business* and includes additional enhancements for better user experience and administration. Additionally, this bot is *fully configurable* via both the bot inline interface and a web-based admin panel.

## 👤 Core Users Features:

- **[Registration and Authorization](#registration-and-authorization)** – Users must join mandatory channels before accessing the bot.
- **[Balance Management](#balance)** – Users can check, add, and deduct balance with transaction history.
- **[Withdrawals](#withdrawals)** – Users can request withdrawals, which require admin approval.
- **[Referral System](#referral)** – Users receive unique referral links and earn rewards.
- **[Bonus System](#bonus)** – Users can claim periodic bonuses.
- **[Statistics](#statistics)** – Tracks total users, referrals, and earnings.
- **[Support System](#support)** – Users can contact support, and admins can respond.

## ⚙️ Advanced Admin Features:

- **[User Management](#1-user-management)** – Admin can ban/unban users and modify balances.
- **[Channel Management](#2-channel-management)** – Admin can manage mandatory channels and announcement channels settings.
- **[Withdrawal Management](#3-withdrawal-management)** – Admin review and approve/decline withdrawals.
- **[Messaging Features](#4-messaging-features)** – Admin can message users directly or reply to support messages.
- **[Broadcast Feature](#5-broadcast-feature)** – Admin can broadcast and check status.
- **[Advanced Settings & Configurability](#6-advanced-settings--configurability)** – Admins can configure bot settings from the bot or website.

## 🔗 Setup and Visuals:

- **[Bot Error Handler](#error-handler)** – Handles and logs bot errors efficiently.
- **[Setup Instructions](#setup)** – Step-by-step bot installation and configuration guide.
- **[Screenshots](#screenshots)** – Placeholder images of admin panel, bot responses, and settings.

## Development Standards
- Clean, Modular Code: Easily maintainable with well-structured logic.
- User-Friendly Interface: Clear buttons and concise messages for easy navigation.
- Fully Configurable: All key settings can be adjusted via the bot panel or website admin-panel.
- Well-Commented Code: Simple and easy-to-understand comments throughout the code to help users follow along effortlessly.
- Meaningful Variable & Function Names: Variables and functions have clear, meaningful, and simple names to enhance readability.
- Simplicity & Clarity: The code is written in a straightforward and easy-to-understand manner, making it accessible even for beginners.

---

## User Features

### 1. <a id="registration-and-authorization"></a>🔐 Registration and Authorization
- Users must join mandatory channels before accessing the bot.
- The bot verifies user subscriptions before allowing access.

### 2. <a id="balance"></a>💰 Balance Management
- Users can check their balance at any time.
- Funds can be added or deducted manually by an admin.
- Transaction history stores the 10 most recent transactions.

### 3. <a id="withdrawals"></a>📤 Withdrawals
- Users can request withdrawals by entering an amount.
- The system checks the following:
  - Minimum and maximum withdrawal limits.
  - Sufficient balance availability.
  - Wallet confirmation (users must set their wallet before requesting a withdrawal).
- Withdrawal requests are sent to an private log channel or admin for approval.
- Users receive notifications about withdrawal request status (accept/reject) by admin.
- Approved withdrawals are publicly logged in a configurable public log channel.

#### Users must confirm their withdrawal request before submitting, ensuring their wallet and amount are correct.
![User Withdrawal Confirmation](https://github.com/user-attachments/assets/29e1032b-211b-4eaf-8e19-84694d12b6cb)


### 4. <a id="referral"></a>👫 Referral System
- Each user receives a unique referral link.
- Bonuses are credited for each referred user once referral user joined all required channels.
- System tracks and displays statistics (number of referrals, earned rewards, per refer amount).
- Users can also view their recent 10 referred users.

### 5. <a id="bonus"></a>🎁 Bonus System
- Users can claim a bonus by clicking a button at a configurable time interval (default: every 24 hours).
- Bonus amount is also configurable by admin (default: 1).
- The bonus will be logged in a public log channel only if the admin enables it in the web based admin-panel.

### <a id="statistics"></a>6. 📊 Statistics
- The bot tracks total users, total referrals count, and total withdrawals.

### 7. <a id="support"></a>📞 Support System
- Users can send any type of support message to the admin.
- The bot can also provides list of frequently asked questions (FAQ).
- Admins receive all support messages and can reply directly to users with any message type.
- Support system supports all message types (text, images, videos, documents, video-note, audio, etc).

---

## Administrator Features

### 1. User Management
- Ban/unban users.
- Modify user balances (add/cut).

### 2. Channel Management
- Add/remove mandatory join channels.
- Verify user subscriptions.
- Set up an private log channel for withdrawal requests.
- Configure the public log channel for withdrawal and bonus announcements.

### 3. Withdrawal Management
- Approve/decline withdrawal requests via the admin channel or via admin-self.
- Notify users about withdrawal decisions with balance manage.
- Publish approved withdrawals in the public channel.

### 4. Messaging Features
- Admins can send messages directly to a user by ID (supports all message types: text, images, videos, documents, etc).
- Admins can reply to user support messages directly from the bot.

### 5. Broadcast Feature
- Admins can send broadcast any type messages to all users.
- Broadcast supports all message types: text, images, videos, documents, etc.
- Admin can check broadcast status, with refresh inline buttton.

### 6. Advanced Settings & Configurability
**Admin can edit bot settings directly from the bot or from the web based admin-panel.**
- Configurable settings:
  - Referral bonus amount
  - Bot currency (default: INR)
  - Minimum and maximum withdrawal limits
  - Bonus amount and interval
  - Public and private log channels (both are optional)
  - Wallet type (default: UPI ID)
  
- Management settings (only available in the bot panel):
  - Ban/unban users
  - Add/remove mandatory channels
  - Broadcast messages
  - Modify user balances
  - Directly message users

---

## <a id="error-handler"></a>❗Bot Error Handler
The bot includes a robust error handler to prevent disruptions and notify admins of issues:
- Handles message edit failures (when a message is not modified)
- Detects if the bot is not an admin in log channels and alerts the admin
- Checks if the bot lacks admin permissions in mandatory join channels
- Prevents withdrawal requests if the user's wallet is not set
- Input validation for every command (e.g., ensures numeric input for balance-related commands, etc)

## <a id="setup"></a>📌 Setup Instructions

### How to Set Up: 

1. **Clone the Bot**
   - If bot is available on BB Store then, **clone from the BB Bot Store**.
   - Alternatively, clone from **GitHub** using this repo link.
2. **Set Admin**
   - Start your bot by /start command.
   - Bot will automically set you as admin and you get "⚙️ Admin Panel" button in bot to manage. If you want to change admin id you can do from web based admin-panel.
   - Bot also make admin-panel in *Bot.Business* web to adjust values.

3. **Done!** 🎉
   Now this bot is **ready to use** with full functionality.

---

## Screenshots
### Admin Panel Settings (Website):
![Panel Settings (Website)](https://github.com/user-attachments/assets/39ec0aca-0c48-4482-bc41-6a53eb26fc11)
### Admin Panel Settings (Bot):
![Panel Settings (Bot)](https://github.com/user-attachments/assets/c57029dc-50ef-45a2-81c3-4cd5da130abe)
### Bot Menu Buttons:
![Menu Buttons](https://github.com/user-attachments/assets/544b03c3-0397-4929-8928-b3c6a894aa05)
### Some Bot Responses:
![Bot Responses](https://github.com/user-attachments/assets/0f9e0d01-9fbb-4ed5-8eb9-d701f9dc2a67)

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
