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
  const [bColumns, setBColumns] = useState(board.board.columns);
  console.log(bColumns);
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
          if (bColumns.size) {
            //Add to the end of the map
            setBColumns(new Map(bColumns.set(title, newColumn)));
          } else {
            //Add to the start of the map
            setBColumns(new Map().set(title, newColumn));
          }
        }
      });
  };

  //Check to see if board has columns
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    //Rearrange Column Drag
    if (type === "column") {
      const entries = Array.from(bColumns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      setBColumns(new Map(entries));
    }
    //Rearrange Card Drag
    if (type === "card") {
      // console.log(source.index, destination.index)

      //Retrieve Column Keys
      const boardColumns = Array.from(bColumns.keys());
      const sourceColumn = boardColumns[Number(source.droppableId)];
      const destColumn = boardColumns[Number(destination.droppableId)];

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

        const col: TColumn | undefined = bColumns.get(sourceColumn);

        if (col) {
          const tasks = Array.from(col?.tasks);

          const [removed] = tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, removed);

          //Reassign the new tasks to the column
          const newCol: TColumn = { ...col, tasks: tasks };

          setBColumns(new Map(bColumns.set(sourceColumn, newCol)));
        }
      }
      //Different Column
      else {
        const sourceCol: TColumn | undefined = bColumns.get(sourceColumn);
        const destCol: TColumn | undefined = bColumns.get(destColumn);

        if (sourceCol && destCol) {
          const sTasks = Array.from(sourceCol?.tasks);
          const dTasks = Array.from(destCol?.tasks);

          const [removed] = sTasks.splice(source.index, 1);
          dTasks.splice(destination.index, 0, removed);

          //Refactor New Columns
          const sourceTasks: TColumn = { ...sourceCol, tasks: sTasks };
          const destTasks: TColumn = { ...destCol, tasks: dTasks };

          setBColumns(() => {
            return new Map(
              bColumns.set(sourceColumn, sourceTasks).set(destColumn, destTasks)
            );
          });
        }
      }
    }
  };

  return (
    <section className="ml-16 grid grid-cols-1 md:flex  py-8">
      {bColumns.size ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/*Board*/}
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:flex gap-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Array.from(bColumns.keys()).map((column, index) => {
                  return (
                    <BoardColumn
                      key={column}
                      column={bColumns.get(column)}
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
      <AddColumn callBack={addNewColumn} />
      <div className="px-5"></div>
    </section>
  );
}

export default TaskBoardComp;
