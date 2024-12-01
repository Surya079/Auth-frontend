import { createSlice } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../../theme/theme";
import { RootState } from "../store";

const initialState = {
    theme: lightTheme
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === lightTheme ? darkTheme : lightTheme;
        }
    }
})

export const selectTheme = (state: RootState) => state.theme.theme;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

