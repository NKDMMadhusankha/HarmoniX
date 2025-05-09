import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProducerProvider } from './context/ProducerContext';

import Register from "./components/Register"; 
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";


import Home from "./Home";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import RegistationCatogary from "./Auth/RegistationCatogary";
import MusicianRegistrationForm from "./Auth/MusicianRegister";
import StudioRegister from "./Auth/StudioRegister";
import ForgotPassword from "./Components/FogotPass";


import MusicProducers from "./Pages/MusicProducers";
import Mastering from "./Pages/Mastering";
import Mixing from "./Pages/Mixing";
import Lyricists from "./Pages/Lyricists";
import Studios from "./Pages/Studios";


import MusicProfile from "./Profiles/MusicProfile";
import MixingProfile from "./Profiles/MixingProfile";
import MasteringProfile from "./Profiles/MasteringProfile";
import LyricistsProfile from "./Profiles/LyricistsProfile";


import MusicProDashbord from "./Dashboard/MusicProDashboard";
import MixingDashboard from "./Dashboard/MixingDashboard";
import MasteringDashboard from "./Dashboard/MasteringDashboard";
import LyricistDashboard from "./Dashboard/LyricistsDashboard";
import StudioDashboard from "./Dashboard/StudioDashboard";


import AboutProducing from "./Landing/AboutProducing";
import AboutMixing from "./Landing/AboutMixing";
import AboutMastering from "./Landing/AboutMastering";

import StudiosProfile from "./Profiles/StudiosProfile";
import StudioUploadImages from "./Pages/StudioUploadImages";
import StudioProfile from './Pages/Studios';

import ProducersPage from './Pages/ProducersPage';
import ProducerDetailsPage from './Pages/ProducerDetailsPage';

const App = () => {
  return (
    <Router>
      <ProducerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-producing" element={<AboutProducing />} />
          <Route path="/about-mixing" element={<AboutMixing />} />
          <Route path="/about-mastering" element={<AboutMastering />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/catogary" element={<RegistationCatogary />} />
          <Route path="/musician/register" element={<MusicianRegistrationForm />} />
          <Route path="/studio/register" element={<StudioRegister />} />

          {/* Musicians Profile */}
          <Route path="/musicpro" element={<MusicProfile />} />
          <Route path="/music/producer/:id" element={<MusicProfile />} />

          <Route path="/mixingpro" element={<MixingProfile />} />
          <Route path="/music/mixing-engineer/:id" element={<MixingProfile />} />

          <Route path="/masteringpro" element={<MasteringProfile />} />
          <Route path="/music/mastering-engineer/:id" element={<MasteringProfile />} />

          <Route path="/lyricistspro" element={<LyricistsProfile />} />
          <Route path="/music/lyricist/:id" element={<LyricistsProfile />} />

          <Route path="/studiopro" element={<StudiosProfile />} />
          <Route path="/studio/:id" element={<StudiosProfile />} />

          {/* Musicians Pages */}
          <Route path="/music/producer" element={<MusicProducers />} />
          <Route path="/music/mastering" element={<Mastering />} />
          <Route path="/music/mixing" element={<Mixing />} />
          <Route path="/music/lyricists" element={<Lyricists />} />
          <Route path="/music/studios" element={<Studios />} />

          {/* Dashbords for editing thire Profile */}
          <Route path="/musicpro/dashboard" element={<MusicProDashbord />} />
          <Route path="/mixing/dashboard" element={<MixingDashboard />} />
          <Route path="/mastering/dashboard" element={<MasteringDashboard />} />
          <Route path="/lyricist/dashboard" element={<LyricistDashboard />} />
          <Route path="/studio/dashboard" element={<StudioDashboard />} />

          <Route path="/studio/upload-images" element={<StudioUploadImages />} />

          {/* Producer Pages */}
          <Route path="/producers" element={<ProducersPage />} />  
          <Route path="/producer/:id" element={<MusicProfile />} />
        </Routes>
      </ProducerProvider>
    </Router>
  );
};

export default App;
