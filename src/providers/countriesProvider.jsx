
import {useEffect, useMemo, useState} from "react";
import {CountiresContext} from "../contexts/countriesContext";


export const CountriesProvider = ({children}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountriesData = async () => {
            try {
                const responseContinents = await fetch('/mocks/country-by-continent.json');
                const continentsData = await responseContinents.json();

                const responseCapitals = await fetch('/mocks/country-by-capital-city.json');
                const capitalsData = await responseCapitals.json();

                const responseLanguages = await fetch('/mocks/country-by-languages.json');
                const languagesData = await responseLanguages.json();

                const countriesData = handleMerge(continentsData, capitalsData, languagesData);
                const groupedCountriesData = handleGroupByContinent(countriesData);

                setCountries(groupedCountriesData);
            } catch (error) {
                console.error('Error fetching or merging countries data:', error);
            }
        };

        fetchCountriesData();
    }, [])

    const value = useMemo(() => {
        return {
            countries: countries,
        };
    }, [countries]);

    const handleMerge = (...dataArrays) => {
        const mergedMap = new Map();

        const mergeObjectsByKey = (key) => (object) => {
            const keyValue = object[key];
            mergedMap.set(keyValue, { ...mergedMap.get(keyValue), ...object });
        };

        dataArrays.forEach((dataArray) => dataArray.forEach(mergeObjectsByKey('country')));

        return Array.from(mergedMap.values());
    };

    const handleGroupByContinent = (countries) =>
        countries.reduce((groupedCountries, country) => {
            const { continent } = country;
            groupedCountries[continent] = [...(groupedCountries[continent] || []), country];
            return groupedCountries;
        }, {});

    return (
        <CountiresContext.Provider value={value}>
            {children}
        </CountiresContext.Provider>
    );
};

export default CountriesProvider;
