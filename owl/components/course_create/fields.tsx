import { useContext, useEffect, useState } from "react";
import { FormFieldError, FormLabel } from "../signup/fields";
import { CourseCreateContext } from "../../lib/context/course";
import { InfoCircle, Play, Scan, Wallet } from "react-iconly";
import { getAllCourseLevels } from "../../lib/helpers/course_level";

export const NameField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(CourseCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Course name" htmlFor="name" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Play primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="The Next Big Thing"
          onBlur={handleBlur}
        />
      </div>
      {errors.name && touched.name ? (
        <FormFieldError text={errors.name} />
      ) : null}
    </div>
  );
};

export const DescriptionField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(CourseCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Description" htmlFor="description" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <InfoCircle primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="What's this all about"
          onBlur={handleBlur}
        />
      </div>
      {errors.description && touched.description ? (
        <FormFieldError text={errors.description} />
      ) : null}
    </div>
  );
};

export const PriceField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(CourseCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Price" htmlFor="price" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Wallet primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="price"
          value={values.price}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="number"
          placeholder="How much you want to the charge the user?"
          onBlur={handleBlur}
        />
      </div>
      {errors.price && touched.price ? (
        <FormFieldError text={errors.price} />
      ) : null}
    </div>
  );
};

export const DifficultyLevelField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(CourseCreateContext);

  const [options, setOptions] = useState([]);

  const getCourseLevels = async () => {
    const [data, err] = await getAllCourseLevels();
    if (err || !data) return;
    setOptions([...options, ...data.data.courseLevels]);
  };

  useEffect(() => {
    getCourseLevels();
  }, []);

  return (
    <div className="form-field w-full">
      <FormLabel text="Difficulty Level" htmlFor="level" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Scan primaryColor="hsla(0, 0%, 19%, 1)" />

        <select
          name="level"
          value={values.level}
          className="w-full bg-grey1 h-full outline-none"
          onChange={handleChange as any}
          onBlur={handleBlur as any}
        >
          {options &&
            options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.emoji} {opt.name}
              </option>
            ))}
        </select>
      </div>
      {errors.level && touched.level ? (
        <FormFieldError text={errors.level} />
      ) : null}
    </div>
  );
};
