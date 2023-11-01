import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Layout from "../../components/layout/Layout";
import TagSearch from "../../components/support/common/TabSearch";
import ConsultingSearch from "./ConsultingSearch";
import VideoLibrarySearch from "./VideoLibrarySearch";
// import HireATeamSearch from "./HireATeamSearch";
import EventsSearch from "./EventsSearch";
import InsightsSearch from "./InsightsSearch";
import {
  clearPage,
  setSearchQuery as setSearchQueryAction,
  triggerSearchApiCall as triggerSearchApiCallAction,
} from "../../reducers/search/SearchActions";

function Landing({ searchQuery, triggerSearchApiCall, setSearchQuery }) {
  const [nav, setNav] = useState({ value: "CONSULTING SERVICES" });

  const handleSelectTag = (newValue) => {
    setNav({ value: newValue });
  };

  useEffect(() => {
    setSearchQuery(searchQuery);
    triggerSearchApiCall(searchQuery, false, true, nav.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Layout normalPagePadding={false} isHeaderFloating isHeaderWhite={false} isHeaderTransparent>
      <div className="search-results-header">
        <div className="container p-lg-0">
          <p className="medium-expanded label small text-uppercase">Search results for</p>
          {searchQuery && <h3 className="light-contrast">{searchQuery}</h3>}
          <div>
            <TagSearch onSelectTag={(tag) => handleSelectTag(tag)} />
          </div>
        </div>
        {nav.value === "CONSULTING SERVICES" ? <ConsultingSearch /> : null}
        {nav.value === "VIDEO LIBRARY" ? <VideoLibrarySearch /> : null}
        {nav.value === "INSIGHTS" ? <InsightsSearch /> : null}
        {nav.value === "EVENTS" ? <EventsSearch /> : null}
        {/* {nav.value === "HIRE A TEAM" ? <HireATeamSearch /> : null} */}
      </div>
    </Layout>
  );
}

Landing.propTypes = {
  searchQuery: PropTypes.node.isRequired,
  triggerSearchApiCall: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchQuery: state.search.query,
});

const mapDispatchToProps = (dispatch) => ({
  triggerSearchApiCall: (searchQuery, loadPopup, loadSERP, from) =>
    triggerSearchApiCallAction(dispatch, searchQuery, loadPopup, loadSERP, 1, 12, from),
  clearPageReduxState: () => dispatch(clearPage()),
  setSearchQuery: (query) => dispatch(setSearchQueryAction(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
