import os
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Database connection strings
OLD_DB_URL = os.getenv('OLD_DB_URL')
NEW_DB_URL = os.getenv('NEW_DB_URL')

# Create database engines
old_engine = create_engine(OLD_DB_URL)
new_engine = create_engine(NEW_DB_URL)

# Create session makers
OldSession = sessionmaker(bind=old_engine)
NewSession = sessionmaker(bind=new_engine)

def migrate_data():
    old_session = OldSession()
    new_session = NewSession()

    try:
        # Fetch data from the old database
        old_data = old_session.execute("SELECT * FROM old_table").fetchall()

        # Insert data into the new database
        for row in old_data:
            new_session.execute(
                "INSERT INTO new_table (column1, column2) VALUES (:column1, :column2)",
                {'column1': row.column1, 'column2': row.column2}
            )
        new_session.commit()
        print("Data migration completed successfully.")
    except Exception as e:
        print(f"Error during data migration: {e}")
        new_session.rollback()
    finally:
        old_session.close()
        new_session.close()

if __name__ == "__main__":
    migrate_data()
