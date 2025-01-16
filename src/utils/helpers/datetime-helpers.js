function compareTime(timestring1, timeString2) {
  let dateTime1 = new Date(timestring1);
  let dateTime2 = new Date(timeString2);
  return dateTime1.getTime() > dateTime2.getTime();
}

module.exports = {
  compareTime,
};
