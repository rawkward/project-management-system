import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { IssueModalProvider } from "@/features/issues/model/context/issueModalProvider.tsx";

function App() {
  return (
    <IssueModalProvider>
      <RouterProvider router={router} />
    </IssueModalProvider>
  );
}

export default App;
