import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";


import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

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

        getCharacter(selectChar)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }


    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

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