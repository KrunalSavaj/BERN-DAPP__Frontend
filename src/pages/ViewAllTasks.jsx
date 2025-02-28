import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const ViewAllTasks = () => {
    const [taskList, setTakList] = useState([]);

    useEffect(() => {
        const allTask = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/ethereum/viewAlltask",
                    {
                        method: "GET",
                        header: {
                            "content-type": "application/json",
                        },
                    }
                );
                const data = await res.json();

                if (data.status == 200) {
                    console.log(data.tasksList);
                    setTakList(data.tasksList);
                }
            } catch (err) {
                console.log(err);
            }
        };
        allTask();
    }, []);
    return (
        <>
           <Navigation/>
      <div className="view_all_tasks">
      {taskList.map((task)=>{
        return(
            <div 
            className="view_all_tasks_card"
            key={task.id}
            style={task.id!=="" && task.name!=="" && task.date!=="" ? {} : {display:"none"}}
            >   
                <p>{task.taskId}</p>
                <p>{task.name}</p>
                <p>{task.date}</p>
            </div>
        )
      })}
      </div>
        </>
    );
};

export default ViewAllTasks;
