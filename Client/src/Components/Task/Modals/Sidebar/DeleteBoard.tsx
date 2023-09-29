import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

type DeleteBoardProps = {
  boardID: string;
};
function DeleteBoard(props: DeleteBoardProps) {
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/boards/delete/${props.boardID}`)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/my`);
        }
      });
  };

  return (
    <DialogContent>
      <DialogTitle>Delete Board</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this board
      </DialogDescription>
      <DialogFooter>
        <DialogTrigger
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </DialogTrigger>
      </DialogFooter>
    </DialogContent>
  );
}

export default DeleteBoard;
