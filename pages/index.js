export default function Home() {
  return (
    <main style={{
      fontFamily: 'Arial, sans-serif',
      background: '#f7f3ef',
      color: '#2d2d2d'
    }}>

      {/* HERO */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'center'
      }}>
        
        <div style={{flex: 1}}>
          <h1 style={{fontSize: '36px'}}>
            Динара Качаева
          </h1>

          <p style={{marginTop: '10px', fontSize: '18px'}}>
            Клинический психолог, г. Москва
          </p>

          <p style={{marginTop: '20px'}}>
            Помогаю справляться с тревогой, кризисами, 
            проблемами в отношениях и внутренними конфликтами.
          </p>

          <button style={{
            marginTop: '30px',
            padding: '15px 25px',
            background: '#b08968',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Записаться на консультацию
          </button>
        </div>

        <div style={{flex: 1}}>
          <img 
            src="https://via.placeholder.com/450"
            style={{width: '100%', borderRadius: '16px'}}
          />
        </div>

      </section>

      {/* ОБО МНЕ */}
      <section style={{
        background: '#fff',
        padding: '60px 20px'
      }}>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>

          <h2>Обо мне</h2>

          <p style={{marginTop: '20px'}}>
            Психотерапия химической зависимости и других видов аддиктивного поведения. 
            Индивидуальный подход. Веду терапевтическую практику с 2001 года.
          </p>

          <p>
            Использую методы: гештальт, гипнотерапия, EMDR, 
            психодраматические расстановки, метафорические карты.
          </p>

          <p>
            Работаю с ПТСР, тревожными расстройствами, депрессией, 
            кризисами, проблемами в отношениях, самооценкой.
          </p>

        </div>
      </section>

      {/* С ЧЕМ РАБОТАЮ */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h2>С чем я работаю</h2>

        <ul style={{marginTop: '20px', lineHeight: '2'}}>
          <li>Тревожность, страхи, стресс</li>
          <li>Депрессия, апатия</li>
          <li>Проблемы в отношениях</li>
          <li>Личностные кризисы</li>
          <li>Зависимости</li>
          <li>Потеря, развод, утраты</li>
        </ul>
      </section>

      {/* ОБРАЗОВАНИЕ */}
      <section style={{
        background: '#fff',
        padding: '60px 20px'
      }}>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>
          <h2>Образование</h2>

          <ul style={{marginTop: '20px', lineHeight: '2'}}>
            <li>Гуманитарный институт г. Москвы (Психология)</li>
            <li>Московский психолого-социальный университет</li>
            <li>Московский институт гештальт-терапии</li>
            <li>Институт практической психологии</li>
            <li>EMDR, гипноз, травматерапия</li>
          </ul>
        </div>
      </section>

      {/* ФОТО */}
      <section style={{
        padding: '60px 20px',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          
          <img src="https://via.placeholder.com/300" style={{borderRadius: '12px'}} />
          <img src="https://via.placeholder.com/300" style={{borderRadius: '12px'}} />
          <img src="https://via.placeholder.com/300" style={{borderRadius: '12px'}} />
          <img src="https://via.placeholder.com/300" style={{borderRadius: '12px'}} />

        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#ede0d4',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2>Записаться на консультацию</h2>

        <p style={{marginTop: '10px'}}>
          Свяжитесь удобным способом
        </p>

        <div style={{marginTop: '20px'}}>

          <a href="https://wa.me/79265299979">
            <button style={btnStyle}>WhatsApp</button>
          </a>

          <a href="https://t.me/">
            <button style={btnStyle}>Telegram</button>
          </a>

        </div>

        <p style={{marginTop: '20px'}}>
          📞 +7 926 529-99-79
        </p>
      </section>

    </main>
  )
}

const btnStyle = {
  margin: '10px',
  padding: '14px 22px',
  background: '#b08968',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
}
