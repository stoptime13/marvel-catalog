import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";

import './singleComicsPage.scss';
import Skeleton from "../skeleton/Skeleton";

const SingleComicsPage = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicsId])

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const updateComics = () => {
        clearError();
        getComics(comicsId).then(onComicsLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = (!loading && !error && comics) ? <View comics={comics}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}

const View = ({comics}) => {
    const {title, description, pageCount, language,  thumbnail, price} = comics;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr"><b>Language:</b> {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicsPage;