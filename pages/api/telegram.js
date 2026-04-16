export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).end();
  }

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const EMAIL = process.env.EMAIL;

  try {
    const body = req.body;

    if (body.callback_query) {
      const data = body.callback_query.data;
      const chatId = body.callback_query.message.chat.id;
      const messageId = body.callback_query.message.message_id;

      if (data.startsWith("confirm_")) {
        const time = data.replace("confirm_", "");

        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `✅ Запись подтверждена\n⏰ ${time}`,
          }),
        });

        await fetch("https://formsubmit.co/ajax/" + EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Новая подтвержденная запись",
            message: `Запись подтверждена на ${time}`,
          }),
        });
      }
    }

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
