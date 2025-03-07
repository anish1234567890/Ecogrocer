function FarmBox({ farm, onClick }) {
  return (
    <div className="farm-box" onClick={() => onClick(farm.name)}>
      <img src={farm.logo} alt={`${farm.name} Logo`} className="farm-logo" />
      <h3>{farm.name}</h3>
      <p>{farm.description}</p>
      <button className="go-to-farm">Go To Farm</button>
    </div>
  );
}

export default FarmBox;
