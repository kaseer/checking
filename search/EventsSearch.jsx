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
  activateAllPreselectedFilters as activateAllPreselectedFiltersAction,
  clearAllPreselectedFilters as clearAllPreselectedFiltersAction,
  activatePreselectedFilter as activatePreselectedFilterAction,
  deselectFilters as deselectFiltersAction,
} from "../../reducers/events/EventsActions";
import {
  triggerSearchApiCall as triggerSearchApiCallAction,
  loadNextInsightsPage,
} from "../../reducers/search/SearchActions";
import LoadingStrip from "../../components/common/LoadingStrip";
import FilterSection from "../../components/myreply/filters/FilterSection";
import { filterSelectedGTM, internalSearchClick } from "../../utils/TagManagerHelper";
import ConsultingCardList from "../../components/consulting/ConsultingCardList";
import InfiniteScrollDetection from "../../components/videolibrary/InfiniteScrollDetection";
import ActiveFilter from "../../components/myreply/filters/ActiveFilter";
import TotalProduct from "../../components/common/TotalConsultingProductCount";
import { ReactComponent as Delete } from "../../assets/images/bin.svg";

function EventsSearch({
  products,
  languageFilters,
  toggleTag,
  isProductsLoading,
  activeFilters,
  activeFilterNum,
  clearAllFilters,
  reset,
  fetchAllFilters,
  hasNextPage,
  isAdditionalProductsLoading,
  totalProductCount,
  triggerSearchApiCall,
  currentPage,
  searchTerm,
  formatFilters,
  loadNextPageDispatch,
  preselectTag,
  activateAllPreselectedFilters,
  clearAllPreselectedFilters,
  activatePreselectedFilter,
  deselectFilters,
}) {
  useEffect(() => {
    fetchAllFilters();
    // handles clicking back btn on browser
    window.onpopstate = () => {
      reset();
      fetchAllFilters(false);
    };
    return () => {
      reset();
    };
    // eslint-disable-next-line
  }, [fetchAllFilters, reset]);

  const handleGTMEvent = (title) => {
    internalSearchClick(searchTerm, title, "Event");
  };

  const onFilterSelect = (filter, type, force) => {
    toggleTag({ selector: type, id: filter.value, force, isSearch: true });
    filterSelectedGTM("clickTopFilter", filter.label);
  };

  const onClearFilter = () => {
    clearAllFilters({ isSearch: true });
  };

  const loadNextPage = () => {
    loadNextPageDispatch();
    triggerSearchApiCall(currentPage + 1, searchTerm, "EVENTS");
  };

  return (
    <Suspense fallback={<LoadingStrip showLogo={false} />}>
      <section id="consultingSearch">
        <div className="filter-section-wrap">
          <div className="container p-lg-0">
            <div className="justify-content-between filter-option search ">
              <div className="d-flex justify-content-between filter-option-mobile">
                <div className="d-flex flex-row">
                  <FilterSection
                    formatList={formatFilters}
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
                    search
                  />
                </div>

                {activeFilterNum?.total > 0 && (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Link to="#" className="d-block cursor-pointer" onClick={() => onClearFilter()}>
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
              className={classnames("selected-filter-container d-none d-lg-flex", {
                "d-none": totalProductCount > 0,
              })}
            >
              <ActiveFilter
                filterName="language"
                trueFilter={activeFilters.languages}
                filterArray={languageFilters}
                onFilterSelect={onFilterSelect}
                type="languageFilters"
                isLang
              />
            </div>
          </div>
        </div>
        <div className="container p-lg-0">
          {isProductsLoading ? (
            <LoadingStrip showLogo={false} />
          ) : (
            <>
              <TotalProduct
                totalProductCount={totalProductCount}
                counterStyle="search-product-count content-value-text light-contrast p2"
                isEvent
              />
              <ConsultingCardList
                products={products}
                isEvents
                isSearch
                handleGTMEvent={handleGTMEvent}
              />
              <InfiniteScrollDetection
                hasNextPage={hasNextPage}
                isLoading={isAdditionalProductsLoading}
                onScrolled={loadNextPage}
              />
            </>
          )}
        </div>
      </section>
    </Suspense>
  );
}

EventsSearch.propTypes = {
  products: PropTypes.node.isRequired,
  languageFilters: PropTypes.node.isRequired,
  toggleTag: PropTypes.func.isRequired,
  isProductsLoading: PropTypes.bool.isRequired,
  activeFilters: PropTypes.node.isRequired,
  activeFilterNum: PropTypes.number.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  fetchAllFilters: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isAdditionalProductsLoading: PropTypes.bool.isRequired,
  totalProductCount: PropTypes.number.isRequired,
  triggerSearchApiCall: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  formatFilters: PropTypes.func.isRequired,
  loadNextPageDispatch: PropTypes.func.isRequired,
  preselectTag: PropTypes.func.isRequired,
  activateAllPreselectedFilters: PropTypes.func.isRequired,
  clearAllPreselectedFilters: PropTypes.func.isRequired,
  activatePreselectedFilter: PropTypes.func.isRequired,
  deselectFilters: PropTypes.func.isRequired,
};

EventsSearch.defaultProps = {
  searchTerm: "",
};

const mapDispatchToProps = (dispatch) => ({
  populateFilters: () => dispatch(populateFiltersAction()),
  toggleTag: (value) => dispatch(toggleTagAction(value)),
  fetchAllFilters: (forcePushState) => fetchAllFiltersAction(dispatch, forcePushState),
  clearAllFilters: (value) => dispatch(clearAllFiltersAction(value)),
  reset: () => dispatch(resetAction()),
  loadNextPageDispatch: () => dispatch(loadNextInsightsPage({ isSearch: true })),
  activateAllPreselectedFilters: (value) => dispatch(activateAllPreselectedFiltersAction(value)),
  clearAllPreselectedFilters: (value) => dispatch(clearAllPreselectedFiltersAction(value)),
  preselectTag: (value) => dispatch(preselectTagAction(value)),
  deselectFilters: () => dispatch(deselectFiltersAction()),
  activatePreselectedFilter: (value) => dispatch(activatePreselectedFilterAction(value)),
  triggerSearchApiCall: (currentPage, searchTerm, from) =>
    triggerSearchApiCallAction(dispatch, searchTerm, false, true, currentPage, 12, from),
});

const mapStateToProps = (state) => ({
  isProductsLoading: state.search.isLoadingPage,
  products: state.search.eventResultsPage,
  languageFilters: state.eventsSearch.languageFilters,
  activeFilters: state.eventsSearch.activeFilters,
  activeFilterNum: state.eventsSearch.activeFilterNum,
  hasNextPage: state.search.hasNextPageEvents,
  isAdditionalProductsLoading: state.search.isAdditionalEventsLoading,
  totalProductCount: state.search.totalEventsCount,
  currentPage: state.search.page,
  searchTerm: state.search.query,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsSearch);
