/*CMD
  command: /adminPanel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ⚙️ admin panel
  group: 
CMD*/

// Verify if the user is an admin or set the first user as an admin
let admin = AdminPanel.getFieldValue({
    panel_name: "AdminPanel",
    field_name: "ADMIN_ID"
})
if ( !admin ) {
    AdminPanel.setFieldValue({
        panel_name: "AdminPanel",
        field_name: "ADMIN_ID",
        value: user.telegramid
    })
} else if ( admin !== user.telegramid ) {
    return;
}

// Get all values
let bonus = AdminPanel.getFieldValue({
    panel_name: "BonusPanel",
    field_name: "AMOUNT"
})
let bonusInterval = AdminPanel.getFieldValue({
    panel_name: "BonusPanel",
    field_name: "TIME_INTERVAL"
})
let minWith = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MIN_AMOUNT"
})
let maxWith = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MAX_AMOUNT"
})
let publicLog = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "PUBLIC_LOG"
})
let privateLog = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "PRIVATE_LOG"
})
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
let perRefer = AdminPanel.getFieldValue({
    panel_name: "ReferralPanel",
    field_name: "AMOUNT"
})


var txt = ""

if (publicLog) {
    txt += "\n\n🔊 Public Log Channel: <code>" + publicLog + "</>"
}
if (privateLog) {
    txt += "\n\n🔇 Private Log Channel: <code>" + privateLog + "</>"
}

// Inline buttons
const button = [
    [{ text: "🎙️ Broadcast Message", callback_data: "/broadcast" }],
    [{ text: "⛔ Ban User", callback_data: "/banUser" }, { text: "🟢 Unban User", callback_data: "/unbanUser" }],
    [{ text: "➕ Add Channel", callback_data: "/addChannel" }, { text: "➖ Remove Channel", callback_data: "/removeChannel" }],
    [{ text: "💬 Message User", callback_data: "/msgUser" }, { text: "💰 Edit Balance", callback_data: "/changeBalance" }],
    [{ text: `🎁 Bonus Amount: ${bonus}`, callback_data: "/changeBonus" }, { text: `⏰ Bonus Interval: ${bonusInterval} hr`, callback_data: "/changeBonusInterval" }],
    [{ text: `🔻 Min Withdraw: ${minWith}`, callback_data: "/setMinWithdraw" }, { text: `🔺 Max Withdraw: ${maxWith}`, callback_data: "/setMaxWithdraw" }],
    [{ text: "🔊 Public Log", callback_data: "/setPublicLog" }, { text: "🔇 Private Log", callback_data: "/setPrivateLog" }],
    [{ text: `💵 Currency: ${currency}`, callback_data: "/setCurrency" }, { text: `👫 Per Refer: ${perRefer} ${currency}`, callback_data: "/setPerRefer" }],
    [{ text: "🔄️ Update Panel Data", callback_data: "/adminPanel update" }]
]

if (params === "update") {
    Api.editMessageText({
        text: "<b>🔘 Choose Your Admin Command:" + txt + "\n\n──────────────────────</>",
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button },
        message_id: request.message.message_id,
        on_error: "/updatePanelError"
    });
    Api.answerCallbackQuery({
        callback_query_id: request.id,
        text: "✅ Panel Data Updated!",
        show_alert: false
    })
} else {
    Api.sendMessage({
        text: "<b>🔘 Choose Your Admin Command:" + txt + "\n\n──────────────────────</>",
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button }
    });
}
