import "./App.css";
import { CreateLivro } from "./create-book";
import { Divisor } from "./create-book copy";
import { CreateUser } from "./create-user";

function App() {
  return (
    <div>
      <h1>Open Library</h1>
      <div className="mainContainer">
        <CreateUser />
        <Divisor />
        <CreateLivro />
      </div>
    </div>
  );
}

export default App;
