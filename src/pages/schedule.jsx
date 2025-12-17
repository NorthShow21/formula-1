import React from 'react';
import Meeting from '../components/Meeting';
import '../css/schedule.css';
import { Link } from 'react-router-dom';

function Schedule() {
  return (
    <section className='schedule'>
      <h1 className='schedule-title'>SCHEDULE</h1>
    <div className='schedule-card'>
        <Meeting />
    </div>
    <Link to="/prediction" className='prediction-link'><button className="predict-btn">Predict</button></Link>
    </section>
  );
}

export default Schedule;