import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";


import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.selectChar])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const {selectChar} = props;
        if(!selectChar){
            return;
        }

        getCharacter(selectChar).then(onCharLoaded);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = (!loading && !error && char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let style = {objectFit: 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        style = {
            objectFit: 'unset',
        }
    }

    let newArr = [];
    if (comics.length){
        newArr = comics.slice(0,10);
    } else {
        newArr.push({
            name: 'No mention of this character in the comics!'
        });
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {

                    newArr.map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                <Link to={comics.length ? `/comics/${item.resourceURI.slice(43, 48)}` : '#'}>
                                {item.name}
                                </Link>
                            </li>

                        )
                    })
                }


            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectChar: PropTypes.number
}

export default CharInfo;