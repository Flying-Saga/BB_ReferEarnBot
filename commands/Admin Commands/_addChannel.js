/*CMD
  command: /addChannel
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

// Verify if the user is an admin
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
if ( !admin || admin !== user.telegramid ) {
    return;
}

// Get channels list
let channelList = Bot.getProp("membershipChannels", []);
if (channelList.length > 0) {
    let formattedChannelList = channelList.join("\n⁍ ");
    channelList = `\n\nList of all added channels:\n⁍ ${formattedChannelList}`
}

// Get admin input for channel username
Bot.sendMessage(`*➕ Enter New Channel Username To Add in Bot Membership\nE.g. @demo_channel${channelList}\n\nTo Cancel: /cancel*`);
Bot.runCommand("/onAddChannel");
