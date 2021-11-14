import Expertise from "../models/expertise";
import { runAsync } from "../utils";

/**
 * Check whether the given expertise exists in expertise collection
 *
 * @param name - name of the expertise (its unique in Expertise's model)
 *
 * @returns
 * Array of 2 elements - [data, err] (in our case data will be either 0 if the
 * doc doesn't exists or 1 if it does exists)
 */
export const checkExpertiseExists = async (name: string) => {
  return await runAsync(Expertise.find({ name: name }).limit(1).count().exec());
};
