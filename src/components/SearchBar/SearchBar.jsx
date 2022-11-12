import {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SearchBar, SearchForm, SearchFormButton, SearchFormInput, SearchFormButtonLabel} from './Searchbar.styled';

function Search ({onSubmitForm}) {
    const [SearchValue, setSearchValue] = useState('');

    const handleChange = event => {
        const SearchValueNormalized = event.currentTarget.value.toLowerCase();
        setSearchValue(SearchValueNormalized);
    }
    const handleSubmit = event => {
        event.preventDefault();
        if(SearchValue.trim() === '') {
              return  toast.warn('Please enter a value', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                })
    }
        onSubmitForm(SearchValue);
        setSearchValue('');
    }
        return (
            <SearchBar>
        <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type='submit'>
                <SearchFormButtonLabel/>
            </SearchFormButton>
            <SearchFormInput 
            type='text' 
            autoComplete='off' 
            autoFocus 
            placeholder='Search images and photos'
            value={SearchValue}
            onChange={handleChange}></SearchFormInput>
        </SearchForm>
        <ToastContainer/>
    </SearchBar>
        )
    }

export default Search;

