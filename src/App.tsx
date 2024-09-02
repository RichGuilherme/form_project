import "./App.css"
import { Descrition } from "./components/descrition"
import { MoreInfor } from "./components/moreInfor"

function App() {

  return (
    <main className="flex flex-col gap-11 p-4">
      <MoreInfor />
      <Descrition />
    </main>
  )
}

export default App
