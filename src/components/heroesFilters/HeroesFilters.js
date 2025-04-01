import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"

import {changeFilterElement, fetchFilter, selectAll} from './filtersSlice'
import store from "../../store"

const HeroesFilters = () => {

    const {filterElement, filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch()
    const filters = selectAll(store.getState());

    useEffect(() => {
        dispatch(fetchFilter())
        // eslint-disable-next-line
    }, [])

    if(filtersLoadingStatus === 'loading') {
        return <h5 className="text-center mt-5">Загрузка элементов</h5>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderBtn = () => {
        return filters.map(({name, label}, i) => {
            const className = classNames('btn', {
                'btn-outline-dark': name === 'all',
                'btn-danger': name === 'fire',
                'btn-primary': name === 'water',
                'btn-success': name === 'wind',
                'btn-secondary': name === 'earth',
            },
            {
                'active': name === filterElement
            })
            return (
                <button className={className}
                    key={i}
                    onClick={() => dispatch(changeFilterElement(name))}>
                    {label}
                </button>
            )
        })
    }

    const btns = renderBtn();
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {btns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;