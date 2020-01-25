from flask_migrate import Migrate
from app import create_app, db
from app.models import Data

app = create_app('default')
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Data=Data)
