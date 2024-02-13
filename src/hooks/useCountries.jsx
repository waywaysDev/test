
import {useContext} from 'react';
import {CountiresContext} from "../contexts/countriesContext";

export const useCountries = () => {
    return useContext(CountiresContext);
};
