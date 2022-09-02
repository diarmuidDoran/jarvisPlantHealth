FROM python:3.9
WORKDIR /src
COPY ./src .
RUN pip install -r /src/requirements.txt
CMD FLASK_APP=main.py flask run --host=0.0.0.0
