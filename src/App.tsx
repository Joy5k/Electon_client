import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="">
      <Navbar />
      <div style={{ marginTop: '90px' }}> {/* Adjust the margin to match the height of your navbar */}
        <ProtectedRoute>
        <HomePage />
          <About />
        </ProtectedRoute>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
