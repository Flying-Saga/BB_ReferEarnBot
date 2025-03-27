/*CMD
  command: /onBroadcastTask
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Broadcast Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Create task and handle status both in same command
if (params) {
  
    // Get task from task id
    let task = new RunAllTask({ id: params });
    if (!task.status) {
        return Api.editMessageText({ text: "*❌ This task is not found!*", parse_mode: "markdown", message_id: request.message.message_id });
    }
    
    // Set 0 for null values
    let progress = task.progress ?? 0;
    let total = task.total ?? 0;
    let errorCount = task.errors_count ?? 0;
    
    // Edit message to show broadcast status
    const button = [
        [{ text: "🔄️ Refresh Status", callback_data: "/onBroadcastTask "+ params }],
    ]
    Api.editMessageText({
        text: `*✅ Broadcast started successfully!

📊 Brodcast Status:

Status: ${task.status} 
Progress: ${progress}%
Count: ${task.cur_position}/${total}
Error Count: ${errorCount}

⬇️ Click below button to refresh status.
*`,
        parse_mode: "markdown",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: button },
        on_error: "/onEditInlineError"
    })
    
} else if (options) {

    // Create task and notify admin with status button
    const task = options.run_all_task;
    const button = [
        [{ text: "📊 Get Broadcast Status", callback_data: "/onBroadcastTask "+ task.id }],
    ]

    Api.sendMessage({
        text: `*✅ Broadcast started successfully!\n\n⬇️ Click below button to get status.*`,
        parse_mode: "markdown",
        reply_markup: { inline_keyboard: button }
    });
}
