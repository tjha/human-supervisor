import './App.css'
import React, { StrictMode} from "react";
import Table from "./components/table/Table"

function App() {

  return (
      <StrictMode>
          <div style={{ fontFamily: "Nunito" }}>
              <Table />
          </div>
      </StrictMode>
  )
}

export default App
