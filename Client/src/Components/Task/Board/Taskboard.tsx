import { useState, useEffect } from "react";
import axios from "axios";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import BoardColumn from "./BoardColumn";
import { TBoard, TColumn, TTask } from "@/Types/FirebaseTypes";
import AddColumn from "../Modals/AddColumn";

type boardProps = {
  board: TBoard;
};

function TaskBoardComp(board: boardProps) {
  const [bColumns, setBColumns] = useState(
    board.board.columns.filter((column) => {
      return !column.archived;
    })
  );

  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth >= 768 ? "horizontal" : "vertical");
    };

    window.addEventListener("resize", handleResize);

    // Initial direction based on window width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bColumns-length",
      bColumns.length.toString()
    );
  }, [bColumns.length]);

  const addNewColumn = (title: string): void => {
    //Add To Firebase and retrieve ID
    axios
      .post("http://localhost:3000/api/columns/create", {
        boardID: board.board.id,
        columnTitle: title,
      })
      .then((res) => {
        //Status 200 Should return of Column Type
        if (res.status === 200) {
          const newColumn = res.data;
          //Once Column has been inserted, add to the local state
          setBColumns((prev) => {
            return [...prev, newColumn];
          });
        }
      });
  };

  const handleColumnDelete = (columnIndex: number) => {
    //Remove from Local State
    const date = new Date();

    if (!bColumns[columnIndex].backLog) {
      setBColumns((prev) => {
        const allColumns = [...prev];
        allColumns[columnIndex].archived = true;
        allColumns[columnIndex].archivedDate = date;
        return allColumns.filter((column) => {
          return !column.archived;
        });
      });

      //Remove from Firebase
      axios.put("http://localhost:3000/api/columns/archive", {
        columnID: bColumns[columnIndex].id,
      });
    }
  };

  //Check to see if board has columns
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    //Rearrange Column Drag
    if (type === "column") {
      // const entries = Array.from(bColumns.entries());
      // const [removed] = entries.splice(source.index, 1);
      // entries.splice(destination.index, 0, removed);
      // setBColumns(new Map(entries));
      if (source.index === destination.index) return;

      //Do not allow user to swap the Backlog column

      if (bColumns[source.index].backLog || bColumns[destination.index].backLog)
        return;

      const entries = bColumns;
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      setBColumns(entries);
      //Console log the index of the swap
      axios.post("http://localhost:3000/api/columns/swap", {
        boardID: board.board.id,
        sourceIndex: source.index,
        destIndex: destination.index,
      });
    }
    //Rearrange Card Drag
    if (type === "card") {
      // console.log(source.index, destination.index)

      //Retrieve Column Keys

      const sourceColumn = bColumns[Number(source.droppableId)];
      const destColumn = bColumns[Number(destination.droppableId)];

      if (!source || !destination) {
        return;
      }
      //Same Position
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      //Same Column
      if (sourceColumn === destColumn) {
        //Retrieve Tasks

        const col: TColumn | undefined = sourceColumn;

        if (col) {
          const tasks = Array.from(col?.tasks);

          const [removed] = tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, removed);

          //Reassign the new tasks to the column
          const newCol: TColumn = { ...col, tasks: tasks };

          //Update the array of columns to reflect this new change in tasks
          setBColumns((prev) => {
            const updatedColumns = [...prev];
            updatedColumns[Number(source.droppableId)] = newCol;
            return updatedColumns;
          });
        }
      }
      //Different Column
      else {
        const sourceCol: TColumn | undefined = sourceColumn;
        const destCol: TColumn | undefined = destColumn;

        if (sourceCol && destCol) {
          const sTasks = Array.from(sourceCol?.tasks);
          const dTasks = Array.from(destCol?.tasks);

          const [removed] = sTasks.splice(source.index, 1);
          dTasks.splice(destination.index, 0, removed);

          //Refactor New Columns
          const sourceTasks: TColumn = { ...sourceCol, tasks: sTasks };
          const destTasks: TColumn = { ...destCol, tasks: dTasks };

          //Update the array of columns to reflect this new change in tasks
          setBColumns((prev) => {
            const updatedColumns = [...prev];
            updatedColumns[Number(source.droppableId)] = sourceTasks;
            updatedColumns[Number(destination.droppableId)] = destTasks;
            return updatedColumns;
          });
        }
      }
    }
  };

  return (
    <section className="ml-16 g flex flex-col md:flex-row  py-8 w-full mr-12 sm:mr-16 md:mr-0 relative">
      <div className="w-full column-container my-10 md:my-0">
        {bColumns ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {/*Board*/}
            <Droppable droppableId="board" type="column" direction={direction}>
              {(provided) => (
                <div
                  className="grid grid-cols-1 md:flex gap-5"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {bColumns.map((column, index) => {
                    return (
                      <BoardColumn
                        handleColumnDelete={handleColumnDelete}
                        key={column.id}
                        column={bColumns[index]}
                        index={index}
                      />
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <></>
        )}
      </div>
      <AddColumn callBack={addNewColumn} />
      <div className="px-5"></div>
    </section>
  );
}

export default TaskBoardComp;
