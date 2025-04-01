import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { postHero } from "../heroesList/heroSlice";
import { selectAll } from '../heroesFilters/filtersSlice'
import { useHttp } from "../../hooks/http.hook";
import store from "../../store";

const HeroesAddForm = () => {

    const [name, setName] = useState('')
    const [description, setDes] = useState('')
    const [element, setElem] = useState('')

    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus)
    const filters = selectAll(store.getState())
    
    const dispatch = useDispatch()

    const {request} = useHttp()

    const onSubmit = (e) => {
        e.preventDefault()

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(res => console.log(res))
            .then(dispatch(postHero(newHero)))
            .catch(error => console.log(error))

        setName('')
        setDes('')
        setElem('')
    }

    const elemChange = (arr, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        return arr.map(({name, label}, i) => {
            if (name === 'all') return;
            return (
                <option key={i} value={name}>{label}</option>
            )
        })
    }

    const elemList = elemChange(filters, filtersLoadingStatus);
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={description}
                    onChange={(e) => setDes(e.target.value)}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={element}
                    onChange={(e) => setElem(e.target.value)}
                    name="element">
                    <option >Я владею элементом...</option>
                    {elemList}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;