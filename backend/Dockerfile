FROM python:3.8-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /app
RUN apt-get update \
    && apt-get -y install gcc postgresql libpq-dev \
    && apt-get clean
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
# ENTRYPOINT ["/app/entrypoint.sh"]