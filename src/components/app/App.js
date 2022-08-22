import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList onCharSelected={onCharSelected}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo selectChar={selectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <ErrorBoundary>
                    <ComicsList/>
                </ErrorBoundary>
            </main>
        </div>
    )
}


export default App;