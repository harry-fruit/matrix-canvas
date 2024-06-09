import { useRef } from "react";
import MatrixEffect from "./components/MatrixEffect";
import Footer from "./components/Footer";

function App() {
  const ref = useRef<HTMLElement>(null);

  return (
    <main id="main" ref={ref}>
      <MatrixEffect parentRef={ref} />
      <Footer />
    </main>
  );
}

export default App;
