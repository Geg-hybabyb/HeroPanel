import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    filterElement: 'all'
})

export const fetchFilter = createAsyncThunk(
    'filters/fetchFilter',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters')
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilterElement: (state, action) => {state.filterElement = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilter.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload)
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilter.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
})

const {reducer, actions} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export const {
    changeFilterElement
} = actions;