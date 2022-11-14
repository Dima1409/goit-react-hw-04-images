import { useState, useEffect } from "react";
import { App, TitleInfo} from "./App.styled";
import Api from "components/api/api-image";
import Search from "components/SearchBar";
import Gallery from "components/ImageGallery";
import GalleryItem from "components/ImageGalleryItem";
import Loader from "components/Loader";
import BtnMore from "components/Button";
import PropTypes from 'prop-types';
import ScrollToTop from "components/Helpers";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const AppC = () => {
  const [results, setResults] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [status, setStatus] = useState(Status.IDLE); 

  useEffect(()=>{
    if(searchValue==='') {
      return;
    }
    async function getPhotos () {
      setStatus(Status.PENDING);
      const params = {searchValue, page};
      try {
        const {data} = await Api(params);
        setResults(prev=>[...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(Status.RESOLVED);
        totalResults(data)
      }
      
      catch(error) {
          setStatus(Status.REJECTED)
      }
    }
    getPhotos();
    const totalResults = value => {
      if(value.totalHits!==0 && page===1) {
      toast.success(`We found ${value.totalHits} images for your request`)
      }
      if(value.totalHits===0) {
      toast.info(`No results for your search '${searchValue}', please try again`)
      }
  }
  }, [page, searchValue])


const handleFormSubmit = searchValue => {
  reset()
  setSearchValue(searchValue );
};

const reset = () => {
  setResults([]);
  setTotalHits(0)
  setSearchValue('')
  setPage(1);
  setPer_page(12);
  setStatus(Status.IDLE);
}

const handleBtnMore = () => {
  setPage(prev=>prev+1);
}

return (
  <App>
<ScrollToTop></ScrollToTop>
<Search onSubmitForm={handleFormSubmit}/>
{status==='idle' && <TitleInfo>Try to enter a value...</TitleInfo>}
<Gallery results={results}>
 {status==='resolved' && <GalleryItem/>}
</Gallery>
{status==='pending' && <Loader/>}
{totalHits!==0 && totalHits / per_page > page && <BtnMore text='Load more' type='button' onClickBtn={handleBtnMore}></BtnMore>}
<ToastContainer/>
</App>
)
}

AppC.propTypes = {
  results: PropTypes.array,
  status: PropTypes.string,
  totalHits: PropTypes.number,
  per_page: PropTypes.number,
  page: PropTypes.number,
}
export default AppC;
