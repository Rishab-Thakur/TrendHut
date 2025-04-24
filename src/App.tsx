import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { NotificationPermission, onFirebaseMessage } from "./firebase";

const App: React.FC = () => {
  useEffect(() => {
    NotificationPermission();
    onFirebaseMessage();
  }, []);

  return <AppRoutes />;
};

export default App;
