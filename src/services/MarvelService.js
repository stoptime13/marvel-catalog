import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=97c93012fc9de659a16cfdddeebf2ca3';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return{
            name: char.name,
            description: (!char.description) ? 'No description found for this character...' : char.description.slice(0,210) + '...',
            thumbnail: char.thumbnail.path + '.' +
                char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError};
}

export default useMarvelService;