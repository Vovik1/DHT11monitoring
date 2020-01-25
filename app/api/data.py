from flask import jsonify, request, current_app, url_for
from .. import db
from ..models import Data
from . import api
from ..email import send_email
from ..deque import last_values_buffer


@api.route('/data/<int:ident>')
def get_data(ident):
    data = Data.query.order_by(Data.id.desc()).limit(ident).all()
    response = jsonify({
        'data': [dt.to_json() for dt in data]
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@api.route('/get_last_values/')
def get_last_values():
    last_dt = Data.query.order_by(Data.id.desc()).first()

    response = jsonify({'data': last_dt.to_json()})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@api.route('/data/', methods=['POST'])
def post_data():
    data = Data.from_json(request.json)
    print(data)
    db.session.add(data)
    db.session.commit()
    last_values_buffer.append(data.temperature)
    if sum(last_values_buffer) / last_values_buffer.maxlen > 18:
        send_email('High temperature', 'mail/temperature_alarm')
        last_values_buffer.clear()
    return 'Added to db'
