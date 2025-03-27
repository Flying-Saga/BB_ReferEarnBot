/*CMD
  command: /homeMenu
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let keyboard = [
        [{ text: "👤 Profile" }, { text: "🎁 Bonus" }],
        [{ text: "👫 Referral" }, { text: "📤 Withdraw" }],
        [{ text: "📞 Support" }, { text: "📊 Statistics" }]
    ]

// Verify if the user is an admin or set the first user as an admin
let admin = AdminPanel.getFieldValue({
    panel_name: "AdminPanel",
    field_name: "ADMIN_ID"
})
if ( admin === user.telegramid ) {
    keyboard.unshift([{ text: "⚙️ Admin Panel" }]);
}

Api.sendMessage({
  text: "*🎉 Welcome to menu!*",
  parse_mode: "markdown",
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard
  }
})
