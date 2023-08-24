const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as an argument");
  process.exit(1);
}

const password = process.argv[3];

const url = `mongodb+srv://kujtim:${password}@fullstack.cbpsfpg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "World end.",
  author: "Kujtim",
  url: "ww.kute.com",
  likes: 5,
});

// blog.save().then(result => {
//     mongoose.connection.close();
// });

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});
