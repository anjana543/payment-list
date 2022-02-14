import moment from "moment";
import { IMAGE_URL } from "../utils/constant";

export const debounce = (fn, d) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
};

export const lowercaseText = (string) => string && string.toLowerCase();
export const uppercaseText = (string) => string && string.toUpperCase();

export const concatString = (string, count = 15) =>
  string && string.slice(0, count).concat("...");

export const capitalizeFirstLetter = (phrase) => {
  phrase = lowercaseText(phrase).replace(/_/g, " ");
  return (
    phrase &&
    phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

export const lowerArray = (array) =>
  array.toLocaleString().toLowerCase().split(",");

export const formatDate = (date, fmt = "DD/MM/YYYY") => {
  const newDate = new Date(date);
  return moment(newDate).format(fmt);
};

export const getImageUrl = (name) => `${IMAGE_URL}${lowercaseText(name)}.svg`;

export const parseRawPrice = (price) => `${(price / 100).toFixed(2)}`;

export const filterArrayByProp = (array, prop) => [
  ...new Set(array.map((item) => item[prop]).filter((e) => e != null)),
];

const getValue = (object, keys) =>
  keys.split(".").reduce((o, k) => (o || {})[k], object);

export const filterNestedObjectArrayByProp = (array, prop) => [
  ...new Set(
    array.map((item) => getValue(item, prop)).filter((e) => e != null)
  ),
];

const removeEmpty = (obj) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );
};

export const queryString = (object) => {
  const cleanObject = removeEmpty(object);
  return Object.keys(cleanObject)
    .map((key) => key + "=" + object[key])
    .join("&");
};

export const currencyCode = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};
