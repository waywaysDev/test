
import styles from './styles.module.scss';

const CountriesSearch = ({onChange, value}) => {

    return (
        <input
            type="text"
            placeholder="Search by Name or Capital"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.search}
        />
    )
}

export default CountriesSearch;
