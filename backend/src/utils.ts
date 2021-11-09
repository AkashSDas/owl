/**
 * This will handle async functions to avoid repeating
 * try-catch blocks
 *
 * @returns {[result, err]}
 */
export async function runAsync(promise: Promise<any>): Promise<Array<any>> {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}
