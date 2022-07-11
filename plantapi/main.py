# main.py
from flask import Flask
from blueprints.documented_endpoints import blueprint as documented_endpoint

app = Flask(__name__)
app.config['RESTPLUS_MASK_SWAGGER'] = False

app.register_blueprint(documented_endpoint)

if __name__ == "__main__":
    app.run()

