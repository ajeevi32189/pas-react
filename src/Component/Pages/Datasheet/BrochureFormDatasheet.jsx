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
import {
  UploadOutlined,
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

const { TextArea } = Input;
const { Option } = Select;

const BrochureFormDatasheet = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const datasheet = location.state || null;

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [categories, setCategories] = useState([]);
  const [domains, setDomains] = useState([]);

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
      form.setFieldsValue({
        ...datasheet,
        slug: datasheet.slug || "#",
        status: datasheet.status,
        category: datasheet.category || null,
        domain: datasheet.domain ? datasheet.domain.split(",") : [],
        intro: datasheet.about || null,
        uses: datasheet.detail || null,
        specifications: datasheet.specifications || [],
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

      formData.append("Id", isEdit ? datasheet.id : "");
      formData.append("Name", values.name);
      formData.append("Slug", values.slug ?? "#");
      formData.append("Intro", values.intro ?? "");
      formData.append("Uses", values.uses ?? "");
      formData.append("Features", values.features ?? "");
      formData.append("Model", values.model ?? "");
      formData.append("ViewOrder", "0");
      formData.append("Status", values.status ?? true);
      formData.append("PUID", datasheet?.puid || "123456");
      formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
      formData.append("Category", values.category);
      formData.append("Domain", values.domain.join(","));
      formData.append("PostType", "DATASHEET");

      if (values.specifications) {
        formData.append(
          "Specifications",
          JSON.stringify(values.specifications)
        );
      }

      imageFile.forEach((file) => {
        if (!file.url) {
          formData.append("image", file.originFileObj);
        }
      });

      await axios.post(`${API_URL}/api/DataSheet/manage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(isEdit ? "Datasheet updated!" : "Datasheet created!");
      navigate("/brochure1/list");
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
            {isEdit
              ? "✏️ Edit Brochure Datasheet"
              : "📄 Create Brochure Datasheet"}
          </h3>
          <p className="text-sm text-gray-100">
            {isEdit
              ? `Editing: ${datasheet?.name || "Unknown"}`
              : "Fill the form to publish a new datasheet"}
          </p>
        </div>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/brochure1/list")}
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

          {/* <Col span={12}>
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: "Please enter model" }]}
            >
              <Input placeholder="Enter model" />
            </Form.Item>
          </Col> */}

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

          {/* ✅ Auto-resizing textareas */}
          <Col span={24}>
            <Form.Item name="intro" label="About Us">
              <TextArea
                placeholder="Write About Us..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              {/* For manual resize instead: style={{ resize: "both" }} */}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="uses" label="Our Solutions">
              <TextArea
                placeholder="Write Our Solutions..."
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
            <Form.Item name="features" label="Success Stories">
              <TextArea
                placeholder="Write Success Stories..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="features" label="Our Clients">
              <TextArea
                placeholder="Write Our Clients..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="features" label="Awards">
              <TextArea
                placeholder="Write Awards..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="features" label="Get in Touch">
              <TextArea
                placeholder="Write Get in Touch..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
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
    </Card>
  );
};

export default BrochureFormDatasheet;
