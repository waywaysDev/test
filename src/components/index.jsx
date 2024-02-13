
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
    const visibleCountries = useMemo(() => countries[currentContinent] || [], [countries, currentContinent]);

    useEffect(() => {
        setCurrentContinent(continents[0]);
    }, [continents]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const currentItemsArray = visibleCountries.slice(itemOffset, endOffset);
        setCurrentCountries(currentItemsArray);
    }, [visibleCountries, itemOffset]);

    const handleSetVisibleCountries = (continent) => {
        setCurrentContinent(continent);
        setItemOffset(0);
        setCurrentPage(0);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % visibleCountries.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
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
            <CountriesSearch />
            {visibleCountries.length > 0 && (
                <>
                    {currentCountries.map((item) => (
                        <CountriesItem
                            key={item.country}
                            item={item}
                        />
                    ))}
                </>
            )}
            {
                visibleCountries.length > 0 &&
                <Paginate
                    pageCount={Math.ceil(visibleCountries.length / itemsPerPage)}
                    pageClick={handlePageClick}
                    currentPage={currentPage}
                />
            }
        </>
    )
}

export default Countries
