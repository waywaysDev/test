
import {useState} from "react";

import styles from './styles.module.scss';

const CountriesItem = ({item}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div
                onClick={() => handleIsOpen()}
                className={styles.listItem}
            >
                {item.country}
                <span
                    className={`${styles.listItemIcon} ${isOpen && styles.listItemIconActive}`}
                >
                    &#8249;
                </span>
            </div>
            {
                isOpen &&
                <div className={styles.listItemDescription}>
                    <div>
                        <strong>Capital: </strong>
                        {item.city ? item.city : 'Unknown information'}
                    </div>
                    <strong>Languages: </strong>
                    {
                        item.languages ?
                            <>
                                {
                                    item.languages.map(lang => {
                                        return <div
                                            key={lang}
                                        >
                                            {lang}
                                        </div>
                                    })
                                }
                            </>
                            :
                            <span>{item.languages ? item.languages : 'Unknown information'}</span>
                    }
                </div>
            }
        </>
    )
}

export default CountriesItem;
