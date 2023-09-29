import { TBoard, TColumn, TTask } from "@/Types/FirebaseTypes";
import React, { useState, useEffect } from "react";
import { DocumentReference } from "firebase/firestore";
import Column from "./Column";
type BoardBuildProps = {
  boardProps: TBoard;
  selectedDate: Date;
};

function BoardBuild(props: BoardBuildProps) {
  const { selectedDate, boardProps } = props;

  const [board, setBoard] = useState<TColumn[]>([]);

  useEffect(() => {
    const newBoard = buildBoard(boardProps, selectedDate);
    setBoard(newBoard);
  }, [selectedDate]);

  //Build All Columns that were created before the selected date and were not archived
  const buildColumns = (board: TBoard, date: Date) => {
    const { columns } = board;
    const columnsBeforeDate = columns.filter((column) => {
      if (column.archived && column.archivedDate) {
        if (column.archivedDate > date && column.createdDate < date) {
          return true;
        }
      } else if (column.createdDate < date) {
        return true;
      }
    });
    return columnsBeforeDate;
  };

  const retrieveAllTasks = (board: TBoard, date: Date): TTask[] => {
    //Find all tasks that were visible on the selected date
    const { columns, archived } = board;
    const activeTasks = columns
      .map((column) => {
        return column.tasks.filter((task) => {
          if (task.archivedDate) {
            if (task.archivedDate > date && task.assignedDate < date) {
              return true;
            }
          } else if (task.assignedDate < date) {
            return true;
          }
        });
      })
      .flat();

    const archivedTasks = archived.filter((task) => {
      if (task.archivedDate) {
        if (task.archivedDate > date && task.assignedDate < date) {
          return true;
        }
      }
    });

    return [...activeTasks, ...archivedTasks];
  };

  const findTaskLocation = (task: TTask, date: Date): string | undefined => {
    //Should return the ID of the column that the task was in on the selected date

    for (let i = task.locationColumn.length - 1; i >= 0; i--) {
      if (task.locationDate[i] <= date) {
        return task.locationColumn[i].id;
      }
    }
  };

  const buildBoard = (board: TBoard, date: Date): TColumn[] => {
    const columns = buildColumns(board, date);
    const tasks = retrieveAllTasks(board, date);
    //For each task, find the column it was in on the selected date and then assign it to the correct column
    const updatedColumns = columns.map((column) => {
      const columnTasks = tasks.filter((task) => {
        return findTaskLocation(task, date) === column.id;
      });
      return { ...column, tasks: columnTasks };
    });

    return updatedColumns;
  };

  return (
    <section className="ml-16 g flex flex-col md:flex-row  py-8 w-full mr-12 sm:mr-16 md:mr-0 relative">
      <div className="w-full column-container my-10 md:my-0">
        {board.map((column) => {
          return <Column key={column.id} column={column} />;
        })}
      </div>
    </section>
  );
}

export default BoardBuild;
