import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL='https://pixabay.com/api/';
const API_KEY = '29999099-708b113120f887f079bd929c2';

const Api = ({searchValue, page}) => {
    let params = new URLSearchParams({
            q: searchValue,
            key: API_KEY,
            page: page,
            per_page: 12,
            image_type: 'photo',
            orientation: 'horizontal'
        }) 
    return axios.get(`?${params}`) 
}

export default Api;

Api.propTypes = {
    searchValue: PropTypes.string,
    page: PropTypes.number,
    per_page: PropTypes.number
}