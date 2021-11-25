import { useContext } from "react";
import { FormFieldError, FormLabel } from "../signup/fields";
import { InfoCircle, Play } from "react-iconly";
import { ChapterCreateContext } from "../../lib/context/chapter";

export const NameField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(ChapterCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Chapter name" htmlFor="name" />
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
    useContext(ChapterCreateContext);

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
