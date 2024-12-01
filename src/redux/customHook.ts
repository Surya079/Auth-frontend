import type { RootState, AppDispatch } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Custom hook to use the app's dispatch with the correct type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to use the app's selector with the correct type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
