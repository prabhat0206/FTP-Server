import FtpSrv from "ftp-srv";
import { config } from "dotenv";

config();

const ftpServer = new FtpSrv({
  url: `ftp://${process.env.IP_ADDRESS}:${process.env.PORT}`,
});

ftpServer.on("login", (data, resolve, reject) => {
  const username = data.username;
  const password = data.password;

  if (username === "user" && password === "pass") {
    resolve({
      root: "./public",
    });
  } else {
    reject("Invalid username or password" as any);
  }
});

ftpServer.on("client-error", ({connection, context, error}) => {
  console.log("Client error", error);
});


ftpServer.listen().then(() => {
  console.log("Listening on port", process.env.PORT);
});
