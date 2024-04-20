import { Reducer } from "redux";

export interface AdminState{
    activeAdminBut: string
}

export const adminInitialState: AdminState = {
    activeAdminBut: 'but1'
}

////////
//Admin button changes
////////

export interface AdminBut{
    type: 'ADMIN_BUT_HANDLE',
    payload: {
        activeAdminBut: string
    }
}
export const setAdminBut = (
    activeAdminBut: string) : AdminBut => ({
        type: 'ADMIN_BUT_HANDLE',
        payload: {activeAdminBut}
    })


export const adminButReducer : Reducer<AdminState, AdminBut> = (state = adminInitialState, action) => {
    switch (action.type) {
    case 'ADMIN_BUT_HANDLE': return {
        ...state,
        activeAdminBut: action.payload.activeAdminBut
    }
    default: return state
    }
}