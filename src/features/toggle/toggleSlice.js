const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    sidebarToggle: false,
}

const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        collapseSidebar: (state) => {
            state.sidebarToggle = !state.sidebarToggle;
        }
    }
});

export const { collapseSidebar } = toggleSlice.actions
export default toggleSlice.reducer