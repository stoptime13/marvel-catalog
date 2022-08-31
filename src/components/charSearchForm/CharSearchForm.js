import {useState} from "react";
import {Link} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as yup from 'yup';

import useMarvelService from "../../services/MarvelService";

import './CharSearchForm.scss'

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name).then(onCharLoaded);
    }

    const resultPage = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;


    return(
        <div className="char__search-form">
        <Formik
            initialValues={{name: 'Enter name'}}
            validationSchema={yup.object({
                name:yup.string()
                    .required('This field is required'),
            })}
            onSubmit={({charName}) => {
                updateChar(charName)
            }}>
            <Form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <Field
                        id="charName"
                        name='charName'
                        type='text'
                        placeholder="Enter name"/>
                    <button
                        type='submit'
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikError component="div" className="char__search-error" name="charName" />
            </Form>
        </Formik>
            {resultPage}
        </div>
    )
}

export default CharSearchForm;