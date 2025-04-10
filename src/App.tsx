import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { useQuery } from "@tanstack/react-query";
import { IssueModalProvider } from "@/app/providers/IssueModalProvider.tsx";

function App() {
  return (
    <>
      <IssueModalProvider />
    </>
  );
}

export default App;
