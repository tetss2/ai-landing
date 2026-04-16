export default async function handler(req, res) {
  console.log('--- NEW REQUEST ---')

  try {
    const TOKEN = process.env.TELEGRAM_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    console.log('TOKEN:', TOKEN ? 'OK' : 'MISSING')
    console.log('CHAT_ID:', CHAT_ID)

    // парсим body
    let body = {}
    try {
      body =
        typeof req.body === 'string'
          ? JSON.parse(req.body)
          : req.body
    } catch (e) {
      body = {}
    }

    console.log('BODY:', body)

    // =========================
    // 1. ОБРАБОТКА КНОПКИ (callback)
    // =========================
    if (body.callback_query) {
      const chatId = body.callback_query.message.chat.id
      const data = body.callback_query.data

      console.log('CALLBACK:', data)

      if (data.startsWith('confirm_')) {
        const time = data.replace('confirm_', '')

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: `✅ Запись подтверждена\n⏰ Время: ${time}`,
          }),
        })
      }

      return res.status(200).json({ ok: true })
    }

    // =========================
    // 2. НОВАЯ ЗАЯВКА
    // =========================
    if (body.time) {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `📩 Новая заявка\n⏰ Время: ${body.time}`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '✅ Подтвердить',
                    callback_data: `confirm_${body.time}`,
                  },
                ],
              ],
            },
          }),
        }
      )

      const tgData = await tgRes.json()
      console.log('TELEGRAM RESPONSE:', tgData)

      return res.status(200).json({ ok: true })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('ERROR:', err)
    return res.status(500).json({ ok: false })
  }
}
