export default async function handler(req, res) {
  const TOKEN = process.env.TELEGRAM_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  try {
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

    // если пришла заявка с сайта
    if (body.time) {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `📩 Новая заявка\n⏰ Время: ${body.time}`
        })
      })

      return res.status(200).json({ ok: true })
    }

    // fallback
    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('ERROR:', err)
    return res.status(500).json({ ok: false })
  }
}
