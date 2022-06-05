```
sudo mysql -u root

mysql> source .../WDC_GROUP_PROJECT/backend/db/attendance.sql
mysql> SHOW TABLES;
mysql> source .../WDC_GROUP_PROJECT/backend/db/dummy.sql
mysql> SELECT * FROM Students;

```

```sql
CREATE USER 'wdc_project'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON dbAttendance.* TO 'wdc_project'@'localhost';
FLUSH PRIVILEGES;
```

```json
{
    "db": {
        "user": "wdc_project",
        "password": "password"
    }
}
```