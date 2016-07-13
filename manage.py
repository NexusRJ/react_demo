# coding: utf-8

from app import create_app, db
from app.models import Article, Category, User
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand


app = create_app('default')
app.debug = True
manager = Manager(app)
migrate = Migrate(app, db)


manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
