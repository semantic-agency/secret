FROM alpine:latest

RUN apk update && \
    apk add build-base python3 python3-dev libffi-dev libressl-dev postgresql-dev && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 /usr/bin/pip && \
    pip install --upgrade pip

RUN addgroup app && \
    adduser --disabled-password --gecos "" --ingroup app app

USER app
ENV PATH="/home/app/.local/bin:${PATH}"

COPY requirements.txt .
RUN pip3 install --user -r requirements.txt

WORKDIR /home/app
COPY . .
RUN pip3 install --user .

ENV FLASK_APP=wsgi.py
CMD gunicorn -b :5000 -w 3 wsgi:app --preload
