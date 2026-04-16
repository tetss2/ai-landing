export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html')

  res.send(`
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Динара Качаева</title>

<style>
body {
  margin:0;
  font-family: Arial;
  background:#fdfaf7;
  color:#2b2b2b;
}
.container {
  max-width:1100px;
  margin:auto;
  padding:40px 20px;
}
.hero {
  display:flex;
  gap:40px;
  flex-wrap:wrap;
  align-items:center;
}
.hero img {
  width:400px;
  border-radius:20px;
}
.btn {
  background:#d6a77a;
  color:#fff;
  padding:15px 25px;
  border-radius:10px;
  text-decoration:none;
}
.section {
  margin-top:60px;
}
.grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:20px;
}
.card {
  background:#fff;
  padding:20px;
  border-radius:15px;
}
.gallery img {
  width:100%;
  border-radius:15px;
}
input,select {
  width:100%;
  padding:12px;
  margin-top:10px;
}
button {
  margin-top:20px;
  padding:15px;
  width:100%;
  background:#d6a77a;
  color:#fff;
  border:none;
}
</style>
</head>

<body>

<div class="container">

<!-- HERO -->
<div class="hero">
  <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-10.jpeg" />
  <div>
    <h1>Динара Качаева</h1>
    <p>Практикующий психолог. Работа с тревогой, отношениями и внутренними кризисами.</p>
    <a href="#booking" class="btn">Записаться на консультацию</a>
  </div>
</div>

<!-- ABOUT -->
<div class="section">
  <h2>Обо мне</h2>
  <p>
    Более 10 лет практики. Помогаю разобраться в себе, выстроить внутреннюю опору и выйти из сложных жизненных ситуаций.
  </p>
</div>

<!-- PROBLEMS -->
<div class="section">
  <h2>С чем я работаю</h2>
  <div class="grid">
    <div class="card">Тревожность</div>
    <div class="card">Страх одиночества</div>
    <div class="card">Проблемы в отношениях</div>
    <div class="card">Выгорание</div>
  </div>
</div>

<!-- GALLERY -->
<div class="section gallery">
  <h2>Фотографии</h2>
  <div class="grid">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-10.jpeg">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-11.jpeg">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-2.jpeg">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-5.jpeg">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09-6.jpeg">
    <img src="https://4mcbnvc29yi2qylh.public.blob.vercel-storage.com/image-15-04-26-02-09.jpeg">
  </div>
</div>

<!-- BOOKING -->
<div class="section" id="booking">
  <h2>Запись на консультацию</h2>

  <form id="form">
    <input placeholder="Ваше имя" required>
    <input placeholder="Telegram или телефон" required>

    <select required>
      <option>Выберите время</option>
      <option>10:00</option>
      <option>12:00</option>
      <option>14:00</option>
      <option>16:00</option>
    </select>

    <button>Записаться</button>
  </form>
</div>

<!-- CONTACT -->
<div class="section">
  <h2>Контакты</h2>
  <a href="https://t.me/Dikalive" target="_blank">Написать в Telegram</a>
</div>

</div>

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

  alert('Заявка отправлена')
})
</script>

</body>
</html>
`)
}
