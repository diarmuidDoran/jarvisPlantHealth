# FROM python:3.10.7-alpine3.16

# COPY . .

# RUN apk --no-cache add musl-dev linux-headers g++

# # RUN apk update \
# #      &&  apk add --upgrade --no-cache \
# # 	python3 libpq uwsgi-python3 \
# # 	python3-dev py3-pip alpine-sdk postgresql-dev postgresql \
# # 	proj proj-dev \
# # 	proj-util \
# #         bash openssh curl ca-certificates openssl less htop \
# # 	g++ make wget rsync \
# #         build-base libpng-dev freetype-dev libexecinfo-dev openblas-dev libgomp lapack-dev \
# #         libgcc musl  \
# # 	libgfortran \
# # 	lapack-dev \
# #      &&  pip install --no-cache-dir --upgrade pip
# RUN pip install --upgrade pip setuptools wheel

# RUN apk add py-numpy

# RUN python -m pip install numpy

# RUN pip3 install -r requirements.txt

# RUN crontab crontab

# CMD ["crond", "-f"]

FROM python:3.10.7

COPY . .

RUN pip install Cmake

RUN pip install -r requirements.txt

RUN apt-get update && apt-get -y install cron
RUN ls
RUN crontab crontab

CMD ["crond", "-f"]