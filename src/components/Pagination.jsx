import React from 'react';

const Pagination = () => {
  return (
    <section className="pagination">
      <ul>
        <li><a href="#" className="prev">« Anterior</a></li>
        <li><a href="#" className="active">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#" className="next">Siguiente »</a></li>
      </ul>
    </section>
  );
};

export default Pagination;