import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

const Page404 = () => {
    return(
        <div style={{'position': 'relative'}}>
            <Helmet>
                <meta
                    name="description"
                    content="error page"
                />
                <title>404 Error</title>
            </Helmet>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '40px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '60px', 'color': '#9f0013'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;