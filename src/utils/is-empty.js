const isEmpty = (value) => 
value === undefined ||
value == null ||
(typeof value === 'object' && Object.keys(value).length === 0) ||
(typeof value === 'string' && value.trim().lenght === 0);

export default isEmpty;