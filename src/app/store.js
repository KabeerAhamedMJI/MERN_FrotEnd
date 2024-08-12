import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../app/feature/loginSlice'


export default configureStore({
  reducer: {
    login: loginReducer
  },
})