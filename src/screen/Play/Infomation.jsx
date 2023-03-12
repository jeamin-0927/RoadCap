import './Infomation.css';

const Infomation = (props) => {
  const { time, round, score } = props;
  return (
    <div className='infomation'>
        <div className='info-node'>
          <div className='info-title'>경과시간</div>
          <div className='info-cont'>{time}</div>
        </div>
        <div className='info-node'>
          <div className='info-title'>라운드</div>
          <div className='info-cont'>{round}/5</div>
        </div>
        <div className='info-node'>
          <div className='info-title'>점수</div>
          <div className='info-cont'>{score}</div>
        </div>
      </div>
  );
}

export default Infomation;