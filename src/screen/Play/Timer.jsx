import './Timer.css';

const Timer = (props) => {
  const { time } = props;
  return (
    <div className='timer-outer'>
      <div className="timer">
        <div className='timer-bg-0 timer-bg'>
          <div className='timer-inner'>{time}</div>
        </div>
      </div>
    </div>
  );
}

export default Timer;