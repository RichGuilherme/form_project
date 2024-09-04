import "./App.css";
import { FormComponents } from "./components/form";
import ComponentTable from "./components/payloads";


function App() {

  return (
    <main className="flex flex-col gap-11 p-4">
      <FormComponents />
      <ComponentTable />
    </main>
  );
}

export default App;
