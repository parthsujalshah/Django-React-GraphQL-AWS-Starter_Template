FROM python:3.8.3-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /django
RUN apt-get update \
    && apt-get -y install gcc postgresql libpq-dev \
    && apt-get clean
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
CMD ["chmod", "u+x", "/django/entrypoint.sh"]
ENTRYPOINT ["/django/entrypoint.sh"]