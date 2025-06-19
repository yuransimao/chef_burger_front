import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppState, AppDispatch } from '@/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;