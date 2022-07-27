FROM python:3.9
WORKDIR /plantapi
COPY . /plantapi
RUN pip3 --no-cache-dir install -r plantapi/requirements.txt
EXPOSE 5000
CMD ["python3", "plantapi/main.py"]
