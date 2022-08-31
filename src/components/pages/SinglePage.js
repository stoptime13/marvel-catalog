import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {comicsId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicsId])

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateComics = () => {
        clearError();
        switch (dataType){
            case 'comics':
                getComics(comicsId).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(comicsId).then(onDataLoaded);
                break;
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = (!loading && !error && data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}

export default SinglePage;