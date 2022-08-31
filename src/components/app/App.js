import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import {MainPage, ComicsPage} from '../pages';
import SinglePage from '../pages/SinglePage'
import SingleComicsPage from '../pages/singleComicsPage/SingleComicsPage';
import SingleCharacterPage from '../pages/singleCharacterPage/SingleCharacterPage';


const Page404 = lazy(() => import('../pages/404'));


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicsId" element={<SinglePage Component={SingleComicsPage} dataType='comics'/>}/>
                            <Route path="/characters/:comicsId" element={<SinglePage Component={SingleCharacterPage} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}


export default App;