import {createSlice } from '@reduxjs/toolkit'
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [
            {login: 'admin', pasword: 'admin'},
        ]
    },
    reducers:{

        addUsers(state, action){

        },
        checkUsers(state, action){

        }
    }
})

export const {addUsers, checkUsers} = usersSlice.actions;
export default usersSlice.reducer;