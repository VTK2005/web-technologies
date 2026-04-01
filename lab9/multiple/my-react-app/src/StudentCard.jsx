function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Department: {props.department}</p>
      <p>Marks: {props.marks}</p>
    </div>
  );
}

export default StudentCard;