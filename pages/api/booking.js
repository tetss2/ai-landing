export default async function handler(req, res) {
  const TOKEN = process.env.TELEGRAM_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  const body = req.body

  // 👉 1. Пришла заявка с сайта
  if (body.time) {
    const text = `🆕 Новая заявка на консультацию\n\n⏰ Время: ${body.time}`

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
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

    return res.status(200).json({ ok: true })
  }

  // 👉 2. Обработка нажатия кнопки
  if (body.callback_query) {
    const data = body.callback_query.data
    const messageId = body.callback_query.message.message_id

    if (data.startsWith('confirm_')) {
      const time = data.replace('confirm_', '')

      // обновляем сообщение
      await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          message_id: messageId,
          text: `✅ Запись подтверждена\n\n⏰ Время: ${time}`
        })
      })

      // 👉 ответ Telegram (обязательно!)
      await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: body.callback_query.id,
          text: 'Подтверждено'
        })
      })

      // 👉 отправка email (через FormSubmit)
      await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Запись подтверждена',
          message: `Клиент записан на ${time}`
        })
      })
    }

    return res.status(200).json({ ok: true })
  }

  return res.status(200).json({ ok: true })
}
