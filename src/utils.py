# Utilities for project crunch
import subprocess, os, signal, sqlite3
import sys, csv

def start_webserver():
    """ 
    Kill old webserver if it exists, otherwise start new subprocess for backend
    """
    cmd = ['pgrep -f python.*crunch_server/manage.py runserver']
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
    stderr=subprocess.PIPE)
    my_pid, err = process.communicate()

    if len(my_pid.splitlines()) >0:
       print("Old webserver running. Killing old and starting up new")
       for pid in my_pid.splitlines():
        pid = pid.decode('utf-8')
        try:
            os.kill(int(pid), signal.SIGTERM)
        except:
            print("Unable to kill old webserver, so Starting up new")
    else:
      print("Old webserver not Running, Starting up new")

    webserver = subprocess.Popen(["python","crunch_server/manage.py", "runserver"])
    return webserver

# Compile JS
def compile_js():
    """
    Compile the javascript for the extension
    """
    node = subprocess.Popen(["npm","run", "build", "--prefix", "chrome-react-crunch-extension"])
    return node



def create_connection(db_file):
    """ 
    create a database connection to a SQLite database 
    db_file = path to db
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(f"Successful connection to {db_file} using sqlite version {sqlite3.version}")
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to {db_file} : {e}")

def read_in_application_csv(file_path):
    try:
        data_list = []
        with open(file_path, encoding='utf-8-sig') as file:
            data = csv.DictReader(file)
            for row in data:
                data_list.append(row)
            return data_list

    except Exception as error:
        print(f"Handling error: {error}")

