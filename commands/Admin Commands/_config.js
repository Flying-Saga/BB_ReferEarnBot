/*CMD
  command: /config
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options || !options.isCommand) {
    return;
}

// Admin panel
var adminPanel = {
  title: "Admin Settings",
  description: "Please fill your admin id",
  index: 0,
  icon: "admin_panel_settings",
  button_title: "SAVE",
  
  // Fields for this Panel
  fields: [
    {
      name: "ADMIN_ID",
      title: "Admin ID",
      description: "enter your telegram id",
      type: "string",
      placeholder: "your admin id",
      value: options.admin
    }
  ]
}

// Bot panel
var botPanel = {
  title: "Bot Settings",
  description: "Please fill bot settings like currency, etc...",
  index: 1,
  icon: "smart_toy",
  button_title: "SAVE",
  
  // Fields for this Panel
  fields: [
    {
      name: "CURRENCY",
      title: "Bot Currency",
      description: "enter bot currency, e.g. INR, USD, etc...",
      type: "string",
      placeholder: "your bot currency",
      value: "INR"
    },
    {
      name: "PUBLIC_LOG",
      title: "Public Log Channel Username or ID",
      description: "enter public log channel username or ID, e.g. @demo_channel, -1234567890, etc...",
      type: "string",
      placeholder: "your public log channel",
    },
    {
      name: "PRIVATE_LOG",
      title: "Private Log Channel Username or ID",
      description: "enter private log channel username or ID, e.g. @demo_channel, -1234567890, etc...",
      type: "string",
      placeholder: "your private log channel",
    }
  ]
}

// Bonus panel
var bonusPanel = {
  title: "Bonus Settings",
  description: "Please fill bonus amount and bonus time interval",
  index: 2,
  icon: "emoji_events",
  button_title: "SAVE",
  
  // Fields for this Panel
  fields: [
    {
      name: "AMOUNT",
      title: "Bonus Amount",
      description: "enter bonus amount in float, e.g. 1.5, 10, etc...",
      type: "float",
      placeholder: "your bonus amount",
      value: 1
    },
    {
      name: "TIME_INTERVAL",
      title: "Bonus Time Interval",
      description: "enter bonus time interval in hours (float), e.g. 48, 0.5, etc...",
      type: "float",
      placeholder: "your time interval",
      value: 24
    },
    {
      name: "DO_LOG",
      title: "Bonus Log",
      description: "check to log message in channel",
      type: "checkbox",
      value: true
    }
  ]
}

// Withdraw panel
var withdrawPanel = {
  title: "Withdrawal Settings",
  description: "Please fill minimum and maximum withdraw amount",
  index: 3,
  icon: "account_balance",
  button_title: "SAVE",
  
  // Fields for this Panel
  fields: [
    {
      name: "MIN_AMOUNT",
      title: "Minimum Withdraw Amount",
      description: "enter minimum withdraw amount in float, e.g. 1.5, 10, etc...",
      type: "float",
      placeholder: "your minimum withdraw amount",
      value: 1
    },
    {
      name: "MAX_AMOUNT",
      title: "Maximum Withdraw Amount",
      description: "enter maximum withdraw amount in float, e.g. 1.5, 10, etc...",
      type: "float",
      placeholder: "your maximum withdraw amount",
      value: 10
    },
    {
      name: "WALLET_TYPE",
      title: "Wallet Type",
      description: "enter withdrawal address wallet type, e.g. UPI ID, Mobile No., etc...",
      type: "string",
      placeholder: "your wallet type",
      value: "UPI ID"
    }
  ]
}

// Referral panel
var referralPanel = {
  title: "Referral Settings",
  description: "Please fill per refer amount",
  index: 4,
  icon: "group_add",
  button_title: "SAVE",
  
  // Fields for this Panel
  fields: [
    {
      name: "AMOUNT",
      title: "Per Refer Amount",
      description: "enter per refer amount in float, e.g. 2.5, 10, etc...",
      type: "float",
      placeholder: "your per refer amount",
      value: 1
    }
  ]
}

// Set all panels
AdminPanel.setPanel({
  panel_name: "AdminPanel",
  data: adminPanel
});
AdminPanel.setPanel({
  panel_name: "BotPanel",
  data: botPanel
});
AdminPanel.setPanel({
  panel_name: "BonusPanel",
  data: bonusPanel
});
AdminPanel.setPanel({
  panel_name: "WithdrawPanel",
  data: withdrawPanel
});
AdminPanel.setPanel({
  panel_name: "ReferralPanel",
  data: referralPanel
});
