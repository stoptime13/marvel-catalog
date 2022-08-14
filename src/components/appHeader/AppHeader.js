import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>MARVEL</span> INFORMATION PORTAL
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">CHARACTER</a></li>
                    <li><a href="#">COMICS</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;