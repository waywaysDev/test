
import ReactPaginate from 'react-paginate';

import styles from './styles.module.scss';

const Paginate = ({pageClick, pageCount, currentPage}) => {

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={pageClick}
            pageRangeDisplayed={5}
            forcePage={currentPage}
            pageCount={pageCount}
            previousLabel="<"
            className={styles.paginate}
            pageLinkClassName={styles.paginateItem}
            activeLinkClassName={styles.paginateItemActive}
            disabledLinkClassName={styles.paginateItemDisabled}
            previousLinkClassName={styles.paginateItemPrev}
            nextLinkClassName={styles.paginateItemNext}
        />

    )
}

export default Paginate
