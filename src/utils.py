# Utilities for project crunch
import subprocess, os, signal, sqlite3

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

def start_node():
    """
    Start the ReactJS front end
    """
    cmd = ['pgrep -f .*.*start.js']
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
    stderr=subprocess.PIPE)
    my_pid, err = process.communicate()

    if len(my_pid.splitlines()) >0:
       print("Old NJS SCRIPT Running Killing.")
       try:
           os.kill(int(my_pid.decode("utf-8")), signal.SIGTERM)
       except:
           print("Unable to kill old start skript, so Starting up new")
    else:
      print("Old NJS SCRIPT not Running, Starting up new")

    cmd = ['pgrep -f .*npm.*start']
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
    stderr=subprocess.PIPE)
    my_pid, err = process.communicate()

    if len(my_pid.splitlines()) >0:
       print("Old NJS Running Killing.")
       try:
           os.kill(int(my_pid.decode("utf-8")), signal.SIGTERM)
       except:
           print("Unable to kill old NJS, so Starting up new")

    else:
      print("Old NJS not Running, Starting up new")

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
