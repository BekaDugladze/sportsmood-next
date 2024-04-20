import { Reducer } from "redux";


export interface RootState {
    isAdminLogged: boolean;
    user: string;
    name: string;
    lastName: string;
    email: string,
    phone: string,
    admin: boolean,
    pic: string,
    isUserLogged: boolean,

}
export const initialState : RootState = {
    isAdminLogged: false,
    user: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    admin: false,
    pic: '',
    isUserLogged: false,
}

//////////
//define admin fucking shits... 
//////////

export interface SetAdminLogAction {
    type: 'SET_ADMIN_LOG';
    payload: {
        isAdminLogged: boolean;
        user: string;
        name: string;
        lastName: string;
        email: string;
        phone: string;
        admin: boolean;
        pic: string;
    };
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

///////////
//Logics
///////////


export const setAdminLog = (
    isAdminLogged: boolean,
    user: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    admin: boolean,
    pic: string) : SetAdminLogAction => ({
        type: 'SET_ADMIN_LOG',
        payload: {isAdminLogged, user, name, lastName, email, phone, admin, pic}
})

export const setAdminBut = (
    activeAdminBut: string) : AdminBut => ({
        type: 'ADMIN_BUT_HANDLE',
        payload: {activeAdminBut}
    })

export const rootReducer: Reducer<RootState, SetAdminLogAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ADMIN_LOG': return {
            ...state,
            isAdminLogged: action.payload.isAdminLogged,
            user: action.payload.user,
            name: action.payload.name,
            lastName: action.payload.lastName,
            email: action.payload.email,
            phone: action.payload.phone,
            admin: action.payload.admin,
            pic: action.payload.pic
        }
        default: return state
    }
}
