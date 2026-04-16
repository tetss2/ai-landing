export default async function handler(req, res) {

  const TOKEN = process.env.TELEGRAM_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  const { name, contact, time } = req.body

  const text = `
Новая заявка:

Имя: ${name}
Контакт: ${contact}
Время: ${time}
  `

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text
    })
  })

  res.status(200).json({ ok: true })
}
