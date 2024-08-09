
import ProtectedRoute from "./components/layout/ProtectedRoute";

import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <div className="">
    
      <ProtectedRoute>
    <MainLayout></MainLayout>
    </ProtectedRoute>
     
    </div>
  );
}

export default App;
