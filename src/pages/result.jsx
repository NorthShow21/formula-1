
import '../css/result.css';

function Result() {
  return (
    <div className="result">
        <header className="result-header">
            <h1>RESULT</h1>
        </header>
        <div className="result-subheader">
            <h2 className='result-meeting'>{meeting.meeting_official_name} - {session.session_name}</h2>
            <p className='result-date-location'>{meeting.date_start} - {meeting.location}</p>
        </div>
        <main className="result-table">
            
        </main>
    </div>
  );
}

export default Result;