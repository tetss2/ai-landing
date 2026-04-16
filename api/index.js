export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html')

  res.send(`
  <html>
  <body style="font-family:Arial; padding:40px">

  <h1>Динара Качаева</h1>

  <img width="400"
  src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-10.jpeg"/>

  <h2>Запись</h2>

  <form id="form">
    <input placeholder="Имя"><br><br>
    <input placeholder="Telegram"><br><br>

    <select>
      <option>10:00</option>
      <option>12:00</option>
    </select><br><br>

    <button>Отправить</button>
  </form>

  <script>
  document.getElementById('form').addEventListener('submit', async (e)=>{
    e.preventDefault()

    const data = {
      name: e.target[0].value,
      contact: e.target[1].value,
      time: e.target[2].value
    }

    await fetch('/api/send',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })

    alert('Отправлено')
  })
  </script>

  </body>
  </html>
  `)
}
