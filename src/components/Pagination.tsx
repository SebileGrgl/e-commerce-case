import ReactPaginate from "react-paginate";
import { PaginationProp } from "../utils/types";

const Pagination: React.FC<PaginationProp> = ({ handleChange, pageCount }) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        className="pagination"
        disabledClassName="disabled"
        previousLabel="Prev"
        previousClassName="btn"
        nextClassName="btn"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active-page"
        pageCount={pageCount}
        onPageChange={(data) => {
          handleChange(data.selected);
        }}
      />
    </div>
  );
};

export default Pagination;
