import Navigation from "../components/Navigation";

// eslint-disable-next-line react/prop-types
const DeleteTask = ({ state }) => {
    const deleteTask = async (event) => {
        event.preventDefault();

        // eslint-disable-next-line react/prop-types
        const { contract, account } = state;

        const taskId = document.querySelector("#taskID").value;

        try {
            const res = await fetch(
                `http://localhost:3000/api/ethereum/delete-task/${taskId}`,
                {
                    method: "POST",
                    header: {
                        "content-type": "application/json",
                    },
                }
            );
            const data = await res.json();

            if (data.status === 200) {
                // eslint-disable-next-line react/prop-types
                await contract.methods
                    // eslint-disable-next-line react/prop-types
                    .deleteTask(taskId - 1)
                    .send({ from: account });
                alert("Task Deleted SuccessFuly");
            } else {
                alert(`${data.message}`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navigation />
            <form onSubmit={deleteTask}>
                <label>
                    ID:
                    <input id="taskID"></input>
                </label>

                <button type="submit"> DELETE TASK </button>
            </form>
        </>
    );
};

export default DeleteTask;
