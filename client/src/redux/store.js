
import {configureStore} from '@reduxjs/toolkit'
import userAuthorReducer from './slices/userAuthorSlice'

export let store = configureStore({
    reducer:{
        userAuthorLoginReducer : userAuthorReducer
    }
})