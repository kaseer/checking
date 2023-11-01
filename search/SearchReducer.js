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
  SET_EVENTS_RESULTS_PAGE,
  SET_EVENTS_RESULTS_POPUP,
  GET_NEXT_WEBINAR_PAGE,
  GET_NEXT_INSIGHTS_PAGE,
  GET_NEXT_HIRE_A_TEAM_PAGE,
} from "./SearchTypes";

const initialState = {
  consultingResultsPage: [],
  videoLibraryResultsPage: [],
  insightsResultsPage: [],
  hireATeamResultsPage: [],
  eventResultsPage: [],
  consultingResultsPopup: [],
  insightsResultsPopup: [],
  videoLibraryResultsPopup: [],
  hireATeamResultsPopup: [],
  eventResultsPopup: [],
  query: "",
  popupQuery: "",
  isLoadingPage: false,
  isLoadingPopup: false,
  isAdditionalProductsLoading: false,
  isAdditionalInsightsLoading: false,
  isAdditionalHireATeamLoading: false,
  isAdditionalWebinarsLoading: false,
  isAdditionalEventsLoading: false,
  page: 1,
  hasNextPage: true,
  hasNextPageInsights: true,
  hasNextPageHireATeamLoading: true,
  hasNextPageWebinars: true,
  hasNextPageEvents: true,
  totalProductCount: 0,
  totalWebinarCount: 0,
  totalInsightsCount: 0,
  totalHireATeamCount: 0,
  totalEventsCount: 0,
  searchBackLink: "",
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONSULTING_RESULTS_PAGE: {
      const products =
        state.page > 1
          ? [...state.consultingResultsPage, ...action.consultingResults]
          : action.consultingResults;

      return {
        ...state,
        consultingResultsPage: products,
        hasNextPage: products.length < action.total,
        isAdditionalProductsLoading: false,
        totalProductCount: action.total,
      };
    }

    case SET_INSIGHTS_RESULTS_PAGE: {
      const products =
        state.page > 1
          ? [...state.insightsResultsPage, ...action.insightsResults]
          : action.insightsResults;

      return {
        ...state,
        insightsResultsPage: products,
        hasNextPageInsights: products.length < action.total,
        isAdditionalInsightsLoading: false,
        totalInsightsCount: action.total,
      };
    }

    case SET_EVENTS_RESULTS_PAGE: {
      const products =
        state.page > 1 ? [...state.eventResultsPage, ...action.eventResults] : action.eventResults;

      return {
        ...state,
        eventResultsPage: products,
        hasNextPageEvents: products.length < action.total,
        isAdditionalEventsLoading: false,
        totalEventsCount: action.total,
      };
    }

    case SET_WEBINAR_RESULTS_PAGE: {
      const products =
        state.page > 1
          ? [...state.videoLibraryResultsPage, ...action.videoLibraryResults]
          : action.videoLibraryResults;

      return {
        ...state,
        videoLibraryResultsPage: products,
        isAdditionalWebinarsLoading: false,
        hasNextPageWebinars: products.length < action.total,
        totalWebinarCount: action.total,
      };
    }

    case SET_HIRE_A_TEAM_RESULTS_PAGE: {
      const products =
        state.page > 1
          ? [...state.hireATeamResultsPage, ...action.hireATeamResults]
          : action.hireATeamResults;

      return {
        ...state,
        hireATeamResultsPage: products,
        hasNextPageHireATeam: products.length < action.total,
        isAdditionalHireATeamLoading: false,
        totalHireATeamCount: action.total,
      };
    }

    case SET_CONSULTING_RESULTS_POPUP: {
      return {
        ...state,
        consultingResultsPopup: action.consultingResults,
      };
    }

    case SET_WEBINAR_RESULTS_POPUP: {
      return {
        ...state,
        videoLibraryResultsPopup: action.videoLibraryResults,
      };
    }

    case SET_INSIGHTS_RESULTS_POPUP: {
      return {
        ...state,
        insightsResultsPopup: action.insightsResults,
      };
    }

    case SET_HIRE_A_TEAM_RESULTS_POPUP: {
      return {
        ...state,
        hireATeamResultsPopup: action.hireATeamResults,
      };
    }

    case SET_EVENTS_RESULTS_POPUP: {
      return {
        ...state,
        eventResultsPopup: action.eventResults,
      };
    }

    case GET_NEXT_PAGE: {
      return {
        ...state,
        isAdditionalProductsLoading: true,
        page: state.page + 1,
        value: action.value,
      };
    }

    case GET_NEXT_WEBINAR_PAGE: {
      return {
        ...state,
        isAdditionalWebinarsLoading: true,
        page: state.page + 1,
        value: action.value,
      };
    }

    case GET_NEXT_HIRE_A_TEAM_PAGE: {
      return {
        ...state,
        isAdditionalHireATeamLoading: true,
        page: state.page + 1,
        value: action.value,
      };
    }

    case GET_NEXT_INSIGHTS_PAGE: {
      return {
        ...state,
        isAdditionalInsightsLoading: true,
        page: state.page + 1,
        value: action.value,
      };
    }

    case SET_SEARCH_QUERY: {
      return {
        ...state,
        query: action.searchQuery,
      };
    }

    case SET_POPUP_QUERY: {
      return {
        ...state,
        popupQuery: action.popupQuery,
      };
    }

    case SET_VALUE: {
      return {
        ...state,
        [action.target]: action.value,
      };
    }

    case RESET: {
      return {
        ...initialState,
      };
    }

    case CLEAR_POPUP: {
      return {
        ...state,
        consultingResultsPopup: [],
        videoLibraryResultsPopup: [],
        insightsResultsPopup: [],
        eventResultsPopup: [],
        hireATeamResultsPopup: [],
        isLoadingPopup: false,
        popupQuery: "",
      };
    }

    case CLEAR_RESULTS_PAGE: {
      return {
        ...state,
        consultingResultsPage: [],
        eventResultsPage: [],
        videoLibraryResultsPage: [],
        insightsResultsPage: [],
        hireATeamResultsPage: [],
        isLoadingPage: false,
        query: "",
        page: 1,
        searchBackLink: "",
      };
    }

    case SET_SEARCH_BACK_LINK: {
      return {
        ...state,
        searchBackLink: action.searchBackLink,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
