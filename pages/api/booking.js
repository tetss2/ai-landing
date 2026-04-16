export default async function handler(req, res) {
  const TOKEN = process.env.TELEGRAM_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  let body = {}

  // 👉 ВАЖНО: парсим body вручную
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch (e) {
    body = {}
  }

  console.log('BODY:', body)

  // 👉 1. Пришла заявка с сайта
  if (body.time) {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🆕 Новая заявка\n⏰ ${body.time}`
      })
    })

    return res.status(200).json({ ok: true })
  }

  // 👉 2. webhook от Telegram
  if (body.message || body.callback_query) {
    console.log('TELEGRAM UPDATE')

    if (body.callback_query) {
      await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: body.callback_query.id,
          text: 'OK'
        })
      })
    }

    return res.status(200).json({ ok: true })
  }

  return res.status(200).json({ ok: true })
}
