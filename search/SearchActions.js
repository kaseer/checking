import {
  SET_CONSULTING_RESULTS_PAGE,
  SET_WEBINAR_RESULTS_PAGE,
  SET_CONSULTING_RESULTS_POPUP,
  SET_WEBINAR_RESULTS_POPUP,
  SET_HIRE_A_TEAM_RESULTS_POPUP,
  SET_SEARCH_QUERY,
  RESET,
  SET_VALUE,
  GET_NEXT_PAGE,
  CLEAR_POPUP,
  SET_POPUP_QUERY,
  CLEAR_RESULTS_PAGE,
  SET_SEARCH_BACK_LINK,
  SET_INSIGHTS_RESULTS_POPUP,
  SET_INSIGHTS_RESULTS_PAGE,
  SET_HIRE_A_TEAM_RESULTS_PAGE,
  GET_NEXT_WEBINAR_PAGE,
  SET_EVENTS_RESULTS_PAGE,
  SET_EVENTS_RESULTS_POPUP,
  GET_NEXT_INSIGHTS_PAGE,
  GET_NEXT_HIRE_A_TEAM_PAGE,
} from "./SearchTypes";
import CommerceAPI from "../../utils/CommerceAPI";
import { transformSearchResultsToPopupData } from "../../utils/helpers/SearchHelper";
import ConsultingHelper from "../../utils/helpers/ConsultingHelper";
import VideoLibraryHelper from "../../utils/helpers/VideoLibraryHelper";
import InsightsHelper from "../../utils/helpers/InsightsHelper";
import store from "../Store";
import { internalSearchSubmission } from "../../utils/TagManagerHelper";

export const setConsultingResultsSERP = (results, total = 0) => {
  return {
    type: SET_CONSULTING_RESULTS_PAGE,
    consultingResults: results,
    total,
  };
};

export const setVideoLibraryResultsSERP = (results, total = 0) => {
  return {
    type: SET_WEBINAR_RESULTS_PAGE,
    videoLibraryResults: results,
    total,
  };
};

export const setInsightsResultsSERP = (results, total = 0) => {
  return {
    type: SET_INSIGHTS_RESULTS_PAGE,
    insightsResults: results || [],
    total,
  };
};

export const setHireATeamResultsSERP = (results, total = 0) => {
  return {
    type: SET_HIRE_A_TEAM_RESULTS_PAGE,
    hireATeamResults: results,
    total,
  };
};

export const setEventsResultsSERP = (results, total = 0) => {
  return {
    type: SET_EVENTS_RESULTS_PAGE,
    eventResults: results,
    total,
  };
};

export const setConsultingResultsPopup = (results) => {
  return {
    type: SET_CONSULTING_RESULTS_POPUP,
    consultingResults: results,
  };
};

export const setVideoLibraryResultsPopup = (results) => {
  return {
    type: SET_WEBINAR_RESULTS_POPUP,
    videoLibraryResults: results,
  };
};

export const setHireATeamResultsPopup = (results) => {
  return {
    type: SET_HIRE_A_TEAM_RESULTS_POPUP,
    hireATeamResults: results,
  };
};

export const setInsightsResultsPopup = (results) => {
  return {
    type: SET_INSIGHTS_RESULTS_POPUP,
    insightsResults: results,
  };
};

export const setEventsResultsPopup = (results) => {
  return {
    type: SET_EVENTS_RESULTS_POPUP,
    eventResults: results,
  };
};

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery: query,
  };
};

export const setIsLoadingPageTrue = () => {
  return {
    type: SET_VALUE,
    target: "isLoadingPage",
    value: true,
  };
};

export const setIsLoadingPageFalse = () => {
  return {
    type: SET_VALUE,
    target: "isLoadingPage",
    value: false,
  };
};

export const setIsLoadingPopupTrue = () => {
  return {
    type: SET_VALUE,
    target: "isLoadingPopup",
    value: true,
  };
};

export const setIsLoadingPopupFalse = () => {
  return {
    type: SET_VALUE,
    target: "isLoadingPopup",
    value: false,
  };
};

export const loadNextPage = (value) => {
  return {
    type: GET_NEXT_PAGE,
    value,
  };
};

export const loadNextWebinarPage = (value) => {
  return {
    type: GET_NEXT_WEBINAR_PAGE,
    value,
  };
};

export const loadNextInsightsPage = (value) => {
  return {
    type: GET_NEXT_INSIGHTS_PAGE,
    value,
  };
};

export const loadNextTeamPage = (value) => {
  return {
    type: GET_NEXT_HIRE_A_TEAM_PAGE,
    value,
  };
};

export const resetPageCount = () => {
  return {
    type: SET_VALUE,
    target: "page",
    value: 1,
  };
};

export const triggerSearchApiCall = (
  dispatch,
  searchTerm,
  loadPopup,
  loadSERP,
  // eslint-disable-next-line default-param-last
  page = 1,
  // eslint-disable-next-line default-param-last
  limit = 12,
  from,
  initialLoad = false,
) => {
  let consultingFilters = {};
  let videoLibraryFilters = {};
  let insightsFilters = {};
  let hireATeamFilters = {};
  let eventFilters = {};
  // works fine as loadSERP and loadPopup are mutually exclusive
  // TODO: refactor search filtering to fix this properly
  if (loadSERP) {
    consultingFilters = ConsultingHelper.filterOutEmptyFilters(
      store.getState().consulting.activeFilters,
    );
    videoLibraryFilters = VideoLibraryHelper.filterOutEmptyFilters(
      store.getState().videoLibrary.activeFilters,
      false,
    );
    insightsFilters = InsightsHelper.filterOutEmptyFilters(
      store.getState().insights.activeFilters,
      false,
    );
    hireATeamFilters = ConsultingHelper.filterOutEmptyFilters(
      store.getState().hireATeam.activeFilters,
    );
    eventFilters = ConsultingHelper.filterOutEmptyFilters(
      store.getState().eventsSearch.activeFilters,
    );
  }

  let filters = {};
  if (from === "CONSULTING SERVICES") {
    filters = Object.assign(consultingFilters);
  } else if (from === "INSIGHTS") {
    filters = Object.assign(insightsFilters);
  } else if (from === "HIRE A TEAM") {
    filters = Object.assign(hireATeamFilters);
  } else if (from === "VIDEO LIBRARY") {
    filters = Object.assign(videoLibraryFilters);
  } else {
    filters = Object.assign(eventFilters);
  }
  filters.page = page;
  filters.limit = limit;
  const isFirstPage = page === 1;

  if (isFirstPage && loadPopup) dispatch(setIsLoadingPopupTrue());
  if (isFirstPage && loadSERP) dispatch(setIsLoadingPageTrue());
  CommerceAPI.search(searchTerm, filters)
    .then((res) => {
      const { webinars, products, insights, hireATeam, events } = transformSearchResultsToPopupData(
        res.data,
        searchTerm,
      );
      if (loadPopup) {
        dispatch(setConsultingResultsPopup(products));
        dispatch(setVideoLibraryResultsPopup(webinars));
        dispatch(setInsightsResultsPopup(insights));
        dispatch(setHireATeamResultsPopup(hireATeam));
        dispatch(setEventsResultsPopup(events));
        if (isFirstPage) dispatch(setIsLoadingPopupFalse());
      }
      if (loadSERP) {
        if (initialLoad) {
          dispatch(setVideoLibraryResultsSERP(webinars, res.data.hitWebinars));
          dispatch(setConsultingResultsSERP(products, res.data.hitProducts));
          dispatch(setInsightsResultsSERP(insights, res.data.hitInsights));
          dispatch(setHireATeamResultsSERP(hireATeam, res.data.hitHireATeam));
          dispatch(setEventsResultsSERP(events, res.data.hitEvents));
          internalSearchSubmission(
            searchTerm,
            res.data.hitWebinars +
              res.data.hitHireATeam +
              res.data.hitInsights +
              res.data.hitEvents +
              res.data.hitProducts,
          );
        } else if (from === "CONSULTING SERVICES") {
          dispatch(setConsultingResultsSERP(products, res.data.hitProducts));
        } else if (from === "INSIGHTS") {
          dispatch(setInsightsResultsSERP(insights, res.data.hitInsights));
        } else if (from === "VIDEO LIBRARY") {
          dispatch(setVideoLibraryResultsSERP(webinars, res.data.hitWebinars));
        } else if (from === "HIRE A TEAM") {
          dispatch(setHireATeamResultsSERP(hireATeam, res.data.hitHireATeam));
        } else if (from === "EVENTS") {
          dispatch(setEventsResultsSERP(events, res.data.hitEvents));
        }
        if (isFirstPage) {
          dispatch(setIsLoadingPageFalse());
        }
      }
    })
    .catch((e) => CommerceAPI.defaultErrorHandler(e, true));
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const clearPopup = () => {
  return {
    type: CLEAR_POPUP,
  };
};

export const clearPage = () => {
  return {
    type: CLEAR_RESULTS_PAGE,
  };
};

export const setPopupQuery = (query) => {
  return {
    type: SET_POPUP_QUERY,
    popupQuery: query,
  };
};

export const setSearchBackLink = (backLink) => {
  return {
    type: SET_SEARCH_BACK_LINK,
    searchBackLink: backLink,
  };
};

export const resetSearchBackLink = () => {
  return {
    type: SET_VALUE,
    target: "searchBackLink",
    value: "",
  };
};
