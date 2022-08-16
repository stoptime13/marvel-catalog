import {Component} from "react";

import MarvelService from "../../services/MarvelService";

import './charList.scss';
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charArr: [],
            loading: true,
            error: false,
            newItemLoading: false,
            offset: 210,
            charEnded: false
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset).then(this.setCharArr).catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    setCharArr = (newCharArr) => {
        let ended = false;
        if(this.state.offset === 1559){
            ended = true;
        }

        this.setState(({offset, charArr}) => ({
            charArr: [...charArr, ...newCharArr],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
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
                <CharItem char={item}
                          key={item.id}
                          onCharSelected={() => this.props.onCharSelected(item.id)}/>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charArr, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charArr);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (!loading && !error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharItem = (props) => {

    const {name, thumbnail} = props.char;
    const{onCharSelected} = props;

    let style = {objectFit: 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        style = {
            objectFit: 'unset'
        }
    }

    return(
        <li className="char__item" onClick={onCharSelected}>
            <img src={thumbnail} alt="char_img" style={style}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;