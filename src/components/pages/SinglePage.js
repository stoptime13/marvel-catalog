import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";

import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";

import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {comicsId} = useParams();
    const [data, setData] = useState(null);
    const {getComics, getCharacter, clearError, process, setProcess} = useMarvelService();

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
                getComics(comicsId).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(comicsId).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
        }
    }


    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>

    )
}

export default SinglePage;