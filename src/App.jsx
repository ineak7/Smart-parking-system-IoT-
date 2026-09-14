import React, { useState } from 'react';

const initialSlots = [
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `G-${i + 1}`,
    floor: 'G',
    status: i % 3 === 0 ? 'occupied' : i % 7 === 0 ? 'booked' : 'free',
    vehicleNumber: i % 3 === 0 ? `HR-26-AB-${1000 + i}` : null,
    parkedTime: i % 3 === 0 ? '1 hr 15 mins' : null,
  })),
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `A-${i + 1}`,
    floor: 'A',
    status: i % 4 === 0 ? 'occupied' : i % 5 === 0 ? 'booked' : 'free',
    vehicleNumber: i % 4 === 0 ? `PB-08-XY-${2000 + i}` : null,
    parkedTime: i % 4 === 0 ? '45 mins' : null,
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `B-${i + 1}`,
    floor: 'B',
    status: i % 2 === 0 ? 'occupied' : 'free',
    vehicleNumber: i % 2 === 0 ? `DL-3C-ZZ-${3000 + i}` : null,
    parkedTime: i % 2 === 0 ? '2 hrs 30 mins' : null,
  })),
];

export default function App() {
  const [slots, setSlots] = useState(initialSlots);
  const [activeFloor, setActiveFloor] = useState('G');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingHours, setBookingHours] = useState(1);

  const currentFloorSlots = slots.filter((slot) => slot.floor === activeFloor);

  const totalSlots = slots.length;
  const occupiedCount = slots.filter((s) => s.status === 'occupied').length;
  const bookedCount = slots.filter((s) => s.status === 'booked').length;
  const freeCount = totalSlots - occupiedCount - bookedCount;

  const handleBookSlot = () => {
    setSlots(
      slots.map((s) =>
        s.id === selectedSlot.id
          ? { ...s, status: 'booked', vehicleNumber: 'YOUR-CAR-01', parkedTime: 'Pre-booked' }
          : s
      )
    );
    setSelectedSlot(null);
    alert(`Slot ${selectedSlot.id} successfully booked for ${bookingHours} hour(s)! Total: ₹${bookingHours * 100}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#34d399', margin: 0 }}>Smart Parking System</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>Real-time 100-Slot Monitoring & Management Dashboard</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '8px 16px', borderRadius: '8px', border: '1px solid #334155', fontSize: '14px' }}>
            Rate: <span style={{ fontWeight: 'bold', color: '#34d399' }}>₹100 / hour</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Total Capacity</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{totalSlots}</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <p style={{ color: '#34d399', fontSize: '13px', margin: 0, fontWeight: 500 }}>Free Slots</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#34d399', margin: '4px 0 0 0' }}>{freeCount}</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            <p style={{ color: '#f43f5e', fontSize: '13px', margin: 0, fontWeight: 500 }}>Occupied Slots</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f43f5e', margin: '4px 0 0 0' }}>{occupiedCount}</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <p style={{ color: '#60a5fa', fontSize: '13px', margin: 0, fontWeight: 500 }}>Pre-Booked</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#60a5fa', margin: '4px 0 0 0' }}>{bookedCount}</p>
          </div>
        </div>

        {/* Floor Selection Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {['G', 'A', 'B'].map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: activeFloor === floor ? 'none' : '1px solid #334155',
                backgroundColor: activeFloor === floor ? '#34d399' : '#1e293b',
                color: activeFloor === floor ? '#0f172a' : '#cbd5e1',
                transition: 'all 0.2s',
              }}
            >
              Floor {floor} ({floor === 'G' ? '35 Slots' : floor === 'A' ? '35 Slots' : '30 Slots'})
            </button>
          ))}
        </div>

        {/* Slots Grid Container */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#cbd5e1' }}>Floor {activeFloor} Layout</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '12px' }}>
            {currentFloorSlots.map((slot) => {
              let bg = 'rgba(16, 185, 129, 0.1)';
              let border = 'rgba(16, 185, 129, 0.3)';
              let color = '#34d399';

              if (slot.status === 'occupied') {
                bg = 'rgba(244, 63, 94, 0.1)';
                border = 'rgba(244, 63, 94, 0.3)';
                color = '#f43f5e';
              } else if (slot.status === 'booked') {
                bg = 'rgba(59, 130, 246, 0.1)';
                border = 'rgba(59, 130, 246, 0.3)';
                color = '#60a5fa';
              }

              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    backgroundColor: bg,
                    border: `1px solid ${border}`,
                    color: color,
                    padding: '12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75px',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{slot.id}</span>
                  <span style={{ fontSize: '10px', marginTop: '4px', textTransform: 'uppercase', opacity: 0.9 }}>
                    {slot.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Pop-up */}
        {selectedSlot && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', maxWidth: '400px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>Slot Details: {selectedSlot.id}</h3>
                <button onClick={() => setSelectedSlot(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '22px', cursor: 'pointer' }}>&times;</button>
              </div>

              <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong style={{ color: '#94a3b8' }}>Floor:</strong> {selectedSlot.floor}</p>
                <p style={{ margin: '4px 0' }}><strong style={{ color: '#94a3b8' }}>Status:</strong> <span style={{ textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '12px' }}>{selectedSlot.status}</span></p>
                {selectedSlot.vehicleNumber && <p style={{ margin: '4px 0' }}><strong style={{ color: '#94a3b8' }}>Vehicle No:</strong> {selectedSlot.vehicleNumber}</p>}
                {selectedSlot.parkedTime && <p style={{ margin: '4px 0' }}><strong style={{ color: '#94a3b8' }}>Duration:</strong> {selectedSlot.parkedTime}</p>}
              </div>

              {selectedSlot.status === 'free' ? (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Select Booking Duration (Hours):</label>
                    <select
                      value={bookingHours}
                      onChange={(e) => setBookingHours(Number(e.target.value))}
                      style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: '#f8fafc', fontSize: '14px', outline: 'none' }}
                    >
                      <option value={1}>1 Hour (₹100)</option>
                      <option value={2}>2 Hours (₹200)</option>
                      <option value={3}>3 Hours (₹300)</option>
                      <option value={5}>5 Hours (₹500)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleBookSlot} style={{ flex: 1, backgroundColor: '#34d399', color: '#0f172a', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                      Confirm & Pay ₹{bookingHours * 100}
                    </button>
                    <button onClick={() => setSelectedSlot(null)} style={{ padding: '10px 16px', backgroundColor: '#334155', color: '#f8fafc', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setSelectedSlot(null)} style={{ width: '100%', backgroundColor: '#334155', color: '#f8fafc', fontWeight: 'bold', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Close</button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}