import { useContext, useEffect, useState } from "react";
import { TeacherSignupContext } from "../../lib/context/auth";
import { Calendar, CloseSquare, Document, Work } from "react-iconly";
import { FormFieldError, FormLabel } from "../signup/fields";
import { getAllQualifications } from "../../lib/helpers/qualifications";
import btnStyle from "../../styles/components/common/Buttons.module.scss";
import { getAllExpertise } from "../../lib/helpers/expertise";

export const BioField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(TeacherSignupContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Bio" htmlFor="bio" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Document primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="bio"
          value={values.bio}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="Tell us more abour yourself"
          onBlur={handleBlur}
        />
      </div>
      {errors.bio && touched.bio ? <FormFieldError text={errors.bio} /> : null}
    </div>
  );
};

export const YearsOfExperienceField = () => {
  const { values, handleChange, touched, handleBlur, errors } =
    useContext(TeacherSignupContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Years of experience" htmlFor="yearsOfExperience" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Calendar primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="yearsOfExperience"
          value={values.yearsOfExperience}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro placeholder-shown:opacity-60"
          type="number"
          placeholder="How many years have you been wild"
          onBlur={handleBlur}
        />
      </div>
      {errors.yearsOfExperience && touched.yearsOfExperience ? (
        <FormFieldError text={errors.yearsOfExperience} />
      ) : null}
    </div>
  );
};

export const QualificationsField = () => {
  const [options, setOptions] = useState([
    { _id: "selected", name: "Select qualification", emoji: "🍕" },
  ]);
  const { qualifications, setQualifications } =
    useContext(TeacherSignupContext);

  const getQualifications = async () => {
    const [data, err] = await getAllQualifications();
    if (err || !data) return;
    setOptions([...options, ...data.data.qualifications]);
  };

  useEffect(() => {
    getQualifications();
  }, []);

  return (
    <div className="form-field w-full">
      <FormLabel text="Qualifications" htmlFor="qualifications" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Work primaryColor="hsla(0, 0%, 19%, 1)" />
        <select
          name="qualifications"
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedOpt = options.filter((o) => o._id === selectedId)[0];
            setOptions(options.filter((o) => o._id !== selectedId));
            setQualifications([...qualifications, selectedOpt]);
          }}
          className="w-full bg-grey1 h-full outline-none"
        >
          {options &&
            options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.emoji} {opt.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-1 space-x-4 flex flex-row">
        {qualifications.map((q) => (
          <SelectedQualificationButton
            qualification={q}
            setOptions={setOptions}
          />
        ))}
      </div>
    </div>
  );
};

const SelectedQualificationButton = ({
  qualification,
  setOptions,
}: {
  qualification: any;
  setOptions: Function;
}) => {
  const { qualifications, setQualifications } =
    useContext(TeacherSignupContext);

  const rmQualification = () => {
    setOptions((options) => [...options, qualification]);
    setQualifications(
      qualifications.filter((q) => q._id !== qualification._id)
    );
  };

  return (
    <button
      className={`${btnStyle["secondary-btn"]} w-max flex justify-center items-center space-x-6`}
      type="button"
      onClick={rmQualification}
    >
      {qualification.name}{" "}
      <CloseSquare
        set="bulk"
        primaryColor="white"
        secondaryColor="hsla(265, 100%, 59%, 1)"
      />
    </button>
  );
};

export const ExpertiseField = () => {
  const [options, setOptions] = useState([
    { _id: "selected", name: "Select expertise", emoji: "🍕" },
  ]);
  const { expertise, setExpertise } = useContext(TeacherSignupContext);

  const getExpertise = async () => {
    const [data, err] = await getAllExpertise();
    if (err || !data) return;
    setOptions([...options, ...data.data.expertise]);
  };

  useEffect(() => {
    getExpertise();
  }, []);

  return (
    <div className="form-field w-full">
      <FormLabel text="Expertise" htmlFor="expertise" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Work primaryColor="hsla(0, 0%, 19%, 1)" />
        <select
          name="expertise"
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedOpt = options.filter((o) => o._id === selectedId)[0];
            setOptions(options.filter((o) => o._id !== selectedId));
            setExpertise([...expertise, selectedOpt]);
          }}
          className="w-full bg-grey1 h-full outline-none"
        >
          {options &&
            options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.emoji} {opt.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-1 space-x-4 flex flex-row">
        {expertise.map((e) => (
          <SelectedExpertiseButton expertiseObj={e} setOptions={setOptions} />
        ))}
      </div>
    </div>
  );
};

const SelectedExpertiseButton = ({
  expertiseObj,
  setOptions,
}: {
  expertiseObj: any;
  setOptions: Function;
}) => {
  const { expertise, setExpertise } = useContext(TeacherSignupContext);

  const rmQualification = () => {
    setOptions((options) => [...options, expertiseObj]);
    setExpertise(expertise.filter((e) => e._id !== expertiseObj._id));
  };

  return (
    <button
      className={`${btnStyle["secondary-btn"]} w-max flex justify-center items-center space-x-6`}
      type="button"
      onClick={rmQualification}
    >
      {expertiseObj.name}{" "}
      <CloseSquare
        set="bulk"
        primaryColor="white"
        secondaryColor="hsla(265, 100%, 59%, 1)"
      />
    </button>
  );
};
