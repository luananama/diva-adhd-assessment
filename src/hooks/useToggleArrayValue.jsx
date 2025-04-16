const useToggleArrayValue = () => {
  /**
   * Toggles an index in an array.
   * Adds if not present, removes if already included.
   * Ensures immutability and fallback for invalid input.
   */
  const toggle = (rawArray, index) => {
    const arr = Array.isArray(rawArray) ? rawArray : [];

    return arr.includes(index)
      ? arr.filter((i) => i !== index)
      : [...arr, index];
  };

  return toggle;
};

export default useToggleArrayValue;
