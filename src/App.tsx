
import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./components/layout/privateRoute";

function App() {
  return (
    <div className="">
    
      <PrivateRoute>
    <MainLayout></MainLayout>
    </PrivateRoute>
     
    </div>
  );
}

export default App;
