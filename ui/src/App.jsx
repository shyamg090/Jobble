import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
// import PeepsOverlay from "./components/PeepsOverlay";
import RoleSelection from "./components/RoleSelection";
import JobPostings from "./components/JobPostings";
import AddJob from "./components/AddJob";

function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* <PeepsOverlay /> */}
        <div className="relative z-10 min-h-screen">
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/select-role" element={<RoleSelection />} />
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
                <Route path="/my-jobs" element={<JobPostings />} />
                <Route path="/add-job" element={<AddJob />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;
