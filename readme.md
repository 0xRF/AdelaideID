# Adelaide ID

Find marking workshops, practicals and exams error-prone and tedious? Adelaide ID makes taking attendance easy, allowing you to validate and mark students with a simple barcode-scan of the back of the ID card. The project is designed for mobile and can be installed as a [progressive web app (PWA)](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=0).

Web and Database Computing (Semester 1, 2022) group project by Rowan Fimmano, Javad Hamidi, Mitchell Kempen and Zhaohan Liu.

## Installation & Setup
### Backend preparation
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

### Frontend preparation
Download all dependencies and build the server using `npm install && npm run build`, making sure `/frontend` is your current working directory.

## Usage
Follow the steps below carefully once you have completed your first-time setup. 

1. Ensure your MySQL/MariaDB service is running. 
2. Launch the backend by navigating to `/backend` directory and running `node app.js`. You will need to leave this process running in the background.
3. Run `PORT=4433 npm run https-preview`. The first time you run this command it will generate and install the local certificates, so you may have to re-run the command as root.
4. Copy the `localhost.crt` certificate and `localhost.key` onto your mobile device. On linux these will likely be located under `~/.config/https-localhost`.
4. On your computer or a mobile device, enter the network address provided by the server.

Without an associated SSL certificate, your browser will give you a security warning and the PWA service worker will not work.

Note that installing the PWA while hosting the server locally is ill-advised, as the private IP address of your host device is unlikely static. 


## Additional Information
Note that you will not be able to mark off users in the "CS Testing 1" MyUni class as all members are marked as teachers. However, for testing purposes, we've added some dummy students to the 'Students' table. 

## Notable Credits
- [heroicons](https://github.com/tailwindlabs/heroicons) 
- [Vue Barcode and QR code scanner](https://github.com/olefirenko/vue-barcode-reader) 
- [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) 
