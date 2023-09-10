import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Auth, getAuth, onAuthStateChanged} from 'firebase/auth'
import { TBoard, TUser } from '@/Types/FirebaseTypes'

const retrieveUser = (userID: string):TUser| null => {
    axios.get(`http://localhost:3000/api/users/${userID}`).then(res => {
        const userData: TUser = res.data
        return userData
    }).catch(err => {
        console.log(err)
        return null
    }
    )
    return null


}

const isUserInBoard = (board: TBoard, userID: string): boolean => {

    const user = retrieveUser(userID)
    if (user === null) {
        return false
    }
    const allUsers: TUser[] = [...board.adminUsers, ...board.memberUsers];
    const userIDs: string[] = allUsers.map(user => user.uid)
    return userIDs.includes(userID)

}



function useBoard(boardID: string | undefined) {
    const [error, setError] = useState(false)
    const [board, setBoard] = useState<TBoard | null>()
    const [userAccess, setUserAccess] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchBoard = async () => {
            //Retrieve User ID
            const auth: Auth = getAuth();

            //Retrieve board from endpoint
            axios.get(`http://localhost:3000/api/boards/board/get/${boardID}`).then(res => {
                //Parse Board Data into Type
                const boardData: TBoard = res.data
                console.log(boardData)
                //Check if user is in board
                const userInBoard = isUserInBoard(boardData, auth.currentUser?.uid || "")
                //Set board state
                setBoard(boardData)
                //Set user access state
                setUserAccess(userInBoard)
                //Set loading state
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setError(true)
            })

        }
        fetchBoard()
    },[])

    return {board, userAccess, loading, error}
}

export default useBoard
