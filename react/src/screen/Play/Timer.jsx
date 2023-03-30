import { useRecoilState } from 'recoil';
import './Timer.css';
import { nowTimerRecoil } from '../../recoil/play';

const Timer = () => {
  const [nowTimer, setNowTimer] = useRecoilState(nowTimerRecoil);
  
  return (
    <div className='timer-outer'>
      <div className="timer">
        <div className='timer-bg-0 timer-bg'>
          <div className='timer-inner'>{nowTimer}</div>
        </div>
      </div>
    </div>
  );
}

export default Timer;