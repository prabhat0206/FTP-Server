import FtpSrv from "ftp-srv";
import { config } from "dotenv";

config();

const ftpServer = new FtpSrv({
  url: `ftp://${process.env.IP_ADDRESS}:21`,
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

ftpServer.listen().then(() => {
  console.log("Listening on port 21");
});
