FROM python:3.8

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 -y

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . .

EXPOSE 5000
ENTRYPOINT [ "python" ]
CMD [ "server.py" ]