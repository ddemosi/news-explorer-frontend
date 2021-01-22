import React from 'react';

const NothingFound = ({ error }) => {
  return (
    <div className="nothing-found__container">
      <h2 className="nothing-found__title">{error
      ? "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later"
      : "Nothing Found"}</h2>
    </div>
  );
}

export default NothingFound;