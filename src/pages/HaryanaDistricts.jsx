import React from 'react';

const districtsData = [
  { name: 'Ambala', img: '/HayranaDistPage/Ambala.jpg', officials: [{name: 'Navneet Kaur Dhillon', post: 'Sr. Vice President'}, {name: 'Pushkar Saini', post: 'Sr. Vice President'}] },
  { name: 'Bhiwani', img: '/HayranaDistPage/Bhiwani.jpg', officials: [] },
  { name: 'Charkhi Dadri', img: '/HayranaDistPage/Charkhi Dadri.jpg', officials: [] },
  { name: 'Faridabad', img: '/HayranaDistPage/Faridabad.jpg', officials: [] },
  { name: 'Fatehabad', img: '/HayranaDistPage/Fatehabad.jpg', officials: [] },
  { name: 'Gurugram', img: '/HayranaDistPage/Gurugram.jpg', officials: [] },
  { name: 'Hansi', img: '/HayranaDistPage/Hansi.jpg', officials: [] },
  { name: 'Hisar', img: '/HayranaDistPage/Hisar.jpg', officials: [{name: 'Narender Singh', post: 'President'}] },
  { name: 'Jhajjar', img: '/HayranaDistPage/Jhajjar.jpg', officials: [{name: 'Col. S. S. Ahlawat', post: 'General Secretary'}] },
  { name: 'Jind', img: '/HayranaDistPage/Jind.jpg', officials: [{name: 'K. D. Singh', post: 'Vice President'}] },
  { name: 'Kaithal', img: '/HayranaDistPage/Kaithal.jpg', officials: [] },
  { name: 'Karnal', img: '/HayranaDistPage/Karnal.jpg', officials: [] },
  { name: 'Kurukshetra', img: '/HayranaDistPage/Kurukshetra.jpg', officials: [] },
  { name: 'Mahendragarh', img: '/HayranaDistPage/Mahendragarh.jpg', officials: [] },
  { name: 'Nuh', img: '/HayranaDistPage/Nuh.jpg', officials: [] },
  { name: 'Palwal', img: '/HayranaDistPage/Palwal.jpg', officials: [] },
  { name: 'Panchkula', img: '/HayranaDistPage/Panchkula.jpg', officials: [{name: 'Brigadier Kashyap', post: 'Sr. Vice President'}] },
  { name: 'Panipat', img: '/HayranaDistPage/Panipat.jpg', officials: [{name: 'Subhash Chander', post: 'Treasurer'}] },
  { name: 'Rewari', img: '/HayranaDistPage/Rewari.jpg', officials: [] },
  { name: 'Rohtak', img: '/HayranaDistPage/Rohtak.jpg', officials: [{name: 'Randeep Hooda', post: 'Sr. Vice President'}, {name: 'Preety Verma', post: 'Vice President'}] },
  { name: 'Sirsa', img: '/HayranaDistPage/Sirsa.jpg', officials: [] },
  { name: 'Sonipat', img: '/HayranaDistPage/Sonipat.jpg', officials: [{name: 'Col. Rajeev Dahiya', post: 'Vice President'}] },
  { name: 'Yamunanagar', img: '/HayranaDistPage/Yamunanagar.jpg', officials: [{name: 'Neeraj Goyat', post: 'Vice President'}] }
];

const styleSheet = `
  .flip-card {
    background-color: transparent;
    perspective: 1000px;
    height: 240px;
    cursor: pointer;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    border-radius: 20px;
  }
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
    box-shadow: 0 25px 35px -5px rgba(0, 0, 0, 0.6);
  }
  .flip-card.flipped .front-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%) !important;
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
  }
  .flip-card-front {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-size: cover;
    background-position: center;
  }
  .flip-card-back {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
    backdrop-filter: blur(10px);
    color: white;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid rgba(203, 163, 88, 0.4);
  }
  @keyframes subtle-pulse {
    0% { opacity: 0.4; transform: scale(0.95); }
    50% { opacity: 0.9; transform: scale(1.05); }
    100% { opacity: 0.4; transform: scale(0.95); }
  }
`;

const HaryanaDistricts = () => {
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingTop: '160px', 
      paddingBottom: '80px', 
      paddingLeft: '20px', 
      paddingRight: '20px', 
      background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 27, 75, 0.9)), url("/IMG/Horse/1.jpg") no-repeat center center / cover',
      backgroundAttachment: 'fixed',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      fontFamily: 'Inter, Roboto, sans-serif' 
    }}>
      <style>{styleSheet}</style>
      
      <h1 style={{ fontSize: '3rem', color: '#ffffff', marginBottom: '15px', textAlign: 'center', fontWeight: '800', letterSpacing: '0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
        Explore Haryana
      </h1>
      <p style={{ color: '#cbd5e1', fontSize: '1.2rem', marginBottom: '60px', textAlign: 'center', maxWidth: '700px', lineHeight: '1.6', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
        Discover the 23 magnificent districts of Haryana and their respective officials.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1400px'
      }}>
        {districtsData.map((district, index) => (
          <div 
            key={index} 
            className={`flip-card ${clickedIndex === index || hoveredIndex === index ? 'flipped' : ''}`}
            onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flip-card-inner">
              
              {/* FRONT OF CARD */}
              <div 
                className="flip-card-front" 
                style={{ backgroundImage: `url('${district.img}')` }}
              >
                <div className="front-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
                  transition: 'all 0.4s ease',
                  zIndex: 1
                }}></div>

                <div className="number-badge" style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  zIndex: 2,
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  {index + 1}
                </div>

                <div style={{ position: 'relative', zIndex: 2, padding: '25px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700', letterSpacing: '0.05em', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
                    {district.name}
                  </h2>
                  <div style={{ width: '24px', height: '2px', backgroundColor: '#cba358', marginBottom: '10px' }}></div>
                  <p style={{ color: '#cba358', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                    HOVER FOR MORE INFORMATION
                  </p>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="flip-card-back">
                <h3 style={{ fontSize: '1.4rem', color: '#cba358', marginBottom: '15px', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', borderBottom: '1px solid rgba(203, 163, 88, 0.3)', paddingBottom: '10px', width: '80%' }}>
                  {district.name}
                </h3>
                
                <div style={{ width: '100%', padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {district.officials.length > 0 ? (
                    district.officials.map((official, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600' }}>{official.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{official.post}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', marginTop: '10px' }}>
                      More information coming soon.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HaryanaDistricts;
