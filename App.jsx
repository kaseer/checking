import React, { lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { isEmpty } from "lodash";
import { setupDiscoveryCms } from "@discoverycms/connector";
import ConciergePopup from "./components/snow/chat/ConciergePopup";
import { sendCtaClick } from "./utils/TagManagerHelper";
import { SEARCH_RESULT_PAGE_URL } from "./utils/helpers/SearchHelper";
import { authProvider } from "./config/AuthProvider";
import RouteConstants from "./utils/RouteConstants";
import RoseSuspense from "./RoseSuspense";
import DiscoveryConfig from "./utils/discovery/DiscoveryConfig";

const MyInvoices = lazy(() => import("./routes/MyInvoices"));
const LandingSessionDetails = lazy(() => import("./components/landing/LandingSessionDetails"));
const BespokeServices = lazy(() => import("./routes/BespokeServices"));
const Cart = lazy(() => import("./routes/Cart"));
const CartExpired = lazy(() => import("./routes/CartExpired"));
const Expert = lazy(() => import("./routes/Expert"));
const ForgotPassword = lazy(() => import("./routes/ForgotPassword"));
const Home = lazy(() => import("./routes/Home"));
const MyAccount = lazy(() => import("./routes/MyAccount"));
const MyOrders = lazy(() => import("./routes/MyOrders"));
const MyConciergeMessages = lazy(() => import("./routes/MyConciergeMessages"));
const MyMembership = lazy(() => import("./routes/MyMembership"));
const MyProfile = lazy(() => import("./routes/MyProfile"));
const MyWallet = lazy(() => import("./routes/MyWallet"));
const SessionDetail = lazy(() => import("./routes/myreply/SessionDetail"));
const NotFound = lazy(() => import("./routes/NotFound"));
const OrderConfirmation = lazy(() => import("./routes/OrderConfirmation"));
const PurchasedServices = lazy(() => import("./routes/PurchasedServices"));
const ResetPassword = lazy(() => import("./routes/ResetPassword"));
const RoseServices = lazy(() => import("./routes/RoseServices"));
// TO BE REMOVED
const Dashboard = lazy(() => import("./routes/dashboard_old/Dashboard"));
const DashboardProjects = lazy(() => import("./routes/dashboard/DashboardProjects"));
const DashboardServices = lazy(() => import("./routes/dashboard/DashboardServices"));
const DashboardSLA = lazy(() => import("./routes/dashboard_old/DashboardSLA"));
const DashboardJobHistory = lazy(() => import("./routes/dashboard_old/JobHistory"));
const DashboardJobSharing = lazy(() => import("./routes/dashboard_old/JobSharing"));
const JobDetailsPage = lazy(() => import("./routes/dashboard_old/JobDetails"));
const Milestones = lazy(() => import("./routes/dashboard_old/Milestones"));

const AccessibilityPrivate = lazy(() => import("./routes/AccessibilityPrivate"));
const AccessibilityPublic = lazy(() => import("./routes/AccessibilityPublic"));
const Session = lazy(() => import("./routes/Session"));
const SignUpConfirmation = lazy(() => import("./routes/SignUpConfirmation"));
const CountryNotAvailable = lazy(() => import("./routes/CountryNotAvailable"));
const Logout = lazy(() => import("./routes/Logout"));
const Support = lazy(() => import("./routes/support/Support"));
const SupportSearch = lazy(() => import("./routes/support/SupportSearch"));
const SupportRequestsMessages = lazy(() => import("./routes/support/SupportRequest"));
const SupportCase = lazy(() => import("./routes/support/SupportCase"));
const SupportArticle = lazy(() => import("./routes/support/SupportArticleDetail"));
const SupportCategory = lazy(() => import("./routes/support/SupportCategory"));
const Consulting = lazy(() => import("./routes/Consulting"));
const ConsultingTopic = lazy(() => import("./routes/ConsultingTopic"));
const VideoLibrary = lazy(() => import("./routes/videolibrary/VideoLibrary"));
const ServiceUnavailable = lazy(() => import("./routes/ServiceUnavailable"));
const Maintenance = lazy(() => import("./routes/Maintenance"));
const InvitationError = lazy(() => import("./routes/InvitationError"));
const FailSafe = lazy(() => import("./routes/error/FailSafe"));
const LeaveFeedback = lazy(() => import("./routes/purchases/LeaveFeedback"));
const SearchResultPage = lazy(() => import("./routes/search/SearchResultsLanding"));
const LandingPage = lazy(() => import("./routes/LandingPage"));

const Membership = lazy(() => import("./routes/Membership"));
const TopUp = lazy(() => import("./routes/CreditsTopUp"));
const PaymentSuccessful = lazy(() => import("./routes/PaymentSuccessful"));
const Insights = lazy(() => import("./routes/insights/Insights"));
const InsightsDetail = lazy(() => import("./routes/InsightsDetails"));
const Events = lazy(() => import("./routes/Events"));

// const DashboardHome = lazy(() => import("./routes/dashboard/DashboardHome"));
// const DashboardJobDetails = lazy(() => import("./routes/dashboard/DashboardJobDetails"));

// const HireATeam = lazy(() => import("./routes/HireATeam"));

function App() {
  const { REACT_APP_MAINTENANCE_MODE } = process.env;
  const urlParams = new URLSearchParams(window.location.search);
  const isMaintenance =
    REACT_APP_MAINTENANCE_MODE === "true" &&
    !urlParams.has(process.env.REACT_APP_MAINTENANCE_MODE_BACKDOOR);

  const handleButtonPress = (event) => {
    if (event.target.classList.contains("btn")) {
      // not all CTAs are rendered as "button" elements
      sendCtaClick(event.target.textContent);
    }
  };

  setupDiscoveryCms(DiscoveryConfig);

  useEffect(() => {
    window.addEventListener("click", (event) => handleButtonPress(event));
    return () => {
      window.removeEventListener("click", (event) => handleButtonPress(event));
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!isEmpty(authProvider.getAccount()));
  }, []);

  return (
    <div className="App">
      <RoseSuspense>
        {isMaintenance ? (
          <Routes>
            <Route path="/" element={<Maintenance />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ResetPassword />} />
            <Route path="/concierge-popup" element={<ConciergePopup isPopup={false} isPage />} />
            <Route path={SEARCH_RESULT_PAGE_URL} element={<SearchResultPage />} />
            <Route path="/signup-confirmation" element={<SignUpConfirmation />} />
            <Route exact path="/country-not-available" element={<CountryNotAvailable />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/payment-successful" element={<PaymentSuccessful />} />
            {/* <Route exact path="/jobs" element={<DashboardHome />} />
            <Route exact path="/jobs/details" element={<DashboardJobDetails />} /> */}

            <Route exact path="/jobs" element={<Dashboard />} />
            <Route exact path="/jobs/details" element={<JobDetailsPage />} />
            <Route exact path="/jobs/details/projects" element={<DashboardProjects />} />
            <Route exact path="/jobs/details/services" element={<DashboardServices />} />
            <Route path="/jobs/details/projects/milestones" element={<Milestones />} />
            <Route path="/jobs/details/services/sla" element={<DashboardSLA />} />
            <Route path="/jobs/details/history" element={<DashboardJobHistory />} />
            <Route path="/jobs/details/sharing" element={<DashboardJobSharing />} />
            <Route path="/rose-services" element={<RoseServices />} />
            <Route path="/accessibility" element={<AccessibilityPrivate />} />
            <Route path="/accessibility-statement" element={<AccessibilityPublic />} />
            <Route
              exact
              path={`${RouteConstants.INSIGHTS_PAGE_URL}:ID`}
              element={
                isLoggedIn ? <InsightsDetail isBespokeSession={false} /> : <LandingSessionDetails />
              }
            />
            <Route
              exact
              path={`${RouteConstants.PRODUCT_PAGE_URL}:ID`}
              element={
                isLoggedIn ? <Session isBespokeSession={false} /> : <LandingSessionDetails />
              }
            />
            <Route path="/bespoke-services/:ID" element={<Session isBespokeSession />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart-expired/" element={<CartExpired />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path={RouteConstants.MY_PROFILE_PAGE_URL} element={<MyProfile />} />
            <Route path="/my-wallet" element={<MyWallet />} />
            <Route path="/my-rose-messages" element={<MyConciergeMessages />} />
            <Route path="/my-membership" element={<MyMembership />} />
            <Route exact path="/my-bookings" element={<PurchasedServices />} />
            <Route
              exact
              path="/my-bookings/service/feedback/:orderNumber/:groupId"
              element={<LeaveFeedback />}
            />
            <Route exact path="/my-bookings/service/:orderNumber" element={<SessionDetail />} />
            <Route exact path="/my-bookings/order-history" element={<MyOrders />} />
            <Route path="/bespoke-services" element={<BespokeServices />} />
            <Route path="/my-invoices" element={<MyInvoices />} />
            <Route path="/concierge-conversation" />
            <Route exact path="/support" element={<Support />} />
            <Route exact path="/support/search" element={<SupportSearch />} />
            <Route exact path="/support/requests" element={<SupportRequestsMessages />} />
            <Route
              exact
              path="/support/messages"
              element={<SupportRequestsMessages isMessages />}
            />
            <Route exact path="/support/case/:caseId" element={<SupportCase />} />
            <Route exact path="/support/message/:caseId" element={<SupportCase isMessages />} />
            <Route exact path="/support/article/:articleId" element={<SupportArticle />} />
            <Route exact path="/support/category/:categoryId" element={<SupportCategory />} />
            <Route exact path="/expert-page/:slug" element={<Expert />} />
            <Route exact path="/order-confirmation" element={<OrderConfirmation />} />
            <Route exact path="/consulting" element={<Consulting />} />
            <Route exact path="/consulting-topic" element={<ConsultingTopic />} />
            <Route exact path="/video-library" element={<VideoLibrary />} />
            <Route exact path="/insights" element={<Insights />} />
            <Route exact path="/events" element={<Events />} />
            {/* {<Route exact path="/hire-a-team" element={<HireATeam />} />} */}
            <Route
              exact
              path={`${RouteConstants.HIRE_A_TEAM_PAGE_URL}:ID`}
              element={
                isLoggedIn ? (
                  <Session isHireATeamSession isBespokeSession={false} />
                ) : (
                  <LandingSessionDetails />
                )
              }
            />
            <Route
              exact
              path={`${RouteConstants.VIDEO_LIBRARY_URL}:ID`}
              element={
                isLoggedIn ? (
                  <Session isVideoLibrarySession isBespokeSession={false} />
                ) : (
                  <LandingSessionDetails />
                )
              }
            />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/carousel" element={<Home />} />
            <Route exact path="/canvas" element={<Home />} />
            <Route exact path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
            <Route exact path="/service-unavailable" element={<ServiceUnavailable />} />
            <Route exact path="/service-maintenance" element={<Maintenance />} />
            <Route exact path="/invitation-error" element={<InvitationError />} />
            <Route exact path="/fail-safe" element={<FailSafe />} />
            <Route element={<NotFound />} />
          </Routes>
        )}
      </RoseSuspense>
    </div>
  );
}

export default App;
