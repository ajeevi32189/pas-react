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
//   Select,
//   Checkbox,
//   Spin,
// } from "antd";
// import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../../../config";
// import Cookies from "js-cookie";
// const { TextArea } = Input;
// const { Option } = Select;

// const ProductAdd = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const product = location.state || null;
//   const token = Cookies.get("token");
//   const puid = Cookies.get("puid") || "";

//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [domains, setDomains] = useState([]);
//   const [datasheetId, setDataSheetId] = useState([])
//   const [categories, setCategories] = useState([])

//   const isEdit = !!product;

//   useEffect(() => {
//     const formData = new FormData();
//     formData.append("CrudAction", "VIEW");
//     formData.append("PUID", product?.puid || "123456");
//     formData.append("Status", true);
//     formData.append("Slug", "#");
//     formData.append("PageNo", 1);
//     formData.append("PageSize", 1000);
//     const fetchStaticData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/StaticData/post-domain`);
//         const response2 = await axios.post(`${API_URL}/api/DataSheet/manage`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           }
//         })
//         const response3 = await axios.post(`${API_URL}/api/Category/manage`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           }
//         });
//         setDataSheetId(response2.data.data)
//         setDomains(response.data || []);
//         setCategories(response3.data?.data || []);
//       } catch (error) {
//         console.error("Error loading domain list:", error);
//         message.error("Failed to load domain options");
//       }
//     };

//     fetchStaticData();
//   }, [puid]);

//   useEffect(() => {
//     if (isEdit) {
//       form.setFieldsValue({
//         ...product,
//         useAbility: product.useability,
//        domain: product.domain ? product.domain.split(",") : [],
//       });

//       if (product.image) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "image.jpg",
//             status: "done",
//             url: `${API_URL}${product.image}`,
//           },
//         ]);
//       }
//     }
//   }, [product, form, isEdit]);

//   const handleUploadChange = ({ fileList: newList }) => {
//     const imagesOnly = newList.filter(file => {
//       if (!file.type?.startsWith("image/")) {
//         message.error(`${file.name} is not a valid image`);
//         return false;
//       }
//       return true;
//     });
//     setFileList(imagesOnly);
//   };

//   const onFinish = async (values) => {
//     if (fileList.length === 0 && !isEdit) {
//       message.error("Please upload an image");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("Id", isEdit ? product.id : "");
//       formData.append("name", values.name);
//       formData.append("about", values.about || "");
//       formData.append("price", values.price);
//       formData.append("category", values.category);
//       formData.append("description", values.description || "");
//       formData.append("useAbility", values.useAbility || "");
//       // formData.append("Domain", values.domain);
//       formData.append("Domain", values.domain.join(","));
//       formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
//       formData.append("PUID", product?.puid || "123456");
//       formData.append("Status", values.status ?? true);
//       formData.append("Slug", values.slug ?? "#");
//       formData.append("DatasheetId", values.datasheetId ?? "");
//       formData.append("SKU", "");

//       if (fileList[0]?.originFileObj) {
//         formData.append("Files", fileList[0].originFileObj);
//       }

//       const response = await axios[isEdit ? "post" : "post"](
//         isEdit
//           ? `${API_URL}/api/Product/Crud`
//           : `${API_URL}/api/Product/Crud`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           }
//         }
//       );

//       if (response.data) {
//         message.success(`Product ${isEdit ? "updated" : "added"} successfully`);
//         form.resetFields();
//         setFileList([]);
//         navigate("/product/list");
//       } else {
//         throw new Error("No response data");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       message.error(
//         err.response?.data?.message ||
//         `Failed to ${isEdit ? "update" : "add"} product`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="m-4">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
//         <div>
//           <h3 className="text-2xl font-semibold mb-1">
//             🛒 {isEdit ? "Edit Product" : "Add Product"}
//           </h3>
//           <p className="text-sm text-gray-100">
//             {isEdit
//               ? "Update the product details"
//               : "Fill out the details to add a new product"}
//           </p>
//         </div>
//         <Button
//           type="link"
//           icon={<ArrowLeftOutlined />}
//           onClick={() => navigate("/product/list")}
//           style={{ color: "white" }}
//         >
//           Product Details
//         </Button>
//       </div>

//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="name"
//               label="Product Name"
//               rules={[{ required: true, message: "Please enter product name" }]}
//             >
//               <Input placeholder="Enter product name" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="about" label="About">
//               <Input placeholder="Short description" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="price"
//               label="Price"
//               rules={[
//                 { required: true, message: "Please enter price" },
//                 {
//                   pattern: /^\d+(\.\d{1,2})?$/,
//                   message: "Enter a valid price",
//                 },
//               ]}
//             >
//               <Input type="number" step="0.01" placeholder="Enter price" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="useAbility" label="Use Ability">
//               <Input placeholder="Usability info" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="domain"
//               label="Domain"
//               rules={[{ required: true, message: "Please select domain" }]}
//             >
//               {domains.length === 0 ? (
//                 <div className="flex justify-center items-center py-6">
//                   <Spin tip="Loading domains..." />
//                 </div>
//               ) : (
//                 <Checkbox.Group style={{ width: "100%" }}>
//                   <Row gutter={[16, 8]}>
//                     {domains.map((dom, i) => (
//                       <Col span={8} key={i}>
//                         <Checkbox value={dom}>{dom}</Checkbox>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Checkbox.Group>
//               )}
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="category"
//               label="Offering"
//               rules={[{ required: true, message: "Please select category" }]}
//             >
//               <Select placeholder="Select a category">
//                 {categories.map((cat) => (
//                   <Option key={cat.name} value={cat.name}>
//                     {cat.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="datasheetId"
//               label="Datasheet"
//               rules={[{ required: true, message: "Please select datasheet" }]}
//             >
//               <Select placeholder="Select datasheet">
//                 {datasheetId.map((item, index) => <Option value={item.id}>{item.name}</Option>)}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item name="description" label="Description">
//               <TextArea rows={4} placeholder="Detailed description" />
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item
//               name="image"
//               label="Upload Image"
//               rules={[{ required: !isEdit, message: "Please upload image" }]}
//               valuePropName="fileList"
//               getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//             >
//               <Upload
//                 beforeUpload={() => false}
//                 fileList={fileList}
//                 onChange={handleUploadChange}
//                 accept="image/*"
//                 maxCount={1}
//                 listType="picture-card"
//               >
//                 {fileList.length >= 1 ? null : (
//                   <div>
//                     <UploadOutlined />
//                     <div style={{ marginTop: 8 }}>Upload</div>
//                   </div>
//                 )}
//               </Upload>
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 style={{ background: "#522EA8", border: "none" }}
//                 size="large"
//               >
//                 {isEdit ? "Update Product" : "Submit Product"}
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>
//     </Card>
//   );
// };

// export default ProductAdd;

//----------------------------------------------------

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
  Select,
  Spin,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import Cookies from "js-cookie";
const { TextArea } = Input;
const { Option } = Select;

const ProductAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || null;
  const token = Cookies.get("token");
  const puid = Cookies.get("puid") || "";

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [domains, setDomains] = useState([]);
  const [datasheetId, setDataSheetId] = useState([])
  const [categories, setCategories] = useState([])

  const isEdit = !!product;

  useEffect(() => {
    const formData = new FormData();
    formData.append("CrudAction", "VIEW");
    formData.append("PUID", product?.puid || "123456");
    formData.append("Status", true);
    formData.append("Slug", "#");
    formData.append("PageNo", 1);
    formData.append("PageSize", 1000);
    const fetchStaticData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/StaticData/post-domain`);
        const response2 = await axios.post(`${API_URL}/api/DataSheet/manage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
        const response3 = await axios.post(`${API_URL}/api/Category/manage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        });
        setDataSheetId(response2.data.data)
        setDomains(response.data || []);
        setCategories(response3.data?.data || []);
      } catch (error) {
        console.error("Error loading domain list:", error);
        message.error("Failed to load domain options");
      }
    };

    fetchStaticData();
  }, [puid]);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...product,
        useAbility: product.useability,
        domain: product.domain ? product.domain.split(",") : [],
      });

      if (product.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.jpg",
            status: "done",
            url: `${API_URL}${product.image}`,
          },
        ]);
      }
    }
  }, [product, form, isEdit]);

  const handleUploadChange = ({ fileList: newList }) => {
    const imagesOnly = newList.filter(file => {
      if (!file.type?.startsWith("image/")) {
        message.error(`${file.name} is not a valid image`);
        return false;
      }
      return true;
    });
    setFileList(imagesOnly);
  };

  const onFinish = async (values) => {
    if (fileList.length === 0 && !isEdit) {
      message.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Id", isEdit ? product.id : "");
      formData.append("name", values.name);
      formData.append("about", values.about || "");
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("description", values.description || "");
      formData.append("useAbility", values.useAbility || "");
      formData.append("Domain", values.domain.join(","));
      formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
      formData.append("PUID", product?.puid || "123456");
      formData.append("Status", values.status ?? true);
      formData.append("Slug", values.slug ?? "#");
      formData.append("DatasheetId", values.datasheetId ?? "");
      formData.append("SKU", "");

      if (fileList[0]?.originFileObj) {
        formData.append("Files", fileList[0].originFileObj);
      }

      const response = await axios[isEdit ? "post" : "post"](
        isEdit
          ? `${API_URL}/api/Product/Crud`
          : `${API_URL}/api/Product/Crud`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data) {
        message.success(`Product ${isEdit ? "updated" : "added"} successfully`);
        form.resetFields();
        setFileList([]);
        navigate("/product/list");
      } else {
        throw new Error("No response data");
      }
    } catch (err) {
      console.error("Submission error:", err);
      message.error(
        err.response?.data?.message ||
        `Failed to ${isEdit ? "update" : "add"} product`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold mb-1">
            🛒 {isEdit ? "Edit Product" : "Add Product"}
          </h3>
          <p className="text-sm text-gray-100">
            {isEdit
              ? "Update the product details"
              : "Fill out the details to add a new product"}
          </p>
        </div>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/product/list")}
          style={{ color: "white" }}
        >
          Product Details
        </Button>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="about" label="About">
              <Input placeholder="Short description" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter price" },
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Enter a valid price",
                },
              ]}
            >
              <Input type="number" step="0.01" placeholder="Enter price" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="useAbility" label="Use Ability">
              <Input placeholder="Usability info" />
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
              name="datasheetId"
              label="Datasheet"
              rules={[{ required: true, message: "Please select datasheet" }]}
            >
              <Select placeholder="Select datasheet">
                {datasheetId.map((item, index) => <Option value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} placeholder="Detailed description" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="image"
              label="Upload Image"
              rules={[{ required: !isEdit, message: "Please upload image" }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleUploadChange}
                accept="image/*"
                maxCount={1}
                listType="picture-card"
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "#522EA8", border: "none" }}
                size="large"
              >
                {isEdit ? "Update Product" : "Submit Product"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ProductAdd;