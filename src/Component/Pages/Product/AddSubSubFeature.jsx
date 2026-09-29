import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

const { Option } = Select;

const SubSubFeatureAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [domains, setDomains] = useState([]);
  const [products, setProducts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [subFeatures, setSubFeatures] = useState([]);

  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [featureLoading, setFeatureLoading] = useState(false);
  const [subFeatureLoading, setSubFeatureLoading] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/StaticData/post-domain`);
        setDomains(res.data || []);
      } catch (err) {
        message.error("Failed to load domains");
      }
    };
    fetchDomains();
  }, []);

  const fetchProducts = async (domain) => {
    setProductLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/Website/get-products?domain=${domain}`
      );
      setProducts(res.data || []);
    } catch (err) {
      message.error("Failed to load products");
    } finally {
      setProductLoading(false);
    }
  };

  const fetchFeatures = async (productId) => {
    setFeatureLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/Website/get-active-feature?productId=${productId}`
      );
      setFeatures(res.data || []);
    } catch (err) {
      message.error("Failed to load features");
    } finally {
      setFeatureLoading(false);
    }
  };

  const fetchSubFeatures = async (featureId) => {
    setSubFeatureLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/Website/get-active-sub-feature?featureId=${featureId}`
      );
      setSubFeatures(res.data || []);
    } catch (err) {
      message.error("Failed to load sub-features");
    } finally {
      setSubFeatureLoading(false);
    }
  };

  const handleDomainChange = (domain) => {
    form.setFieldsValue({ productId: undefined, featureId: undefined, subFeatureId: undefined });
    setProducts([]);
    setFeatures([]);
    setSubFeatures([]);
    fetchProducts(domain);
  };

  const handleProductChange = (productId) => {
    form.setFieldsValue({ featureId: undefined, subFeatureId: undefined });
    setFeatures([]);
    setSubFeatures([]);
    fetchFeatures(productId);
  };

  const handleFeatureChange = (featureId) => {
    form.setFieldsValue({ subFeatureId: undefined });
    setSubFeatures([]);
    fetchSubFeatures(featureId);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/Website/add-sub-sub-feature`, values);
      if (res.data) {
        message.success("Sub Sub Feature added successfully");
        form.resetFields();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <Card className="m-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">➕ Add Sub Sub Feature</h3>
            <p className="text-sm text-gray-100">Attach sub-sub-features to existing sub-features</p>
          </div>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ color: "white" }}
          >
            Back
          </Button>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} className="p-4">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="domain"
                label="Domain"
                rules={[{ required: true, message: "Please select domain" }]}
              >
                <Select placeholder="Select Domain" onChange={handleDomainChange}>
                  {domains.map((domain, index) => (
                    <Option key={index} value={domain}>
                      {domain}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="productId"
                label="Product"
                rules={[{ required: true, message: "Please select product" }]}
              >
                <Select
                  placeholder="Select Product"
                  loading={productLoading}
                  onChange={handleProductChange}
                >
                  {products.map((product) => (
                    <Option key={product.id} value={product.id}>
                      {product.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="featureId"
                label="Feature"
                rules={[{ required: true, message: "Please select feature" }]}
              >
                <Select
                  placeholder="Select Feature"
                  loading={featureLoading}
                  onChange={handleFeatureChange}
                >
                  {features.map((feature) => (
                    <Option key={feature.id} value={feature.id}>
                      {feature.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="subFeatureId"
                label="Sub Feature"
                rules={[{ required: true, message: "Please select sub feature" }]}
              >
                <Select
                  placeholder="Select Sub Feature"
                  loading={subFeatureLoading}
                >
                  {subFeatures.map((sub) => (
                    <Option key={sub.id} value={sub.id}>
                      {sub.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Sub Sub Feature Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="about"
                label="About"
                rules={[{ required: true, message: "Please enter about" }]}
              >
                <Input placeholder="Enter short description" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price",
                    pattern: /^\d+(\.\d{1,2})?$/,
                 }]}
              >
                <Input placeholder="Enter price" />
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
              Submit Sub Sub Feature
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SubSubFeatureAdd;
