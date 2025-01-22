import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader as homePageLoader } from "./pages/Homepage";
import NewNotePage from "./pages/NewNotePage";
import NoteDetails, { loader as detailsLoader } from "./pages/NoteDetailsPage";
import { action as newNoteAction } from "./components/NewNotePage/NoteForm";
import DeletedPage, { loader as recentDeletePage } from "./pages/DeletedPage";
import { motion, AnimatePresence } from "motion/react";
import { Suspense } from "react";
import MainLayout from "./pages/layouts/MainLayout";

// REACT-ROUTER ROUTES DECLARATION
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: (
          <PageTransition>
            <HomePage />
          </PageTransition>
        ),
        loader: homePageLoader,
      },
      {
        path: "newNote",
        element: (
          <PageTransition mode="wait">
            <NewNotePage />
          </PageTransition>
        ),
        action: newNoteAction,
      },
      {
        path: ":noteId",
        element: (
          <PageTransition mode="wait">
            <NoteDetails />
          </PageTransition>
        ),
        loader: detailsLoader,
      },
      {
        path: "deleted",
        element: (
          <PageTransition mode="wait">
            <DeletedPage />
          </PageTransition>
        ),
        loader: recentDeletePage,
      },
    ],
  },
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;

function PageTransition({ children }) {
  return (
    <motion.div
      key={window.location.pathname}
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
