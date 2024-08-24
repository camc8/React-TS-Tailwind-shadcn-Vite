import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen grid place-content-center text-center space-y-3">
      <h1 className="text-3xl">Vite + React + Tailwind + TS + shadcn/ui</h1>
      <div className="card space-y-3">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <a href="https://ui.shadcn.com/docs/components/">shadcn/ui</a>
    </div>
  );
}

export default App;
