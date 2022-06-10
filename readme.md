# AdelaideID

Find marking workshops, practicals and exams error-prone and tedious? AdelaideID makes taking attendance easy, allowing you to validate and mark off students with a simple barcode-scan of the back of the ID card. The project is designed for mobile and can be installed as a [progressive web app (PWA)](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=0).

Web and Database Computing (Semester 1, 2022) group project by Rowan Fimmano, Javad Hamidi, Mitchell Kempen and Zhaohan Liu.

## Installation & Setup
### Backend
Make sure you have MySQL or MariaDB installed. Then navigate to the `/backend/db` directory. Next, start the MySQL CLI and run the command `source attendance.sql`. This will create and populate the `dbAttendance` database.

Next, create a new MySQL/MariaDB user. This user's credentials will be used by the backend to read and write to the database. You can use the following commands to create a user with username `wdc_project` without a password.

```sql
CREATE USER 'wdc_project'@'localhost';
GRANT ALL ON dbAttendance.* TO 'wdc_project'@'localhost';
FLUSH PRIVILEGES;
```

In the `/backend` directory create a new folder called `config` and within it create a file called `default.json` containing the following (substituting in the username you chose):

```json
{
    "db": {
        "user": "wdc_project",
    }
}
```
If you added a password to this new user, add the key `"password"` to the `"db"` object with your password as the value.  

Before starting the express server, run `npm install` in the `/backend` directory to add all necessary dependencies.

### Frontend
Install vite, making sure it is added to your PATH environment variable. You can install vite globally using `npm install -g vite`. Then download all other dependencies using `npm install`, making sure `/frontend` is your current working directory.

## Usage
Follow the steps below carefully once you have completed your first-time setup. 

1. Ensure your MySQL/MariaDB service is running. 
2. Launch the backend by navigating to `/backend` directory and running `node app.js`. You will need to leave this process running in the background.
3. Navigate to the `/frontend` directory and start the server with `vite --https --host`. The `--https` flag is necessary for the proper function of the external barcode scanning library. The `--host` flag will allow you to open the site from other clients on your local network.
4. On a moblie device, enter the network address provided by the vite server on start. This should be a private IP address using the https protocol over port 3000.

Without an associated SSL certificate, on first visit your browser may give you a security warning. You can proceed by clicking under the 'advanced' options presented on the warning screen.

Note that installing the PWA while hosting the server locally is ill-advised, as the private IP address of your host device is unlikely static. 


## Notable Credits
- [heroicons](https://github.com/tailwindlabs/heroicons) 
- [Vue Barcode and QR code scanner](https://github.com/olefirenko/vue-barcode-reader) 