import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<ChatPage />} path="/" />
    </Routes>
  );
}

export default AppRoutes;
