import {Component} from "react";
import PropTypes from 'prop-types';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";

import './charInfo.scss';

class CharInfo extends Component {
    state ={
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.selectChar !== prevProps.selectChar){
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: false
        })
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const {selectChar} = this.props;
        if(!selectChar){
            return;
        }

        this.onCharLoading();
        this.marvelService.getCharacter(selectChar).then(this.onCharLoaded).catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

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
                                {item.name}
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