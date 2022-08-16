import {Component} from "react";

import MarvelService from "../../services/MarvelService";

import './charList.scss';
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    state = {
        charArr: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters().then(this.setCharArr).catch(this.onError);
    }

    setCharArr = (charArr) => {
        this.setState({
            charArr,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <CharItem char={item} key={item.id}/>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    render() {
        const {charArr, loading, error} = this.state;

        const items = this.renderItems(charArr);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (!loading && !error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharItem = ({char}) => {
    const {name, thumbnail} = char;
    let style = {objectFit: 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        style = {
            objectFit: 'contain',
        }
    }

    return(
        <li className="char__item">
            <img src={thumbnail} alt="char_img" style={style}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;