import { createSlice } from '@reduxjs/toolkit'
import { studentLogin, changeStudentPassword, adminLogin ,teacherLogin, changeAdminPassword,changeTeacherPassword } from './authAction.js'

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: {
      user: {
        usertype: '',
      }
    },
    loading: false,
    error: null,
  },
  reducers: {
    logoutReq: (state, action) => {
      state.user = {
        user: {
          usertype: '',
        }
      }
    }
  },

  extraReducers: (builder) => {

    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(studentLogin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })

    builder.addCase(studentLogin.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })

    builder.addCase(changeStudentPassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(changeStudentPassword.fulfilled, (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      state.loading = false
      state.error =null
    })
    builder.addCase(changeStudentPassword.rejected, (state, action) => {
      console.log(action.error.message)
      state.error = action.payload
      state.loading = false
    })




    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true
    })

    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })

    builder.addCase(adminLogin.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(changeAdminPassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(changeAdminPassword.fulfilled, (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      state.loading = false
      state.error =null
    })
    builder.addCase(changeAdminPassword.rejected, (state, action) => {
      console.log(action.error.message)
      state.error = action.payload
      state.loading = false
    })



    builder.addCase(teacherLogin.pending, (state) => {
      state.loading = true
    })

    builder.addCase(teacherLogin.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })

    builder.addCase(teacherLogin.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(changeTeacherPassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(changeTeacherPassword.fulfilled, (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      state.loading = false
      state.error =null
    })
    builder.addCase(changeTeacherPassword.rejected, (state, action) => {
      console.log(action.error.message)
      state.error = action.payload
      state.loading = false
    })

  }
})

// Action creators are generated for each case reducer function
export const { studentLoginReq, logoutReq, changeStudentPasswordReq, adminLoginReq ,changeAdminPasswordReq,teacherLoginReq,changeTeacherPasswordReq} = AuthSlice.actions

export default AuthSlice.reducer