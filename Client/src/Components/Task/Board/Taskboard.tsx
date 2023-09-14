import { useState, useEffect } from "react";
import axios from "axios";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useParams } from 'react-router-dom';
import BoardColumn from "./BoardColumn";

function TaskBoardComp() {
  
  const [columns, setColumns] = useState(new Map());

  

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    //Rearrange Column Drag
    if (type === "column") {
      const entries = Array.from(columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      // syncSetColumns(new Map(entries));
    }
    //Rearrange Card Drag
    if (type === "card") {
      // console.log(source.index, destination.index)

      const boardColumns = Array.from(columns.keys());
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
        const tasks = Array.from(columns.get(sourceColumn));

        const [removed] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, removed);
        // syncSetColumns(new Map(columns.set(sourceColumn, tasks)));
      }
      //Different Column
      else {
        console.log(columns);
        console.log(sourceColumn, destColumn);
        const sourceTasks = Array.from(columns.get(sourceColumn));
        const destTasks = Array.from(columns.get(destColumn));

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
        // syncSetColumns(
        //   new Map(
        //     columns.set(sourceColumn, sourceTasks).set(destColumn, destTasks)
        //   )
        // );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/*Board*/}
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:flex gap-5  mx-16 py-8"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(columns.keys()).map((column, index) => {
              return (
                <BoardColumn
                  key={column}
                  id={column}
                  column={column}
                  index={index}
                  tasks={columns.get(column)}
                />
              );
            })}
            <div className="px-5"></div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskBoardComp;
