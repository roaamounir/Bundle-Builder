import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accordion from "./components/Accordion/Accordion";
import ReviewPanel from "./components/ReviewPanel/ReviewPanel";
import LearnMorePage from "./pages/LearnMorePage";
import { Toaster } from 'react-hot-toast';
function Home() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <Accordion />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <ReviewPanel />
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more/:id" element={<LearnMorePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;