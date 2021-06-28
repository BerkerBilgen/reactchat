import { createSlice } from '@reduxjs/toolkit';

export const memberProcess = createSlice({
  name: 'member',
  initialState: {
    username: "",
    avatar: "",
    emailAddress:"",
    color: "",
    showregisterform: "",
    showvideocall: ""
  },
  reducers: {
    setUsername: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.username = state.nickname;
    },
    setAvatar: (state) => {
      state.avatar = state.picture;
    },
    setEmailAddress: (state) => { //Berker Deneme
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.emailAddress = state.email;
    },
    setShowRegisterForm: (state, action) => {
        state.showregisterform += action.payload;
    },
    setShowVideoCall: (state, action) => {
        state.showvideocall += action.payload;
    },
    setColor: (state) => {
        state.color = state.selectedcolor;
    },
    incrementByAmount: (state, action) => {
        state.username += action.payload;
    },    
    incrementByAvatar: (state, action) => {
        state.avatar += action.payload;
    },
    incrementEmailByAmount: (state, action) => {
      state.emailAddress += action.payload;
    },
    incrementColor: (state, name) => {
        state.color += name.payload;
    }
  },
});

export const { setUsername, setAvatar, setColor, incrementByAmount, incrementEmailByAmount, incrementByAvatar, incrementColor, setShowRegisterForm, setShowVideoCall } = memberProcess.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const memberUsername = state => state.member.username;
export const memberColor = state => state.member.color;
export const showRegisterForm = state => state.member.showregisterform;
export const showVideoCall = state => state.member.showvideocall;
export const memberAvatar = state => state.member.avatar;
export const memberEmailAddress = state => state.member.emailAddress; //Berker deneme

export default memberProcess.reducer;
