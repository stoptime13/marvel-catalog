class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=97c93012fc9de659a16cfdddeebf2ca3';

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return{
            name: char.name,
            description: (!char.description) ? 'No description found for this character...' : char.description.slice(0,210) + '...',
            thumbnail: char.thumbnail.path + '.' +
                char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id
        }
    }
}

export default MarvelService;