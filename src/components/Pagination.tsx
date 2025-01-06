import ReactPaginate from "react-paginate";
import { PaginationProp } from "../utils/types";

const Pagination: React.FC<PaginationProp> = ({ handleChange, pageCount }) => {
  return (
    <div className="my-8">
      <ReactPaginate
        className="flex gap-5 justify-center items-center"
        disabledClassName="disabled"
        previousLabel="Prev"
        previousClassName="hover:text-black-100"
        nextClassName="btn"
        pageClassName="font-light px-2 py-1"
        pageLinkClassName="page-link"
        activeClassName="bg-white shadow-md rounded text-blue"
        pageCount={pageCount}
        onPageChange={(data) => {
          handleChange(data.selected);
        }}
      />
    </div>
  );
};

export default Pagination;
