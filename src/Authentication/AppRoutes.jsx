import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogForm from '../Component/Pages/Blog/BlogForm';
import BlogDetails from '../Component/Pages/Blog/BlogDetails';
import TinyEditor from '../Component/Pages/HtmlEditor';
import CategoryForm from '../Component/Pages/CategoryForm';
import CaseStudyForm from '../Component/Pages/Case-Study/CaseStudyForm';
import CaseStudyDetails from '../Component/Pages/Case-Study/CaseStudyDetails';
import VideoDetails from '../Component/Pages/Video/VideoDetails';
import VideoForm from '../Component/Pages/Video/VideoForm';
import PodcastDetails from '../Component/Pages/Podcasts/PodcastDetails';
import PodcastForm from '../Component/Pages/Podcasts/PodcastForm';
import BrochureDetails from '../Component/Pages/Brochure/BrochureDetails';
import BrochureForm from '../Component/Pages/Brochure/BrochureForm';
import GalleryDetails from '../Component/Pages/Gallery/GalleryDetails';
import GalleryForm from '../Component/Pages/Gallery/GalleryForm';
import DatasheetDetails from '../Component/Pages/Datasheet/DatasheetDetails';
import DatasheetForm from '../Component/Pages/Datasheet/DatasheetForm';
import AddProduct from '../Component/Pages/Product/AddProduct';
import ProductDetails from '../Component/Pages/Product/ProductDetails';
import AddFeature from '../Component/Pages/Product/AddFeature';
import AddSubFeature from '../Component/Pages/Product/AddSubFeature';
import AddSubSubFeature from '../Component/Pages/Product/AddSubSubFeature';
import AddDatasheet from '../Component/Pages/Product/AddDatasheet';
import FeatureDetails from '../Component/Pages/Product/FeatureDetails';
import ProductDatasheetDetails from '../Component/Pages/Product/ProductDatasheetDetails';
import OrderList from '../Component/Pages/OrderList/OrderList';

import BlogDatasheetDetails from '../Component/Pages/Datasheet/BlogDatasheetDetails';
import BlogFormDatasheet from '../Component/Pages/Datasheet/BlogFormDatasheet';
import BrochureDatasheetDetails from '../Component/Pages/Datasheet/BrochureDatasheetDetails';
import BrochureFormDatasheet from '../Component/Pages/Datasheet/BrochureFormDatasheet';
import CaseStudiesDatasheetDetails from '../Component/Pages/Datasheet/CaseStudiesDatasheetDetails';
import CaseStudiesFormDatasheet from '../Component/Pages/Datasheet/CaseStudiesFormDatasheet';
import ContentFormDatasheet from '../Component/Pages/Datasheet/ContentFormDatasheet';
import ContentDetailsDatasheet from '../Component/Pages/Datasheet/ContentDetailsDatasheet';

import ForgetPassword from './ForgetPassword';
import ClassicDashboard from '../Component/Pages/PASComponent/Classic-Dashboard/ClassicDashboard'
import AddPASDevice from '../Component/Pages/PASComponent/AddPASDevice';
import PasContent from '../Component/Pages/PASComponent/PasContent';
import ScheduleContent from '../Component/Pages/PASComponent/ScheduleContent';
import PasContentReport from '../Component/Pages/PASComponent/PasContentReport';
import DeviceReport from '../Component/Pages/PASComponent/DeviceReport';
import User from '../Component/Pages/PASComponent/User';
import Device from '../Component/Pages/PASComponent/Device';
import ActivityLogs from '../Component/Pages/PASComponent/ActivityLogs';
import Profile from '../Component/Profile';
import UserLogs from '../Component/Pages/PASComponent/UserLogs';



const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/classic-dashboard" element={<ClassicDashboard/>} />
      <Route path="/pas-devices" element={<AddPASDevice/>} />
      <Route path="/pascontent" element={<PasContent/>} />
      <Route path="/schedule" element={<ScheduleContent/>} />
      <Route path="/content-report" element={<PasContentReport/>} />
      <Route path="/device-report" element={<DeviceReport/>} />
      <Route path="/user-management" element={<User/>} />
      <Route path="/device-permission" element={<Device/>} />
      <Route path="/activity-logs" element={<ActivityLogs/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/user-logs" element={<UserLogs/>} />








      <Route path="/blog/create" element={<BlogForm/>} />
      <Route path="/blog/list" element={<BlogDetails/>} />
      <Route path="/case-study/create" element={<CaseStudyForm/>} />
      <Route path="/case-study/list" element={<CaseStudyDetails/>} />
      <Route path="/offering" element={<CategoryForm/>} />
      <Route path="/video/list" element={<VideoDetails/>} />
      <Route path="/video/create" element={<VideoForm/>} />
      <Route path="/podcast/list" element={<PodcastDetails/>} />
      <Route path="/podcast/create" element={<PodcastForm/>} />
      <Route path="/brochure/list" element={<BrochureDetails/>} />
      <Route path="/brochure/create" element={<BrochureForm/>} />
      <Route path="/gallery/list" element={<GalleryDetails/>} />
      <Route path="/gallery/create" element={<GalleryForm/>} />
      <Route path="/datasheet/list" element={<DatasheetDetails/>} />
      <Route path="/datasheet/create" element={<DatasheetForm/>} />
      <Route path="/blog1/create" element={<BlogFormDatasheet/>} />
      <Route path="/brochure1/create" element={<BrochureFormDatasheet/>} />
      <Route path="/cases1/create" element={<CaseStudiesFormDatasheet/>} />
      <Route path="/product/create" element={<AddProduct/>} />
      <Route path="/feature/create" element={<AddFeature/>} />
      <Route path="/sub-feature/create" element={<AddSubFeature/>} />
      <Route path="/sub-sub-feature/create" element={<AddSubSubFeature/>} />
      <Route path="/product-datasheet/create" element={<AddDatasheet/>} />
      <Route path="/product/list" element={<ProductDetails/>} />
      <Route path="/blog1/list" element={<BlogDatasheetDetails/>} />
      <Route path="/content-data-list" element={<ContentDetailsDatasheet/>} />
      <Route path="/brochure1/list" element={<BrochureDatasheetDetails/>} />
      <Route path="/cases1/list" element={<CaseStudiesDatasheetDetails/>} />
      <Route path="/contentdata" element={<ContentFormDatasheet/>} />
      <Route path="/feature/list" element={<FeatureDetails/>} />
      <Route path="/datasheet" element={<ProductDatasheetDetails/>} />
      <Route path="/order/list" element={<OrderList/>} />


      {/* practic */}
      <Route path="/tiny" element={<TinyEditor/>} />
      {/* ..... */}

    </Routes>
  );
};

export default AppRoutes;
