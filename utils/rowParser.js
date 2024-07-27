import { v4 as uuidv4 } from 'uuid';

export const extractDataFromRow = ($, row) => {
  const brandName = $(row).find('td.caseBrand a').text().trim();
  const partCode = $(row).find('td.casePartCode').text().trim();
  const description = $(row).find('td.caseDescription').text().trim();
  const pricesLink = decodeURIComponent(
    $(row).find('td.caseUrl a').attr('href')
  );
  const id = uuidv4();

  return {
    id: id,
    brand: {
      name: brandName,
    },
    partCode: partCode,
    description: description,
    pricesLink: pricesLink,
  };
};

export const parseRows = ($) => {
  const rows = $('tr.startSearching');
  const result = [];

  rows.each((index, row) => {
    result.push(extractDataFromRow($, row));
  });

  return result;
};
