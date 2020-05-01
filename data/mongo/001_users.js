db.createUser(
  {
      user: "nestjs",
      pwd: "123456",
      roles:[
          {
              role: "readWrite",
              db:   "nestjs_test"
          }
      ]
  }
);