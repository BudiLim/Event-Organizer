import { IUserState } from "@/type/user";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserState = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<IUserState>) => {
            const { id, firstName, lastName, email, role } = action.payload

            state.id = id
            state.firstName = firstName
            state.lastName = lastName
            state.email = email
            state.role = role
        },
        logoutAction: (state) => {
            state.id = 0
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.role = ""
        }
    }
})

export const { loginAction, logoutAction } = userSlice.actions
export default userSlice.reducer