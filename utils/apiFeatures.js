class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString }; // put the copy of req.query in new object.
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj); // convert object to string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // /g global if there two or three operators, then it will replace all of them, /b case sensitive
    this.query = this.query.find(JSON.parse(queryStr)); // convert string to object

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); // 'sort=price,ratingsAverage' => 'price ratingsAverage'
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // default sort by createdAt in descending order meaning newest first
    }

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // exclude __v field meaning select all fields except __v
    }

    return this;
  }
  paginate() {
    // to know how many results we have at each page and at specific page
    const page = this.queryString.page * 1 || 1; // if page is not exist, then default value is page = 1, we do * 1 to convert string to number
    const limit = this.queryString.limit * 1 || 100; // if limit is not exist, then default value is limit = 100
    const skip = (page - 1) * limit;

    // page=2&limit=10 => page 2 have 10 results 11-20
    // page=3&limit=3 => page 3 have 3 results 7-9
    this.query = this.query.sort(this.queryString.sort || '_id');
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
