import React, { useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const WbtbShow = ({ wbtb, history }) => {
  const [isPhotoView, setIsPhotoView] = useState(true);

  if (!wbtb) {
    return <div>Item not found</div>;
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const toggleView = () => {
    setIsPhotoView(!isPhotoView);
  };

  const extractVideoId = (video) => {
    // Extract the video ID from the YouTube link or use the provided video ID
    // eslint-disable-next-line no-useless-escape
    const match = video.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : video;
  };

  const renderMedia = () => {
    if (!wbtb.video) {
      return (
        <div>
          <h4>{wbtb.name}</h4>
          {wbtb.photo && <img src={wbtb.photo} alt={wbtb.name} />}
          {!wbtb.photo && <p>No photo available for this collections.</p>}
        </div>
      );
    }

    return (
      <div>
        <h4>{wbtb.name}</h4>
        {isPhotoView && wbtb.photo && <img src={wbtb.photo} alt={wbtb.name} />}
        {!isPhotoView && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractVideoId(wbtb.video)}`}
            title={wbtb.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  };

  return (
    <div className="collections-details">
      <Link className="btn btn-secondary" to="#" onClick={handleGoBack}>
        Back
      </Link>
      <div className="media-display">
        {renderMedia()}
      </div>
      <button className="toggle-button" onClick={toggleView}>
        Switch to {isPhotoView ? "Video" : "Photo"}
      </button>
      <div className="additional-details">
        <h3>Additional Details</h3>
        <div className="detail">
          <p>
            <strong>Category:</strong> {wbtb.category}
          </p>
          <p>
            <strong>Source Link:</strong> {wbtb.sourceLink}
          </p>
          <p>
            <strong>Description:</strong> {wbtb.desc}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const wbtbId = ownProps.match.params.id;
  const wbtb = state.wbtb.wbtbs.find((item) => item.id === wbtbId);
  return {
    wbtb,
  };
}

export default connect(mapStateToProps)(WbtbShow);
