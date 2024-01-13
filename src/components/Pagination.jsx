const Pagination = (props) => {
    const {onLeftClick, onRightClick, page, totalPages} = props
  return (
    
      <div className="pagination">
        <button className="pagination-btn" 
        onClick={onLeftClick}>
          <div>➖</div>
        </button>
        <div className="pagination-pages">{page} de {totalPages}</div>
        <button className="pagination-btn"
        onClick={onRightClick}> 
          <div>➕</div>
        </button>
      </div>
    
  );
};

export default Pagination;
