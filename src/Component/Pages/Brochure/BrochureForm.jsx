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
  Checkbox,
  Spin,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../config";

const { Option } = Select;

const BrochureForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const brochureData = location.state || null;

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [domains, setDomains] = useState([]);

  const isEdit = !!brochureData;
  const puid = Cookies.get("puid") || "";
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const categoryForm = new FormData();
        categoryForm.append("PUID", puid);
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
        message.error("Failed to load category/domain options");
      }
    };

    fetchStaticData();
  }, [puid]);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...brochureData,
        slug: brochureData.slug || "#",
        status: brochureData.status,
        category: brochureData.category || null,
        domain: brochureData.domain ? brochureData.domain.split(",") : [],
        about: brochureData.about || "",
      });

      if (brochureData.photo && Array.isArray(brochureData.photo)) {
        const files = brochureData.photo.map((url, index) => ({
          uid: `-${index + 1}`,
          name: `file-${index + 1}.pdf`,
          status: "done",
          url,
        }));
        setFileList(files);
      }
    }
  }, [brochureData, form, isEdit]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Id", isEdit ? brochureData.id : "");
      formData.append("Name", values.name);
      formData.append("Slug", values.slug ?? "#");
      formData.append("About", values.about ?? "");
      formData.append("ViewOrder", "0");
      formData.append("Status", values.status ?? true);
      formData.append("PUID", puid);
      formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
      formData.append("Category", values.category);
      formData.append("Domain", values.domain.join(","));
      formData.append("PostType", "BROCHURE");

      fileList.forEach((file) => {
        if (!file.url && file.type === "application/pdf") {
          formData.append("files", file.originFileObj);
        }
      });

      await axios.post(`${API_URL}/api/Brochure/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(isEdit ? "Brochure updated!" : "Brochure created!");
      navigate("/brochure/list");
    } catch (err) {
      console.error(err);
      message.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-1">
            {isEdit ? "✏️ Edit Brochure" : "📄 Add New Brochure"}
          </h3>
          <p className="text-sm text-gray-100">
            {isEdit
              ? `Editing: ${brochureData?.name || "Unknown"}`
              : "Fill the form to upload a new brochure"}
          </p>
        </div>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/brochure/list")}
          style={{ color: "white", marginTop: "8px" }}
        >
          Back
        </Button>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Brochure Title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="slug" label="Slug">
              <Input placeholder="Enter Slug" />
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
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row gutter={[16, 8]}>
                    {domains.map((dom, i) => (
                      <Col span={8} key={i}>
                        <Checkbox value={dom}>{dom}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="about"
              label="Short Description"
              rules={[
                { required: true, message: "Please enter a short description" },
              ]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Write a short description of the brochure..."
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="photos"
              label="Upload PDF Brochure"
              rules={[
                { required: !isEdit, message: "Please upload a PDF brochure" },
              ]}
            >
              <Upload
                accept=".pdf"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={(file) => {
                  const isPdf = file.type === "application/pdf";
                  if (!isPdf) {
                    message.error(`${file.name} is not a PDF file`);
                  }
                  return false;
                }}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <Button icon={<UploadOutlined />}>Upload PDF</Button>
                )}
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

          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "#522EA8", border: "none" }}
              >
                {isEdit ? "Update Brochure" : "Submit Brochure"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default BrochureForm;
