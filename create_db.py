import sqlite3 as sq

def create_connection(db_file):
    """ 
    create a database connection to a SQLite database 
    db_file = path to db
    """
    conn = None
    try:
        conn = sq.connect(db_file)
        print(f"Successful connection to {db_file} using sqlite version {sq.version}")
        return conn.cursor()
    except sq.Error as e:
        print(f"Error connecting to {db_file} : {e}")


    
if __name__ == "__main__":
    # Connect or create new database
    c = create_connection("./data/user.db")

    # Create user table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS user
                (   
                    id integer PRIMARY KEY AUTOINCREMENT,
                    name text NOT NULL,
                    birth text NOT NULL,
                    email text NOT NULL,
                    phone text NOT NULL,
                    linkedin text,
                    github text,
                    facebook text,
                    twitter text,
                    personal text
                );
                ''')

    # Create education table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS education
                (   
                    id integer PRIMARY KEY AUTOINCREMENT,
                    school text NOT NULL,
                    degree text NOT NULL,
                    major text NOT NULL,
                    gpa text,
                    start text,
                    end text
                );
                ''')

    # Create experience table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS experience
                (   
                    id integer PRIMARY KEY AUTOINCREMENT,
                    title text NOT NULL,
                    company text NOT NULL,
                    location text NOT NULL,
                    start text,
                    end text,
                    description text
                );
                ''')

    # Create reference table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS reference
                (   
                    id integer PRIMARY KEY AUTOINCREMENT,
                    name text NOT NULL,
                    email text,
                    phone text
                );
                ''')

    # Create application table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS application
                (   
                    id integer NOT NULL,
                    code text NOT NULL,
                    position text NOT NULL,
                    company text NOT NULL,
                    reqno text,
                    remote bool,
                    status text,
                    actions text,
                    apply_date text,
                    posted_sal text,
                    given_sal text,
                    interview text,
                    link text,
                    username text,
                    password text,
                    directory text
                );
                ''')

    # Create address table
    c.execute(  '''
                CREATE TABLE IF NOT EXISTS address
                (   
                    id integer NOT NULL,
                    street text NOT NULL,
                    street2 text,
                    city text NOT NULL,
                    state text NOT NULL,
                    county text NOT NULL,
                    country text NOT NULL,
                    zip text NOT NULL
                );
                ''')

    # Close the db
    c.close()

