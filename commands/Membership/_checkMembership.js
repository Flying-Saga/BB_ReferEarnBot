/*CMD
  command: /checkMembership
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Membership

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const channelList = Bot.getProp("membershipChannels", []);
let id = user.telegramid;

User.deleteProp("membershipAdminError");
User.deleteProp("membershipJoinError");

// Function to check membership in multiple channels
function checkMembership(channel) {
    Api.getChatMember({
        chat_id: channel,
        user_id: id,
        on_result: "/onCheckMembership",
        on_error: "/onCheckMembership",
        bb_options: { channel: channel },
    });
}

// Check each channel one by one, stopping on first failure
for (let channel of channelList) {
    checkMembership(channel);
}
