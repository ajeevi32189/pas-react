import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Spin,
  message,
  Switch,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../config";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const FeatureAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state || null;
  const isEdit = !!editData;

  const [domains, setDomains] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [domRes] = await Promise.all([
          axios.get(`${API_URL}/api/StaticData/post-domain`),
        ]);
        setDomains(domRes.data || []);

        if (isEdit) {
          form.setFieldsValue({ domain: editData.domain });
          await fetchProducts(editData.domain);

          form.setFieldsValue({
            productId: editData.productId,
            name: editData.name,
            about: editData.about,
            price: editData.price,
            slug: editData.slug || "",
            status: true,
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        message.error("Failed to load domain options");
      }
    };

    fetchStaticData();
  }, []);

  const fetchProducts = async (domain) => {
    if (!domain) {
      setProducts([]);
      form.setFieldsValue({ productId: undefined });
      return;
    }

    setProductLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/Website/get-products?domain=${domain}`
      );
      setProducts(response.data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      message.error("Failed to load products");
    } finally {
      setProductLoading(false);
    }
  };

  const handleDomainChange = (value) => {
    form.setFieldsValue({ productId: undefined });
    fetchProducts(value);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("about", values.about || "");
    formData.append("price", values.price);
    formData.append("productId", parseInt(values.productId));
    formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
    formData.append("PUID", "123456");
    formData.append("Status", true);
    formData.append("Slug", values.slug ?? "#");

    try {
      const response = await axios.post(`${API_URL}/api/Feature/Crud`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        message.success(`Feature ${isEdit ? "updated" : "added"} successfully`);
        form.resetFields();
        navigate("/feature/list");
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Error submitting data:", err);
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <Card className="m-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {isEdit ? "✏️ Edit Feature" : "✨ Add Feature"}
            </h3>
            <p className="text-sm text-gray-100">
              {isEdit ? "Update existing feature details" : "Add new features to your products"}
            </p>
          </div>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/feature/list")}
            style={{ color: "white" }}
          >
            Feature List
          </Button>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} className="p-4">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="domain"
                label="Domain"
              >
                <Select
                  placeholder="Select Domain"
                  onChange={handleDomainChange}
                  disabled={isEdit} // prevent domain change in edit
                >
                  {domains.map((domain, index) => (
                    <Option key={index} value={domain}>
                      {domain}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="productId"
                label="Product"
                rules={[{ required: true, message: "Please select product" }]}
              >
                <Select
                  placeholder="Select Product"
                  loading={productLoading}
                  disabled={!form.getFieldValue("domain")}
                >
                  {products.map((product) => (
                    <Option key={product.id} value={product.id}>
                      {product.name} ({product.domain})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="name"
                label="Feature Name"
                rules={[{ required: true, message: "Please enter feature name" }]}
              >
                <Input placeholder="Enter feature name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="about"
                label="About"
                rules={[{ required: true, message: "Please enter about" }]}
              >
                <TextArea rows={3} placeholder="Enter feature description" />
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
                    message: "Please enter a valid price",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="slug" label="Slug">
                <Input placeholder="Enter slug (optional)" />
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
          </Row>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ background: "#522EA8", border: "none" }}
              size="large"
            >
              {isEdit ? "Update Feature" : "Submit Feature"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FeatureAdd;
