
const CountBox = (props) => {

  return (
    <div className="box" style={{ width: '220px' }}>
      <div className="header text-center mb-3">{ props.title }</div>
      <div className={'dash-card text-white rounded p-2 bg-' + props.color}>
        {props.children}
      </div>
    </div>
  );
}

export default CountBox;