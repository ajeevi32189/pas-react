// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Card,
//   Row,
//   Col,
//   Upload,
//   message,
//   Switch,
//   Select,
//   Spin,
//   Tabs,
// } from "antd";
// import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../../../config";

// const { TextArea } = Input;
// const { Option } = Select;
// const { TabPane } = Tabs;

// const ContentFormDatasheet = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const datasheet = location.state || null;

//   const [activeTab, setActiveTab] = useState("blog");
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [domains, setDomains] = useState([]);

//   const isEdit = !!datasheet;

//   useEffect(() => {
//     const fetchStaticData = async () => {
//       try {
//         const categoryForm = new FormData();
//         categoryForm.append("PUID", "123456");
//         categoryForm.append("Slug", "#");
//         categoryForm.append("CrudAction", "VIEW");
//         categoryForm.append("PageNo", 1);
//         categoryForm.append("PageSize", 1000);

//         const [catRes, domRes] = await Promise.all([
//           axios.post(`${API_URL}/api/Category/manage`, categoryForm),
//           axios.get(`${API_URL}/api/StaticData/post-domain`),
//         ]);

//         setCategories(catRes.data?.data || []);
//         setDomains(domRes.data || []);
//       } catch (error) {
//         message.error("Failed to load Offering/domain options");
//       }
//     };

//     fetchStaticData();
//   }, []);

//   useEffect(() => {
//     if (isEdit) {
//       form.setFieldsValue({
//         ...datasheet,
//         slug: datasheet.slug || "#",
//         status: datasheet.status,
//         category: datasheet.category || null,
//         domain: datasheet.domain ? datasheet.domain.split(",") : [],
//         intro: datasheet.about || null,
//         uses: datasheet.detail || null,
//         specifications: datasheet.specifications || [],
//       });

//       if (datasheet.photo) {
//         const files = datasheet.photo
//           .split(",")
//           .filter((url) => url.trim() !== "")
//           .map((url, index) => ({
//             uid: `-${index + 1}`,
//             name: `Image-${index + 1}.jpg`,
//             status: "done",
//             url: `${API_URL}${url.trim()}`,
//           }));
//         setImageFile(files);
//       }
//     }
//   }, [datasheet, form, isEdit]);

//   const handleImageChange = ({ fileList }) => setImageFile(fileList);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);
//       const formData = new FormData();

//       formData.append("Id", isEdit ? datasheet.id : "");
//       formData.append("Name", values.name);
//       formData.append("Slug", values.slug ?? "#");
//       formData.append("Intro", values.intro ?? "");
//       formData.append("Uses", values.uses ?? "");
//       formData.append("Features", values.features ?? "");
//       formData.append("Model", values.model ?? "");
//       formData.append("ViewOrder", "0");
//       formData.append("Status", values.status ?? true);
//       formData.append("PUID", datasheet?.puid || "123456");
//       formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
//       formData.append("Category", values.category);
//       formData.append("Domain", values.domain.join(","));
//       formData.append("PostType", "DATASHEET");

//       if (values.specifications) {
//         formData.append(
//           "Specifications",
//           JSON.stringify(values.specifications)
//         );
//       }

//       imageFile.forEach((file) => {
//         if (!file.url) {
//           formData.append("image", file.originFileObj);
//         }
//       });

//       await axios.post(`${API_URL}/api/NewPost/manage`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       message.success(isEdit ? "Content updated!" : "Content created!");

//       // Navigate to the appropriate list based on active tab
//       if (activeTab === "blog") navigate("/blog1/list");
//       else if (activeTab === "brochure") navigate("/brochure1/list");
//       else if (activeTab === "case-study") navigate("/cases1/list");
//     } catch (err) {
//       console.error(err);
//       message.error("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderCommonFields = () => (
//     <>
//       <Col span={12}>
//         <Form.Item
//           name="name"
//           label="Title"
//           rules={[{ required: true, message: "Please enter title" }]}
//         >
//           <Input placeholder="Enter title" />
//         </Form.Item>
//       </Col>

//       <Col span={12}>
//         <Form.Item
//           name="slug"
//           label="Slug"
//           rules={[{ required: true, message: "Please enter slug" }]}
//         >
//           <Input placeholder="Enter slug" />
//         </Form.Item>
//       </Col>

//       <Col span={12}>
//         <Form.Item
//           name="category"
//           label="Offering"
//           rules={[{ required: true, message: "Please select category" }]}
//         >
//           <Select placeholder="Select a category">
//             {categories.map((cat) => (
//               <Option key={cat.name} value={cat.name}>
//                 {cat.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </Col>

//       <Col span={12}>
//         <Form.Item
//           name="domain"
//           label="Domain"
//           rules={[{ required: true, message: "Please select domain" }]}
//         >
//           {domains.length === 0 ? (
//             <div className="flex justify-center items-center py-6">
//               <Spin tip="Loading domains..." />
//             </div>
//           ) : (
//             <Select
//               mode="multiple"
//               placeholder="Select domains"
//               style={{ width: "100%" }}
//               allowClear
//             >
//               {domains.map((dom, i) => (
//                 <Option key={i} value={dom}>
//                   {dom}
//                 </Option>
//               ))}
//             </Select>
//           )}
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="photos" label="Upload Images">
//           <Upload
//             fileList={imageFile}
//             onChange={handleImageChange}
//             beforeUpload={() => false}
//             multiple
//             accept="image/*"
//           >
//             <Button icon={<UploadOutlined />}>Select Images</Button>
//           </Upload>
//         </Form.Item>
//       </Col>

//       <Col span={12}>
//         <Form.Item
//           name="status"
//           label="Status"
//           valuePropName="checked"
//           initialValue={true}
//         >
//           <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
//         </Form.Item>
//       </Col>
//     </>
//   );

//   const renderBlogFields = () => (
//     <>
//       {renderCommonFields()}
//       <Col span={24}>
//         <Form.Item name="intro" label="Intro">
//           <TextArea
//             placeholder="Write intro..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="uses" label="Details">
//           <TextArea
//             placeholder="Write Details..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="features" label="Conclusion">
//           <TextArea
//             placeholder="Write Conclusion..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>
//     </>
//   );

//   const renderBrochureFields = () => (
//     <>
//       {renderCommonFields()}
//       <Col span={24}>
//         <Form.Item name="intro" label="About Us">
//           <TextArea
//             placeholder="Write About Us..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="uses" label="Our Solution">
//           <TextArea
//             placeholder="Write Our Solution..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="features" label="Key Benefits">
//           <TextArea
//             placeholder="Write Key Benefits..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="successStories" label="Success Stories">
//           <TextArea
//             placeholder="Write Success Stories..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="ourClients" label="Our Clients">
//           <TextArea
//             placeholder="Write Our Clients..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="awards" label="Awards">
//           <TextArea
//             placeholder="Write Awards..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="getInTouch" label="Get in Touch">
//           <TextArea
//             placeholder="Write Get in Touch..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>
//     </>
//   );

//   const renderCaseStudyFields = () => (
//     <>
//       {renderCommonFields()}
//       <Col span={24}>
//         <Form.Item name="intro" label="Intro">
//           <TextArea
//             placeholder="Write intro..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="uses" label="Problem Statement">
//           <TextArea
//             placeholder="Write Problem Statement..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="objectives" label="Objectives">
//           <TextArea
//             placeholder="Write Objectives..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="ourSolution" label="Our Solution">
//           <TextArea
//             placeholder="Write Our Solution..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item name="resultsImpact" label="Results & Impact">
//           <TextArea
//             placeholder="Write Results & Impact..."
//             autoSize={{ minRows: 2, maxRows: 6 }}
//           />
//         </Form.Item>
//       </Col>
//     </>
//   );

//   const getBackNavigationPath = () => {
//     if (activeTab === "blog") return "/blog1/list";
//     if (activeTab === "brochure") return "/brochure1/list";
//     if (activeTab === "case-study") return "/cases1/list";
//     return "/";
//   };

//   const getTitle = () => {
//     if (activeTab === "blog")
//       return isEdit ? "✏️ Edit Blog Datasheet" : "📄 Create Blog Datasheet";
//     if (activeTab === "brochure")
//       return isEdit
//         ? "✏️ Edit Brochure Datasheet"
//         : "📄 Create Brochure Datasheet";
//     if (activeTab === "case-study")
//       return isEdit
//         ? "✏️ Edit Case-Study Datasheet"
//         : "📄 Create Case-Study Datasheet";
//     return "Content Management";
//   };

//   return (
//     <Card className="m-4">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
//         <div>
//           <h3 className="text-2xl font-semibold text-white mb-1">
//             {getTitle()}
//           </h3>
//           <p className="text-sm text-gray-100">
//             {isEdit
//               ? `Editing: ${datasheet?.name || "Unknown"}`
//               : "Fill the form to publish new content"}
//           </p>
//         </div>
//         <Button
//           type="link"
//           icon={<ArrowLeftOutlined />}
//           onClick={() => navigate(getBackNavigationPath())}
//           style={{ color: "white", marginTop: "8px" }}
//         >
//           Back
//         </Button>
//       </div>

//       <Tabs
//         activeKey={activeTab}
//         onChange={setActiveTab}
//         type="card"
//         className="mb-6"
//       >
//         <TabPane tab="Blogs" key="blog">
//           <Form form={form} layout="vertical" onFinish={onFinish}>
//             <Row gutter={16}>
//               {renderBlogFields()}
//               <Col span={24}>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={loading}
//                     style={{ background: "#522EA8", border: "none" }}
//                   >
//                     {isEdit ? "Update" : "Submit"}
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </TabPane>

//         <TabPane tab="Brochures" key="brochure">
//           <Form form={form} layout="vertical" onFinish={onFinish}>
//             <Row gutter={16}>
//               {renderBrochureFields()}
//               <Col span={24}>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={loading}
//                     style={{ background: "#522EA8", border: "none" }}
//                   >
//                     {isEdit ? "Update" : "Submit"}
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </TabPane>

//         <TabPane tab="Case Studies" key="case-study">
//           <Form form={form} layout="vertical" onFinish={onFinish}>
//             <Row gutter={16}>
//               {renderCaseStudyFields()}
//               <Col span={24}>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={loading}
//                     style={{ background: "#522EA8", border: "none" }}
//                   >
//                     {isEdit ? "Update" : "Submit"}
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </TabPane>
//       </Tabs>
//     </Card>
//   );
// };

// export default ContentFormDatasheet;

//------------------------------------------------------


import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Upload,
  message,
  Switch,
  Select,
  Spin,
  Tabs,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import Cookies from "js-cookie";
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;


const ContentFormDatasheet = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const datasheet = location.state || null;

  const [activeTab, setActiveTab] = useState("blog");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [categories, setCategories] = useState([]);
  const [domains, setDomains] = useState([]);
  const token = Cookies.get("token");

  const isEdit = !!datasheet;

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const categoryForm = new FormData();
        categoryForm.append("PUID", "123456");
        categoryForm.append("Slug", "#");
        categoryForm.append("CrudAction", "VIEW");
        categoryForm.append("PageNo", 1);
        categoryForm.append("PageSize", 1000);

        const [catRes, domRes] = await Promise.all([
          axios.post(`${API_URL}/api/Category/manage`, categoryForm),
          axios.get(`${API_URL}/api/StaticData/post-domain`),
        ]);

        setCategories(catRes.data?.data || []);
        setDomains(domRes.data || []);
      } catch (error) {
        message.error("Failed to load Offering/domain options");
      }
    };

    fetchStaticData();
  }, []);

  useEffect(() => {
    if (isEdit) {
      // Determine the tab based on PostType
      if (datasheet.postType === "BLOG") setActiveTab("blog");
      else if (datasheet.postType === "BROCHURE") setActiveTab("brochure");
      else if (datasheet.postType === "CASE-STUDY") setActiveTab("case-study");
      
      form.setFieldsValue({
        name: datasheet.title || "",
        slug: datasheet.slug || "#",
        status: datasheet.status,
        category: datasheet.category || null,
        domain: datasheet.domain ? datasheet.domain.split(",") : [],
        intro: datasheet.intro || datasheet.aboutUs || "",
        uses: datasheet.details || datasheet.ourSolutions || datasheet.problemStatement || "",
        features: datasheet.conclusion || datasheet.keyBenefits || "",
        successStories: datasheet.successStories || "",
        ourClients: datasheet.ourClients || "",
        awards: datasheet.awards || "",
        getInTouch: datasheet.getInTouch || "",
        objectives: datasheet.objectives || "",
        ourSolution: datasheet.ourSolutions || "",
        resultsImpact: datasheet.resultsImpact || "",
      });

      if (datasheet.photo) {
        const files = datasheet.photo
          .split(",")
          .filter((url) => url.trim() !== "")
          .map((url, index) => ({
            uid: `-${index + 1}`,
            name: `Image-${index + 1}.jpg`,
            status: "done",
            url: `${API_URL}${url.trim()}`,
          }));
        setImageFile(files);
      }
    }
  }, [datasheet, form, isEdit]);

  const handleImageChange = ({ fileList }) => setImageFile(fileList);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Common fields
      formData.append("Id", isEdit ? datasheet.id : "");
      formData.append("Title", values.name);
      formData.append("Slug", values.slug ?? "#");
      formData.append("ViewOrder", "0");
      formData.append("Status", values.status ?? true);
      formData.append("PUID", datasheet?.puid || "123456");
      formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
      formData.append("Category", values.category);
      formData.append("Domain", values.domain.join(","));
      
      // Determine PostType based on active tab
      let postType = "BLOG";
      if (activeTab === "brochure") postType = "BROCHURE";
      if (activeTab === "case-study") postType = "CASE-STUDY";
      formData.append("PostType", postType);

      // Handle fields specific to each post type
      if (activeTab === "blog") {
        formData.append("Intro", values.intro ?? "");
        formData.append("Details", values.uses ?? "");
        formData.append("Conclusion", values.features ?? "");
      } 
      else if (activeTab === "brochure") {
        formData.append("AboutUs", values.intro ?? "");
        formData.append("OurSolutions", values.uses ?? "");
        formData.append("KeyBenefits", values.features ?? "");
        formData.append("SuccessStories", values.successStories ?? "");
        formData.append("OurClients", values.ourClients ?? "");
        formData.append("Awards", values.awards ?? "");
        formData.append("GetInTouch", values.getInTouch ?? "");
      } 
      else if (activeTab === "case-study") {
        formData.append("Intro", values.intro ?? "");
        formData.append("ProblemStatement", values.uses ?? "");
        formData.append("Objectives", values.objectives ?? "");
        formData.append("OurSolutions", values.ourSolution ?? "");
        formData.append("ResultsImpact", values.resultsImpact ?? "");
      }

      // Handle image uploads
      imageFile.forEach((file) => {
        if (!file.url) {
          formData.append("files", file.originFileObj);
        } else {
          // For existing images, send the URL without the API_URL prefix
          formData.append("Photo", file.url.replace(API_URL, ""));
        }
      });

      await axios.post(`${API_URL}/api/NewPost/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(isEdit ? "Content updated!" : "Content created!");

      // Navigate to the appropriate list based on active tab
      if (activeTab === "blog") navigate("/content-data-list");
      else if (activeTab === "brochure") navigate("/content-data-list");
      else if (activeTab === "case-study") navigate("/content-data-list");
    } catch (err) {
      console.error(err);
      message.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const renderCommonFields = () => (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="slug"
          label="Slug"
          rules={[{ required: true, message: "Please enter slug" }]}
        >
          <Input placeholder="Enter slug" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="category"
          label="Offering"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select a category">
            {categories.map((cat) => (
              <Option key={cat.name} value={cat.name}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="domain"
          label="Domain"
          rules={[{ required: true, message: "Please select domain" }]}
        >
          {domains.length === 0 ? (
            <div className="flex justify-center items-center py-6">
              <Spin tip="Loading domains..." />
            </div>
          ) : (
            <Select
              mode="multiple"
              placeholder="Select domains"
              style={{ width: "100%" }}
              allowClear
            >
              {domains.map((dom, i) => (
                <Option key={i} value={dom}>
                  {dom}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="photos" label="Upload Images">
          <Upload
            fileList={imageFile}
            onChange={handleImageChange}
            beforeUpload={() => false}
            multiple
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Col>
    </>
  );

  const renderBlogFields = () => (
    <>
      {renderCommonFields()}
      <Col span={24}>
        <Form.Item name="intro" label="Intro">
          <TextArea
            placeholder="Write intro..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="uses" label="Details">
          <TextArea
            placeholder="Write Details..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="features" label="Conclusion">
          <TextArea
            placeholder="Write Conclusion..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>
    </>
  );

  const renderBrochureFields = () => (
    <>
      {renderCommonFields()}
      <Col span={24}>
        <Form.Item name="intro" label="About Us">
          <TextArea
            placeholder="Write About Us..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="uses" label="Our Solution">
          <TextArea
            placeholder="Write Our Solution..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="features" label="Key Benefits">
          <TextArea
            placeholder="Write Key Benefits..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="successStories" label="Success Stories">
          <TextArea
            placeholder="Write Success Stories..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="ourClients" label="Our Clients">
          <TextArea
            placeholder="Write Our Clients..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="awards" label="Awards">
          <TextArea
            placeholder="Write Awards..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="getInTouch" label="Get in Touch">
          <TextArea
            placeholder="Write Get in Touch..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>
    </>
  );

  const renderCaseStudyFields = () => (
    <>
      {renderCommonFields()}
      <Col span={24}>
        <Form.Item name="intro" label="Intro">
          <TextArea
            placeholder="Write intro..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="uses" label="Problem Statement">
          <TextArea
            placeholder="Write Problem Statement..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="objectives" label="Objectives">
          <TextArea
            placeholder="Write Objectives..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="ourSolution" label="Our Solution">
          <TextArea
            placeholder="Write Our Solution..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="resultsImpact" label="Results & Impact">
          <TextArea
            placeholder="Write Results & Impact..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Col>
    </>
  );

  const getBackNavigationPath = () => {
    if (activeTab === "blog") return "/content-data-list";
    if (activeTab === "brochure") return "/content-data-list";
    if (activeTab === "case-study") return "/content-data-list";
    return "/";
  };

  const getTitle = () => {
    if (activeTab === "blog")
      return isEdit ? "✏️ Edit Blog" : "📄 Create Blog";
    if (activeTab === "brochure")
      return isEdit
        ? "✏️ Edit Brochure"
        : "📄 Create Brochure";
    if (activeTab === "case-study")
      return isEdit
        ? "✏️ Edit Case Study"
        : "📄 Create Case Study";
    return "Content Management";
  };

  return (
    <Card className="m-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-1">
            {getTitle()}
          </h3>
          <p className="text-sm text-gray-100">
            {isEdit
              ? `Editing: ${datasheet?.title || "Unknown"}`
              : "Fill the form to publish new content"}
          </p>
        </div>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(getBackNavigationPath())}
          style={{ color: "white", marginTop: "8px" }}
        >
          Back
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        className="mb-6"
      >
        <TabPane tab="Blogs" key="blog">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {renderBlogFields()}
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ background: "#522EA8", border: "none" }}
                  >
                    {isEdit ? "Update" : "Submit"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="Brochures" key="brochure">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {renderBrochureFields()}
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ background: "#522EA8", border: "none" }}
                  >
                    {isEdit ? "Update" : "Submit"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="Case Studies" key="case-study">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {renderCaseStudyFields()}
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ background: "#522EA8", border: "none" }}
                  >
                    {isEdit ? "Update" : "Submit"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ContentFormDatasheet;