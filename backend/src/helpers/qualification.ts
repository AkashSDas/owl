import Qualification from "../models/qualification";
import { runAsync } from "../utils";

/**
 * Check whether the given qualification exists in qualifications collection
 *
 * @param name - name of the qualification (its unique in Qualification's model)
 *
 * @returns
 * Array of 2 elements - [data, err] (in our case data will be either 0 if the
 * doc doesn't exists or 1 if it does exists)
 */
export const checkQualificationExists = async (name: string) => {
  return await runAsync(
    Qualification.find({ name: name }).limit(1).count().exec()
  );
};
