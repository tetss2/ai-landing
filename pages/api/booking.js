export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { time } = JSON.parse(req.body);

    const TELEGRAM_TOKEN = "8435899229:AAGcAdtIFokpI3uFoPO7EfmHcSGVTbXGy7I";
    const CHAT_ID = "109664871";

    const message = `
🧠 Новая заявка на консультацию

⏰ Время: ${time}

Нужно подтвердить запись
`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Подтвердить запись",
                callback_data: `confirm_${time}`,
              },
            ],
          ],
        },
      }),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
