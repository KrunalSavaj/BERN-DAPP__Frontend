import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeleteTask from "./pages/DeleteTask";
import UpdateTask from "./pages/UpdateTask";
import ViewAllTasks from "./pages/ViewAllTasks";
import ViewTask from "./pages/ViewTask";

import "./App.css";
// import { Wallet } from "ethers";
import CreateTask from "./pages/CreateTask";
import Wallet from "./pages/Wallet";

function App() {
    const [state,setState] = useState({web3:null,contract:null,account:null})

    const saveState = ({ web3,contract,account }) => {
        setState({web3:web3,contract:contract,account:account})
    }
    const router = createBrowserRouter([
        { path: "/", element: <Wallet saveState={saveState} /> },
        { path: "/view-all-task", element: <ViewAllTasks /> },
        { path: "/create-task", element: <CreateTask state={state} /> },
        { path: "/view-task", element: <ViewTask /> },
        { path: "/update-task", element: <UpdateTask state={state} /> },
        { path: "/delete-task", element: <DeleteTask state={state} /> },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
