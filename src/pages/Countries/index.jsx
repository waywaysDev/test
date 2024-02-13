
import {useEffect, useMemo, useState} from "react";
import {useCountries} from "../../hooks/useCountries";
import CountriesItem from "./CountriesItem";
import Paginate from "../../components/Paginate";

import styles from './styles.module.scss';
import CountriesSearch from "./CountriesSearch";

const Countries = () => {
    const { countries } = useCountries();
    const [currentContinent, setCurrentContinent] = useState('');
    const [currentCountries, setCurrentCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const continents = useMemo(() => Object.keys(countries), [countries]);

    const filteredCountries = useMemo(() => {
        let filtered = countries[currentContinent] || [];

        if (searchQuery) {
            const searchLowerCase = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (country) =>
                    country.country.toLowerCase().startsWith(searchLowerCase) ||
                    (country.city && country.city.toLowerCase().startsWith(searchLowerCase))
            );
        }

        return filtered;
    }, [countries, currentContinent, searchQuery]);

    useEffect(() => {
        setCurrentContinent(continents[0]);
    }, [continents]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const currentItemsArray = filteredCountries.slice(itemOffset, endOffset);
        setCurrentCountries(currentItemsArray);
    }, [filteredCountries, itemOffset, currentPage]);

    const handleSetVisibleCountries = (continent) => {
        setCurrentContinent(continent);
        setItemOffset(0);
        setCurrentPage(0);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredCountries.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setItemOffset(0);
        setCurrentPage(0);
    };

    return (
        <>
            <div className={styles.tabs}>
                {continents.map((continent) => (
                    <strong
                        key={continent}
                        className={`${styles.tabsItem} ${currentContinent === continent && styles.tabsItemActive}`}
                        onClick={() => handleSetVisibleCountries(continent)}
                    >
                        {continent !== 'undefined' ? continent : 'Other'}
                    </strong>
                ))}
            </div>
            <CountriesSearch onChange={handleSearch} value={searchQuery} />

            {currentCountries.map((item) => (
                <CountriesItem
                    key={item.country}
                    item={item}
                />
            ))}
            {
                !currentCountries.length &&
                    <div className={styles.listNoResult}>No results</div>
            }
            <Paginate
                pageCount={Math.ceil(filteredCountries.length / itemsPerPage)}
                pageClick={handlePageClick}
                currentPage={currentPage}
            />
        </>
    )
}

export default Countries
