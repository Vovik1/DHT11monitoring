from datetime import datetime
from . import db


class Data(db.Model):
    __tablename__ = 'data'
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    time = db.Column(db.DateTime(), default=datetime.now)

    def to_json(self):
        json_dt = {
            'temperature': self.temperature,
            'humidity': self.humidity,
            'time': self.time
        }
        return json_dt

    @staticmethod
    def from_json(json_post):
        humidity, temperature = json_post.get('values')
        return Data(temperature=float(temperature), humidity=float(humidity))





