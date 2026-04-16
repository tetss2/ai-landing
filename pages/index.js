export default function Home() {
  return (
    <main style={{
      fontFamily: 'Arial',
      padding: '40px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      
      <h1 style={{fontSize: '42px'}}>
        AI Content Factory
      </h1>

      <p style={{fontSize: '18px', marginTop: '10px'}}>
        Automate your content creation using AI. Generate posts, images, and videos at scale.
      </p>

      <section style={{marginTop: '40px'}}>
        <h2>🚀 Features</h2>
        <ul>
          <li>AI-generated text</li>
          <li>Image & video pipeline</li>
          <li>Telegram bot integration</li>
        </ul>
      </section>

      <section style={{marginTop: '40px'}}>
        <h2>💰 Pricing</h2>
        <p>Start for free. Upgrade anytime.</p>
      </section>

      <section style={{marginTop: '40px'}}>
        <h2>📩 Contact</h2>
        <p>Email: your@email.com</p>
      </section>

    </main>
  )
}
