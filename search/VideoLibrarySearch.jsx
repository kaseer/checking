import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  fetchAllFilters as fetchAllFiltersAction,
  populateFilters as populateFiltersAction,
  reset as resetAction,
  toggleTag as toggleTagAction,
  clearAllFilters as clearAllFiltersAction,
  preselectTag as preselectTagAction,
  activateAllPreselectedTags,
  clearAllPreselectedTags,
  activatePreselectedTag,
  deselectFilters as deselectFiltersAction,
} from "../../reducers/videolibrary/VideoLibraryActions";
import LoadingStrip from "../../components/common/LoadingStrip";
import FilterSection from "../../components/myreply/filters/FilterSection";
import {
  triggerSearchApiCall as triggerSearchApiCallAction,
  loadNextWebinarPage,
} from "../../reducers/search/SearchActions";
import CardList from "../../components/common/CardList";
import { filterSelectedGTM, internalSearchClick } from "../../utils/TagManagerHelper";
import ActiveFilter from "../../components/myreply/filters/ActiveFilter";
import TotalProduct from "../../components/common/TotalConsultingProductCount";
import { ReactComponent as Delete } from "../../assets/images/bin.svg";
import InfiniteScrollDetection from "../../components/videolibrary/InfiniteScrollDetection";

function VideoLibrarySearch({
  webinars,
  languageFilters,
  topicFilters,
  toggleTag,
  isWebinarLoading,
  activeFilters,
  activeFilterNum,
  clearAllFilters,
  reset,
  fetchAllFilters,
  totalWebinarsCount,
  preselectTag,
  activateAllPreselectedFilters,
  clearAllPreselectedFilters,
  activatePreselectedFilter,
  deselectFilters,
  triggerSearchApiCall,
  currentPage,
  hasNextPage,
  isAdditionalWebinarsLoading,
  loadNextPageDispatch,
  searchTerm,
}) {
  useEffect(() => {
    fetchAllFilters();

    // handles clicking back btn on browser
    window.onpopstate = () => {
      reset();
      fetchAllFilters(false);
    };

    // eslint-disable-next-line
    return () => {
      reset();
    };
  }, [fetchAllFilters, reset]);

  const handleGTMEvent = (title) => {
    internalSearchClick(searchTerm, title, "Video Library");
  };

  const onFilterSelect = (filter, type, force) => {
    toggleTag({ selector: type, id: filter.label, force, isSearch: true });
    filterSelectedGTM("clickTopFilter", filter.label);
  };

  const onClearFilter = () => {
    clearAllFilters({ isSearch: true });
  };

  const loadNextPage = () => {
    loadNextPageDispatch();
    triggerSearchApiCall(currentPage + 1, searchTerm, "VIDEO LIBRARY");
  };

  return (
    <Suspense fallback={<LoadingStrip showLogo={false} />}>
      <section id="consultingSearch">
        <div className="filter-section-wrap">
          <div className="container p-lg-0">
            <div className="justify-content-between filter-option search">
              <div className="d-flex justify-content-between filter-option-mobile">
                <FilterSection
                  topicList={topicFilters}
                  languageList={languageFilters}
                  onApplyFilter={onFilterSelect}
                  onClearFilter={onClearFilter}
                  activeFilterNum={activeFilterNum}
                  activeFilters={activeFilters}
                  preselectTag={preselectTag}
                  activateAllPreselectedFilters={activateAllPreselectedFilters}
                  clearAllPreselectedFilters={clearAllPreselectedFilters}
                  activatePreselectedFilter={activatePreselectedFilter}
                  deselectFilters={deselectFilters}
                  isWebinar
                  search
                />

                {activeFilterNum.total > 0 && (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Link
                    to="#"
                    className="text-center mt-30px  my-lg-auto d-block cursor-pointer"
                    onClick={() => onClearFilter()}
                  >
                    <span className="clear-filter-icon">
                      <Delete />
                    </span>
                    <p className="underline clear-all-text p3 medium-expanded">Clear all filters</p>
                  </Link>
                )}
              </div>
            </div>

            {activeFilterNum.total > 0 && <hr className="d-none d-lg-block" />}
            <div
              className={classnames("selected-filter-container p2 d-none d-lg-flex", {
                "d-none": webinars.length > 0,
              })}
            >
              <ActiveFilter
                filterName="language"
                trueFilter={activeFilters.languages}
                filterArray={languageFilters}
                onFilterSelect={onFilterSelect}
                type="languageFilters"
              />
              <ActiveFilter
                filterName="topic"
                trueFilter={activeFilters.topics}
                filterArray={topicFilters}
                onFilterSelect={onFilterSelect}
                type="topicFilters"
              />
            </div>
          </div>
        </div>
        <div className="container pe-sm-0 p-lg-0">
          {isWebinarLoading ? (
            <LoadingStrip showLogo={false} />
          ) : (
            <>
              <TotalProduct
                totalProductCount={totalWebinarsCount}
                counterStyle="search-product-count content-value-text light-contrast p2"
                isVideo
              />
              <CardList
                service={webinars}
                serviceType="webinar"
                isSearch
                handleGTMEvent={handleGTMEvent}
              />
              <InfiniteScrollDetection
                hasNextPage={hasNextPage}
                isLoading={isAdditionalWebinarsLoading}
                onScrolled={loadNextPage}
              />
            </>
          )}
        </div>
      </section>
    </Suspense>
  );
}

VideoLibrarySearch.propTypes = {
  webinars: PropTypes.node.isRequired,
  languageFilters: PropTypes.node.isRequired,
  topicFilters: PropTypes.node.isRequired,
  toggleTag: PropTypes.func.isRequired,
  isWebinarLoading: PropTypes.bool.isRequired,
  activeFilters: PropTypes.node.isRequired,
  activeFilterNum: PropTypes.number.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  fetchAllFilters: PropTypes.func.isRequired,
  totalWebinarsCount: PropTypes.number.isRequired,
  preselectTag: PropTypes.func.isRequired,
  activateAllPreselectedFilters: PropTypes.func.isRequired,
  clearAllPreselectedFilters: PropTypes.func.isRequired,
  activatePreselectedFilter: PropTypes.func.isRequired,
  deselectFilters: PropTypes.func.isRequired,
  triggerSearchApiCall: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isAdditionalWebinarsLoading: PropTypes.bool.isRequired,
  loadNextPageDispatch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

VideoLibrarySearch.defaultProps = {
  searchTerm: "",
};

const mapDispatchToProps = (dispatch) => ({
  populateFilters: () => dispatch(populateFiltersAction()),
  toggleTag: (value) => dispatch(toggleTagAction(value)),
  fetchAllFilters: (forcePushState) => fetchAllFiltersAction(dispatch, forcePushState),
  clearAllFilters: (value) => dispatch(clearAllFiltersAction(value)),
  reset: () => dispatch(resetAction()),
  activateAllPreselectedFilters: (value) => dispatch(activateAllPreselectedTags(value)),
  clearAllPreselectedFilters: (value) => dispatch(clearAllPreselectedTags(value)),
  preselectTag: (value) => dispatch(preselectTagAction(value)),
  deselectFilters: () => dispatch(deselectFiltersAction()),
  activatePreselectedFilter: (value) => dispatch(activatePreselectedTag(value)),
  loadNextPageDispatch: () => dispatch(loadNextWebinarPage({ isSearch: true })),
  triggerSearchApiCall: (currentPage, searchTerm, from) =>
    triggerSearchApiCallAction(dispatch, searchTerm, false, true, currentPage, 12, from),
});

const mapStateToProps = (state) => ({
  isWebinarLoading: state.search.isLoadingPage,
  isAdditionalWebinarsLoading: state.search.isAdditionalWebinarsLoading,
  hasNextPage: state.search.hasNextPageWebinars,
  webinars: state.search.videoLibraryResultsPage,
  totalWebinarsCount: state.search.totalWebinarCount,
  topicFilters: state.videoLibrary.topicFilters,
  languageFilters: state.videoLibrary.languageFilters,
  activeFilters: state.videoLibrary.activeFilters,
  activeFilterNum: state.videoLibrary.activeFilterNum,
  currentPage: state.search.page,
  searchTerm: state.search.query,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrarySearch);
