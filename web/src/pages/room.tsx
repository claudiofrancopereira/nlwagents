import { Navigate, useParams } from "react-router-dom"

type RoomParams = {
    roomID: string

}











export function Room() {
    const params = useParams<RoomParams>()

    if (!params.roomID) {
        return <Navigate replace to="/" />
        
    }

    return <div>Room Details {JSON.stringify(params)}</div>
}