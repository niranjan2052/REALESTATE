import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import "./newPostPage.scss";
import { useState } from "react";
import { useFormik } from "formik";
import http from "../../http";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate("");

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      address: "",
      city: "",
      bedroom: "",
      bathroom: "",
      type: "",
      property: "",
      latitude: "",
      longitude: "",
      images: [],
      desc: "",
      utilities: "",
      pet: "",
      income: "",
      size: "",
      school: "",
      bus: "",
      restaurant: "",
    },
    // validationSchema: {},
    onSubmit: (values, { setSubmitting }) => {
      let newValues = {
        postData: {
          title: values.title,
          price: parseInt(values.price),
          address: values.address,
          city: values.city,
          bedroom: parseInt(values.bedroom),
          bathroom: parseInt(values.bathroom),
          type: values.type,
          property: values.property,
          latitude: values.latitude,
          longitude: values.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: values.utilities,
          pet: values.pet,
          income: values.income,
          size: parseInt(values.size),
          school: parseInt(values.school),
          bus: parseInt(values.bus),
          restaurant: parseInt(values.restaurant),
        },
      };
      http
        .post("/posts", newValues)
        .then(({ data }) => {
            console.log("Post Created SuccessFully");
          toast.success("Post Created Successfully!");
          navigate(`/${data.id}`);
        })
        .catch(() => {})
        .finally(() => {
            console.log("i am in finally");
          setSubmitting(false);
        });
    },
  });
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={formik.handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Title"
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="Price"
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder="Address"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                placeholder="City"
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                value={formik.values.bedroom}
                onChange={formik.handleChange}
                placeholder="Bedroom"
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                value={formik.values.bathroom}
                onChange={formik.handleChange}
                placeholder="Bathroom"
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                value={formik.values.latitude}
                onChange={formik.handleChange}
                placeholder="Latitude"
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={formik.values.longitude}
                onChange={formik.handleChange}
                placeholder="Longitude"
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select
                name="property"
                value={formik.values.property}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                name="utilities"
                value={formik.values.utilities}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select
                name="pet"
                value={formik.values.pet}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                value={formik.values.income}
                onChange={formik.handleChange}
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                min={0}
                id="size"
                name="size"
                type="number"
                value={formik.values.size}
                onChange={formik.handleChange}
                placeholder="Size"
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                id="school"
                name="school"
                type="number"
                value={formik.values.school}
                onChange={formik.handleChange}
                placeholder="School"
              />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input
                min={0}
                id="bus"
                name="bus"
                type="number"
                value={formik.values.bus}
                onChange={formik.handleChange}
                placeholder="Bus"
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                value={formik.values.restaurant}
                onChange={formik.handleChange}
                placeholder="Restaurant"
              />
            </div>
            <button type="submit" className="sendButton">
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dpdku6o5e",
            uploadPreset: "realestate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
