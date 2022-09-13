FROM python:3.10.7-alpine3.16

COPY . .

RUN apk add build-base

RUN pip install -r requirements.txt

RUN crontab crontab

CMD ["crond", "-f"]