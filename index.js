const login = require("fca-unofficial");

const appState = JSON.parse(process.env.APPSTATE);

login({ appState }, (err, api) => {
    if (err) return console.error("Lỗi đăng nhập:", err);

    console.log("Bot đã hoạt động!");

    api.listenMqtt((err, event) => {
        if (err) return console.error(err);

        // Chào mừng khi được thêm vào nhóm (không cần trích dẫn tin nhắn vì là sự kiện nhóm)
        if (event.type === "event" && event.logMessageType === "log:subscribe") {
            const addedParticipants = event.logMessageData.addedParticipants;
            addedParticipants.forEach(participant => {
                if (participant.userFbId === api.getCurrentUserID()) {
                    api.sendMessage("🎉 Chào cả nhà! Cảm ơn đã thêm mình vào nhóm nhé!", event.threadID);
                }
            });
        }

        // Trả lời tin nhắn riêng có kèm khung trích dẫn (reply)
        if (event.type === "message" && event.body && event.body.toLowerCase() === "hi") {
            // Thêm event.messageID ở cuối để bot tự động quote lại tin nhắn của người dùng
            api.sendMessage("👋 Chào bạn! Mình là bot tự động, bạn cần giúp gì không?", event.threadID, event.messageID);
        }
    });
});
