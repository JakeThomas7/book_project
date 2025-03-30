
const SortItems = ({
    sort,
    setSort
}: {
    sort: string,
    setSort: (sortType: string) => void
}) => {
    return (
        <button className="btn btn-success" onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
            Sort {sort === "asc" ? "A to Z" : "Z to A"}
        </button>
    );
};

export default SortItems