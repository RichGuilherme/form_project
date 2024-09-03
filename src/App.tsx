import "./App.css"
import { DescriptionProductService } from "./components/descriptionProductService"

import { MoreInfor } from "./components/moreInfor"

function App() {

  return (
    <main className="flex flex-col gap-11 p-4">
      <MoreInfor />
      <DescriptionProductService />
    </main>
  )
}

export default App
