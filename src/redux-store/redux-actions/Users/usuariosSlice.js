import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuarios: [],
  isLoadingRedux: false,
  error: null,
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },
  },
});

export const { setUsuarios } = usuariosSlice.actions;

export default usuariosSlice.reducer;
