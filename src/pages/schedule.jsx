import React from 'react';
import Meeting from '../components/Meeting';
import '../css/schedule.css';

function Schedule() {
  return (
    <section className='schedule'>
      <h1 className='schedule-title'>SCHEDULE</h1>
    <div className='schedule-card'>
        <Meeting />
    </div>
    <button className="predict-btn">Predict</button>
    </section>
  );
}

export default Schedule;