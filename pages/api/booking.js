export default async function handler(req, res) {
  const TOKEN = process.env.TELEGRAM_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  let body = {}

  // парсим body
  try {
    body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body
  } catch (e) {
    body = {}
  }

  console.log('BODY:', body)

  // ================================
  // 1. ЗАЯВКА С САЙТА
  // ================================
  if (body.time) {
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `📩 Новая заявка\n⏰ Время: ${body.time}`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '✅ Подтвердить запись',
                  callback_data: `confirm_${body.time}`
                }
              ]
            ]
          }
        })
      })

      const tgData = await tgRes.json()
      console.log('TELEGRAM RESPONSE:', tgData)

    } catch (e) {
      console.error('TELEGRAM ERROR:', e)
    }

    return res.status(200).json({ ok: true })
  }

  // ================================
  // 2. CALLBACK (кнопка в Telegram)
  // ================================
  if (body.callback_query) {
    const data = body.callback_query.data
    const chatId = body.callback_query.message.chat.id
    const messageId = body.callback_query.message.message_id

    if (data.startsWith('confirm_')) {
      const time = data.replace('confirm_', '')

      try {
        // меняем текст сообщения
        await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `✅ Запись подтверждена\n⏰ Время: ${time}`
          })
        })

        // отправка email через FormSubmit
        await fetch('https://formsubmit.co/ajax/your@email.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            time: time,
            message: `Новая запись на ${time}`
          })
        })

      } catch (e) {
        console.error('CONFIRM ERROR:', e)
      }
    }

    return res.status(200).json({ ok: true })
  }

  // ================================
  // 3. WEBHOOK ОТ TELEGRAM (fallback)
  // ================================
  if (body.message) {
    console.log('TELEGRAM MESSAGE:', body.message)
    return res.status(200).json({ ok: true })
  }

  return res.status(200).json({ ok: true })
}
