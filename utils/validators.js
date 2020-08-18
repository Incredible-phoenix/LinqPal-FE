
export const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());

  // another simple validator anystring@anystring.anystring
  // const regex = /\S+@\S+\.\S+/;
  // return regex.test(email);
};

export const compareDates = (startDate, endDate) => {
  const start = new Date(startDate).toISOString().slice(0, 19);
  const end = new Date(endDate).toISOString().slice(0, 19);
  return new Date(start) <= new Date(end);
}