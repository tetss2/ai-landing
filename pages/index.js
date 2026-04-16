import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const times = [
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00"
  ];

  const handleSubmit = async () => {
    if (!selectedTime) {
      alert("Выберите время");
      return;
    }

    await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify({ time: selectedTime }),
    });

    alert("Заявка отправлена");
    setOpen(false);
  };

  return (
    <main style={{
      fontFamily: 'Arial, sans-serif',
      background: '#f7f3ef',
      color: '#2d2d2d'
    }}>

      {/* HERO */}
      <section style={sectionStyle}>
        <div style={{flex: 1}}>
          <h1>Динара Качаева</h1>
          <p>Клинический психолог, г. Москва</p>

          <button style={btnMain} onClick={() => setOpen(true)}>
            Записаться на консультацию
          </button>
        </div>

        <div style={{flex: 1}}>
          <img src="https://via.placeholder.com/450" style={imgStyle}/>
        </div>
      </section>

      {/* CTA */}
      <section style={ctaStyle}>
        <h2>Записаться на консультацию</h2>

        <button style={btnMain} onClick={() => setOpen(true)}>
          Выбрать время
        </button>

        <p style={{marginTop: '20px'}}>
          📞 +7 926 529-99-79  
          <br/>
          Telegram: @Dikalive
        </p>
      </section>

      {/* MODAL */}
      {open && (
        <div style={modalOverlay}>
          <div style={modal}>
            
            <h2>Выберите время</h2>

            <div style={{marginTop: '20px'}}>
              {times.map((t) => (
                <button
                  key={t}
                  style={{
                    ...timeBtn,
                    background: selectedTime === t ? "#b08968" : "#eee",
                    color: selectedTime === t ? "#fff" : "#000"
                  }}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{marginTop: '30px'}}>
              <button style={btnMain} onClick={handleSubmit}>
                Записаться
              </button>

              <button style={btnCancel} onClick={() => setOpen(false)}>
                Закрыть
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

const sectionStyle = {
  padding: '60px 20px',
  maxWidth: '1100px',
  margin: '0 auto',
  display: 'flex',
  gap: '40px',
  alignItems: 'center'
};

const imgStyle = {
  width: '100%',
  borderRadius: '16px'
};

const ctaStyle = {
  background: '#ede0d4',
  padding: '60px 20px',
  textAlign: 'center'
};

const btnMain = {
  marginTop: '20px',
  padding: '14px 22px',
  background: '#b08968',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const btnCancel = {
  marginLeft: '10px',
  padding: '14px 22px',
  background: '#ccc',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modal = {
  background: '#fff',
  padding: '30px',
  borderRadius: '12px',
  width: '400px',
  textAlign: 'center'
};

const timeBtn = {
  margin: '5px',
  padding: '10px 15px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer'
};
