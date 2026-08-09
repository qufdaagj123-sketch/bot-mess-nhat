const login = require("fca-unofficial");

// Lấy cookie từ biến môi trường (sẽ thiết lập trên Render)
const appState = JSON.parse(process.env.APPSTATE);

login({ appState }, (err, api) => {
    if (err) return console.error("Lỗi đăng nhập:", err);

    console.log("Bot đã hoạt động!");

    api.listenMqtt((err, event) => {
        if (err) return console.error(err);

        // Chào mừng khi được thêm vào nhóm
        if (event.type === "event" && event.logMessageType === "log:subscribe") {
            const addedParticipants = event.logMessageData.addedParticipants;
            addedParticipants.forEach(participant => {
                if (participant.userFbId === api.getCurrentUserID()) {
                    api.sendMessage("🎉 Chào cả nhà! Cảm ơn đã thêm mình vào nhóm nhé!", event.threadID);
                }
            });
        }

        // Chào mừng khi ai đó nhắn tin riêng (ví dụ gõ "hi")
        if (event.type === "message" && event.body && event.body.toLowerCase() === "hi") {
            api.sendMessage("👋 Chào bạn! Mình là bot tự động, bạn cần giúp gì không?", event.threadID);
        }
    });
});
