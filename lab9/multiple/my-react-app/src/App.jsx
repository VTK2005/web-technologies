import StudentCard from "./StudentCard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Student Cards</h1>

      <StudentCard name="Tarun" department="CSE" marks="92" />
      <StudentCard name="Rahul" department="ECE" marks="88" />
      <StudentCard name="Priya" department="IT" marks="95" />
      <StudentCard name="Anjali" department="Mechanical" marks="85" />
    </div>
  );
}

export default App;