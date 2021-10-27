export const badRequest = (error, req, res, next) => {
  console.log(`i m called ${error}`);
  if (error.status === 400) {
    res.status(400).send();
  } else {
    next(error);
  }
};

export const forbidden = (error, req, res, next) => {
  console.log(error);
  if (error.status === 403) {
    res.status(403).send();
  } else {
    next(error);
  }
};

export const notFound = (error, req, res, next) => {
  console.log(error);
  if (error.status === 404) {
    res.status(404).send({ error: error.message });
  } else {
    next(error);
  }
};

export const serverError = (error, req, res, next) => {
  console.log(`*********${error}`);
  res.status(500).send("Server generated error");
};
