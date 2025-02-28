//import { useState } from "react";

import Navigation from "../components/Navigation";

// eslint-disable-next-line react/prop-types
const CreateTask = ({ state }) => {
    const createTask = async (event) => {
        event.preventDefault();
        // eslint-disable-next-line react/prop-types
        const { contract, account } = state;
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;

        try {
            const res = await fetch(
                "http://localhost:3000/api/ethereum/create-task",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ taskDate: taskDate }),
                }
            );

            const data = await res.json();
            console.log(data);
            if (data.status === 200) {
                // eslint-disable-next-line react/prop-types
                if (contract && contract.methods) {
                    // eslint-disable-next-line react/prop-types
                    await contract.methods
                        // eslint-disable-next-line react/prop-types
                        .createTask(taskName, taskDate)
                        .send({ from: account });
                    alert("Task is added");
                }
            } else {
                alert("Task cannot be added");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navigation />
            <form onSubmit={createTask}>
                <label>
                    Name:
                    <input id="taskName" />
                </label>
                <label>
                    Date:
                    <input id="taskDate" />
                </label>
                <button type="submit">Create Task</button>
            </form>
        </>
    );
};

export default CreateTask;
