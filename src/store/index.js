import heroes from '../components/heroesList/heroSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';

const strMiddleware = (store) => (dispatch) => (action) => {
    if(typeof action === 'string'){
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(strMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;