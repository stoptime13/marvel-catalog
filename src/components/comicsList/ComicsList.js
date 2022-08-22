import {useState, useEffect} from "react";

import useMarvelService from "../../services/MarvelService";

import './comicsList.scss';
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
    const [comicsArr, setComicsArr] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() =>{
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true );
        getAllComics(offset).then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsArr) => {
        let ended = false;
        if(newComicsArr.length < 8){
            ended = true;
        }

        setComicsArr((comicsArr) => [...comicsArr, ...newComicsArr]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comicsArr);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;